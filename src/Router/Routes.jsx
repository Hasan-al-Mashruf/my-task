import { createBrowserRouter} from "react-router-dom";
import Main from "../layout/Main";
import Dashboard from "../Pages/Dashboard/Dashboard";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {path: "/", element: <Dashboard/>},
            {path: "/signIn", element: <SignIn />},
            {path: "/signUp", element: <SignUp />}
        ]
    },
]);

export default router;