import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetClientDetailsQuery,
  useUpdateClientMutation,
} from "../../slices/clientApiSlice";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import Meta from "../../components/Meta";

const ClientEdit = () => {
  const { id: clientId } = useParams();
  const navigate = useNavigate();
  const {
    data: client,
    isLoading,
    error,
    refetch,
  } = useGetClientDetailsQuery(clientId);
  const [updateClient, { isLoading: loadingUpdate }] = useUpdateClientMutation();

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientNumber, setClientNumber] = useState("");

  useEffect(() => {
    if (client) {
      setClientName(client.clientName);
      setClientEmail(client.clientEmail);
      setClientNumber(client.clientNumber);
    }
  }, [client]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateClient({ clientId, clientName, clientEmail, clientNumber });
      toast.success("Client updated successfully");
      refetch();
      navigate("/clients");
    } catch (error) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div>
      <Meta title={`Admin: Edit ${client?.clientName}`} />
      <Link className="btn btn-sm btn-primary" to={`/admin/users-list`}>
        Back
      </Link>

      <FormContainer>
        <div className="mt-3">
          <h1>Edit Client</h1>
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
                  Client Name
                </label>
                <input
                  className="input input-primary w-4/5"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              <div className="flex flex-col mb-2">
                <label className="stat-title" htmlFor="">
                  Client Email
                </label>
                <input
                  className="input input-primary w-4/5"
                  type="text"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col mb-2">
                <label className="stat-title" htmlFor="">
                  Client Number
                </label>
                <input
                  className="input input-primary w-4/5"
                  type="text"
                  value={clientNumber}
                  onChange={(e) => setClientNumber(e.target.value)}
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

export default ClientEdit;
