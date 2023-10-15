import { useSelector } from "react-redux";

var url 
export default url="http://localhost:1109"

export const GetUserNameFromId=(id,list)=>{
    // const userList = useSelector((state) => state?.category?.category);
    let filterval=list.filter(val=>val._id==id)
    return filterval[0]?.userName

}