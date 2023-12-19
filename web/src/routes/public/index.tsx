/* ---------- External ---------- */
import { Navigate, type RouteObject } from 'react-router-dom';

/* ---------- Components ---------- */
import { Error } from '_components/Error';
import { Login } from '_components/Login';
import { Register } from '_components/Register';

/* ---------- Constants ---------- */
const public_routes_array: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
  { path: '*', element: <Navigate to="/login" replace /> },
];

export const public_routes = (): RouteObject => {
  return {
    children: public_routes_array,
  };
};
