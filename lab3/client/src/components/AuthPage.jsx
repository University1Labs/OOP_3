import React from 'react'
import styles from './AuthPage.module.scss';
import {useState} from 'react'
import {Login} from './../sideEffects/api'

function AuthPage({setLogin}) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  function login(email,password){
    const data = {email:email,password:password};
    Login(data).then(res=>{
      console.log(res.data.token);
      if (res.data.message === "Wrong password" || res.data.message === "Wrong email"){
          setError("Wrong email or password");
      }
      if (res.data.token){
        localStorage.setItem('token',res.data.token);
        setLogin(true);
      }
    }).catch(e=>setError("Error"));
  }
  return (
    <>
    <div className={styles.title}>Login</div>
    <div className={styles.auth}>
      <div className={styles.auth__form}>
        <div className={styles.auth__form__email}>
            <input onChange={(e)=>{
              setEmail(e.target.value);
            }}placeholder="email" type="text" />
        </div>
        <div className={styles.auth__form__password}>
            <input onChange={(e)=>{
              setPassword(e.target.value);
            }}placeholder="password" type="password" />
        </div>
        <div className={styles.auth__form__button}>
          <button onClick={()=>{
            login(email,password);
          }}>Enter</button>
        </div>
      </div>
    </div>
    <div className={styles.error}>{error}</div>
    </>
  )
}

export default AuthPage;