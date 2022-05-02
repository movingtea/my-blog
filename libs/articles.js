import axios from "axios";

export async function getArticlesData() {
    const articlesData = await axios(process.env.API_BASE_URL + '/api/posts?populate=*')
    return JSON.stringify(articlesData.data)
}

export async function getArticleSlugs() {
    const articlesData = await axios(process.env.API_BASE_URL + '/api/posts?populate=*')
    return articlesData.data.data.map(article => {
        return {
            params: {
                slug: article.attributes.slug
            }
        }
    })
}

export async function getArticle(slug) {

    const articleData = await axios(process.env.API_BASE_URL + '/api/posts?populate=*&filters[slug][$eq]=' + slug)
    //console.log('url', process.env.API_BASE_URL+'/api/posts?populate=*&filters[slug][$eq]='+slug)
    //console.log('lalala',articleData.data.data[0])
    return JSON.stringify(articleData.data.data[0])
}