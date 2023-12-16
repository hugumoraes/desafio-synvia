/* ---------- External ---------- */
import { Navigate, type RouteObject } from 'react-router-dom';

/* ---------- Components ---------- */
import { Error } from '_components/Error';
import { Home } from '_components/Home';

/* ---------- Constants ---------- */
const private_routes_array: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },

  { path: '*', element: <Navigate to="/" replace /> },
];

export const private_routes = (): RouteObject => {
  return {
    element: <></>,
    children: private_routes_array,
  };
};
