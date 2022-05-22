import axios from "axios";
import qs from "qs";
import {StandardizeArticlesList, StandardizeOneArticles} from "./StandardizeArticles";

export async function getArticlesData(page) {
    const results = await axios(`${process.env.API_BASE_URL}/api/posts?populate=*${page ? `&pagination[page]=${page}` : ``}&pagination[pageSize]=8&sort[0]=createdAt%3Adesc`)
    console.log('fafafa', StandardizeArticlesList(results.data))
    return StandardizeArticlesList(results.data)
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

    return StandardizeOneArticles(result)
}

export async function
filterTag(tag, startFrom) {
    const query = qs.stringify({
        filters: {
            tags: {
                tag: {
                    $eq: tag
                }
            },
        },
        sort: ['id:desc'],
        pagination: {
            start: startFrom,
            limit: 9,
        },
        populate: '*'
    }, {
        encodeValuesOnly: true
    })
    const results = (await axios(`${process.env.API_BASE_URL}/api/posts?${query}` )).data
    return StandardizeArticlesList(results)
}

