import styles from "./ArticlesList.module.css";
import {Link, Paper, useMediaQuery} from "@mui/material";
import Image from "next/image"


// style={{
//     background: `url(${process.env.API_BASE_URL}${article.cover}) no-repeat`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
// }}

export default function ArticlesList(data) {
    const isMobile = useMediaQuery('(max-width: 600px)')
    return (
        <>
            {data.articles.map(article => {
                if (data.articles.indexOf(article) < 3) {
                    return (
                        <Paper key={data.articles.indexOf(article)} elevation={8} className={styles.articleHalfWidth}
                               id={data.articles.indexOf(article)}>
                            <div className={styles.halfWidthCover}>
                                <Image src={`${process.env.API_BASE_URL}${article.cover}`}
                                       layout={'fill'} objectFit={'cover'} alt={`${article.title}`} loading={'lazy'}/>
                            </div>
                            <div className={styles.halfWidthContent}>
                                <div className={styles.featuredCategory}>
                                    {article.category}
                                </div>
                                <Link href={`/articles/${article.slug}`} className={styles.halfWidthContentTitle}
                                      color={'inherit'} underline={'hover'}>
                                    {article.title}
                                </Link>
                                {isMobile
                                    ? <>
                                        <div className={styles.publishedDate}>
                                            {article.publishedAt}
                                        </div>
                                    </>
                                    : <>
                                        <div className={styles.publishedDate}>
                                            {article.publishedAt}
                                        </div>
                                        <p className={styles.articleDesc}>{article.description}</p>
                                    </>
                                }
                            </div>
                        </Paper>
                    )
                } else if (data.articles.indexOf(article) > 3) {
                    return (
                        <></>
                    )
                } else {
                    return (
                        <div className={styles.middlePost}>
                            <div className={styles.middlePostCover}>
                                <Image src={`${process.env.API_BASE_URL}${article.cover}`} layout={'fill'}
                                       objectFit={'cover'} alt={article.title}/>
                                <div className={styles.middlePostCoverOverlay}/>
                            </div>
                            <div className={styles.middlePostContent}>
                                <div className={styles.featuredCategory}>
                                    {article.category}
                                </div>
                                <Link href={`/articles/${article.slug}`} className={styles.featuredTitle}
                                      color={'inherit'} underline={'hover'}>
                                    {article.title}
                                </Link>
                                {!isMobile &&
                                <>
                                    <div className={styles.publishedDate}>
                                        {article.publishedAt}
                                    </div>
                                    <div className={styles.articleDesc}>{article.description}</div>
                                </>
                                }

                            </div>
                        </div>
                    )
                }
            })}
        </>
    )
}