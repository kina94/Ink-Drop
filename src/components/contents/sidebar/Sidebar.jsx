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
        <li className={styles.li} onClick={()=>navigate('/home')}>
          <i className="fa-solid fa-house" id={styles.icon}></i>Home</li>
        <li className={styles.li} onClick={()=>navigate('/home/task')}>
          <i className="fa-solid fa-list-check" id={styles.icon} ></i>Task</li>
        <li className={styles.li} onClick={()=>navigate('/home/calendar')}>
          <i className="fa-solid fa-calendar-days" id={styles.icon} ></i>Calendar</li>
        <li className={styles.li} onClick={()=>navigate('/home/board')}>
          <i className="fa-solid fa-pen-to-square" id={styles.icon} ></i>Board</li>
        <li className={styles.li} onClick={()=>navigate('/home/member')}>
          <i className="fa-solid fa-circle-user" id={styles.icon}></i>Member</li>
      </ul>
    </aside>
  )
}

export default Sidebar