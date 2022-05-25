import React, {memo} from 'react';
import styles from './header.module.css';

const Header = memo(() => {
  return(
  <header className={styles.header}>
    <h1 className={styles.name}>
    <i className="fa-solid fa-feather-pointed" style={{color:'#A593E0', paddingRight:'8px'}}></i>
    InkDrop</h1>
  </header>
  )
})

export default Header;
