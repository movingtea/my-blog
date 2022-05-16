import styles from './MobileMenu.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import {Grid, Link, Menu, MenuItem} from '@mui/material';

export default function MobileMenu() {

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
    )
}