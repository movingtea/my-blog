import axios from 'axios';
import qs from 'qs';
import {StandardizeArticlesList} from "./StandardizeArticles";


export async function KeywordSearch(keyword) {
    console.log('keyword', keyword)
    const query = qs.stringify({
        filters: {
            $or: [
                {
                    title: {
                        $containsi: keyword,
                    }
                },
                {
                    description: {
                        $containsi: keyword,
                    },
                },
                {
                    content: {
                        $containsi: keyword
                    },
                }
            ]
        },
        sort: ['id:desc'],
        pagination: {
            start: 0,
            limit: 9,
        },
        populate: '*'
    }, {
        encodeValuesOnly: true
    })

    const result = (await axios(`${process.env.API_BASE_URL}/api/posts?${query} `)).data
    //console.log(result)
    //StandardizeArticles(result)
    return StandardizeArticlesList(result)
}