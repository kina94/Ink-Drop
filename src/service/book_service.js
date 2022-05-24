import { firebaseDatabase } from './firebase'

import axios from "axios"
const API_KEY = '2794ed0f30000e849ac0fa16210967e0'
const API_URL = 'https://dapi.kakao.com'
const client = axios.create({
    method: 'get',
    baseURL: API_URL,
    headers: {
    Authorization: `KakaoAK ${API_KEY}`,
    }
})

export const BookService = {
    searchBooks : async(params) =>{
        try{
            const res = await client.get('/v3/search/book', {params: params})
            if(res.status===200) return res
        } catch(e){
            throw new Error('에러 발생')
        }
    },

    saveBook : (userId, ISBN, book) => {
        firebaseDatabase.ref(`${userId}/books/${ISBN}`).set(book)
    },

    syncBooks : async(userId) => {
        return await firebaseDatabase.ref(`${userId}/books`).once('value').then((snapshot) => {
            return snapshot.val() && snapshot.val()
        });
    }
}