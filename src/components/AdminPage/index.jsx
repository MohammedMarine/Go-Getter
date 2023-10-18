import Header from "../Header";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
    return (
        <><Header /><Outlet /></>
    );
};

export default AdminPage;