import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
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
import { useUser } from "./contexts/UserContext";

function App() {
  return (
    <main>
      <ToastContainer position="top-center" autoClose={800} draggable />
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

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
