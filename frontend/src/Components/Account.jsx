import React from "react";
import "./Account.css";

const Account = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="account-container">

      <div className="account-card">

        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h2>{user?.name}</h2>
          <p className="email">{user?.email}</p>
        </div>

        {/* Info Section */}
        <div className="account-info">

          <div className="info-item">
            <span>Name</span>
            <p>{user?.name}</p>
          </div>

          <div className="info-item">
            <span>Email</span>
            <p>{user?.email}</p>
          </div>

          <div className="info-item">
            <span>Account Type</span>
            <p>User</p>
          </div>

        </div>

        {/* Actions */}
        <div className="account-actions">
          <button className="btn edit">Edit Profile</button>
          <button className="btn logout">Logout</button>
        </div>

      </div>

    </div>
  );
};

export default Account;