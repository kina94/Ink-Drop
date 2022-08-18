import React, {memo} from 'react';
import styles from '../styles/header.module.css';

const LoginHeader = memo(() => {
  return(
  <header className={styles.header}>
    <h1 className={styles.name}>
    <i className="fas fa-book fa-xs" style={{color:'var(--color-pink)', paddingRight:'8px'}}></i>
    다독다독</h1>
  </header>
  )
})

export default LoginHeader;
