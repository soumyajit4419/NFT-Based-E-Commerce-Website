import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [user, setuser] = useState({});
  const [loading, setloading] = useState(true);

  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/user", {
  //       params: { token: token },
  //     })
  //     .then((res) => {
  //       setloading(false);
  //       setuser(res.data.user);
  //     })
  //     .catch((err) => {
  //       setloading(false);
  //       toast.error(`${err.response.data.message}`, {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     });
  // }, [token]);

  if (loading) {
    return (
      <div style={{ height: "80vh" }}>
        <center>
          <div class="fa-3x mt-5 pt-5">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </center>
      </div>
    );
  } else {
    return (
      <div className="card no-hover text-center" style={{ marginTop: "160px" }}>
        <div className="image-over">
          <img className="card-img-top" src={user.profile_image} alt="" />
        </div>
        {/* Card Caption */}
        <div className="card-caption col-12 p-0">
          {/* Card Body */}
          <div className="card-body mt-4">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h5 className="mb-3">{user.name}</h5>
            </div>
            <h5 className="mb-3">{user.email}</h5>
            <h5 className="mb-3">{user.wallet_address}</h5>
            <div
              className="input-group"
              style={{ display: "flex", justifyContent: "center" }}
            ></div>
          </div>
        </div>

        <a href={`/artist/`}>Edit Profile</a>
      </div>
    );
  }
};

export default UserProfile;
