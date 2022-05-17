import Layout from '../compontents/Layout/Layout';
import Head from 'next/head'

export default function TestPage() {
    return (
        <Layout>
            <Head>
                <meta name={'description'} content={'test page'}/>
            </Head>
            <main>

            </main>
        </Layout>
    )
}