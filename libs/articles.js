import axios from "axios";

class Article {
    constructor(id, title, createdAt, publishedAt, description, content, slug, cover, category) {
        this.id = id
        this.title = title
        this.createdAt = createdAt
        this.publishedAt = publishedAt
        this.description = description
        this.content = content
        this.slug = slug
        this.cover = cover
        this.category = category
    }
}

const articleDate = (date) => {
    const rawDate = new Date(date)
    return `${rawDate.getFullYear()} 年 ${rawDate.getMonth() + 1} 月 ${rawDate.getDate()} 日`
}

export async function getArticlesData(page) {
    const results = await axios(`${process.env.API_BASE_URL}/api/posts?populate=*${page ? `&pagination[page]=${page}` : ``}&pagination[pageSize]=8&sort[0]=publishedAt%3Adesc`)
    //console.log(results.data)
    const sliceString = (rawData, num) => {
        return rawData.slice(0, num - 1)
    }

    let articles = {
        data: [],
        pagination: {}
    }

    results.data.data.map(result => {
        const sliceWordCount = results.data.data.indexOf(result) === 0 || results.data.data.indexOf(result) === 4 ? 150 : 100 //第1篇和第5篇文章截取description的前150个字符，其余文章截取前100个字符
        //console.log(result)
        articles.data[results.data.data.indexOf(result)] = new Article(
            result.id,
            result.attributes.title,
            articleDate(result.attributes.createdAt),
            articleDate(result.attributes.publishedAt),
            sliceString(result.attributes.description, sliceWordCount),
            result.attributes.content,
            result.attributes.slug,
            result.attributes.cover.data.attributes.url,
            result.attributes.category.data.attributes.category,
        )
    })
    articles.pagination = results.data.meta.pagination
    //console.log('lalal',articles)
    return JSON.stringify(articles)
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
    const result = (await axios(process.env.API_BASE_URL + '/api/posts?populate=*&filters[slug][$eq]=' + slug)).data.data[0]
    const article = new Article(
        result.id,
        result.attributes.title,
        articleDate(result.attributes.createdAt),
        articleDate(result.attributes.publishedAt),
        result.attributes.description,
        (result.attributes.content).replace('"url":"/', `"url":"${process.env.API_BASE_URL}/`),
        result.attributes.slug,
        result.attributes.cover.data.attributes.url,
        result.attributes.category.data.attributes.category
    )

    return JSON.stringify(article)
}

