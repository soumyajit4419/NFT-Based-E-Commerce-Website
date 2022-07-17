import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState("");
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginaccount = async () => {
    setLoading(true);

    if (email === "" || password === "") {
      toast.error(
        "Any of the fields cannot be empty! Please fill all the fields!",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setLoading(false);
      return;
    }

    try {
      var res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/login",
        data: {
          email: email,
          password: password,
        },
      });
      // console.log(res);
      localStorage.setItem("token", res.data.token);

      toast.success("You Logged In Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        window.location = "/";
      }, 1000);
    } catch (err) {
      toast.error(`${err.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
      return;
    }
  };

  return (
    <section className="author-area">
      {loading ? (
        <div style={{ height: "60vh" }}>
          <center>
            <div class="fa-3x mt-5 pt-5">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
          </center>
        </div>
      ) : (
        <>
          <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-7 col-lg-6">
                <div class="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                  <div class="intro-content">
                    <span>Get Started</span>
                    <h3 class="mt-3 mb-0">Create Profile</h3>
                  </div>
                </div>

                {/* Item Form */}
                <form
                  className="item-form card-1 no-hover"
                  style={{ marginTop: "45px" }}
                >
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="email"
                          className="form-control"
                          name="price"
                          placeholder="Email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="password"
                          className="form-control"
                          name="price"
                          placeholder="Password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn w-100 mt-3 mt-sm-4"
                        style={{ zIndex: 0 }}
                        onClick={() => loginaccount()}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Login;
