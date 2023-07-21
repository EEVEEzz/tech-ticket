import React, { useState } from "react";
import {
  useCreateNoteMutation,
  useGetTicketByIdQuery,
  useUpdateToPaidMutation,
  useUpdateToCollectedMutation,
  useUpdateToCompletedMutation,
} from "../slices/ticketSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Ticket = () => {
  const { id: ticketId } = useParams();
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const [createNote, { isLoading: noteLoading }] =
    useCreateNoteMutation(ticketId);

  const [updateToCollected, { isLoading: collectedLoading }] =
    useUpdateToCollectedMutation(ticketId);

  const [updateToCompleted, { isLoading: completedLoading }] =
    useUpdateToCompletedMutation(ticketId);

  const [updateToPaid, { isLoading: paidLoading }] =
    useUpdateToPaidMutation(ticketId);

  const { data, isLoading, error, refetch } = useGetTicketByIdQuery(ticketId);

  console.log(data);

  const collectHandler = async (e) => {
    e.preventDefault();
    try {
      await updateToCollected(ticketId).unwrap();
      refetch();
      toast.success("Ticket Collected");
    } catch (err) {
      toast.error(err?.data?.message || err?.message);
    }
  };

  const completeHandler = async (e) => {
    try {
      await updateToCompleted(ticketId).unwrap();
      refetch();
      toast.success("Ticket Completed");
    } catch (err) {
      toast.error(err?.data?.message || err?.message);
    }
  };

  const paidHandler = async (e) => {
    try {
      await updateToPaid(ticketId).unwrap();
      refetch();
      toast.success("Ticket Paid");
    } catch (err) {
      toast.error(err?.data?.message || err?.message);
    }
  };

  const submitNoteHandler = async (e) => {
    e.preventDefault();
    if (comment === "") {
      toast.error("Please add a comment");
    } else {
      await createNote({
        ticketId,
        comment,
      }).unwrap();
      setComment("");
      refetch();
      toast.success("Note added");
    }
  };

  return (
    <div>
      {isLoading ||
      noteLoading ||
      collectedLoading ||
      completedLoading ||
      paidLoading ? (
        <Spinner />
      ) : error ? (
        <Message error={error?.message || error?.data.message} />
      ) : (
        <>
          <div>
            <div className="card bg-base-200 mb-3 mt-3">
              <div className="card-body">
                <div className="flex gap-5">
                  {data.isOpen && data.inProgress ? (
                    <>
                      <div className="badge badge-accent badge-outline">
                        in progress
                      </div>
                    </>
                  ) : !data.inProgress && data.isOpen ? (
                    <>
                      <div className="badge badge-success badge-outline">
                        new/open
                      </div>
                    </>
                  ) : data.isClosed ? (
                    <>
                      <div className="badge badge-warning badge-outline">
                        closed
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="badge badge badge-outline"></div>
                    </>
                  )}
                  {data.paymentMethod !== "No Payment" ? (
                    <>
                      {data.isPaid ? (
                        <div className="badge badge-success badge-outline">
                          Paid on {new Date(data.paidAt).toLocaleDateString()}
                        </div>
                      ) : (
                        <>
                          <div className="badge badge-error badge-outline">
                            Unpaid - R{data.totalPrice}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="badge badge-error badge-outline">
                      No Payment
                    </div>
                  )}
                </div>
                <div className="flex justify-between bg-base-100 p-3 rounded-lg">
                  <div>
                    <div className="stat-title">Client Name:</div>
                    <h3>{data.clientName}</h3>
                  </div>

                  <div>
                    <div className="stat-title">Ticket ID:</div>
                    <h3>{data._id}</h3>
                  </div>

                  <div>
                    <div className="stat-title">Client Contact:</div>
                    <h3>{data.clientNumber}</h3>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="grid grid-cols-2 gap-3 ">
                    <div>
                      <div className="stat-title">Item Name</div>
                      <div className="stat-value">{data.itemName}</div>
                    </div>
                    <div>
                      <div className="stat-title">Created</div>
                      <div className="stat-value">
                        {new Date(data.createdAt).toDateString()}
                      </div>
                    </div>

                    <div>
                      <div className="stat-title">Model</div>
                      <div className="stat-value">{data.model}</div>
                    </div>
                    <div>
                      <div className="stat-title">Serial</div>
                      <div className="stat-value">{data.serial}</div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-5">
                    <div className="flex flex-col w-fit gap-1">
                      {userInfo.isAdmin &&
                        data.paymentMethod !== "No Payment" && (
                          <button
                            disabled={data.isPaid}
                            onClick={paidHandler}
                            className="btn btn-success btn-sm"
                          >
                            Mark as Paid
                          </button>
                        )}
                      <button
                        disabled={data.isCompleted}
                        onClick={completeHandler}
                        className="btn btn-success btn-sm"
                      >
                        Mark as Completed
                      </button>
                      {data.isCompleted && (
                        <>
                          <button
                            disabled={data.isCollected}
                            onClick={collectHandler}
                            className="btn btn-success btn-sm"
                          >
                            Mark as Collected
                          </button>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      {data.isPaid && (
                        <Message
                          success={`Paid on ${new Date(
                            data.paidAt
                          ).toLocaleDateString()}`}
                        />
                      )}
                      {data.isCompleted && (
                        <Message
                          success={`completed on ${new Date(
                            data.completedAt
                          ).toLocaleDateString()} by ${data.completedBy}`}
                        />
                      )}
                      {data.isCollected && (
                        <Message
                          success={`collected on ${new Date(
                            data.collectedAt
                          ).toLocaleDateString()}`}
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="textarea">
                      <div>Fault Description:</div>
                      {data.fault}
                    </div>
                  </div>

                  <FormContainer>
                    {/* Open the modal using ID.showModal() method */}
                    <button
                      className="btn btn-secondary mt-5"
                      onClick={() => window.my_modal_2.showModal()}
                    >
                      Add a Note
                    </button>
                    <dialog id="my_modal_2" className="modal">
                      <form
                        onSubmit={submitNoteHandler}
                        method="dialog"
                        className="modal-box"
                      >
                        <h3 className="font-bold text-sm">Comment</h3>
                        <textarea
                          name="comment"
                          id={comment}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="textarea textarea-ghost w-full mt-2 mb-2 py-4"
                          placeholder="add your comment"
                        ></textarea>
                        <button
                          className="btn btn-sm float-right"
                          type="submit"
                        >
                          Add Note
                        </button>
                      </form>
                      <form method="dialog" className="modal-backdrop"></form>
                    </dialog>
                  </FormContainer>

                  <div className="mt-5">
                    {data.notes.length > 0 &&
                      data.notes.map((item) => (
                        <div className="textarea mb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center">
                              <div className="badge badge-lg badge-secondary font-bold">
                                {item.name}
                              </div>
                            </div>
                            <div>
                              {new Date(item.createdAt).toLocaleDateString()}{" "}
                              {new Date(item.createdAt).toLocaleTimeString()}
                            </div>
                          </div>

                          <div className="mt-2">{item.comment}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Ticket;
