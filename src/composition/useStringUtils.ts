export const useStringUtils = ()=>{
const onlyNumbers = (str:string)=>{
    return str.replace(/\D/g, '')
}
return {
    onlyNumbers
}
}