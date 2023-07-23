import React, { useEffect, useState } from "react";
import {
  useGetClientsQuery,
  useCreateClientMutation,
} from "../slices/clientApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useGetTicketsQuery } from "../slices/ticketSlice";

const Clients = () => {
  const [createClient, { isLoading: createLoading, error: createError }] =
    useCreateClientMutation();

  const {
    data: tickets,
    isLoading: ticketsLoading,
    error: ticketsError,
    refetch: refetchTickets,
  } = useGetTicketsQuery();

  const [clientName, setClientName] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetClientsQuery();
  useEffect(() => {
    refetch();
    refetchTickets();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (clientName === "" || clientNumber === "") {
      toast.error("Please enter a name and a number");
    } else {
      try {
        const res = await createClient({
          clientName: clientName,
          clientNumber: clientNumber,
          clientEmail: clientEmail,
        }).unwrap();
        toast.success("Client created");
        navigate(`/clients/${res._id}`);
        refetch();
        refetchTickets();
      } catch (error) {
        toast.error(error);
      }
    }
  };


  return (
    <div>
      <FormContainer>
        {/* Open the modal using ID.showModal() method */}
        <button
          className="btn btn-secondary mb-5 mt-5"
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

      {createLoading && <Spinner />}

      {isLoading ? (
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
              <th>Total Tickets</th>
              <th>Open</th>
              <th>Closed</th>
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
                <td>
                  <div className="badge badge-warning badge-outline">
                    {item.ticketsIsClosed}
                  </div>
                </td>
                <td>
                  <Link
                    to={`/clients/${item._id}`}
                    className="btn btn-sm btn-secondary w-fit"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Clients;
