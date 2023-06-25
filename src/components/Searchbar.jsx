import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const timerId = useRef();
  const {
    userState: { users },
  } = useUser();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [showUser, setShowUser] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const SearchedData = (users, searchInput) => {
    if (searchInput === "") {
      return [];
    } else {
      let searched = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.username.toLowerCase().includes(searchInput.toLowerCase())
      );
      return searched;
    }
  };
  console.log(SearchedData.length, "sl");
  console.log(SearchedData(users, searchInput));
  console.log(searchInput);
  useEffect(() => {
    timerId.current = setTimeout(() => {
      setSearchResult(SearchedData(users, searchInput));
    }, 200);
  }, [searchInput]);

  return (
    <div>
      {" "}
      <input
        type="search"
        onFocus={() => setShowUser(true)}
        // onBlur={() => setShowUser(false)}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        placeholder="Search for User......"
        className=" border-solid border-2 border-primary rounded-2xl py-2 px-8 outline-none text-center"
      />
      {showUser && (
        <div className="flex w-full flex-col gap-4   max-h-96 z-50 overflow-y-auto rounded-lg   bg-white ">
          {searchInput !== "" && searchResult.length === 0 ? (
            <p className="text-center text-lg m-1 font-medium  ">
              No user to show
            </p>
          ) : (
            searchResult.map((user) => {
              return (
                <div
                  key={user._id}
                  onClick={() => {
                    navigate(`/profile/${user.username}`);
                    setShowUser(false);
                    setSearchInput("");
                  }}
                  className="px-4 pt-3 last-of-type:pb-3 cursor-pointer  flex gap-4 items-center"
                >
                  <img
                    className="w-14  h-14 object-cover rounded-full"
                    src={user.avatarUrl}
                    alt="user pic"
                  />
                  <p className="font-medium text-lg text-txt-secondary-color dark:text-dark-txt-secondary-color">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
