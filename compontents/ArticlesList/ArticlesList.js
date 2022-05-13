import styles from "./ArticlesList.module.css";
import Link from "next/link";


export default function ArticlesList(data) {
    return (
        <>
            {data.articles.map(article => (
                <div key={article.id} id={data.articles.indexOf(article)} className={styles.articleHalfWidth}>
                    <div className={styles.halfWidthCover} style={{
                        background: `url(${process.env.API_BASE_URL}${article.cover}) no-repeat`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}/>
                    <div className={styles.halfWidthContent}>
                        <div className={styles.featuredCategory}>
                            {article.category}
                        </div>
                        <Link href={`/articles/${article.slug}`}>
                            <a className={styles.halfWidthContentTitle}>{article.title}</a>
                        </Link>
                        <div className={styles.publishedDate}>
                            {article.publishedAt}
                        </div>
                        <p className={styles.articleDesc}>{article.description}</p>
                    </div>
                </div>
            ))}
        </>
    )
}