import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import Search from './search/Search'
import Sidebar from './sidebar/Sidebar'
import './MainContainer.css'

function MainContainer(props) {
    const location = useLocation();
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
                <Route exact={true} path='search/*' element={<Search />}/>
            </Routes>
            </section>
        </section>
    )
}

export default MainContainer