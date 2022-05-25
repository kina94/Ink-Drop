import React, { useEffect, useState } from 'react'
import {Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from '../components/contents/navbar/Navbar'
import SearchContainer from './SearchContainer'
import LibraryContainer from './LibraryContainer'
import HistoryContainer from './HistoryContainer'
import Sidebar from '../components/contents/sidebar/Sidebar'
import './Container.css'

function MainContainer(props) {
    const navigate = useNavigate();

    // 첫 로그인 시 유저 정보를 세팅합니다.
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        props.authService.onAuthChange(user=>{
            if(user){
                setUserInfo({...userInfo,
                userId: user.uid, // 유저 토큰
                userName: user.displayName, // 유저 이름
                userEmail: user.email, // 유저 이메일
                photoURL: '',    
            })
            userInfo.userId && props.userRepository.setUserProfile(userInfo.userId,
                userInfo, props.userRepository.saveUserProfile(userInfo.userId, userInfo))
            userInfo.userId && props.userRepository.loadUserProfile(userInfo.userId, setUserInfo)
            } else {
                navigate('/')
            }
        }, [userInfo.userId])
    },[props.authService, props.userRepository])
    
    return (
        <section className='main'>
            <Navbar userInfo={userInfo} {...props}></Navbar>
            <Sidebar></Sidebar>
            <section className='content'>
            <Routes>
                <Route exact={true} path='search/*' element={<SearchContainer userInfo={userInfo}/>}/>
                <Route exact={true} path='library/*' element={<LibraryContainer userInfo={userInfo}/>}/>
                <Route exact={true} path='history/*' element={<HistoryContainer userInfo={userInfo}/>}/>
            </Routes>
            </section>
        </section>
    )
}

export default MainContainer