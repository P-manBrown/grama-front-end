import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { MyPage } from '../components/MyPage'
import { Page404 } from '../components/Page404'
import { PageTodo } from '../components/PageTodo'
import { Record } from '../components/Record'
import { SignIn } from "../components/SignIn"
import { SignUp } from "../components/SignUp"
import { getCurrentUser } from "../lib/api/Auth"
import { AuthContext } from '../providers/AuthProvider';

export const Router = () => {
  const { loading, setLoading, isSignedIn, setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
        console.log(setIsSignedIn)
        console.log(res?.data.isLogin)
      } else {
        console.log('no current user');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() =>{
    handleGetCurrentUser();
  }, [setCurrentUser])

  const PrivateRoute = ( {children} ) => {
    if (!loading) {
      console.log(isSignedIn)
      if (isSignedIn) {
        return children ;
      } else {
        console.log(isSignedIn)
        return <Navigate  to='/sign_in' />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign_in" element={<SignIn />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="mypage" element={<PrivateRoute><Header /><MyPage /></PrivateRoute>} />
        <Route path="todo" element={<PrivateRoute><Header /><PageTodo /></PrivateRoute>} />
        <Route path="record" element={<PrivateRoute><Header /><Record /></PrivateRoute>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}
