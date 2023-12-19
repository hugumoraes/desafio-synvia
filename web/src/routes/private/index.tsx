/* ---------- External ---------- */
import { Navigate, type RouteObject } from 'react-router-dom';

/* ---------- Components ---------- */
import { Error } from '_components/Error';
import { Home } from '_components/Home';
import { Tasks } from '_components/Tasks';
import { Tags } from '_components/Tags';

import { ProtectedRoute } from '_components/Auth/ProtectedRoute';

/* ---------- Constants ---------- */
const private_routes_array: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
        errorElement: <Error />,
      },
      {
        path: '/tags',
        element: <Tags />,
        errorElement: <Error />,
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

export const private_routes = (): RouteObject => {
  return {
    children: private_routes_array,
  };
};
