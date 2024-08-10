import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import ChatPage from "../pages/ChatPage";
import OfferAgent from "../pages/OfferAgent";
import { Navigate } from 'react-router-dom';

import {  createBrowserRouter } from 'react-router-dom';
import { AuthRoute } from "../components/AuthRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/home" replace />,
        index: true
    },
    {
        path: '/home',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/offeragent',
        element: <AuthRoute><OfferAgent/></AuthRoute>
    },
    {
        path: '/chat',
        element: <ChatPage/>
    }
])

export default router;