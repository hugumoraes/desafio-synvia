/* ---------- External ---------- */
import { createBrowserRouter } from 'react-router-dom';

/* ---------- Components ---------- */
import { private_routes } from '_routes/private';
import { public_routes } from '_routes/public';

/* ----------
 * Create authentication system and change here
 * ---------- */
const check_auth = (): boolean => false;

const router = createBrowserRouter([
  check_auth() ? private_routes() : {},
  public_routes(),
]);

export { router };
