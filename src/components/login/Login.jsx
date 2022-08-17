import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeAllLocalStorageItems } from '../../common/utils/local_storage';
import * as authService from '../../service/authService';
import Footer from './footer/Footer';
import Header from './header/Header';
import styles from './Login.module.css';


const Login = () => {
  const navigate = useNavigate();

  const goToHome = (userId) => {
    navigate('/home/search',
      { state: { id: userId } });
  };

  const onLogin = (event) => {
    removeAllLocalStorageItems()
    console.log(event.currentTarget.value)
    authService //
      .login(event.currentTarget.value)
      .then(data => goToHome(data.user.uid));
  };

  useEffect(() => {
    authService.onAuthChange(user => {
      user && goToHome(user.id)
    });
  });
  return (
    <section className={styles.main}>
      <Header></Header>
      <section className={styles.section}>
        <h1 className={styles.login}>Sign In</h1>
        <p className={styles.span}>다독다독과 함께 독서 습관을 길러보세요.</p>

        <div className={styles.divInput}>
          <p className={styles.label}>Login With</p>
          <ul>
            <li><button className={styles.button} onClick={onLogin} value='Google'>
              <i className="fa-brands fa-google"></i>
            </button></li>
            <li><button className={styles.button} onClick={onLogin} value='Github'>
              <i className="fa-brands fa-github"></i>
            </button></li>
          </ul>
        </div>

        <Footer></Footer>
      </section>
      <canvas className={styles.background}></canvas>
    </section>
  );
};

export default Login;
