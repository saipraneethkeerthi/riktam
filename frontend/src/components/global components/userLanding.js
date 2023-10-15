//Importing React Component from react library
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAllGroups,getAllCategoryList } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

/**
 * @author:"Madhavi itikala and Spandana"
 * @returns {Html}
 * @description Implementation of Landing Component,we retrieve data from redux and project on the browser.
 */
function Landing() {
  const groupList = useSelector((state) => state?.product?.product);
  const loggedState = useSelector((state) => state?.user?.isLoggedIn);
  const userId = useSelector((state) => state?.user?.userData?._id);
  const userList = useSelector((state) => state?.category?.category);


  // const data = categoryList.data
  // console.log(data)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getAllCategoryList());

  }, []);
  return (
    <div style={{margin:"20px"}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <h1>Users Data</h1>
      <Link to="/signup">Create User</Link>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Group Name</th>
            <th scope="col">created By</th>
            <th scope="col">members count</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {groupList?.map((each, i) => (
            <tr>
              <th scope="row">{i + 1}</th>
              <td><Link to={`/group/${each._id}`}>{each.groupName}</Link></td>
              <td>{each.createdBy}</td>
              <td>{each.members.length}</td>
              <td>{each.createdBy===userId? <Link to={`/signup/${each._id}`}>Edit</Link>:""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Landing;
