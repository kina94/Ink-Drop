import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'

const Sidebar = (props) => {
  const navigate = useNavigate()
  return (
    <aside className={styles.section}>
      <h1 className={styles.name} onClick={()=>navigate('/home/search')}>
        <i className="fas fa-book" style={{color:'var(--color-pink)', paddingRight:'8px', fontSize:'35px'}}></i>
        <span>다독다독</span></h1>
      <ul className={styles.ul}>
        <li className={styles.li} onClick={props.onClickSearchNav}>
          <i className="fa-solid fa-magnifying-glass" id={styles.icon}></i>책 검색하기</li>
        <li className={styles.li} onClick={()=>navigate('/home/library')}>
          <i className="fa-solid fa-list-check" id={styles.icon} ></i>내 서재</li>
        <li className={styles.li} onClick={()=>navigate('/home/history')}>
          <i className="fa-solid fa-calendar-days" id={styles.icon} ></i>독서 기록</li>
      </ul>
      <div className={styles.copyright}>
        <span>Copyright 2022 All rights reserved by KINA</span></div>
    </aside>
  )
}

export default Sidebar