// 路由懒加载
import { useRoutes } from 'react-router-dom'
import { lazy } from 'react'
// const Moment = lazy(() => import('../pages/moment').then((module) => ({ default: module.Moment })))
// const Home = lazy(() => import('../pages'))
// const Login = lazy(() => import('../pages/login'))
// const Register = lazy(() => import('../pages/register'))
// const Moment = lazy(() => import('../pages/moment'))
// const Profile = lazy(() => import('../pages/profile'))
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Profile from '../pages/people'
import Home from '../pages/home'
import Moments from '../pages/home/left/moment'
import NotFount from '../pages/notFount'
import Forget from '../pages/auth/forget'
import Edit from '../pages/people/edit'
import New from '../pages/home/left/moment/new'
import PeopleMoment from '../pages/people/main/left/moments'
import Collection from '../pages/people/main/left/collects'
import Follow from '../pages/people/main/left/follow'
import CollectDetail from '../pages/people/main/left/collects/detail'
import Notices from '../pages/notices'
import NoticesItem from '../pages/notices/items'

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      { path: '/', element: <Moments /> },
      { path: '/:plateId', element: <Moments /> },
    ],
  },
  {
    path: '/profile/edit',
    element: <Edit />,
  },
  {
    path: '/people/:uid',
    element: <Profile />,
    children: [
      {
        path: '/people/:uid/',
        element: <PeopleMoment />,
      },
      {
        path: '/people/:uid/collections',
        element: <Collection />,
      },
      {
        path: '/people/:uid/following',
        element: <Follow type="following" />,
      },
      {
        path: '/people/:uid/followers',
        element: <Follow type="followers" />,
      },
    ],
  },
  {
    path: '/collection/:collectId',
    element: <CollectDetail />,
  },
  {
    path: '/moment/new',
    element: <New />,
  },
  {
    path: '/notices',
    element: <Notices />,
    children: [
      {
        path: '/notices/reply',
        element: <NoticesItem type="reply" />,
      },
      {
        path: '/notices/praise',
        element: <NoticesItem type="praise" />,
      },
      {
        path: '/notices/follow',
        element: <NoticesItem type="follow" />,
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
    path: '/forget',
    element: <Forget />,
  },
  {
    path: '*',
    element: <NotFount />,
  },
]

const App = () => useRoutes(routes)

export default App
