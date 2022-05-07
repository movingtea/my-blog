import Link from 'next/link';
import styles from '../styles/articles.module.css'
import {getArticlesData} from "../libs/articles";
import HeaderBlock from "../compontents/HeaderBlock/HeaderBlock";


export default function Articles(pageData) {
    const articlesData = JSON.parse(pageData.articles)

    return (
        <div className={styles.container}>
            <div className={styles.pageBody}>
                <HeaderBlock/>
                {articlesData.map(article => (
                    articlesData.indexOf(article) === 0 || articlesData.indexOf(article) === 4 ?
                        <div key={article.id} id={articlesData.indexOf(article)} className={styles.articleFullWidth}
                             style={{
                                 background: `url(${process.env.API_BASE_URL}${article.cover}) no-repeat`,
                                 backgroundSize: 'cover'
                             }}>
                            <div className={styles.featuredArticle}>
                                <div className={styles.featuredCategory}>
                                    {article.category}
                                </div>
                                <Link href={`/articles/${article.slug}`}>
                                    <a className={styles.featuredTitle}>{article.title}</a>
                                </Link>
                                <p className={styles.articleDesc}>{article.description}</p>
                                <span>Read more</span>
                            </div>
                        </div>
                        : <div key={article.id} className={styles.articleHalfWidth}>
                            <div className={styles.halfWidthCover} style={{
                                background: `url(${process.env.API_BASE_URL}${article.cover}) no-repeat`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}/>
                            <div className={styles.halfWidthContent}>
                                <Link href={`/articles/${article.slug}`}>
                                    <a className={styles.halfWidthContentTitle}>{article.title}</a>
                                </Link>
                                <p className={styles.articleDesc}>{article.description}</p>
                            </div>
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