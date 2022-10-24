export const useDateFormatter = ()=>{
    const dateString = (date:Date)=>{
        return Intl.DateTimeFormat("RU-ru",{year:"numeric",month:"2-digit",day:"2-digit"}).format(date)    
        }
    return { dateString}
}