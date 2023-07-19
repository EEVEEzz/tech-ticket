import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TypeWriter from "./TypeWriter";
import Message from "./Message";
import { toast } from "react-toastify";

const SearchBox = () => {
  const { keyword: urlKeyword } = useParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    } else {
      toast.warning("Please enter something");
      setKeyword("");
    }
  };

  useEffect(() => {}, []);
  return (
    <form className="flex mb-5 justify-center" onSubmit={submitHandler}>
      <input
        type="text"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search keyword"
        className="input input-primary w-full max-w-xs"
      />
      <button className="btn btn-primary">search</button>
    </form>
  );
};

export default SearchBox;
