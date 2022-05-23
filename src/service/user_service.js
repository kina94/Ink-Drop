import { firebaseDatabase } from './firebase'

class UserService {
    //유저 정보가 변경되면 저장합니다.
    saveUserProfile(userId, userInfo) {
        firebaseDatabase.ref(`${userId}/info`).set(userInfo);
    }

    //유저 정보를 로드합니다.
    loadUserProfile(userId, setUserInfo) {
        firebaseDatabase.ref(`${userId}/info`).once('value').then((snapshot) => {
            const user = snapshot.val() && snapshot.val()
            user && setUserInfo(user);
        });
    }

    // 첫 접속이면 유저 정보를 저장합니다.
    setUserProfile(userId, userInfo, saveUserInfo) {
        const ref = firebaseDatabase.ref(`${userId}`)
        ref.on('value', snapshot => {
            if (snapshot.exists()) {
                return
            } else {
                userInfo && saveUserInfo(userInfo)
            }
        })
        return () => ref.off();
    }
}

export default UserService