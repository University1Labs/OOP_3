import './App.css';
import Header from './components/Header'
import {Routes,Route,Navigate} from 'react-router-dom'
import AuthPage from './components/AuthPage'
import RegisterPage from './components/RegisterPage'
import BasketPage from './components/BasketPage';
import AdminPage from './components/AdminPage'
import MainPage from './components/MainPage';
import DeviceInfo from './components/DeviceInfo.jsx';
import React, {useEffect,useState} from 'react';
import {setUser} from './slices/userSlice';
import {setRole} from './slices/roleSlice';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from './slices/authSlice';
import {checkAuth} from './sideEffects/api';
import './App.css';

function App() {
  const role =  useSelector((state)=>state.role.role);
  const isAuth = useSelector((state)=>state.auth.isAuth);
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);
  const [login,setLogin] = useState(false);
  useEffect(()=>{
    setLoading(true);
    checkAuth().then(res=>{
      if (res.data.message !== 'Not authorized'){
        dispatch(setAuth(true));
        dispatch(setRole(res.data.role));
        dispatch(setUser(res.data.email))
      }
  }).finally(()=>setLoading(false))},[login,dispatch]);
  return (
      <>
        {loading? <div className="main">
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div> : 
        <>
          <Header role={role} setLogin={setLogin}/>
          <Routes>
            {!isAuth && <Route path="/login" element={<AuthPage setLogin={setLogin}/>}/>}
            {isAuth && <Route path="/basket" element={<BasketPage/>}/>}
            {isAuth && <Route path="/device::id" element={<DeviceInfo/>}/>}
            {isAuth && <Route path="/" element={<MainPage/>}/>}
            {(isAuth && role==='ADMIN') &&  <Route path="/admin" element={<AdminPage/>}/>}
            {(isAuth) ? <Route path="*" element={<Navigate to="/" />}></Route>
            : <Route path="*" element={<Navigate to="/login" />}></Route> }
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes> 
        </>
        }
      </>
  );
}

export default App;
