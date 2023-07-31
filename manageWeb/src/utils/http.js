import service  from "./service";
//封装get请求
export function get(url,params){
    const config={
        method:"get",
        url
    }
    if(params){
        config.params=params
    }
    return service(config)
}
//封装Post请求
export function post(url,params){
    const config={
        method:"post",
        url
    }
    if(params){
        config.data=params
    }
    return service(config)
}
//封装Put请求
export function Put(url,params){
    const config={
        method:"Put",
        url
    }
    if(params){
        config.data=params
    }
    return service(config)
}
//封装Delete请求
export function Delete(url,params){
    const config={
        method:"Delete",
        url
    }
    if(params){
        config.data=params
    }
    return service(config)
}