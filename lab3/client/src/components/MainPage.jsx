import React from 'react';
import { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import {Devices} from './../sideEffects/api';
import styles from './MainPage.module.scss';
import {Brands,Types,filterBrand,filterType,filterBrandType} from './../sideEffects/api';

function MainPage() {
  const [devices,setDevices] = useState([]);
  const [brands,setBrands] = useState([]);
  const [types,setTypes] = useState([]);
  const [Brand,setBrand] = useState("");
  const [Type,setType] = useState("");
  const [numberBrand,setNumberBrand] = useState(0);
  const [numberType,setNumberType] = useState(0);
  
  useEffect(()=>{
    Brands().then(res=>setBrands(res.data)).catch((e)=>alert(e));
  },[]);
  useEffect(()=>{
    Types().then(res=>setTypes(res.data)).catch((e)=>alert(e));
  },[]);
  useEffect(()=>{
    if (numberBrand === 0 && numberType === 0){
      Devices().then(res=>{
      setDevices(res.data);
    }).catch((e)=>alert(e))
    }
    else if (numberBrand === 0){
      filterType(Type).then(res=>setDevices(res.data)).catch((e)=>alert(e));
    } 
    else if (numberType === 0){
      filterBrand(Brand).then(res=>setDevices(res.data)).catch((e)=>alert(e));
    }
    else {
      filterBrandType(Brand,Type).then(res=>setDevices(res.data)).catch((e)=>alert(e));
    }
  },[numberBrand,numberType]); 
  return (
      <div className={styles.shop}>
      <div className={styles.brands}>
      <span style={{fontWeight:700}}>Brands :</span>
        {brands.map((brand,index)=>{
          return <div 
          onClick={()=>{setBrand(brand);setNumberBrand(index+1)
          }} style={{cursor:'pointer',textDecoration:(numberBrand===(index+1))&&'underline'}}
           key={index} className={styles.brand}>{brand.name}</div>
        })}
          <div style={{fontSize:'18px',cursor:'pointer'}}
          onClick={()=>{setNumberBrand(0);setBrand("")}}
           className={styles.brand}><span>&#10005;</span></div>
      </div>
      <div className={styles.types}>
        <span style={{fontWeight:700}}>Types :</span>
        {types.map((type,index)=>{
          return <div 
            onClick={()=>{setType(type);setNumberType(index+1)}}
             style={{cursor:'pointer',textDecoration:(numberType===(index+1))&&'underline'}}
              key={index} className={styles.type}>{type.name}</div>
        })}
        <div style={{fontSize:'18px',cursor:'pointer'}}
         onClick={()=>{setType("");setNumberType(0)}} 
         className={styles.type}><span>&#10005;</span></div>
      </div>
      <div className={styles.devices}>
      {devices.map((device,index)=>{
        return <NavLink to={`/device:${device._id}`} key={index} className={styles.device}>
            <div className={styles.device__img}>
            {(device.img) && <img src={"http://localhost:7000/"+device.img} alt="" />}
            </div>
            <div className={styles.device__title}>{device.name}</div>
            <div className={styles.device__price}>{device.price}</div>
        </NavLink>
      })}
      </div>
      </div>
  )
}

export default MainPage