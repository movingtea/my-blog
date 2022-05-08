import axios from "axios";

export async function getNaviData(slug) {
    const result = (await axios(process.env.API_BASE_URL + '/api/posts?fields[0]=title&fields[1]=slug&sort[0]=publishedAt%3Adesc')).data
    //console.log(result)

    let naviDataList = {
        titles: [],
        slugs: []
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
        title: naviDataList.titles[currentArticleIdx + 1],
        slug: naviDataList.slugs[currentArticleIdx + 1],
    }

    return {
        prev: prevArticle,
        next: nextArticle
    }

}