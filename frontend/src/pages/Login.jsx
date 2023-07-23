import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Spinner from '../components/Spinner'
import Meta from "../components/Meta";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data.message || err?.error);
    }
  };

  return (
    <div>
      <Meta title={`Login`} />
      <FormContainer>
        <div className="hero opacity-80">
          <form onSubmit={submitHandler} className="form form-control mb-10">
            {isLoading ? (
                <Spinner />
            ) : (
              <>
                <h1 className="flex justify-center mb-5 stat-value text-primary underline">
                  Login
                </h1>

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

                <div className="flex flex-col gap-5">
                  <button className="btn btn-sm btn-outline btn-primary">
                    Login
                  </button>

                    <p className="text-warning font-bold text-xs text-center">Can't Login? Speak to your Administrator</p>
                </div>
              </>
            )}
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default Login;
