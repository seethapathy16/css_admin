
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home';
import Billing from './Billing'
import Enquiry from './Enquiry'
import Admission from './Admission'
import Courses from './Courses'
import Admin from './Admin'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/billing",
    element: <Billing />
  },
  {
    path: "/enquiry",
    element: <Enquiry />
  },
  {
    path: "/admission",
    element: <Admission />
  },
  {
    path: '/courses',
    element: <Courses />
  },
  {
    path: '/admin',
    element: <Admin />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
