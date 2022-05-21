import {Button, Input} from "@mui/material";
import {CreatePosts, Createtags, UpdatePostsCovers} from "../libs/create/CreateEntries";

export default function TestPage() {

    // const getSlugs = async () => {
    //     const result = (await getArticleSlugs()).data
    //     //console.log(result)
    // }

    const createTags = async () => {
        for (let i = 1; i <= 20; i++) {
            await Createtags(i)
        }
    }

    const createPosts = async () => {
        console.log('gogogo')
        for (let i = 32; i <= 100; i++) {
            await CreatePosts(i)
        }
    }

    const updatePosts = async () => {
        for (let i = 32; i <= 100; i++) {
            await UpdatePostsCovers(i)
        }
    }
    return (
        <>
            <Input/>
            <Button onClick={createTags}>Create tags</Button>
            <Button onClick={createPosts}>Create posts</Button>
            {/*<Button onClick={getSlugs}>Get Slugs</Button>*/}
            <Button onClick={updatePosts}>Update Posts</Button>
        </>
    )
}