import axios from "axios";
import qs from 'qs'

export async function getNaviData(slug) {
    const query = qs.stringify({
        fields:['title', 'slug'],
        sort: ['publishedAt:desc'],
        pagination:{
            start: 0,
            limit: 100
        }
    }, {
        encodeValuesOnly: true
    })
    //console.log(query)

    const result = (await axios(`${process.env.API_BASE_URL}/api/posts?${query}` )).data
    //console.log(result)

    let naviDataList = {
        titles: [],
        slugs: [],

    };

    result.data.map(data => {
        naviDataList.titles[result.data.indexOf(data)] = data.attributes.title
        naviDataList.slugs[result.data.indexOf(data)] = data.attributes.slug
    })

    const currentArticleIdx = naviDataList.slugs.indexOf(slug)

    const prevArticle = {
        title: currentArticleIdx - 1 >= 0 ? naviDataList.titles[currentArticleIdx - 1] : null,
        slug: currentArticleIdx - 1 >= 0 ? naviDataList.slugs[currentArticleIdx - 1] : null,
    }

    const nextArticle = {
        title: currentArticleIdx + 1 < result.meta.pagination.total?naviDataList.titles[currentArticleIdx + 1]:null,
        slug: currentArticleIdx + 1 < result.meta.pagination.total?naviDataList.slugs[currentArticleIdx + 1]:null,
    }

    return {
        prev: prevArticle,
        next: nextArticle,
    }

}