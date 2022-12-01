import {authHost,host} from './../axios/axios';

export const checkAuth = ()=>{
    return authHost.get('/getUser');
}

export const Login = (data)=>{
    return host.post("/login",{data});
}

export const Devices = ()=>{
    return authHost.get("/devices");
}

export const Device = (id)=>{
    return authHost.post("/device",{id});
}

export const Brands = ()=>{
    return authHost.get("/brands");
}

export const Types = ()=>{
    return authHost.get("/types");
}

export const Add_Type = (name)=>{
    return authHost.post("/add_type",{name});
}

export const Add_Brand = (name)=>{
    return authHost.post("/add_brand",{name});
}

export const Add_Device = (name,price,description,img,brand,type)=>{
    console.log(name,price,description,brand,type,img);
    const formData = new FormData();
    formData.append('name',name);
    formData.append('price',price);
    formData.append('description',description);
    formData.append('brand',brand);
    formData.append('img',img);
    formData.append('type',type);
    return authHost.post("/add_device",formData);
}

export const filterBrand = (name) => {
    return authHost.post("/brands/filter",name);
}
export const filterType = (name) => {
    return authHost.post("/types/filter",name);
}
export const filterBrandType = (brand,type)=>{
    return authHost.post("/types_brands/filter",{brand,type});
}

export const addToBasket = (device)=>{
    return authHost.post("/basket",device);
}

export const getBasket = ()=>{
    return authHost.get("/basket");
}