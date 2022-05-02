import {getArticle, getArticleSlugs} from "../../libs/articles";
import edjsHTML from 'editorjs-html'

export default function Article(article) {
    //console.log(article.data)
    const articleData = JSON.parse(article.data)
    const edjsParser = edjsHTML()
    //console.log(articleData)
    return (
        <div>
            <h1>{articleData.attributes.title}</h1>
            <p>{articleData.attributes.cover.data ?
                <img src={`${process.env.API_BASE_URL}${articleData.attributes.cover.data.attributes.url}`}/> :
                <img style={{display: 'none'}}/>}
            </p>
            <div
                dangerouslySetInnerHTML={{__html: edjsParser.parse(JSON.parse(articleData.attributes.content)).join('').replace('src="', `src="${process.env.API_BASE_URL}`)}}/>
        </div>
    )
}

export async function getStaticPaths() {
    const paths = await getArticleSlugs()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const data = await getArticle(params.slug)
    return {
        props: {data}
    }
}