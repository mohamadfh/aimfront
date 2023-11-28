import {lazy} from "react";
const ManagerPanel = lazy(() =>
    import("../ManagerPanel/ManagerPanel")
);
const EmployeePanel = lazy(() =>
    import("../EmployeePanel/EmployeePanel")
);
const AdminPanel = lazy(() =>
    import("../AdminPanel/AdminPanel")
);
const AccessIdentifier = ({ role , children}) => {

    if (role === "manager") {
        return <ManagerPanel> {children} </ManagerPanel>;
    } else if (role === "admin") {
        return <AdminPanel> {children} </AdminPanel>;
    } else if (role === "employee") {
        return <EmployeePanel> {children} </EmployeePanel>;
    } else {
        return <>login first !</>;
    }
};
export default AccessIdentifier;
