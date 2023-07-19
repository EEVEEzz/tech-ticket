import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.warning("Passwords don't match");
    } else {
      try {
        const res = await register({
          email,
          password,
          name,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data.message || err?.error);
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message error={error?.data.error || error?.message} />
      ) : (
        <FormContainer>
          <div className="container hero  opacity-80">
            {/* <img className='rounded-xl h-full w-full' src={`https://www.mitchamcouncil.sa.gov.au/__data/assets/image/0017/1192130/Kntting-and-Crochet.jpg`} /> */}

            <form onSubmit={submitHandler} className="form form-control mb-10">
              <h1 className="flex justify-center mb-5 stat-value text-primary underline">
                Register
              </h1>

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

              <div className="flex flex-col gap-5">
                <button
                  type="submit"
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Register
                </button>

                <div className="flex gap-5 items-center">
                  <p className="font-bold text-info">
                    Already have an account?
                  </p>
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    className="btn btn-sm btn-outline btn-secondary"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </FormContainer>
      )}
    </div>
  );
};

export default Register;
