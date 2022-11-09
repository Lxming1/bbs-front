// 路由懒加载
import { useRoutes } from 'react-router-dom'
import { lazy } from 'react'
// const Moment = lazy(() => import('../pages/moment').then((module) => ({ default: module.Moment })))
// const Home = lazy(() => import('../pages'))
// const Login = lazy(() => import('../pages/login'))
// const Register = lazy(() => import('../pages/register'))
// const Moment = lazy(() => import('../pages/moment'))
// const Profile = lazy(() => import('../pages/profile'))
import Home from '../pages'
import Login from '../pages/login'
import Register from '../pages/register'
import Profile from '../pages/profile'
import Moment from '../pages/moment'

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Moment />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]

const App = () => useRoutes(routes)

export default App
