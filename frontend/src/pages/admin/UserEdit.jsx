import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import Meta from "../../components/Meta";
import { useSelector } from "react-redux";

const UserEdit = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/users-list");
    } catch (error) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div>
      <Meta title={`Admin: Edit ${user?.name}`} />
      <Link className="btn btn-sm btn-primary" to={`/admin/users-list`}>
        Back
      </Link>

      <FormContainer>
        <div className="mt-3">
          <h1>Edit User</h1>
        </div>

        {loadingUpdate && <Spinner />}
        {isLoading ? (
          <>
            <Spinner />
          </>
        ) : error ? (
          <>
            <Message error={error?.message || error?.data?.message} />
          </>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-2">
              <div className="flex flex-col mb-2">
                <label className="stat-title" htmlFor="">
                  Name
                </label>
                <input
                  className="input input-primary w-4/5"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col mb-2">
                <label className="stat-title" htmlFor="">
                  Email
                </label>
                <input
                  className="input input-primary w-4/5"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col mb-2">
                <label className="stat-title">Administrator</label>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  className="checkbox checkbox-primary"
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-sm btn-secondary mt-5">
                Update User
              </button>
            </div>
          </form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEdit;
