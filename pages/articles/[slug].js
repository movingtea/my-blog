import styles from '../../styles/[slug].module.css';
import {getArticle, getArticleSlugs} from "../../libs/articles";
import {getNaviData} from "../../libs/navi";
import edjsHTML from 'editorjs-html';
import Head from "next/head";
import HeaderBlock from "../../compontents/HeaderBlock/HeaderBlock";
import FooterNavi from "../../compontents/FooterNavi/FooterNavi";
import Image from 'next/image';
import MobileMenu from "../../compontents/MobileMenu/MobileMenu";
import {useMediaQuery} from "@mui/material";


export default function Article(article) {
    //console.log('lala',article)
    const articleData = JSON.parse(article.data)
    const edjsParser = edjsHTML()
    const naviData = article.naviData

    const isMobile = useMediaQuery('(max-width: 700px)')

    return (
        <div className={styles.container}>
            <Head>
                {/*<title>{articleData.seo.metaTitle}</title>*/}
                {/*<meta name="description" content={`${articleData.seo.metaDescription}`}/>*/}
                {/*<meta name="keywords" content={`${articleData.seo.keywords}`}/>*/}
                {/*<link rel="icon" href="/favicon.ico"/>*/}
                {/*{articleData.seo.preventindexing && (*/}
                {/*    <>*/}
                {/*        <meta name={'robots'} content={'noindex'}/>*/}
                {/*    </>*/}
                {/*)}*/}
            </Head>
            <div className={styles.pageBody}>
                {isMobile
                    ? <>
                        <MobileMenu/>
                    </>
                    : <HeaderBlock/>
                }
                <div className={styles.cover}>
                    <Image src={`${process.env.API_BASE_URL}${articleData.cover}`}
                           layout={'fill'} objectFit={'cover'} loading={'lazy'} alt={articleData.title}/>
                </div>
                {/*<img className={styles.cover} src={`${process.env.API_BASE_URL}${articleData.cover}`}*/}
                {/*     loading={'lazy'}/>*/}
                <div className={styles.article}>
                    <h1 className={styles.title}>
                        {articleData.title}
                    </h1>
                    <div className={styles.publishedTime}>
                        {articleData.publishedAt}
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
            </div>
        </div>
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