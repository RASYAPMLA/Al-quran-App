import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Tafsir from "../pages/Tafsir";
import JuzRange from "../pages/JuzRange";
import Juz from "../pages/Juz";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/surat/:id",
                element: <Detail />,
            },
            {
                path: "/tafsir/:id",
                element: <Tafsir />,
            },
            {
                path: "/juz-range/:range",
                element: <JuzRange />,
            },
            {
                path: "/juz/:id",
                element: <Juz />,
            },
        ],
    },
]);

export default router;