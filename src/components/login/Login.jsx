import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import styles from './Login.module.css';
import Particles from 'react-tsparticles';


const Login = ({ authService }) => {
  const navigate = useNavigate();

  const goToHome = (userId) => {
    navigate('/home/search',
      { state: { id: userId } });
  };

  const onLogin = (event) => {
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
      <Particles
        className={styles.tsparticles}
        options={{
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 1,
              enable: true,
              opacity: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: false,
                area: 2000,
              },
              value: 100,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />

      <Header></Header>
      <section className={styles.section}>
        <h1 className={styles.login}>Sign In</h1>
        <p className={styles.span}>당신의 프로젝트 구성원과 할 일을 관리하세요.</p>

        <div className={styles.divInput}>
          <label className={styles.label}>Input your Email</label>
          <input className={styles.input} type="text" id="id" placeholder='id@gmail.com (구글 또는 깃허브로 로그인해주세요)'
            readOnly></input>
          <label className={styles.label}>Input your password</label>
          <input className={styles.input} type="text" id="password" placeholder='passowrd'
            readOnly
          ></input>
          <button className={styles.signIn}>Sign In</button>
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
