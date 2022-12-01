import React from 'react'
import { useEffect,useState } from 'react';
import styles from './AdminPage.module.scss';
import {Brands,Types,Add_Brand,Add_Type,Add_Device} from './../sideEffects/api';

function AdminPage() {
  const [name1,setName1] = useState("");
  const [name2,setName2] = useState("");
  const [name3,setName3] = useState("");
  const [brand,setBrand] = useState("");
  const [type,setType] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");
  const [number,setNumber] = useState(1);
  const [brands,setBrands] = useState([]);
  const [types,setTypes] = useState([]);
  const [img,setImg] = useState(null);
  useEffect(()=>{
    Brands().then(res=>{setBrands(res.data);setBrand(res.data[0].name)}).catch((e)=>alert(e));
  },[number]);
  useEffect(()=>{
    Types().then(res=>{setTypes(res.data);setType(res.data[0].name)}).catch((e)=>alert(e));
  },[number]);
  return (
    <>
      <div className={styles.add}>
        <div onClick={()=>setNumber(1)}
         style={{cursor:'pointer',fontWeight:(number===1)?700:400}}
          className={styles.title}>Add Device</div>
        <div onClick={()=>setNumber(2)}
         style={{cursor:'pointer',fontWeight:(number===2)?700:400}}
          className={styles.title}>Add Brand</div>
        <div onClick={()=>setNumber(3)}
         style={{cursor:'pointer',fontWeight:(number===3)?700:400}} 
         className={styles.title}>Add Type</div>
      </div>
      <div className={styles.form}>
        {number===1 && 
        <>
          <div className={styles.name}>
            <input placeholder="name" onChange={(e)=>setName1(e.target.value)} type="text" />
          </div>
          <div className={styles.price}>
            <input placeholder="price" onChange={(e)=>setPrice(e.target.value)} type="text" />
          </div>
          <div className={styles.description}>
            <textarea placeholder="description" onChange={(e)=>setDescription(e.target.value)} type="text" />
          </div>
          <div className={styles.brand}>
            <span>Brand:</span>
            <select placeholder="brand" onChange={(e)=>{setBrand(e.target.value)}}>
              {brands.map((brand,index)=>{
                return <option key={index}>{brand.name}</option>
              })}
            </select>
          </div>
          <div className={styles.type}>
          <span>Type:</span>
            <select placeholder="type" onChange={(e)=>setType(e.target.value)}>
              {types.map((type,index)=>{
                return <option key={index}>{type.name}</option>
              })}
            </select>
          </div>
          <div className={styles.img}>
            <input onChange={(e)=>setImg(e.target.files[0])}type="file" />
          </div>
          <div className={styles.btn}>
            <button onClick={()=>{
              Add_Device(name1,price,description,img,brand,type).then(res=>{
                if (res.data.message === 'Device has been added'){
                  alert("Device added");
                }
              });
            }}>Add device</button>
          </div>
          </>
        }
        {number===2&&
          <>
          <div className={styles.name}>
            <input placeholder="name" onChange={(e)=>setName2(e.target.value)} type="text" />
          </div>
            <div className={styles.btn}>
              <button onClick={()=>{
                Add_Brand(name2).then(res=>{
                  if (res.data.message === "Brand has been added"){
                    alert("Brand added");
                  }
                });
              }}>Add brand</button>
            </div>
          </>
          }
        {number===3&&
         <>
          <div className={styles.name}>
            <input placeholder="name" onChange={(e)=>setName3(e.target.value)} type="text" />
          </div>
            <div className={styles.btn}>
              <button onClick={()=>{
                Add_Type(name3).then(res=>{
                  if (res.data.message === "Type has been added"){
                    alert("Type added");
                  }
                });
              }}>Add type</button>
            </div>
          </>}
      </div>
    </>
  )
}

export default AdminPage