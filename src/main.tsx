import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import {Login} from './components/login/Login.tsx';
import DashboardPage from './pages/DashboardPage.js';
import {AddNewRole} from './components/roles/addRole.tsx'
import { AddNewEmployee } from './components/employees/AddNewEmployee.tsx';
const router=createBrowserRouter([
  {
    path:'/',
    element:<App><DashboardPage /></App>,
    errorElement:<div>😮😮5😮</div>
  },
  {
    path:'/add_employee',
    element:<App><AddNewEmployee /></App>,
    errorElement:<div>😮😮1😮</div>
  },
  {
    path:'/add_role',
    element:<App><AddNewRole /></App>,
    errorElement:<div>😮😮4😮</div>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
