import {Grid} from "@mui/material";
import styles from "./HeaderBlock.module.css";
import Link from "next/link";

export default function HeaderBlock() {
    return (
        <>
            <Grid justifyContent={'center'} className={styles.menu}>
                <Grid item md={1}>
                    <div className={styles.headerContent}>
                        <div className={styles.textLogo}>
                            <div className={styles.logoSymbol}>G</div>
                        </div>
                    </div>
                </Grid>
                <Grid item container md={11} direction={"row"} alignItems={"center"}>
                    <Grid item md={2}>
                        <Link href={'/'}>首页</Link>
                    </Grid>
                    <Grid item md={2}>
                        <Link href={'/articles'}>文章</Link>
                    </Grid>
                    <Grid item md={2}>
                        <Link href={'/career'}>关于我</Link>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}