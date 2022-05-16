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
            {data.articles.map(article => (
                <Paper key={article.id} elevation={8} className={styles.articleHalfWidth}>
                    <div className={styles.halfWidthCover}>
                        <Image src={`${process.env.API_BASE_URL}${article.cover}`} width={'100%'} height={'100%'}
                               layout={'responsive'} objectFit={'cover'} alt={`${article.title}`} loading={'lazy'}/>
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
            ))}
        </>
    )
}