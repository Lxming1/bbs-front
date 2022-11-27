// 路由懒加载
import { useRoutes } from 'react-router-dom'
import { lazy } from 'react'
// const Moment = lazy(() => import('../pages/moment').then((module) => ({ default: module.Moment })))
// const Home = lazy(() => import('../pages'))
// const Login = lazy(() => import('../pages/login'))
// const Register = lazy(() => import('../pages/register'))
// const Moment = lazy(() => import('../pages/moment'))
// const Profile = lazy(() => import('../pages/profile'))
import Main from '@/pages'
import Login from '@/pages/login'
import Register from '@/pages/register'
import Profile from '@/pages/profile'
import Home from '@/pages/home'
import Moments from '@/pages/home/left/moment'
import NotFount from '@/pages/notFount'

const routes = [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          { path: '/', element: <Moments /> },
          { path: '/:plateId', element: <Moments /> },
        ],
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
  {
    path: '*',
    element: <NotFount />,
  },
]

const App = () => useRoutes(routes)

export default App
