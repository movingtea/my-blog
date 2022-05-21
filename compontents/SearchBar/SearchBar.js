import {Button, FormControl, TextField} from "@mui/material";
import styles from './SearchBar.module.css'

export default function SearchBar() {
    return (
        <>
            <FormControl className={styles.form}>
                <TextField className={styles.searchInput} variant="outlined" placeholder={'请输入要查找的内容'} size={'small'}/>
                <Button>搜索</Button>
            </FormControl>
        </>
    )
}