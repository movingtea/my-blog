import axios from "axios";

class Tag {
    constructor(id, tagName, usedTime) {
        this.id = id;
        this.tagName = tagName;
        this.usedTime = usedTime
    }
}


export default async function getAllTags() {
    const tagsAmount = (await axios(`${process.env.API_BASE_URL}/api/tags`)).data.meta.pagination.total
    const results = (await axios(`${process.env.API_BASE_URL}/api/tags?pagination[limit]=${tagsAmount}&populate=*`)).data
    let tags = {
        data: [],
        pagination: {}
    }
    results.data.map(result => {
        tags.data[results.data.indexOf(result)] = new Tag(
            result.id,
            result.attributes.tag,
            result.attributes.posts.data.length
        )
    })
    tags.pagination = results.meta.pagination
    tags.data.sort((a, b) => {
        return b.usedTime - a.usedTime
    })
    //console.log(tags)
    return JSON.stringify(tags)
}