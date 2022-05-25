import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'

const Sidebar = () => {
  const navigate=useNavigate();
  return (
    <aside className={styles.section}>
      <h1 className={styles.name} onClick={()=>navigate('/home')}>
        <i className="fa-solid fa-feather-pointed" style={{ color: '#A593E0', paddingRight: '8px' }}></i>
        InkDrop</h1>
      <ul className={styles.ul}>
        <li className={styles.li} onClick={()=>navigate('/home/search')}>
          <i className="fa-solid fa-house" id={styles.icon}></i>책 검색하기</li>
        <li className={styles.li} onClick={()=>navigate('/home/library')}>
          <i className="fa-solid fa-list-check" id={styles.icon} ></i>내 서재</li>
        <li className={styles.li} onClick={()=>navigate('/home/history')}>
          <i className="fa-solid fa-calendar-days" id={styles.icon} ></i>독서 기록</li>
        <li className={styles.li} onClick={()=>navigate('/home/board')}>
          <i className="fa-solid fa-pen-to-square" id={styles.icon} ></i>리뷰</li>
      </ul>
    </aside>
  )
}

export default Sidebar