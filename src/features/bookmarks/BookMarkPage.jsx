import React from "react";

import DisplayPost from "../home/DisplayPost";
import { usePost } from "../../contexts/PostContext";

function BookMarkPage() {
  const {
    postState: { bookmarks },
  } = usePost();
  return (
    <div className="flex flex-col  justify-items-center w-3/5	gap-4">
      <div className="flex justify-center font-semibold text-primary text-xl">
        My BookMarks
      </div>
      {bookmarks.length > 0 ? (
        bookmarks.map((post) => <DisplayPost post={post} key={post?._id} />)
      ) : (
        <p className=" flex justify-center font-bold py-20">No BookMarks yet</p>
      )}
    </div>
  );
}

export default BookMarkPage;
