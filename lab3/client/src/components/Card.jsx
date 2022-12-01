import React from 'react'
import { useEffect,useState } from 'react'
import {Device} from './../sideEffects/api';
import styles from './Card.module.scss';
 
function Card({id}) {
    const [info,setInfo] = useState({});
    const _id = {id};
    useEffect(()=>{
        Device(_id).then(res=>setInfo(res.data.deviceInfo)).catch((e)=>alert(e));
    },[]);
    return (
        <div className={styles.card}>
            <div className={styles.img}>
            {(info.img) && <img src={"http://localhost:7000/"+info.img} alt="" />}
            </div>
            <div className={styles.title}>{info.name}</div>
            <div className={styles.price}>{info.price}</div>
        </div>
    );
 }

export default Card