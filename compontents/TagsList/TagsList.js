import {Link, List, ListItem} from "@mui/material";
import styles from './TagsList.module.css'

export default function TagsList(data) {
    //console.log('lsls', data)
    return (
        <>
            <div className={styles.tagsLabel}>标签</div>
            <List>
                {data.tags.map(tag => (
                    <ListItem key={tag.id} disableGutters className={styles.tag}>
                        <Link href={'/tags'} underline={'hover'} color={'inherit'}>
                            {tag.tagName}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    )
}