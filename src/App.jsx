import { useState, useEffect } from 'react'
import './App.css'
import { postsloader } from './components/AllPosts'

//Router
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from "react-router-dom"

//Components
import Home from './components/Home'
import Post from './components/AllPosts'
import Login from './components/Login'
import MyPosts from './components/MyPosts'
import MyMessage from './components/MyMessage'
import Rootlayout from './components/RootLayout'
import { CreatePosts } from './components/CreatePosts'
import NotFound from './components/NotFound'
import Register from './components/Register'
import AllmyPost from './components/AllmyPost'
import EditPost from './components/EditPost'
import ReplyMessage from './components/ReplyMessage'

function App() {

  // Manage Token & Username

  // initial value of token is retrieved from localStorage
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken || '';
  });

  const [username, setUsername] = useState(() => {
    const storedUsername = localStorage.getItem('username');
    return storedUsername || '';
  });

  // store the token in localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  // define route

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>

        <Route path="/" element={<Rootlayout />} >
          <Route path="home" element={<Home />} />
          <Route path="posts" element={<Post />} loader={postsloader} />
          <Route path="register" element={<Register setToken={setToken} />} />
          <Route path="login" element={<Login token={token} setToken={setToken} />} />
          <Route path="add" element={<CreatePosts token={token} />} />
          <Route path='profile' element={<AllmyPost token={token} />} />
          <Route path='my-posts' element={<MyPosts token={token} />}>
            {/* nested on /my-posts/edit/:postId */}
            <Route path='edit/:postId' element={<EditPost />} />
          </Route>
          <Route path="message" element={<MyMessage token={token} />} >
            {/* nested on /message/reply/:id */}
            <Route path="reply/:id" element={<ReplyMessage token={token} />}> </Route>
          </Route>
          {/* any other route */}
          <Route path="*" element={<NotFound />} />
        </Route>

      </Route>

    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
