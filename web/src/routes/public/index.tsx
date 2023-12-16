/* ---------- External ---------- */
import { Navigate, type RouteObject } from 'react-router-dom';

/* ---------- Components ---------- */
import { Error } from '_components/Error';
import { Home } from '_components/Home';

/* ---------- Constants ---------- */
const public_routes_array: RouteObject[] = [
  {
    path: '/login',
    element: <Home />,
    errorElement: <Error />,
  },

  { path: '*', element: <Navigate to="/login" replace /> },
];

export const public_routes = (): RouteObject => {
  return {
    element: <></>,
    children: public_routes_array,
  };
};
