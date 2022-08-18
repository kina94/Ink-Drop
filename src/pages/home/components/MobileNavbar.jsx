import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { removeAllLocalStorageItems } from '../../../common/utils/local_storage'
import * as authService from '../../../service/authService'
import '../styles/mobile.css'

function MobileNavbar() {
    const navigate = useNavigate()
    const currentPath = useLocation().pathname;

    /*-----------------중복 코드 제거 필요-------------*/
  const resetSavedSearchHistory = () => {
    removeAllLocalStorageItems();
    document.querySelector("input").value = "";
  };

  const getSavedSearchURL = (savedParams) => {
    const savedSearchURL = savedParams
      ? `/home/search/${savedParams.query}`
      : "/home/search";
    return savedSearchURL;
  };

  const handleSearchMenu = () => {
    if (currentPath.includes("search/")) {
      resetSavedSearchHistory();
      navigate("/home/search");
    } else {
      const savedParams = JSON.parse(localStorage.getItem("params"));
      navigate(getSavedSearchURL(savedParams));
    }
  };

    return (
        <nav className='mobile-nav'>
            <a className='mobile-nav-menu' onClick={handleSearchMenu}>
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
            <a className='mobile-nav-menu' onClick={() => authService.logout()}>
            <i className="fa-solid fa-right-from-bracket" id='icon'></i>
            <p>로그아웃</p>
            </a>
        </nav>
    )
}

export default MobileNavbar