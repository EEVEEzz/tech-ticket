import React, { useState } from "react";
import { useCreateClientMutation } from "../slices/clientApiSlice";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Message from "../components/Message";

const NewClient = () => {
  const [createClient, { isLoading, error }] = useCreateClientMutation();

  const [clientName, setClientName] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const navigate = useNavigate();

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
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message error={error?.data.error || error?.message} />
      ) : (
        <FormContainer>
          <form onSubmit={submitHandler}>
            <div>
              <input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name"
                type="text"
              />
            </div>
            <div>
              <input
                id="clientEmail"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="Client Email (optional)"
                type="text"
              />
            </div>
            <div>
              <input
                id="clientNumber"
                value={clientNumber}
                onChange={(e) => setClientNumber(e.target.value)}
                placeholder="Client Cell Number"
                type="text"
              />
            </div>
            <div>
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
        </FormContainer>
      )}
    </>
  );
};

export default NewClient;
