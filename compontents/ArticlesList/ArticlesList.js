import styles from "./ArticlesList.module.css";
import {Grid, Link, Paper, useMediaQuery} from "@mui/material";
import Image from "next/image"
import TagsList from "../TagsList/TagsList";

export default function ArticlesList(data) {
    const isMobile = useMediaQuery('(max-width: 700px)')
    const isMd = useMediaQuery('(max-width: 900px')
    return (
        <>
            {data.articles.map(article => {
                if (data.articles.indexOf(article) < 3) {
                    return (
                        <Paper key={article.id} elevation={8} className={styles.articleHalfWidth}
                               id={article.id}>
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
                } else if (data.articles.indexOf(article) === 3) {
                    return (
                        <div key={article.id} className={styles.middlePost}>
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
            <Grid container className={styles.bottomContainer}>
                <Grid item container sm={12} md={7} justifyContent={'center'} className={styles.bottomArticleList}>
                    {data.articles.slice(4).map(article => {
                        return (
                            <Paper key={article.id} elevation={8}
                                   className={isMobile ? styles.articleHalfWidth : styles.bottomArticle}
                                   id={article.id}>
                                <div className={styles.bottomArticleCover}>
                                    <Image src={`${process.env.API_BASE_URL}${article.cover}`}
                                           layout={'fill'} objectFit={'cover'} alt={`${article.title}`}
                                           loading={'lazy'}/>
                                </div>
                                <div className={styles.bottomArticleContent}>
                                    <div className={styles.bottomArticleCategory}>
                                        {article.category}
                                    </div>
                                    <Link href={`/articles/${article.slug}`} className={styles.bottomArticleTitle}
                                          color={'inherit'} underline={'hover'}>
                                        {article.title}
                                    </Link>
                                    {isMobile
                                        ? <>
                                            <div className={styles.bottomArticleDate}>
                                                {article.publishedAt}
                                            </div>
                                        </>
                                        : <>
                                            <div className={styles.bottomArticleDate}>
                                                {article.publishedAt}
                                            </div>
                                            <p className={styles.bottomArticleDesc}>{article.description}</p>
                                        </>
                                    }
                                </div>
                            </Paper>
                        )
                    })}
                </Grid>
                {!isMd &&
                <Grid container item md={4} className={styles.tagContainer}>
                    <Grid item container md={12} direction={'column'} alignItems="center">
                        <Grid item>
                            {data.tags
                                ? <TagsList tags={data.tags}/>
                                : <></>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                }
            </Grid>
        </>
    )
}