import styles from '../../styles/[slug].module.css';
import {getArticle, getArticleSlugs} from "../../libs/articles";
import {getNaviData} from "../../libs/navi";
import edjsHTML from 'editorjs-html';
import Head from "next/head";
import HeaderBlock from "../../compontents/HeaderBlock/HeaderBlock";
import FooterNavi from "../../compontents/FooterNavi/FooterNavi";
import Image from 'next/image';
import {Container} from "@mui/material";
import Layout from "../../compontents/Layout/Layout";


export default function Article(article) {
    const articleData = JSON.parse(article.data)
    const edjsParser = edjsHTML()
    const naviData = article.naviData


    return (
        <Container maxWidth={'xl'} disableGutters>
            <Head></Head>
            <HeaderBlock/>
            <Layout>
                <div className={styles.cover}>
                    <Image src={`${process.env.API_BASE_URL}${articleData.cover}`}
                           layout={'fill'} objectFit={'cover'} priority={'true'} alt={articleData.title}/>
                </div>
                <div className={styles.article}>
                    <h1 className={styles.title}>
                        {articleData.title}
                    </h1>
                    <div className={styles.publishedTime}>
                        {articleData.createdAt}
                    </div>
                    <div className={styles.category}>
                        {articleData.category}
                    </div>
                    <div className={styles.content}
                         dangerouslySetInnerHTML={{__html: edjsParser.parse(JSON.parse(articleData.content)).join('')}}/>
                </div>
                <footer className={styles.footer}>
                    <FooterNavi naviData={naviData}/>
                </footer>
            </Layout>
        </Container>
    )
}

export async function getStaticPaths() {
    const paths = await getArticleSlugs()
    //console.log(paths)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const data = await getArticle(params.slug)
    const naviData = await getNaviData(params.slug)
    //console.log(naviData)
    return {
        props: {
            data: data,
            naviData: naviData
        }
    }
}