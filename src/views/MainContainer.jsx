import React, { useEffect, useReducer, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/home/common/navbar/Navbar'
import SearchContainer from './SearchContainer'
import LibraryContainer from './LibraryContainer'
import HistoryContainer from './HistoryContainer'
import Sidebar from '../components/home/common/sidebar/Sidebar'
import MobileNavbar from '../components/mobile/navbar/MobileNavbar'
import './Container.css'
import LoadingSpinner from '../common/utils/LoadingSpinner'
import LocalStorage from '../common/utils/local_storage'
import { useDispatch, useSelector } from 'react-redux'
import bookActions from '../modules/actions'

function MainContainer(props) {
    const dispatch = useDispatch()
    const savedBooks = useSelector(store => store.bookStore.savedBooks)
    const navigate = useNavigate()
    const location = useLocation()

    // 첫 로그인 시 유저 정보를 세팅합니다.
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        props.authService.onAuthChange(user => {
            if (user) {
                setUserInfo({
                    ...userInfo,
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
    }, [props.authService, props.userRepository])

    const FetchSavedBooks = async() => {
        setIsLoading(true)
        const books = await props.bookRepository.syncBooks(userInfo.userId)
        dispatch(bookActions.getSavedBooks(books))
        setIsLoading(false)
    }

    useEffect(() => {
        FetchSavedBooks()
    }, [userInfo.userId])

    const onClickSearchNav = () => {
        if (location.pathname.includes('search')) {
            navigate('/home/search')
            LocalStorage.removeAllItems()
        } else {
            const savedParams = JSON.parse(localStorage.getItem('params'))
            const serachURL = savedParams ? `/home/search/${savedParams.query}` : '/home/search'
            navigate(serachURL)
        }
    }

    return (
        <section className='main'>
            {
                isLoading && <LoadingSpinner></LoadingSpinner>
            }
            <Navbar userInfo={userInfo} {...props}></Navbar>
            <Sidebar
                onClickSearchNav={onClickSearchNav}
            ></Sidebar>
            <MobileNavbar
                onClickSearchNav={onClickSearchNav}
                {...props} />
            <section className='content'>
                <Routes>
                    <Route exact={true} path='search/*' element={<SearchContainer
                        userInfo={userInfo}
                        bookRepository={props.bookRepository}
                    />} />
                    <Route exact={true} path='library/*'
                        element={<LibraryContainer
                            userInfo={userInfo}
                        />} />
                    <Route exact={true} path='history/*'
                        element={<HistoryContainer
                            userInfo={userInfo}
                        />} />
                </Routes>
            </section>
        </section>
    )
}

export default MainContainer