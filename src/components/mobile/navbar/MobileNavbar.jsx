import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mobile.css'

function MobileNavbar() {
    const navigate = useNavigate()
    return (
        <nav className='mobile-nav'>
            <a className='mobile-nav-menu' onClick={() => navigate('/home/search')}>
                <i className="fa-solid fa-magnifying-glass" id='icon' />
                <p>도서검색</p>
            </a>
            <a className='mobile-nav-menu' onClick={() => navigate('/home/library')}>
                <i className="fa-solid fa-list-check" id='icon' ></i>
                <p>내서재</p>
            </a>
            <a className='mobile-nav-menu' onClick={() => navigate('/home/history')}>
                <i className="fa-solid fa-calendar-days" id='icon' ></i>
                <p>독서기록</p>
            </a>
        </nav>
    )
}

export default MobileNavbar