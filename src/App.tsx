import React from 'react';
import HomeComponent from './shared/components/HomeComponent/HomeComponent';
import LoginComponent from './shared/components/LoginComponent/LoginComponent';
import PostsComponent from './shared/components/PostsComponent/PostsComponent';
import PostComponent from './shared/components/PostComponent/PostComponent';
import ProfileComponent from './shared/components/ProfileComponent/ProfileComponent';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import UserContext from './contexts/UserContext/UserContext'

interface IUser {
  token: string,
  id: string,
  name: string,
  createdAt: string
}

const defaultUserState: IUser = {
  token: '',
  id: '',
  name: '',
  createdAt: ''
};

function App() {
  const [user, setUser] = React.useState<IUser>(defaultUserState);

  const updateUser = (newValue: IUser) => {
    if (setUser)
    {
      setUser(newValue);
    }
  };
  
  const existingToken = localStorage.getItem('token') ?? '';
  const existingUserId = localStorage.getItem('userId') ?? '';

  return (
    <UserContext.Provider
        value={{
            id: existingUserId,
            token: existingToken,
            createdAt: user.createdAt,
            name: user.name,
            setUser: updateUser
        }}
        >
        <BrowserRouter>
          <nav>
            <Link className='nav-link' to="/">Home Page</Link>
            <Link className='nav-link' to="/posts">Posts</Link>
            <Link className='nav-link' to="/profile">Profile</Link>
            <Link className='nav-link' to="/login">Login</Link>
          </nav>

          <Routes>
            <Route path='/' element={<HomeComponent></HomeComponent>}></Route>
            <Route path='/posts' element={<PostsComponent></PostsComponent>}></Route>
            <Route path='/profile' element={<ProfileComponent></ProfileComponent>}></Route>
            <Route path='/login' element={<LoginComponent></LoginComponent>}></Route>
            <Route path="/posts">
              <Route path=":id" element={<PostComponent/>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
