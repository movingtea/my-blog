import axios from "axios";


export async function getArticlesData() {
    const results = await axios(process.env.API_BASE_URL + '/api/posts?populate=*')

    const sliceString = (rawData, num) => {
        return rawData.slice(0, num - 1)
    }

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

    let articles = []

    results.data.data.map(result => {
        const sliceWordCount = results.data.data.indexOf(result) === 0 || results.data.data.indexOf(result) === 4 ? 150 : 100 //第1篇和第5篇文章截取description的前150个字符，其余文章截取前100个字符

        articles[results.data.data.indexOf(result)] = new Article(
            result.id,
            result.attributes.title,
            result.attributes.createdAt,
            result.attributes.publishedAt,
            sliceString(result.attributes.description, sliceWordCount),
            result.attributes.content,
            result.attributes.slug,
            result.attributes.cover.data.attributes.url,
            result.attributes.category.data.attributes.category
        )
    })

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
    const articleData = await axios(process.env.API_BASE_URL + '/api/posts?populate=*&filters[slug][$eq]=' + slug)
    return JSON.stringify(articleData.data.data[0])
}