import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaInfo, FaCheck, FaExclamation } from "react-icons/fa";

import React from "react";

const Message = ({ error, info, warning, success }) => {
  return (
    <>
      {error && (
        <div>
          <div className="alert w-fit mx-auto alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="capitalize">
              {error?.error ||
                (error?.status === 500
                  ? "Server 500"
                  : error?.status === 404
                  ? "Not Found 404"
                  : error)}
            </span>
          </div>
        </div>
      )}

      {info && (
        <div>
          <div className="alert w-fit mx-auto flex items-center alert-info">
            <FaInfo />
            <span className="capitalize">{info}</span>
          </div>
        </div>
      )}

      {warning && (
        <div>
          <div className="alert w-fit mx-auto flex items-center alert-warning">
            <FaExclamation />
            <span className="capitalize">{warning}</span>
          </div>
        </div>
      )}

      {success && (
        <div>
          <div className="alert w-fit mx-auto flex items-center alert-success">
            <FaCheck />
            <span className="capitalize">{success}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
