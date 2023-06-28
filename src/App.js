import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./features/home/HomePage";
import ExplorePage from "./features/explore/ExplorePage";
import BookMarkPage from "./features/bookmarks/BookMarkPage";
import LikesPostPage from "./features/likedposts/LikesPostPage";
import Login from "./features/authentication/Login";
import Signup from "./features/authentication/Signup";
import Profile from "./features/profile/Profile";
import RequiresAuth from "./components/RequiresAuth";
import SinglePostPage from "./features/SinglePost/SinglePostPage";

function App() {
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <RequiresAuth>
              <RootLayout />
            </RequiresAuth>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/bookmarks" element={<BookMarkPage />} />
          <Route path="/likedposts" element={<LikesPostPage />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/post/:postId" element={<SinglePostPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </main>
  );
}

export default App;
