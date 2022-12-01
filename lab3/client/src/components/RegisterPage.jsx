import React from 'react';
import styles from './AuthPage.module.scss';
import {host} from './../axios/axios'

function RegisterPage() {
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [error,setError] = React.useState("");
  function register(login,password){
    host.post('/register',{email,password}).then(res=>{
      console.log(res);
      if (res.data.message === "User with this email has already registred"){
        setError("User with this email has already registred");
      }
      if (res.data.message[0].param === 'password'){
        setError("Password must have at least 4 symbols");
      }
      if (res.data.message[0].param === 'email'){
        setError("Write correct email");
      }
      if (res.data.message === "User has registred"){
        setError("Registration completed");
      }
    }).catch(e=>setError("Error"));
  }
  return (
    <>
    <div className={styles.title}>Registration</div>
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
            register(email,password);
          }}>Enter</button>
        </div>
      </div>
    </div>
    <div className={styles.error} style={{color:error==='Registration completed'? 'green':'red'}}>{error}</div>
    </>
  )
}

export default RegisterPage