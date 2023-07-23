import React, { useState, useEffect } from "react";
import {
  useDeleteClientMutation,
  useCreateClientMutation,
  useUpdateClientMutation,
  useGetClientQuery,
  useGetClientsQuery,
} from "../../slices/clientApiSlice";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";

const ClientList = () => {
  const { data, isLoading, error, refetch } = useGetClientsQuery();
  const [clientName, setClientName] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [createClient, { isLoading: createLoading, error: createError }] =
    useCreateClientMutation();

  const [deleteClient, { isLoading: deleteLoading }] =
    useDeleteClientMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteClient(id);
        refetch();
        toast.success("Client Deleted");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (clientName === "" || clientNumber === "") {
      toast.error("Please enter a name and a number");
    } else {
      try {
        await createClient({
          clientName: clientName,
          clientNumber: clientNumber,
          clientEmail: clientEmail,
        }).unwrap();
        toast.success("Client created");
        refetch();
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [data]);

  return (
    <div>
      <FormContainer>
        {/* Open the modal using ID.showModal() method */}
        <button
          className="btn btn-secondary mb-5 mt-5 float-right"
          onClick={() => window.my_modal_2.showModal()}
        >
          Add New Client
        </button>
        <dialog id="my_modal_2" className="modal">
          <form method="dialog" className="modal-box" onSubmit={submitHandler}>
            <h1 className="flex justify-center mb-5 stat-value text-primary underline">
              New Client
            </h1>

            <div className="w-fit mx-auto">
              <input
                className="input input-primary mb-5"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name"
                type="text"
              />
            </div>
            <div className="w-fit mx-auto">
              <input
                className="input input-primary mb-5"
                id="clientEmail"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="Client Email (optional)"
                type="text"
              />
            </div>
            <div className="w-fit mx-auto">
              <input
                className="input input-primary mb-5"
                id="clientNumber"
                value={clientNumber}
                onChange={(e) => setClientNumber(e.target.value)}
                placeholder="Client Cell Number"
                type="text"
              />
            </div>
            <div className="w-fit mx-auto">
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop"></form>
        </dialog>
      </FormContainer>

      {isLoading || deleteLoading ? (
        <Spinner />
      ) : error ? (
        <Message error={error?.data.error || error?.message} />
      ) : (
        <table className="table bg-base-200 table-xs lg:table-xs  md:table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Tickets</th>
              <th>Open</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.clientName}</td>
                <td>{item.clientNumber}</td>
                <td>{item.clientEmail}</td>
                <td>
                  <div className="badge">
                    {item.tickets.length === 1 ? (
                      <> {item.tickets.length} Ticket</>
                    ) : (
                      <>{item.tickets.length} Tickets</>
                    )}
                  </div>
                </td>
                <td>
                  <div className="badge badge-success badge-outline">
                    {item.ticketsIsOpen}
                  </div>
                </td>
                
                <td></td>
                <td>
                  <Link
                    to={`/clients/${item._id}`}
                    className="btn btn-sm btn-secondary w-fit"
                  >
                    View
                  </Link>
                </td>
                <td>
                  <Link to={`/admin/client/${item._id}/edit`}>
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
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientList;
