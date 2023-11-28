import {lazy} from "react";
import {useRoutes} from "react-router-dom";
import NotFound from "./Components/NotFound/NotFound";

const Login = lazy(() =>
    import("./Components/Login/Login")
);
const Home = lazy(() =>
    import("./Components/Home/Home")
);
const Background = lazy(() =>
    import("./Components/Background/Background")
);
const Dashboard = lazy(() =>
    import("./Components/Dashboard/Dashboard")
);
const GeneralReport = lazy(() =>
    import("./Components/GeneralReport/GeneralReport")
);
const Profile = lazy(() =>
    import("./Components/Profile/Profile")
);
const  Questionaire = lazy(() =>
    import("./Components/Questionaire/Questionaire")
);
const BlockReport = lazy(() =>
    import("./Components/BlockReport/BlockReport")
);
const AboutPage = lazy(() =>
    import("./Components/AboutPage/AboutPage")
);
const ManagerProfile = lazy(() =>
    import("./Components/ManagerProfile/ManagerProfile")
);
const AdminManage = lazy(() =>
    import("./Components/AdminManage/AdminManage")
);
const AdminReports = lazy(() =>
    import("./Components/AdminReports/AdminReports")
);
const RouteGuard = lazy(() =>
    import("./Components/RouteGuard/RouteGuard"));

const Router = () => {
    return useRoutes([
        {path: "/", element: <Background><Home/></Background>},
        {path: "/login", element: <Background><Login/></Background>},
        {path: "/about", element: <Background><AboutPage/></Background>},

        {
            path: "/dashboard",
            element: <Dashboard></Dashboard>,

        },
        {
            path: "/dashboard/general",
            element:
                <RouteGuard allowedRoles={['manager']}>
                <Dashboard>
                    <GeneralReport/>
                </Dashboard>
                </RouteGuard>,

        },

        {
            path: "/dashboard/questionaire",

            element:
                <RouteGuard allowedRoles={['employee']}>
                <Dashboard>
                    <Questionaire/>
            </Dashboard>
                </RouteGuard>,
        },

        {
            path: "/dashboard/profile",
            element:
                <RouteGuard allowedRoles={['manager']}>
                <Dashboard>
                    <ManagerProfile>
                    </ManagerProfile>
            </Dashboard>
                </RouteGuard>,
        },
        {
            path: "/dashboard/block",

            element:
                <RouteGuard allowedRoles={['manager']}>

                <Dashboard><BlockReport></BlockReport>
            </Dashboard>
                </RouteGuard>,
        },
        {
            path: "/dashboard/manage",
            element:
                <RouteGuard allowedRoles={['admin']}>

                <Dashboard><AdminManage/>
            </Dashboard>
                </RouteGuard>,
        },
        {
            path: "/dashboard/reports",
            element:
                <RouteGuard allowedRoles={['admin']}>
                <Dashboard><AdminReports/>
            </Dashboard>
                </RouteGuard>,
        },
        {
            path: "/*",
            element: <Background><NotFound/></Background>,
        },
    ]);
};
export default Router;