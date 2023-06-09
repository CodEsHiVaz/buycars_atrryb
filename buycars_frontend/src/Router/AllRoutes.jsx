import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/Protected Route/ProtectedRoute '
import CreateInventry from '../pages/Inventry/CreateInventry'
import UpdateInventry from '../pages/Inventry/UpdateInventry'
import ViewInventries from '../pages/Inventry/ViewInventries'
import InventryList from '../pages/Inventry/InventryList'
import Dashboard from '../pages/Dashboard/Dashboard'
import GetOem from '../pages/Oem/GetOem'
import GetSingleOems from '../pages/Oem/GetSingleOems'
import SignIn from '../pages/Auth/Signin'
import SignUp from '../pages/Auth/Signup'

function AllRoutes() {
  return (
  
    <>
       <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/inventry"
          element={
            <ProtectedRoute>
              <InventryList />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/inventry/:id"
          element={
            <ProtectedRoute>
              <ViewInventries />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/inventry/update/:id"
          element={
            <ProtectedRoute>
              <UpdateInventry />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/inventry/create"
          element={
            <ProtectedRoute>
              <CreateInventry />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/oem"
          element={
            <ProtectedRoute>
              <GetOem />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/oem/create"
          element={
            <ProtectedRoute>
              <GetOem />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/oem/:id"
          element={
            <ProtectedRoute>
              <GetSingleOems />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    
    </>
  )
}

export default AllRoutes