import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout";
import Home from "../views/Home";
import NoMatch from "../views/NoMatch";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
        ]
    },
    {
        path: "*",
        element: <NoMatch />,
    },
]);

export default router;