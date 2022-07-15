import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { storage } from "../../firebase";
import Modal from "react-modal";
import AvatarEditor from "react-avatar-editor";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    border: "none",
    background: "rgb(255 255 255 / 0%)",
    overflow: "hidden"
  },
  overlay: {
    backgroundColor: "#2a2a2ac9"
  }
};

const Signup = () => {
  const [loading, setLoading] = useState("");

  const history = useHistory();
  const [profileImage, setProfileImage] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [password, setPassword] = useState("");
  const [wallet_address, setWallet_address] = useState("");
  const [email, setEmail] = useState("");
  const [scale, setScale] = useState(1);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    document.getElementById("inputGroupFile01").value = "";
    setImage("");
  }

  let editor = "";
  const setEditorRef = (ed) => {
    editor = ed;
  };

  const uploadImage = (val, blob) => {
    setImageLoading(true);
    const uploadTask = storage.ref(`user_images/${val.name}`).put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("user_images")
          .child(val.name)
          .getDownloadURL()
          .then((url) => {
            setProfileImage(url);
            // console.log(url, "this is image url");
            setImageLoading(false);
          });
      }
    );
  };

  const handelImage = (image) => {
    if (setEditorRef) {
      const canvasScaled = editor.getImage();
      // const croppedImg = canvasScaled.toDataURL();
      canvasScaled.toBlob(function (blob) {
        uploadImage(image, blob);
      }, "image/png");
      setIsOpen(false);
    }
  };

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  const handelFile = (value) => {
    if (value) {
      setImage(value);
      openModal();
    }
  };

  const createNewAccount = async () => {
    setLoading(true);

    if (
      profileImage === "" ||
      profileName === "" ||
      email === "" ||
      password === "" ||
      wallet_address === ""
    ) {
      toast.error(
        "Any of the fields cannot be empty! Please fill all the fields!",
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
      setLoading(false);
      return;
    }

    try {
      var res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/register",
        data: {
          name: profileName,
          email: email,
          profile_image: profileImage,
          password: password,
          wallet_address: wallet_address
        }
      });
      localStorage.setItem("token", res.data.token);
      // localStorage.setItem("decoded_values", res.data.decoded_values);
      toast.success("User Registered Successfully!", {
        position: toast.POSITION.TOP_RIGHT
      });
      history.push("/");
    } catch (err) {
      toast.error(`${err.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT
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
          <div className="container" style = {{ marginTop: "35px" }}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-7">
                <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                  <div className="intro text-center">
                    <h3 className="mt-3 mb-0">Register Yourselves</h3>
                  </div>
                </div>

                <form
                  className="item-form card no-hover"
                  style={{ marginTop: "-35px" }}
                >
                  <div className="row">
                    <div className="col-12">
                      <div className=" form-group">
                        <div className="custom-file" style={{ zIndex: 0 }}>
                          <input
                            type="file"
                            name="myImage"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            required
                            onChange={(e) => handelFile(e.target.files[0])}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            {image ? image.name : "Profile Image"}
                          </label>
                        </div>
                      </div>
                    </div>
                    {imageLoading ? (
                      <div
                        className="fa-3x"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto"
                        }}
                      >
                        <i className="fas fa-spinner fa-spin"></i>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Name"
                          required
                          onChange={(e) => setProfileName(e.target.value)}
                        />
                      </div>
                    </div>
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
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          placeholder="Wallet Address"
                          required
                          onChange={(e) => setWallet_address(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div>
                        <button
                          className="btn w-100 mt-3 mt-sm-4"
                          style={{ zIndex: 0 }}
                          onClick={() => createNewAccount()}
                        >
                          Create Account
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div class="modal-dialog modal-dialog-centered" id="profilePic">
          <div class="modal-content">
            <div class="modal-body justify-content-center flex-column ">
              <AvatarEditor
                ref={setEditorRef}
                image={image}
                width={250}
                height={250}
                border={0}
                scale={parseFloat(scale)}
                rotate={0}
              />
              <input
                name="scale"
                type="range"
                onChange={handleScale}
                min="1"
                max="2"
                step="0.01"
                defaultValue="1"
                style={{ maxWidth: "250px" }}
              />
            </div>
            <div class="modal-footer justify-content-center ">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => handelImage(image)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Signup;
