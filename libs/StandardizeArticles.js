class Article {
    constructor(id, title, createdAt, publishedAt, description, content, slug, cover, category, seo) {
        this.id = id
        this.title = title
        this.createdAt = createdAt
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

export function StandardizeArticlesList(rawArticlesList) {
    let standardizedArticles = {
        data: [],
        pagination: {}
    }

    rawArticlesList.data.map(result => {
        standardizedArticles.data[rawArticlesList.data.indexOf(result)] = new Article(
            result.id,
            result.attributes.title,
            articleDate(result.attributes.createdAt),
            articleDate(result.attributes.publishedAt),
            result.attributes.description,
            result.attributes.content,
            result.attributes.slug,
            result.attributes.cover.data.attributes.url,
            result.attributes.category.data.attributes.category,
        )
    })
    standardizedArticles.pagination = rawArticlesList.meta.pagination
    return JSON.stringify(standardizedArticles)
}

export function StandardizeOneArticles(rawArticle) {
    const article = new Article(
        rawArticle.id,
        rawArticle.attributes.title,
        articleDate(rawArticle.attributes.createdAt),
        articleDate(rawArticle.attributes.publishedAt),
        rawArticle.attributes.description,
        (rawArticle.attributes.content).replace('"url":"/', `"url":"${process.env.API_BASE_URL}/`),
        rawArticle.attributes.slug,
        rawArticle.attributes.cover.data.attributes.url,
        rawArticle.attributes.category.data.attributes.category,
        rawArticle.attributes.seo
    )
    return JSON.stringify(article)
}