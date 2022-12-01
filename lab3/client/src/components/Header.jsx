import React from 'react'
import styles from './Header.module.scss'
import {NavLink, useLocation} from "react-router-dom";
import {setUser} from './../slices/userSlice'
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from './../slices/authSlice';
import {setRole} from './../slices/roleSlice';

function Header({role,setLogin}) {
  const user = useSelector((state)=>state.user.user);
  const isAuth = useSelector((state)=>state.auth.isAuth);
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  return (
    <div className={styles.header}>
        <div className={styles.header__links}>
          <div className={styles.header__left}>
            <NavLink to="" style={{color:path==='/' && 'black'}}>Shop</NavLink>
            <NavLink to="basket" style={{color:path==='/basket' && 'black'}}>Basket</NavLink>
            {(role==='ADMIN') && <NavLink to="admin" style={{color:path==='/admin' && 'black'}}>Admin</NavLink>}
          </div>
          <div className={styles.header__right}>
            {isAuth && <p>{user}</p>}
            {isAuth? <NavLink onClick={()=>{
              dispatch(setUser(""));
              setLogin(false);
              dispatch(setAuth(false));
              dispatch(setRole(""));
              localStorage.setItem('token',"")
              }} to="logout">Logout</NavLink> : <NavLink to="login">Login</NavLink>}
            <NavLink to="register" style={{color:path==='/register' && 'black'}}>Registration</NavLink>
          </div>
        </div>
    </div>
  )
}

export default Header