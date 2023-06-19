import React from "react";

import DisplayPost from "../home/DisplayPost";

function LikesPostPage() {
  return (
    <div className="flex flex-col  justify-items-center w-3/5	gap-4">
      <div className="flex justify-center font-semibold text-primary text-xl">
        Liked Posts
      </div>
      <DisplayPost />
      <DisplayPost />
      <DisplayPost />
      <DisplayPost />
      <DisplayPost />
    </div>
  );
}

export default LikesPostPage;
