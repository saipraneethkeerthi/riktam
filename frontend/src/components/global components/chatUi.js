import React, { Component, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  getAllGroups,
  getAllCategoryList,
  groupMsgSend,
  createGroupApi,
  addMemberToGroup,deleteGroups
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { GetUserNameFromId } from "../../config";
import Modal from "../reusable components/modal";

import "../../App.css";

function ChatUi() {
  const ref = useRef(null);
  const groupList = useSelector((state) => state?.product?.product);
  const loggedState = useSelector((state) => state?.user?.isLoggedIn);
  const userId = useSelector((state) => state?.user?.userData?._id);
  const userData = useSelector((state) => state?.user?.userData);
  const userList = useSelector((state) => state?.category?.category);

  const [searchVal, setSearchVal] = useState("");
  const [content, setContent] = useState("");
  const [selectedGroup, setSelectedGroup] = useState({});

  const [createGroup, setCreateGroup] = useState({});

  // const data = categoryList.data
  // console.log(data)
  const dispatch = useDispatch();

  useEffect(() => {
    groupList?.map((val) => {
      if (val._id == selectedGroup._id) {
        setSelectedGroup(val);
      }
    });
  }, [groupList]);

  useEffect(() => {
    if (searchVal == "") {
      dispatch(getAllGroups());
      dispatch(getAllCategoryList());
    }
  }, [searchVal]);

  const handleSearch = () => {
    dispatch(getAllGroups(searchVal));
  };

  const handleSend = () => {
    let obj = { content };
    dispatch(groupMsgSend(selectedGroup._id, userId, obj));
    setContent("");
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [selectedGroup, groupList]);

  const handleCreateGroup = () => {
    if (createGroup?.groupName) {
      dispatch(
        createGroupApi(createGroup, () => {
          setCreateGroup({});
        })
      );
    }
  };

  const handleCreateGroupData = (type, value) => {
    let obj = { members: [userId], createdBy: userId, ...createGroup };
    if (type === "members") {
      if (!obj.members.includes(value)) obj.members.push(value);
    } else {
      obj[type] = value;
    }
    setCreateGroup(obj);
  };

  const handleDeleteUser = (id) => {
    let temp = createGroup?.members?.filter((val) => val !== id);
    let mem = [...temp];
    if (mem.includes(userId))
      setCreateGroup({ ...createGroup, members: [...temp] });
    else setCreateGroup({ ...createGroup, members: [...temp, userId] });
  };
  const handleAddMember = () => {
    dispatch(
      addMemberToGroup(selectedGroup._id, userId, createGroup, () => {
        setCreateGroup({});
      })
    );
  };
  const handleDeleteGroup=(id)=>{
    dispatch(deleteGroups(id,userId))
  }
  return (
    <div>
      <div class="container">
        {/* <!-- Page header start --> */}
        <div class="page-title">
          <div class="row gutters">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <h5 class="title">Welcome {userData.userName}</h5>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
          </div>
        </div>
        {/* <!-- Page header end --> */}

        {/* <!-- Content wrapper start --> */}
        <div class="content-wrapper">
          {/* <!-- Row start --> */}
          <div class="row gutters">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="card m-0">
                {/* <!-- Row start --> */}
                <div class="row no-gutters">
                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                    <div class="users-container">
                      <div class="chat-search-box">
                        <Modal
                          btnName="+ Create Group"
                          title="Create Group"
                          onSubmit={handleCreateGroup}
                          toggle='createModal'
                        >
                          <input
                            class="form-control"
                            placeholder="Group name"
                            onChange={(e) =>
                              handleCreateGroupData("groupName", e.target.value)
                            }
                            value={createGroup?.groupName}
                          />
                          <select
                            class="select form-control"
                            onChange={(e) =>
                              handleCreateGroupData("members", e.target.value)
                            }
                          >
                            {userList?.map((val) => (
                              <option value={val._id}>{val.userName}</option>
                            ))}
                          </select>
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginTop: "10px",
                            }}
                          >
                            {createGroup?.members?.map((val) => (
                              <p
                                style={{
                                  backgroundColor: "lightgreen",
                                  padding: "10px",
                                  borderRadius: "20px",
                                }}
                              >
                                {GetUserNameFromId(val, userList)}{" "}
                                <i
                                  class="fa fa-close"
                                  onClick={() => handleDeleteUser(val)}
                                ></i>
                              </p>
                            ))}
                          </div>
                        </Modal>
                        {/* <p style={{textAlign:"right",cursor:"pointer"}} onClick={handleCreateGroup}></p> */}
                        <div class="input-group" style={{ marginTop: "10px" }}>
                          <input
                            class="form-control"
                            placeholder="Search"
                            onChange={(e) => setSearchVal(e.target.value)}
                            value={searchVal}
                          />
                          <div class="input-group-btn">
                            <button
                              type="button"
                              class="btn btn-info"
                              onClick={handleSearch}
                            >
                              <i class="fa fa-search"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <ul class="users chatContainerScrollMain">
                        {groupList
                          ?.filter((val) => val.members.includes(userId))
                          ?.map((each, i) => (
                            <>
                              <li
                                class="person"
                                data-chat="person1"
                                style={{
                                  backgroundColor:
                                    selectedGroup?._id == each?._id
                                      ? "white"
                                      : "",
                                }}
                               
                              >
                                <div class="user"  onClick={() => setSelectedGroup(each)}>
                                  <img
                                    src={`https://www.bootdey.com/img/Content/avatar/avatar${
                                      i + 1
                                    }.png`}
                                    alt=""
                                  />
                                  <span class="status busy"></span>
                                </div>
                                <p class="name-time"  onClick={() => setSelectedGroup(each)}>
                                  <span class="name">{each.groupName}</span>
                                  <span class="time">15/02/2019</span>
                                </p>
                                {each.createdBy===userId? <i style={{marginLeft:"20px"}}
                                class="fa fa-trash"
                                onClick={() => handleDeleteGroup(each._id)}
                              ></i> :""}
                              </li>
                            </>
                          ))}

                        {/* <li class="person" data-chat="person1">
                          <div class="user">
                            <img
                              src="https://www.bootdey.com/img/Content/avatar/avatar1.png"
                              alt="Retail Admin"
                            />
                            <span class="status offline"></span>
                          </div>
                          <p class="name-time">
                            <span class="name">Steve Bangalter</span>
                            <span class="time">15/02/2019</span>
                          </p>
                        </li>
                        <li class="person active-user" data-chat="person2">
                          <div class="user">
                            <img
                              src="https://www.bootdey.com/img/Content/avatar/avatar2.png"
                              alt="Retail Admin"
                            />
                            <span class="status away"></span>
                          </div>
                          <p class="name-time">
                            <span class="name">Peter Gregor</span>
                            <span class="time">12/02/2019</span>
                          </p>
                        </li>
                        <li class="person" data-chat="person3">
                          <div class="user">
                            <img
                              src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                              alt="Retail Admin"
                            />
                            <span class="status busy"></span>
                          </div>
                          <p class="name-time">
                            <span class="name">Jessica Larson</span>
                            <span class="time">11/02/2019</span>
                          </p>
                        </li>
                        <li class="person" data-chat="person4">
                          <div class="user">
                            <img
                              src="https://www.bootdey.com/img/Content/avatar/avatar4.png"
                              alt="Retail Admin"
                            />
                            <span class="status offline"></span>
                          </div>
                          <p class="name-time">
                            <span class="name">Lisa Guerrero</span>
                            <span class="time">08/02/2019</span>
                          </p>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                    <div
                      class="selected-user"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <strong>{selectedGroup?.groupName}</strong>
                      <p title={selectedGroup?.members?.map(val=>(GetUserNameFromId(val,userList))).join(',')}>hover for members</p>
                      <Modal
                        btnName="add members"
                        title="Add members to group"
                        onSubmit={handleAddMember}
                        toggle='addModal'
                      >
                        <input
                          class="form-control"
                          placeholder="Group name"
                          onChange={(e) =>
                            handleCreateGroupData("groupName", e.target.value)
                          }
                          value={selectedGroup?.groupName}
                          readonly
                        />
                        <select
                          class="select form-control"
                          onChange={(e) =>
                            handleCreateGroupData("members", e.target.value)
                          }
                        >
                          {userList?.filter(val=>!selectedGroup?.members?.includes(val._id))?.map((val) => (
                            <option value={val._id} readonly>
                              {val.userName}
                            </option>
                          ))}
                        </select>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                          }}
                        >
                          {createGroup?.members?.map((val) => (
                            <p
                              style={{
                                backgroundColor: "lightgreen",
                                padding: "10px",
                                borderRadius: "20px",
                              }}
                            >
                              {GetUserNameFromId(val, userList)}{" "}
                              <i
                                class="fa fa-close"
                                onClick={() => handleDeleteUser(val)}
                              ></i>
                            </p>
                          ))}
                        </div>
                      </Modal>
                    </div>
                    <div class="chat-container">
                      <ul class="chat-box chatContainerScroll">
                        {selectedGroup?.messages?.map((msg) => (
                          <div>
                            {msg.sender == userId ? (
                              <li class="chat-right">
                                <div class="chat-hour">
                                  {/* <span class="fa fa-check-circle"></span> */}
                                  <i
                                    class="fa fa-thumbs-up"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <div class="chat-text">
                                  {msg.content}
                                  <p
                                    style={{
                                      fontSize: "8px",
                                      position: "absolute",
                                      top: "-20px",
                                      width: "50px",
                                    }}
                                  >
                                    {new Date(
                                      msg.timestamp
                                    ).toLocaleTimeString()}
                                  </p>
                                </div>
                                <div class="chat-avatar">
                                  <img
                                    src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                    alt="Retail Admin"
                                  />
                                  <div class="chat-name">
                                    {GetUserNameFromId(msg.sender, userList)}
                                  </div>
                                </div>
                              </li>
                            ) : (
                              <li class="chat-left">
                                <div class="chat-avatar">
                                  <img
                                    src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                    alt="Retail Admin"
                                  />
                                  <div class="chat-name">
                                    {GetUserNameFromId(msg.sender, userList)}
                                  </div>
                                </div>
                                <div class="chat-text">
                                  {msg.content}
                                  <p
                                    style={{
                                      fontSize: "8px",
                                      position: "absolute",
                                      top: "-20px",
                                      width: "50px",
                                    }}
                                  >
                                    {new Date(
                                      msg.timestamp
                                    ).toLocaleTimeString()}
                                  </p>
                                </div>
                                <div class="chat-hour">
                                  {/* <span class="fa fa-check-circle"></span> */}
                                  <i
                                    class="fa fa-thumbs-up"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </li>
                            )}
                          </div>
                        ))}
                        <div ref={ref} />
                        {/* <li class="chat-right">
                          <div class="chat-hour">
                            08:56 <span class="fa fa-check-circle"></span>
                          </div>
                          <div class="chat-text">
                            Hi, Russell
                            <br /> I need more information about Developer Plan.
                          </div>
                          <div class="chat-avatar">
                            <img
                              src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                              alt="Retail Admin"
                            />
                            <div class="chat-name">Sam</div>
                          </div>
                        </li>
                        <li class="chat-right">
                          <div class="chat-hour">
                            08:56 <span class="fa fa-check-circle"></span>
                          </div>
                          <div class="chat-text">
                            Hi, Russell
                            <br /> I need more information about Developer Plan.
                          </div>
                          <div class="chat-avatar">
                            <img
                              src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                              alt="Retail Admin"
                            />
                            <div class="chat-name">Sam</div>
                          </div>
                        </li> */}
                        {/* <li class="chat-left">
                                    <div class="chat-avatar">
                                        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin">
                                        <div class="chat-name">Russell</div>
                                    </div>
                                    <div class="chat-text">Are we meeting today?
                                        <br>Project has been already finished and I have results to show you.</div>
                                    <div class="chat-hour">08:57 <span class="fa fa-check-circle"></span></div>
                                </li>
                                <li class="chat-right">
                                    <div class="chat-hour">08:59 <span class="fa fa-check-circle"></span></div>
                                    <div class="chat-text">Well I am not sure.
                                        <br>I have results to show you.</div>
                                    <div class="chat-avatar">
                                        <img src="https://www.bootdey.com/img/Content/avatar/avatar5.png" alt="Retail Admin">
                                        <div class="chat-name">Joyse</div>
                                    </div>
                                </li>
                                <li class="chat-left">
                                    <div class="chat-avatar">
                                        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin">
                                        <div class="chat-name">Russell</div>
                                    </div>
                                    <div class="chat-text">The rest of the team is not here yet.
                                        <br>Maybe in an hour or so?</div>
                                    <div class="chat-hour">08:57 <span class="fa fa-check-circle"></span></div>
                                </li> */}
                        {/* <li class="chat-right">
                          <div class="chat-hour">
                            08:59 <span class="fa fa-check-circle"></span>
                          </div>
                          <div class="chat-text">
                            Have you faced any problems at the last phase of the
                            project?
                          </div>
                          <div class="chat-avatar">
                            <img
                              src="https://www.bootdey.com/img/Content/avatar/avatar4.png"
                              alt="Retail Admin"
                            />
                            <div class="chat-name">Jin</div>
                          </div>
                        </li>
                        <li class="chat-left">
                          <div class="chat-avatar">
                            <img
                              src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                              alt="Retail Admin"
                            />
                            <div class="chat-name">Russell</div>
                          </div>
                          <div class="chat-text">
                            Actually everything was fine.
                            <br />
                            I'm very excited to show this to our team.
                          </div>
                          <div class="chat-hour">
                            07:00 <span class="fa fa-check-circle"></span>
                          </div>
                        </li> */}
                      </ul>
                      <div class="input-group mt-3 mb-0">
                        <textarea
                          class="form-control"
                          rows="3"
                          value={content}
                          placeholder="Type your message here..."
                          onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <div class="input-group-btn">
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={handleSend}
                          >
                            <i class="fa fa-send"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatUi;
