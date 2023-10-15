import axios from 'axios'
import * as types from "../type";
import url from "../../config"

/**
 * @description making all the product related api calls.
 * @param {String} data 
 * @returns product list
 */
export const productData=(data)=>({
    type: types.PRODUCTS,
    payload: data
})

export const getAllGroups=(searchVal="")=>{
    return (dispatch, getState) => {
        const token=getState().user?.userDate?.token
        console.log(token)
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`
        }
        axios
          .get(`${url}/groups?search=${searchVal}`,{headers:headers})
          .then((response) => {
            dispatch(productData(response.data))
            console.log(response);
          })
          .catch((error) => console.log("error",error));
      };
}

export const groupMsgSend=(groupId,userId,body)=>{
  return (dispatch, getState) => {
      const token=getState().user?.userDate?.token
      console.log(token)
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
      axios
        .post(`${url}/groups/${groupId}/${userId}/messages`,body,{headers:headers})
        .then((response) => {
          console.log(response);
          dispatch(getAllGroups())
          // alert(response.data.message)
        })
        .catch((error) => console.log("error",error));
    };
}

export const createGroupApi=(body,onSuccess)=>{
  return (dispatch, getState) => {
      const token=getState().user?.userDate?.token
      console.log(token)
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
      axios
        .post(`${url}/groups`,body,{headers:headers})
        .then((response) => {
          console.log(response);
          dispatch(getAllGroups())
          onSuccess()
          // alert(response.data.message)
        })
        .catch((error) => console.log("error",error));
    };
}

export const addMemberToGroup=(groupId,userId,body,onSuccess)=>{
  return (dispatch, getState) => {
      const token=getState().user?.userDate?.token
      console.log(token)
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
      axios
        .post(`${url}/groups/${groupId}/${userId}/members`,body,{headers:headers})
        .then((response) => {
          console.log(response);
          dispatch(getAllGroups())
          onSuccess()
          // alert(response.data.message)
        })
        .catch((error) => console.log("error",error));
    };
}

export const deleteGroups=(groupId,userId)=>{
  return (dispatch, getState) => {
      const token=getState().user?.userDate?.token
      console.log(token)
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
      axios
        .delete(`${url}/groups/${groupId}/${userId}`,{headers:headers})
        .then((response) => {
          dispatch(getAllGroups())
        })
        .catch((error) => console.log("error",error));
    };
}