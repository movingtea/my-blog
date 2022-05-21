import {List, ListItem} from "@mui/material";
import styles from './TagsList.module.css'
import {useRouter} from "next/router";

export default function TagsList(data) {
    const router = useRouter()
    //console.log('lsls', data)
    const handleClickTag = (e) => {
        console.log(e)
        router.push({
            pathname: '/tags',
            query: {tag: e.target.innerText}
        })
    }
    return (
        <>
            <div className={styles.tagsLabel}>标签</div>
            <List>
                {data.tags.map(tag => (
                    <ListItem key={tag.id} disableGutters className={styles.tag}>
                        {/*<Link href={`/tags?${tag.tagName}`} underline={'hover'} color={'inherit'}>*/}
                        {/*    {tag.tagName}*/}
                        {/*</Link>*/}
                        <div onClick={handleClickTag}>
                            {tag.tagName}
                        </div>
                    </ListItem>
                ))}
            </List>
        </>
    )
}