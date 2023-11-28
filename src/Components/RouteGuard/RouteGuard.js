// RouteGuard.js
import React, {useCallback, useContext, useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import useGet from "../../Hooks/useGet";
import {authContext} from "../../App"; // Import your auth context

const RouteGuard = ({ allowedRoles, children }) => {
    const navigator = useNavigate();
    const nav = useCallback((url) => navigator(url), [navigator]);
    const {data} = useGet(
        "http://localhost:8000/auth/whoami/role/",
        sessionStorage.getItem("token")
    );

    const {auth} = useContext(authContext);
    // useEffect(() => {
    //     if (!auth) {
    //         nav("/");
    //     }
    //
    // }, [auth, nav]);


    useEffect(() => {
        const checkAccess = async () => {
            if (!auth) {
                nav("/");
            } else {
                // Wait for the data to be available
                await data;
                // Check if data and data.role are defined
                if (data && data.role && !allowedRoles.includes(data.role)) {
                    nav("/");
                }
            }
        };

        checkAccess();
    }, [auth, data, nav, allowedRoles]);

    if (data && data.role && allowedRoles.includes(data.role)) {
        return children;
    } else {
        return null;
    }
};

export default RouteGuard;
