import Head from 'next/head';
import styles from '../styles/Career.module.css';
import {useRouter} from "next/router";
import Link from 'next/link';

import HeaderBlock from '../compontents/HeaderBlock/HeaderBlock';

import {Button, Grid} from "@mui/material";
import {ImageList, ImageListItem, makeStyles} from "@material-ui/core";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import {getClientsData} from "../libs/clients";
import {getCertificates} from "../libs/certificates";
import getExperiences from "../libs/experiences";
import edjsHTML from 'editorjs-html';
import getIntro from "../libs/intro";

const useStyle = makeStyles({
    MainButton: {
        border: '2.5px solid',
        width: '15%',
        "&:hover": {
            border: '2.5px solid',
        }
    },
    Icon: {
        fill: '#007CED',
        fontSize: '2.5em',
    },


    ClientList: {
        flexWrap: 'nowrap',
        padding: '2em 0',
    },

    ImageListItemHeight: {
        height: 'auto',
        maxHeight: '50%',
        maxWidth: '90%'
    },

    ImageListItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    ImageListImages: {
        width: '100%',
        height: 'auto'
    }
})

export default function Career(resumeData) {
    const edjsParser = edjsHTML()

    const clients = JSON.parse(resumeData.clientsData)
    //const certificates = JSON.parse(resumeData.certificates)
    const experiences = JSON.parse(resumeData.experiences)
    const classes = useStyle()
    const latestExp = [experiences.data[0], experiences.data[1]]
    const intro = JSON.parse(resumeData.intro)

    const router = useRouter()

    return (
        <div className={styles.container}>
            <Head>
                <title>Generated by Guo Liang</title>
                <meta name="description" content="Generated by Guo Liang"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={styles.pageBody}>
                {/*<header className={styles.header}>*/}
                {/*    <Grid container direction={'row'} justifyContent={'center'}>*/}
                {/*        <Grid item xs={7}>*/}
                {/*            <div className={styles.headerContent}>*/}
                {/*                <div className={styles.textLogo}>*/}
                {/*                    <div className={styles.logoSymbol}>G</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </Grid>*/}
                {/*        <Grid item container xs={5} direction={"row"} alignItems={"center"}>*/}
                {/*            <Grid item xs={4}>*/}
                {/*                <Link href={'/articles'}>文章</Link>*/}
                {/*            </Grid>*/}
                {/*            <Grid item xs={4}>*/}
                {/*                <Link href={'/career'}>简历</Link>*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</header>*/}
                <HeaderBlock/>
                <main>
                    <Grid container direction={"row"} justifyContent={"center"} className={styles.information}>
                        <Grid item container xs={10} justifyContent={"center"}>
                            <Grid item container xs={5}>
                                <div className={styles.photoContainer}>
                                    <div className={styles.photo}>
                                        <img
                                            src={`${process.env.API_BASE_URL}${intro.data.attributes.photo.data.attributes.url}`}
                                            className={styles.avatar} alt={'avatar'} loading={'lazy'}/>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item container xs={7}>
                                <div>
                                    <p className={styles.name}>
                                        {intro.data.attributes.name}
                                    </p>
                                    <div className={styles.description}
                                         dangerouslySetInnerHTML={{__html: edjsParser.parse(JSON.parse(intro.data.attributes.content)).join('')}}/>
                                    <Grid item container className={styles.description}>
                                        <Grid item container xs={6}>
                                            <Grid item xs={2}>
                                                <PhoneIphoneIcon/>
                                            </Grid>
                                            <Grid item>
                                                <Link href={'tel: +8613942010750'}>
                                                    13942010750
                                                </Link>
                                            </Grid>
                                        </Grid>
                                        <Grid item container xs={6}>
                                            <Grid item xs={2}>
                                                <EmailIcon/>
                                            </Grid>
                                            <Grid item>
                                                <Link href={'mailto:movingtea@outlook.com'}>
                                                    movingtea@outlook.com
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction={"row"}>
                        <Grid item xs={3}>
                            <h2 className={styles.h2}>工作经历</h2>
                        </Grid>
                        <Grid item container className={styles.skillsContent}>
                            {latestExp.map(exp => (
                                <Grid item container key={exp.id} xs={6} spacing={10} direction={'row'}>
                                    {/*<Grid item container xs={1}>*/}
                                    {/*    <BusinessCenterIcon fontSize={'small'} classes={{root: classes.Icon}}/>*/}
                                    {/*</Grid>*/}
                                    <Grid item container xs={10}>
                                        <Grid className={styles.companyName} item xs={6}>{exp.attributes.company}</Grid>
                                        <Grid className={styles.position} item xs={4}>{exp.attributes.position}</Grid>
                                        <Grid
                                            item
                                            xs={10}>{(new Date(exp.attributes.start)).getFullYear()}年{(new Date(exp.attributes.start)).getMonth() + 1}月{exp.attributes.end ? `至 ${(new Date(exp.attributes.end)).getFullYear()}年${(new Date(exp.attributes.end)).getMonth() + 1}月` : `至今`}</Grid>
                                        <Grid item xs={10} className={styles.pastExp}
                                              dangerouslySetInnerHTML={{__html: edjsParser.parse(JSON.parse(exp.attributes.description)).join('')}}/>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item container direction={'row-reverse'}>
                            <Button variant="outlined" fullWidth={true} disableRipple={true}
                                    classes={{root: classes.MainButton}}
                                    onClick={() => router.push('/career')}>查看更多</Button>
                        </Grid>

                    </Grid>
                    <Grid container direction={"column"} className={styles.clients}>
                        <Grid item xs={3}>
                            <h2 className={styles.h2}>服务客户</h2>
                        </Grid>
                        <ImageList classes={{root: classes.ClientList}} cols={8} gap={20}
                                   rowHeight={"auto"}
                                   className={styles.logos}>
                            {clients.data.map(client => (
                                <ImageListItem className={styles.imageListItem} classes={{root: classes.ImageListItem}}
                                               key={client.id}>
                                    <img className={styles.logoImages} style={{width: '100%', height: 'auto'}}
                                         src={`${process.env.API_BASE_URL}${client.attributes.logo.data.attributes.url}`}
                                         loading={'lazy'} alt={client.attributes.name}/>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                    <Grid container direction={"column"} className={styles.clients}>
                        <Grid item xs={3}>
                            <h2 className={styles.h2}>资质及证书</h2>
                        </Grid>
                        <Grid item xs={4} className={styles.certsContainer}>
                            <img className={styles.certs}
                                 loading={'lazy'} src={'/img/certs/PSMI.png'}/>
                        </Grid>
                        {/*<ImageList classes={{root: classes.ClientList}} cols={8} gap={20} rowHeight={"auto"}*/}
                        {/*           className={styles.logos}>*/}
                        {/*    {certificates.data.map(cert => (*/}
                        {/*        <ImageListItem className={styles.imageListItem} classes={{root: classes.ImageListItem}}*/}
                        {/*                       key={cert.id}>*/}
                        {/*            <Box component={'img'} className={styles.logoImages} style={{width: '100%', height: '100%'}}*/}
                        {/*                 src={`${process.env.API_BASE_URL}${cert.attributes.image.data.attributes.url}`}*/}
                        {/*                 loading={'lazy'} alt={cert.attributes.name}/>*/}
                        {/*        </ImageListItem>*/}
                        {/*    ))}*/}
                        {/*</ImageList>*/}
                    </Grid>
                </main>
                <footer/>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const clientsData = await getClientsData()
    const certificates = await getCertificates()
    const experiences = await getExperiences()
    const intro = await getIntro()
    return {
        props: {
            clientsData,
            certificates,
            experiences,
            intro
        }
    }
}
