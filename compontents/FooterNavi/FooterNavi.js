import styles from './FooterNavi.module.css'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Grid, makeStyles} from "@material-ui/core";
import Link from 'next/link'
import {useRouter} from "next/router";

const useStyle = makeStyles({
    Arrow: {
        color: '#fff'
    }
})

export default function FooterNavi(data) {
    console.log('lala', data.naviData)
    const router = useRouter()
    const goToNext = () => {
        router.push(`/articles/${data.naviData.next.slug}`)
    }
    const goToPrev = () => {
        router.push(`/articles/${data.naviData.prev.slug}`)
    }

    const isFirst = !data.naviData.prev.slug
    console.log(isFirst)

    return (
        <Grid container direction={'row'} className={styles.container}>
            <Grid item className={styles.arrowContainer} xs={2} style={isFirst ? {backgroundColor: '#fff'} : {}}>
                <ArrowBackIosNewIcon className={styles.arrow} style={isFirst ? {display: 'none'} : {}}
                                     classes={{root: useStyle().Arrow}} onClick={goToPrev}/>
            </Grid>
            {data.naviData.prev.slug === null
                ? <Grid item className={`${styles.naviArticle} ${styles.leftNavi}`} xs={4}/>
                : <Grid container item className={`${styles.naviArticle} ${styles.leftNavi}`} xs={4}>
                    <p>上一篇文章：</p>
                    <p>
                        <Link href={`/articles/${data.naviData.prev.slug}`}>
                            <a>{data.naviData.prev.title}</a>
                        </Link>
                    </p>
                </Grid>}
            <Grid container item className={`${styles.naviArticle} ${styles.rightNavi}`} xs={4}
                  direction={'row-reverse'}>
                <div className={`${styles.naviArticleTitle} ${styles.rightNaviTitle}`}>
                    <p>下一篇文章：</p>
                    <p>
                        <Link href={`/articles/${data.naviData.next.slug}`}>
                            <a>{data.naviData.next.title}</a>
                        </Link>
                    </p>
                </div>
            </Grid>
            <Grid item className={styles.arrowContainer} xs={2} onClick={goToNext}>
                <ArrowForwardIosIcon className={styles.arrow} classes={{root: useStyle().Arrow}}/>
            </Grid>
        </Grid>
    )
}