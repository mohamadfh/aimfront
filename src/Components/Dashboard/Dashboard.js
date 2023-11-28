import {
    useState,
    lazy,
    Suspense,
    useContext,
    useEffect,
    useCallback,
} from "react";
import {useNavigate, useParams} from "react-router-dom";

import Spinner from "../Spinner/Spinner";
import AccessIdentifier from "./AccessIdentifier";

import {authContext} from "../../App";
import useGet from "../../Hooks/useGet";
//
// const Profile = lazy(() => import("../Profile/Profile"));
// const DashboardHeader = lazy(() => import("./Dashboard.header"));
// const Footer = lazy(() => import("../Footer/Footer"));
const Dashboard = ({children}) => {
    const navigator = useNavigate();
    const nav = useCallback((url) => navigator(url), [navigator]);

    const {data} = useGet(
        "http://localhost:8000/auth/whoami/role/",
        sessionStorage.getItem("token")
    );


    const {auth} = useContext(authContext);

    useEffect(() => {
        if (!auth) {
            nav("/");
        }

    }, [auth, nav]);

    return (
        <>
            <Suspense fallback={<Spinner color={{c: "white"}}/>}>
                <AccessIdentifier role={data.role} children={children}></AccessIdentifier>
            </Suspense>
        </>
    );
};

export default Dashboard;
