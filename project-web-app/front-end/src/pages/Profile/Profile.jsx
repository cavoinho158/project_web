import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { proFile } from "./profiless";
import "./profiles.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Profile() {
    useEffect(() => {
        proFile();
      }, []);

    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios
          .get("http://localhost:8081")
          .then((res) => {
            if (res.data === "Success") {
              setAuth(true);
            } else {
              setAuth(false);
              setMessage(res.data.err);
            }
          })
          .catch((err) => console.log(err));
      }, []);
    
      const handleDelete = () => {
        axios
          .get("http://localhost:8081/logout")
          .then((res) => {
            setUserData({
              firstName: "",
              lastName: "",
              phoneNumber: "",
              birthDay: "",
              gender: "",
              address: "",
              email: "",
              password: "",
            });
            setAuth(false);
            navigate("/login"); // Chuyển hướng sau khi đăng xuất nếu cần
          })
          .catch((err) => console.log(err));
      };
    
      const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDay: "",
        gender: "",
        address: "",
        email: "",
        password: "",
      });

      useEffect(() => {
        axios
          .get("http://localhost:8081/userdata")
          .then((res) => {
            if (res.data.error) {
              // Handle error response from server
              console.log(res.data.error);
            } else {
              // Update user data state if successful
              setUserData(res.data);
              console.log(res);
            }
          })
          .catch((err) => {
            // Handle network error
            console.log(err);
          });
      }, []);
    
      const [errors, setErrors] = useState({});
    
      const handleInput = (event) => {
        setUserData((prev) => ({
          ...prev,
          [event.target.name]: [event.target.value],
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        axios
          .post("http://localhost:8081/updateprofile", userData)
    
          .catch((err) => console.log(err));
      };
    
      //Update avatar
      const [file, setFile] = useState();
    
      const handleFile = (e) => {
        // Lấy ra file được chọn
        const selectedFile = e.target.files[0];
        // Kiểm tra xem file có tồn tại không
        if (selectedFile) {
          // Lấy ra đường dẫn của file
          const filePath = URL.createObjectURL(selectedFile);
          // Log đường dẫn của file
          console.log("Đường dẫn của file:", filePath);
          // Lưu file vào state hoặc thực hiện các thao tác khác
          setFile(selectedFile);
        }
      };
      const handleUpLoad = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("imgAvatar", file);
        formData.append("email", userData.email);
        axios
          .post("http://localhost:8081/upload", formData)
          .then((res) => {
            console.log(res.data);
            if (res.data.Status === "Success") {
              console.log("Succeed");
            } else {
              console.log("Failed");
            }
          })
          .catch((err) => console.log(err));
      };
      const [data, setData] = useState([]);
    
      useEffect(() => {
        axios
          .get("http://localhost:8081/uploadAvatar")
          .then((res) => {
            setData(res.data[0]);
          })
          .catch((err) => console.log(err));
      }, []);
    
      const handleClick = (event) => {
        event.preventDefault();
        handleSubmit(event);
        handleUpLoad(event);
        window.location.reload();
      };

    return (
        <div className="Profilepage">
            <div className="body-Profile">
                <header className="header">
                    <a href="??" className="logo">User.</a>

                    <nav className="navbar">
                        <a href="??" className="active"> Information </a>
                        <a href="/">Home</a>
                    </nav>
                </header>

                <section className="information container-fluid">
                    <div className="row d-flex justify-content-between">
                        <div className="col-lg-6 col-md-12">
                            <div className="information-content">
                                <div className="information-content2">
                                    <div className="image">
                                        <img
                                            src={
                                                data.imgAvatar
                                                ? `http://localhost:8081/images/` + data.imgAvatar
                                                : "default-avatar-url"
                                            }
                                            id="photo"
                                            alt=""/>
                                        <input type="file" id="file" onChange={handleFile} />
                                        <label for="file" htmlFor="file" id="upLoadbtn">
                                            <i className="bx bx-camera"></i>
                                        </label>
                                    </div>
                                    <h1>Hi, customers</h1>
                                    <h3>Welcome your information</h3>

                                    <div className="wrapper">
                                        <form action="">
                                            <div className="two-form">
                                                <div className="input-box">
                                                    <input
                                                        type="text"
                                                        required
                                                        onChange={handleInput}
                                                        value={userData.firstName}/>
                                                    <i className="bx bxs-user"></i>
                                                    <label>First Name</label>
                                                </div>
                                                <div className="input-box">
                                                    <input
                                                        type="text"
                                                        required
                                                        onChange={handleInput}
                                                        value={userData.lastName}/>
                                                    <i className="bx bxs-user"></i>
                                                    <label>Last Name</label>
                                                </div>
                                            </div>

                                            <div className="input-box">
                                                <input
                                                    type="text"
                                                    required
                                                    onChange={handleInput}
                                                    value={userData.phoneNumber}/>
                                                <i className="bx bxs-lock-alt"></i>
                                                <label>Phone Number</label>
                                            </div>

                                            <div className="two-forms">
                                                <div className="input-box">
                                                    <input
                                                        type="text"
                                                        className="birthDay"
                                                        required
                                                        onChange={handleInput}
                                                        value={userData.birthDay}/>
                                                    <i className="bx bxs-cake"></i>
                                                </div>
                                                <div className="input-box">
                                                    <input
                                                        type="text"
                                                        required
                                                        onChange={handleInput}
                                                        value={userData.gender}/>
                                                    <i className="bx bx-male-female"></i>
                                                    <label>Male/Female</label>
                                                </div>
                                            </div>

                                            <div className="input-box">
                                                <input
                                                type="text"
                                                required
                                                onChange={handleInput}
                                                value={userData.address}/>
                                                <i className="bx bxs-home"></i>
                                                <label>Address</label>
                                            </div>

                                            <div className="input-box">
                                                <input
                                                type="text"
                                                required
                                                onChange={handleInput}
                                                value={userData.email}
                                                />
                                                <i className="bx bxs-envelope"></i>
                                                <label>Email</label>
                                            </div>

                                            <div className="input-box">
                                                <input
                                                type="password"
                                                id="password"
                                                required
                                                onChange={handleInput}
                                                value={userData.email}/>
                                                <i className="bx bxs-lock-alt" id="eyeicon"></i>
                                                <label>Password</label>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="btn-box">
                                        <a href="/profile" onClick={handleClick}>Edit your profile{" "}</a>
                                        <a href="/login" onClick={handleDelete}>Remove account</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12 pt-3">                    
                            <div className="body-calendar">
                                <div className="container-calendar">
                                <div className="left">
                                    <div className="calendar">
                                    <div className="month">
                                        {/* <i className="fas fa-angle-left prev"></i> */}
                                        <FontAwesomeIcon icon={faAngleLeft} className="prev" />
                                        <div className="date">december 2015</div>
                                        {/* <i className="fas fa-angle-right next"></i> */}
                                        <FontAwesomeIcon icon={faAngleRight} className="next" />
                                    </div>
                                    <div className="weekdays">
                                        <div>Sun</div>
                                        <div>Mon</div>
                                        <div>Tue</div>
                                        <div>Wed</div>
                                        <div>Thu</div>
                                        <div>Fri</div>
                                        <div>Sat</div>
                                    </div>
                                    <div className="days"></div>
                                    <div className="goto-today">
                                        <div className="goto">
                                        <input
                                            type="text"
                                            placeholder="mm/yyyy"
                                            className="date-input"
                                        />
                                        <button className="goto-btn">Go</button>
                                        </div>
                                        <button className="today-btn">Today</button>
                                    </div>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="today-date">
                                    <div className="event-day">wed</div>
                                    <div className="event-date">12th december 2022</div>
                                    </div>
                                    <div className="events"></div>
                                    <div className="add-event-wrapper">
                                    <div className="add-event-header">
                                        <div className="title">Add Event</div>
                                        {/* <i className="fas fa-times close"></i> */}
                                        <FontAwesomeIcon icon={faTimes} className="close" />
                                    </div>
                                    <div className="add-event-body">
                                        <div className="add-event-input">
                                        <input
                                            type="text"
                                            placeholder="Event Name"
                                            className="event-name"
                                        />
                                        </div>
                                        <div className="add-event-input">
                                        <input
                                            type="text"
                                            placeholder="Event Time From"
                                            className="event-time-from"
                                        />
                                        </div>
                                        <div className="add-event-input">
                                        <input
                                            type="text"
                                            placeholder="Event Time To"
                                            className="event-time-to"
                                        />
                                        </div>
                                    </div>
                                    <div className="add-event-footer">
                                        <button className="add-event-btn">Add Event</button>
                                    </div>
                                    </div>
                                </div>
                                <button className="add-event">
                                    {/* <i className="fas fa-plus"></i> */}
                                    <FontAwesomeIcon icon={faPlus} className="plus" />
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;