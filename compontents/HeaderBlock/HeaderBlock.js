import {Grid} from "@mui/material";
import styles from "./HeaderBlock.module.css";
import Link from "next/link";

export default function HeaderBlock() {
    return (
        <header className={styles.header}>
            <Grid container direction={'row'} justifyContent={'center'}>
                <Grid item xs={1}>
                    <div className={styles.headerContent}>
                        <div className={styles.textLogo}>
                            <div className={styles.logoSymbol}>G</div>
                        </div>
                    </div>
                </Grid>
                <Grid item container xs={11} direction={"row"} alignItems={"center"}>
                    <Grid item xs={1}>
                        <Link href={'/'}>首页</Link>
                    </Grid>
                    <Grid item xs={1}>
                        <Link href={'/articles'}>文章</Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link href={'/career'}>简历</Link>
                    </Grid>
                </Grid>
            </Grid>
        </header>
    )
}