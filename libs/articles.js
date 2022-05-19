import axios from "axios";
import qs from "qs";

class Article {
    constructor(id, title, updatedAt, publishedAt, description, content, slug, cover, category, seo) {
        this.id = id
        this.title = title
        this.updatedAt = updatedAt
        this.publishedAt = publishedAt
        this.description = description
        this.content = content
        this.slug = slug
        this.cover = cover
        this.category = category
        this.seo = seo
    }
}

const articleDate = (date) => {
    const rawDate = new Date(date)
    return `${rawDate.getFullYear()} 年 ${rawDate.getMonth() + 1} 月 ${rawDate.getDate()} 日`
}

export async function getArticlesData(page) {
    const results = await axios(`${process.env.API_BASE_URL}/api/posts?populate=*${page ? `&pagination[page]=${page}` : ``}&pagination[pageSize]=8&sort[0]=createdAt%3Adesc`)
    //console.log(results.data)
    let articles = {
        data: [],
        pagination: {}
    }
    results.data.data.map(result => {
        articles.data[results.data.data.indexOf(result)] = new Article(
            result.id,
            result.attributes.title,
            articleDate(result.attributes.updatedAt),
            articleDate(result.attributes.publishedAt),
            result.attributes.description,
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
    const totalSlugs = (await axios(`${process.env.API_BASE_URL}/api/posts?fields[0]=slug`)).data.meta.pagination.total
    const slugs = (await axios(`${process.env.API_BASE_URL}/api/posts?fields[0]=slug&pagination[limit]=${totalSlugs}`)).data.data
    return slugs.map(slug => {
        return {
            params: {
                slug: slug.attributes.slug
            }
        }
    })
}

export async function getArticle(slug) {
    const result = (await axios(process.env.API_BASE_URL + '/api/posts?populate=*&filters[slug][$eq]=' + slug)).data.data[0]
    //console.log('lalala', result.attributes.seo)
    const article = new Article(
        result.id,
        result.attributes.title,
        articleDate(result.attributes.createdAt),
        articleDate(result.attributes.publishedAt),
        result.attributes.description,
        (result.attributes.content).replace('"url":"/', `"url":"${process.env.API_BASE_URL}/`),
        result.attributes.slug,
        result.attributes.cover.data.attributes.url,
        result.attributes.category.data.attributes.category,
        result.attributes.seo
    )

    return JSON.stringify(article)
}

export async function filterCategory(category) {
    const query = qs.stringify({
        filters: {
            category: {
                category: {
                    $eq: category
                }
            }
        },
        populate: '*'
    }, {
        encodeValuesOnly: true
    })
    const results = (await axios(`${process.env.API_BASE_URL}/api/posts?${query}` )).data
    let filterResult = {
        data: [],
        pagination: {}
    }

    results.data.map(result => {
        filterResult.data[results.data.indexOf(result)] = new Article(
            result.id,
            result.attributes.title,
            articleDate(result.attributes.createdAt),
            articleDate(result.attributes.publishedAt),
            sliceString(result.attributes.description, sliceWordCount(results.data.indexOf(result))),
            result.attributes.content,
            result.attributes.slug,
            result.attributes.cover.data.attributes.url,
            result.attributes.category.data.attributes.category,
        )
    })
    //console.log(filterResult)
    return filterResult
}

