import Link from 'next/link';
import styles from '../styles/articles.module.css'
import {getArticlesData} from "../libs/articles";


export default function Articles(pageData) {
    const articlesData = JSON.parse(pageData.articles).data
    //const edjsParser = edjsHTML()
    return (
        <>
            <div>
                {articlesData.map(({id, attributes}) => (
                    <div key={id}>
                        <Link href={`/articles/${attributes.slug}`}>
                            <a>{attributes.title}</a>
                        </Link>
                        <p>{attributes.description}</p>
                        <p>{attributes.cover.data ?
                            <img src={`${process.env.API_BASE_URL}${attributes.cover.data.attributes.url}`}/> :
                            <img style={{display: 'none'}}/>}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const articles = await getArticlesData()
    return {
        props: {articles}
    }
}