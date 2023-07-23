import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import { setCredentials } from "../slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updatedProfile, { isLoading: loadingUpdate }] = useProfileMutation();


  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }

  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      try {
        const res = await updatedProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile Updated");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    }
  };

  return (
    <>
      <div className="flex">
        <Meta title={`Profile`} />
        <h1 className="card-title mb-10">Profile</h1>
      </div>
      <div>
        <div className="grid grid-cols-1">
          <div className="w-fit mx-auto">
            <form onSubmit={submitHandler} className="form form-control">
              <div className="input outline outline-primary outline-1 mb-4">
                <input
                  placeholder="Name"
                  className="input input-ghost focus:outline-0"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input outline outline-primary outline-1 mb-4">
                <input
                  placeholder="Email"
                  className="input input-ghost focus:outline-0"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input outline outline-primary outline-1 mb-4 focus:outline-secondary flex items-center gap-2">
                <input
                  placeholder="Password"
                  className="input input-ghost focus:outline-0"
                  type={isVisible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isVisible ? (
                  <>
                    <FaEye
                      onClick={() => setIsVisible(!isVisible)}
                      className="inline text-primary"
                    />
                  </>
                ) : (
                  <>
                    <FaEyeSlash
                      onClick={() => setIsVisible(!isVisible)}
                      className="inline text-primary"
                    />
                  </>
                )}
              </div>

              <div className="input outline outline-primary outline-1 mb-4">
                <input
                  placeholder="Confirm Password"
                  className="input input-ghost focus:outline-0"
                  type={isConfirmVisible ? "text" : "password"}
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {!isConfirmVisible ? (
                  <>
                    <FaEye
                      onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                      className="inline text-primary"
                    />
                  </>
                ) : (
                  <>
                    <FaEyeSlash
                      onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                      className="inline text-primary"
                    />
                  </>
                )}
              </div>

              {loadingUpdate && <Spinner />}

              <div>
                <button className="btn btn-primary btn-sm btn-outline">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
