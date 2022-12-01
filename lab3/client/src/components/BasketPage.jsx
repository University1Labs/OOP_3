import React from 'react';
import { useEffect,useState } from 'react';
import {getBasket} from './../sideEffects/api';
import Card from './Card';
import styles from './BasketPage.module.scss';
import { NavLink } from 'react-router-dom';

function BasketPage() {
  let [id,setId] = useState('');
  useEffect(()=>{
    getBasket().then(res=>{setId(id = res.data.map(item=>{
      return item.devices;
    }));
    }).catch((e)=>alert(e));
  },[]);
  if (id){
    if (id.length === 0){
      return <div style={{padding:'15px',fontSize:'18px'}}>Your basket is empty</div>
    }
    else {
      return (
        <div className={styles.basket}>
          {id.map((item,index)=>{
            return <NavLink style={{textDecoration:'none'}} key={index} to={"/device:"+item}><Card id={item}/></NavLink>
          })}
        </div>
      );
    }
  }
  else {
    return (
      <div className={styles.main}>
          <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }
}

export default BasketPage