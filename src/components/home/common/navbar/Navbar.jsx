import React, { useState, useCallback } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import DEFAULT_IMAGE from '../../../../assets/images/default_logo.png'

const Navbar = (props) => {
  const navigate=useNavigate();
  const {userName, userEmail, photoURL} = {...props.userInfo}
  const [userPhoto, setUserPhoto] = useState(photoURL ? photoURL : DEFAULT_IMAGE);

  const onLogout = useCallback(() => {
    props.authService.logout();
  }, [props.authService])

  const InfoToggle = React.forwardRef(({ onClick }, ref) => (
    <div style={{minWidth:'100px'}}>
      <p style={{ fontSize: '11px', color: 'var(--color-blue)', margin: '0 5px 0 5px' }}>다독이
      </p>
      <a
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        style={{
          fontSize: '16px',
          color: 'var(--color-black)',
          fontWeight: 'bold',
          textDecoration: 'none',
          marginLeft: '5px',
        }}
      >
        {userName}<i className="fa-solid fa-angle-down" style={{marginLeft:'5px'}}></i>
      </a>
    </div>
  ));

  const CustomMenu = React.forwardRef(
    ({ style, className, 'aria-labelledby': labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <div className={styles.dropdown}>
            <section className={styles.info}>
                <img className={styles.avatar} style={{ width: '6em', height: '6em' }} src={userPhoto} alt='profile' />
              <div className={styles.userInfo}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>{userName}</span>
                {userEmail}
              </div>
            </section>
            {onLogout && <button className={styles.button} onClick={onLogout}>Logout</button>}
          </div>
        </div>
      );
    },
  );
  
  return (
    <section className={styles.section}>
      <a className={styles.edit}>
      <img className={styles.avatar} src={userPhoto} alt='profile' /></a>
      <Dropdown>
        <Dropdown.Toggle as={InfoToggle} id="dropdown-custom-components">
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
        </Dropdown.Menu>
      </Dropdown>
    </section>
  )
}

export default Navbar