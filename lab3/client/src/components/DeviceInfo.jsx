import React from 'react';
import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import {Device,addToBasket} from './../sideEffects/api';
import styles from './DeviceInfo.module.scss'


function DeviceInfo() {
  const [deviceInfo,setInfo] = useState({});
  const id = useParams();
  useEffect(()=>{
    Device(id).then(res=>{
        setInfo(res.data.deviceInfo);
    }).catch((e)=>alert(e));
  },[])
  return (
    <div className={styles.info}>
        <div className={styles.device}>
          <div className={styles.name}>{deviceInfo.name}</div>
          <div className={styles.info__img}>
            {(deviceInfo.img) && <img src={"http://localhost:7000/"+deviceInfo.img} alt="" />}
          </div>
          <div className={styles.price}>Price: {deviceInfo.price}</div>
          <div className={styles.brand}>Brand: {deviceInfo.brand}</div>
          <div className={styles.type}>Type: {deviceInfo.type}</div>
          <div className={styles.desc}>Info: {deviceInfo.description}</div>
          <div className={styles.button}>
            <button className={styles.btn} onClick={()=>{
              addToBasket(id).then(res=>{
                if (res.data.message === "Has been added"){
                  alert("Added to basket")
                }
              });
            }}>Add to basket</button>
          </div>
        </div>
        
    </div>
  )
}

export default DeviceInfo