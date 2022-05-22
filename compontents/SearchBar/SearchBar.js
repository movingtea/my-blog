import {Button, FormControl, IconButton, InputAdornment, TextField} from "@mui/material";
import styles from './SearchBar.module.css'
import {useState} from "react";
import {KeywordSearch} from "../../libs/Search";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchBar({result}) {

    const [inputValue, setInputValue] = useState('')

    const handleInput = (e) => {
        setInputValue(e.target.value)
    }

    const handleClickSearch = async () => {
        const searchResult = await KeywordSearch(inputValue)
        result(JSON.parse(searchResult))
    }
    return (
        <>
            <FormControl className={styles.form}>
                <TextField className={styles.searchInput} variant="outlined" placeholder={'请输入要查找的内容'} size={'small'}
                           onChange={handleInput} type={'text'} value={inputValue} InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),

                    endAdornment: inputValue && (
                        <IconButton
                            aria-label="clear search input"
                            onClick={() => setInputValue("")}
                        ><ClearIcon/></IconButton>
                    )
                }}/>
                <Button onClick={handleClickSearch}>搜索</Button>
            </FormControl>
        </>
    )
}