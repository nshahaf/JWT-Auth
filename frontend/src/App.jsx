import reactLogo from './assets/icons/react.svg' // ./ for src directory
import viteLogo from '/vite.svg' // / for public directory
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

import NotFoundPage from './pages/NotFoundPage';
import ServerErrorPage from './pages/ServerErrorPage';

import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { ToastContainer } from 'react-toastify';
import { Loader } from 'lucide-react'

function App() {
  const { isAuthencitated, checkAuth, isInAuthProcess } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);


  if (isInAuthProcess)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    )

  return (
    <>

      <div className="app h-screen min-w-96 ">
        <Header></Header>
        <Routes>
          <Route path="/" element={isAuthencitated() ? <HomePage /> : <Navigate to='/login' />} />

          <Route path="/signup" element={isAuthencitated() ? <Navigate to='/' /> : <SignupPage />} />
          <Route path="/login" element={isAuthencitated() ? <Navigate to='/' /> : <LoginPage />} />

          <Route path="/settings" element={isAuthencitated() ? <SettingsPage /> : <Navigate to='/login' />} />
          <Route path="/profile" element={isAuthencitated() ? <ProfilePage /> : <Navigate to='/login' />} />
          <Route path="/team" element={<HomePage />} />
          <Route path="/contacts" element={<HomePage />} />

          <Route path="/server-error" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer autoClose={2500} />
    </>
  )
}


export default App