import { Link, Outlet, useNavigation } from "react-router-dom";
import Header from "./basicLayout/Header";
import Footer from "./basicLayout/Footer";

const Layout = () => {
    let navigation = useNavigation();

    return (
        <div>
            <Header />
            <hr />

            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;