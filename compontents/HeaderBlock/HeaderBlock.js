import {Grid, Menu, MenuItem, useMediaQuery} from "@mui/material";
import styles from "./HeaderBlock.module.css";
import Link from "next/link";
import {useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";

export default function HeaderBlock() {
    const isMobile = useMediaQuery('(max-width: 700px)')

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const expandMenu = (e) => {
        //console.log(e)
        setAnchorEl(e.currentTarget)
    }
    const closeMenu = () => {
        setAnchorEl(null);
        console.log('closed')
        console.log(anchorEl)
        console.log(Boolean(anchorEl))
    };

    return (
        <>
            {isMobile
                ? <>
                    <Grid container aria-expanded={open ? 'true' : undefined} direction={'row'}
                          className={styles.menuContainer} justifyContent="flex-end">
                        <Menu open={open} anchorEl={anchorEl} onClose={closeMenu}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}>
                            <MenuItem>
                                <Link href={'/'} underline={'none'} color={'inherit'}>
                                    首页
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href={'/tags'} underline={'none'} color={'inherit'}>
                                    标签
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href={'/career'} underline={'none'} color={'inherit'}>
                                    关于我
                                </Link>
                            </MenuItem>
                        </Menu>
                        <Grid item className={styles.menuExpander} xs={'auto'} onClick={expandMenu}>
                            <MenuIcon className={styles.menuIcon}/>
                        </Grid>
                    </Grid>
                </>
                : <Grid container justifyContent={'center'} className={styles.menu} style={{width: '80%'}}>
                    <Grid item sm={2}>
                        <div className={styles.headerContent}>
                            <div className={styles.textLogo}>
                                <div className={styles.logoSymbol}>G</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item container sm={10} direction={"row"} alignItems={"center"}>
                        <Grid item sm={2}>
                            <Link href={'/'}>首页</Link>
                        </Grid>
                        <Grid item sm={2}>
                            <Link href={'/tags'}>标签</Link>
                        </Grid>
                        <Grid item sm={2}>
                            <Link href={'/career'}>关于我</Link>
                        </Grid>
                    </Grid>
                </Grid>
            }

        </>
    )
}