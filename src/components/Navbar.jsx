import { useNavigate } from "react-router-dom";

const Navbar = () => {
    let navigate = useNavigate();

    function handleLogout() {
        sessionStorage.clear();
        navigate("/");
    }

    return (
        <nav className="border-b border-gray-300 sticky top-0 w-full bg-white">
            <ul className="sm:container sm:mx-auto capitalize flex items-center justify-between py-3 px-2.5 sm:px-5  font-bold tracking-tight text-gray-900">
                <li className="text-lg/9">User Management</li>
                <li
                    onClick={handleLogout}
                    className="rounded-md  bg-indigo-600 px-5 py-2 text-md font-semibold capitalize text-white shadow-xs hover:cursor-pointer hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    logout
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
