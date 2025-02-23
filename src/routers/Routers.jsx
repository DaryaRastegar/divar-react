// import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from 'services/users'

import PageNotFound from 'pages/404'
import AdminPage from 'pages/AdminPage'
import AuthPage from 'pages/AuthPage'
import Dashboard from 'pages/Dashboard'
import HomePage from 'pages/HomePage'
import Loader from 'src/components/moduls/Loader'

function Routers() {
  const navigate = useNavigate()
  const { data, isLoading, isSuccess } = useQuery(['profile'], getProfile)

  // useEffect(() => {
  //   if(isSuccess) {
  //     if(data && data?.data?.role === "ADMIN") {
  //       navigate("/admin");
  //     }else if(data) {
  //       navigate("/dashboard");
  //     }
  //   }
  // }, [data])

  if (isLoading) return <Loader />
  console.log({ data, isLoading })

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/admin"
        element={
          data && data?.data?.role === 'ADMIN' ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/dashboard"
        element={data ? <Dashboard /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default Routers
