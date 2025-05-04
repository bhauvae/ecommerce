import React from "react";
import styles from "./UserInfo.module.css";
// @ts-ignore
import pic from "../../assets/defaultProfilePic.png";
const UserInfo = ({ userInfo }) => {
  return (
    <div className="row mb-4">
      <div className={`col-md-3 py-3 card ${styles.textCenter}`}>
        <img
          src={pic}
          alt="User Profile"
          className={`img-fluid rounded-circle mb-2 mx-auto ${styles.profileImage}`}
        />
        <h4>{userInfo.username}</h4>
        <p className="text-muted">{userInfo.email}</p>
        <button
          className="btn mt-2"
          style={{ backgroundColor: "#6050DC", color: "white" }}
        >
          Edit Profile
        </button>
      </div>
      <div className="col-md-9" style={{ paddingRight: "0" }}>
        <div className="card">
          <div
            className="card-header"
            style={{ backgroundColor: "#6050dc", color: "white" }}
          >
            <h5>Account Overlay</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Full Name:</strong>
                  {` ${userInfo.first_name} ${userInfo.last_name}`}
                </p>
                <p>
                  <strong>Email: </strong>
                  {userInfo.email}
                </p>
                <p>
                  <strong>Phone: </strong>
                  {userInfo.phone_number}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Username: </strong>
                  {userInfo.username}
                </p>
                <p>
                  <strong>City: </strong>
                  {userInfo.city}
                </p>
                <p>
                  <strong>Country: </strong>
                  {userInfo.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
