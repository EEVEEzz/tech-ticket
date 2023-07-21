import React from "react";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Meta from "../../components/Meta";

const UserList = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] =
    useDeleteUserMutation();

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

  return (
    <div>
      <div>
        <h1>Users List:</h1>
      </div>

      <Meta title={`Admin: Users List | Southern Indica`} />
      <div className="overflow-x-auto">
        <table className="table table-xs md:table-md lg:table-lg xl:table-lg">
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
                  <tr>
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
