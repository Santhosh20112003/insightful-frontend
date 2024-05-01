import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Blog from "./components/unauthenticated/Blog";
import Home from "./components/unauthenticated/Home";
import Edit from "./components/authenticated/blog/Edit";
import Search from "./components/unauthenticated/search/Search";
import AuthHome from "./components/authenticated/Home/Home";
import Structure from "./components/authenticated/Structure/Structure";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Story from "./components/unauthenticated/story/Story";
import { UserAuthContextProvider } from "./utils/Context/UserAthenticationContext";
import { MetaDetails } from "./utils/Context/MetaDetails";
import TermsOfUse from "./components/unauthenticated/TOU/TermsOfUse";
import GetAccess from "./components/auth/GetAccess";
import AuthSearch from "./components/authenticated/Search/Search";
import NewBlog from "./components/authenticated/blog/NewBlog";
import Profile from "./components/authenticated/Profile/Profile";
import Posts from "./components/authenticated/Profile/components/Posts";
import Comrades from "./components/authenticated/Profile/components/Comrades";
import BookMarks from "./components/authenticated/Profile/components/BookMarks";
import ComradeProfile from "./components/unauthenticated/comradeprofile/ComradeProfile";
import ComradeAuthProfile from "./components/authenticated/ComradeProfile/ComradeProfile";
import TagSearch from "./components/unauthenticated/tagsearch/TagSearch";
import MoreTags from "./components/unauthenticated/tagsearch/components/MoreTags";

function App() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <MetaDetails>
          <Routes>
            <Route path="" element={<Navigate to="home" />} />
            <Route path="*" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="blogs/:blogid" element={<Blog />} />
            <Route path="tag/:topic" element={<TagSearch />} />
            <Route path="tags/more" element={<MoreTags />} />
            <Route path="search" element={<Search />} />
            <Route path="terms-of-use" element={<TermsOfUse />} />
            <Route path="story" element={<Story />} />
            <Route path="getaccess" element={<GetAccess />} />
            <Route path="comradeprofile/:useridentity" element={<ComradeProfile />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Structure />
                </ProtectedRoute>
              }
            >
              <Route
                path="search"
                element={
                  <ProtectedRoute>
                    <AuthSearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="comradeprofile/:useridentity"
                element={
                  <ProtectedRoute>
                    <ComradeAuthProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              >
                <Route path="" element={<Navigate to="posts" />} />
                <Route path="*" element={<Navigate to="posts" />} />
                <Route
                  path="posts"
                  element={
                    <ProtectedRoute>
                      <Posts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="comrades"
                  element={
                    <ProtectedRoute>
                      <Comrades />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="bookmarks"
                  element={
                    <ProtectedRoute>
                      <BookMarks />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="home"
                element={
                  <ProtectedRoute>
                    <AuthHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="blog/new"
                element={
                  <ProtectedRoute>
                    <NewBlog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="blog/edit/:blogid"
                element={
                  <ProtectedRoute>
                    <Edit />
                  </ProtectedRoute>
                }
              />
              <Route path="" element={<Navigate to="home" />} />
              <Route path="*" element={<Navigate to="home" />} />
            </Route>
          </Routes>
        </MetaDetails>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
