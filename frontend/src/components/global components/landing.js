//Importing React Component from react library
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAllCategoryList,getAllGroups } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

/**
 * @author:"Madhavi itikala and Spandana"
 * @returns {Html}
 * @description Implementation of Landing Component,we retrieve data from redux and project on the browser.
 */
function Landing() {
  const userList = useSelector((state) => state?.category?.category);
  const loggedState = useSelector((state) => state?.user?.isLoggedIn);

  // const data = categoryList.data
  // console.log(data)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoryList());
    dispatch(getAllGroups());

  }, []);
  return (
    <div style={{margin:"20px"}}>
     <Link to="/">Logout</Link>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <h1>Users Data</h1>
      <Link to="/signup">Create User</Link>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((each, i) => (
            <tr>
              <th scope="row">{i + 1}</th>
              <td>{each.userName}</td>
              <td>{each.email}</td>
              <td>{each.role}</td>
              <td> <Link to={`/signup/${each._id}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Landing;
