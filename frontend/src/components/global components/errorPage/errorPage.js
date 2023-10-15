import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProductList } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

/**
 * @description If the user didnt login and opens the suta site for viewing the productList
 * then it routes to the login page and making the user to login.
 * @returns login page
 */
function Errorpage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state?.product?.product);
  console.log(productList.length);
  useEffect(() => {
    dispatch(getAllProductList());
  }, []);

  return (
    <>
      <div>
        <div className="container d-flex flex-column p-3">
          <h1>ERROR</h1>
          <Link to={"/"}>Login</Link>
        </div>
      </div>
    </>
  );
}

export default Errorpage;
