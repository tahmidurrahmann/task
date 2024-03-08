import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home/Home";
import Edit from "../pages/Home/Edit/Edit";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        errorElement : <Error />,
        children : [
            {
                path : "/",
                element : <Home />
            },
            {
                path : "/edit/:id",
                element : <Edit />,
                loader : ({params}) => fetch(`http://localhost:5000/task/${params.id}`),
            }
        ]
    }
])

export default router;