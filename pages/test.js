import {Button, Input} from "@mui/material";
import {CreatePosts, Createtags} from "../libs/create/CreateEntries";
import {getArticleSlugs} from "../libs/articles";

export default function TestPage() {

    const getSlugs = async () => {
        const result = (await getArticleSlugs()).data
        console.log(result)
    }

    const createTags = async () => {
        for (let i = 1; i <= 25; i++) {
            //console.log(i)
            await Createtags(i)
        }
    }

    const createPosts = async () => {
        console.log('gogogo')
        for (let i = 1; i <= 20; i++) {
            await CreatePosts(i)
        }
    }
    return (
        <>
            <Input/>
            <Button onClick={createTags}>Create tags</Button>
            <Button onClick={createPosts}>Create posts</Button>
            <Button onClick={getSlugs}>Get Slugs</Button>
        </>
    )
}