import React, { useEffect, useState } from "react";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Meta from "../../components/Meta";
import FormContainer from "../../components/FormContainer";

const UserList = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading: registerLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate(redirect);
    }
    refetch();
  }, [userInfo, redirect, navigate]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User Deleted");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

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
      } catch (err) {
        toast.error(err?.data.message || err?.error);
      }
    }
  };

  return (
    <div>
      <div>
      <h1 className="card-title mb-10">Users</h1>
      </div>

      <Meta title={`Admin: Users List`} />
      <div className="overflow-x-auto">
        <div>
          <FormContainer>
            {/* Open the modal using ID.showModal() method */}
            <button
              className="btn btn-primary btn mb-5 mt-5 float-right"
              onClick={() => window.my_modal_1.showModal()}
            >
              Add a new User
            </button>
            <dialog id="my_modal_1" className="modal">
              <form
                onSubmit={submitHandler}
                method="dialog"
                className="modal-box"
              >
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
              <form method="dialog" className="modal-backdrop"></form>
            </dialog>
          </FormContainer>
        </div>

        <table className="table bg-base-200 table-xs lg:table-xs  md:table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Created</th>
              <th>Admin</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading || loadingDelete ? (
              <Spinner />
            ) : error ? (
              <Message error={error} />
            ) : (
              <>
                {users.map((item) => (
                  <tr key={item._id}>
                    <th>1</th>
                    <td>
                      {item.isAdmin ? (
                        <span className="text-primary">{item.name}</span>
                      ) : (
                        <>{item.name}</>
                      )}
                    </td>
                    <td>
                      {item.isAdmin ? (
                        <span className="text-primary">{item.email}</span>
                      ) : (
                        <>{item.email}</>
                      )}
                    </td>
                    <td>
                      {item.isAdmin ? (
                        <span className="text-primary">{item.createdAt}</span>
                      ) : (
                        <>{item.createdAt}</>
                      )}
                    </td>
                    <td>
                      {item.isAdmin ? (
                        <span className="text-primary">Admin</span>
                      ) : (
                        <span>Mortal</span>
                      )}
                    </td>
                    <td>
                      <Link to={`/admin/user/${item._id}/edit`}>
                        <FaEdit className="text-success" />
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => deleteHandler(item._id)}>
                        <FaTrash className="text-error" />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
