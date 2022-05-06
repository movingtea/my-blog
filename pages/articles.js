import Link from 'next/link';
import styles from '../styles/articles.module.css'
import {getArticlesData} from "../libs/articles";
import HeaderBlock from "../compontents/HeaderBlock/HeaderBlock";
import edjsHTML from 'editorjs-html'


export default function Articles(pageData) {
    const articlesData = JSON.parse(pageData.articles).data
    const edjsParser = edjsHTML()
    return (
        <div className={styles.container}>
            <div className={styles.pageBody}>
                <HeaderBlock/>
                {articlesData.map(article => (
                    articlesData.indexOf(article) === 0 || articlesData.indexOf(article) === 4 ?
                        <div key={article.id} id={articlesData.indexOf(article)} className={styles.articleFullWidth}
                             style={{
                                 background: `url(${process.env.API_BASE_URL}${article.attributes.cover.data.attributes.url}) no-repeat`,
                                 backgroundSize: 'cover'
                             }}>
                            <div className={styles.featuredArticle}>
                                <Link href={`/articles/${article.attributes.slug}`}>
                                    <a className={styles.featuredTitle}>{article.attributes.title}</a>
                                </Link>
                                <p className={styles.featuredDesc}
                                   dangerouslySetInnerHTML={{__html: edjsParser.parse(JSON.parse(article.attributes.description)).join('')}}/>
                            </div>

                        </div>
                        : <div key={article.id} className={styles.articleHalfWidth}>
                            <Link href={`/articles/${article.attributes.slug}`}>
                                <a>{article.attributes.title}</a>
                            </Link>
                            <p>{article.attributes.description}</p>
                            <p>{article.attributes.cover.data ?
                                <img src={`${process.env.API_BASE_URL}${article.attributes.cover.data.attributes.url}`}/> :
                                <img style={{display: 'none'}}/>}
                            </p>
                        </div>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const articles = await getArticlesData()
    return {
        props: {articles}
    }
}