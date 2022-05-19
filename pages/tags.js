import getAllTags from "../libs/tags";
import {Container} from "@mui/material";
import Head from 'next/head'
import Layout from "../compontents/Layout/Layout";
import HeaderBlock from "../compontents/HeaderBlock/HeaderBlock";

export default function Tags(data) {

    const topTags = (JSON.parse(data.tags).data).slice(0, 19)
    console.log(topTags);
    return (
        <Container maxWidth={'xl'} disableGutters>
            <Head>

            </Head>
            <HeaderBlock/>
            <Layout>

            </Layout>
        </Container>
    )
}


export async function getServerSideProps() {
    const tags = await getAllTags()
    return {
        props: {
            tags: tags
        }
    }
}