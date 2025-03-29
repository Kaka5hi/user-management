import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import UserList from "../components/UserList";
import Pagination from "../components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

let BASE_URL = "https://reqres.in/";

const Dashboard = () => {
    let navigate = useNavigate();
    const [dataFetching, setDataFetching] = useState(true);

    // state to store fetched data
    const [data, setData] = useState([]);

    // state to store current page
    const [currentPage, setCurrentPage] = useState(1);

    // search state
    const [searchInput, setSearchInput] = useState("");

    // function to update data of the user
    async function updateUserData(newData, userId) {
        try {
            const response = await axios.put(
                `${BASE_URL}api/users/${userId}`,
                newData
            );
            if (response.status === 200) {
                const updatedDataList = data?.data?.map((item) => {
                    return item.id === userId ? newData : item;
                });
                setData((prev) => {
                    return {
                        ...prev,
                        data: updatedDataList,
                    };
                });
                toast("User data updated!");
            }
        } catch (error) {
            toast("something went wrong!");
        }
    }

    // function to delete user data from list
    async function deleteUserData(userId) {
        try {
            const response = await axios.delete(
                `${BASE_URL}api/users/${userId}`
            );
            if (response.status === 204) {
                const updatedDataList = data?.data?.filter(
                    (item) => item.id !== userId
                );
                setData((prev) => {
                    return {
                        ...prev,
                        data: updatedDataList,
                    };
                });
                toast("User deleted");
            }
        } catch (error) {
            toast("something went wrong!");
        }
    }

    // function to fetch the data from the API
    async function getData() {
        if (data.length > 0) {
            setData([]);
        }
        const response = await axios.get(
            `${BASE_URL}api/users?page=${currentPage}`
        );

        setData(response.data);
        setDataFetching(false);
    }

    const filteredUsers = useMemo(() => {
        return data?.data?.filter((user) => {
            const userName = user?.first_name + " " + user?.last_name;
            if (userName.toLowerCase().includes(searchInput.toLowerCase())) {
                return user;
            }
        });
    }, [data, searchInput]);

    // calling the getData function
    // scrolling the view to top
    useEffect(() => {
        let userToken = JSON.parse(localStorage.getItem("token"));
        if (userToken) {
            getData();
        } else {
            navigate("/");
        }

        return () => {
            window.scroll({ top: 0, behavior: "smooth" });
        };
    }, [currentPage]);

    if (dataFetching) {
        return (
            <>
                <Navbar />
                <div className="space-y-5 p-2">
                    <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Welcome to the Dashboard
                    </h1>
                    <Spinner />
                </div>
            </>
        );
    } else {
        return (
            <>
                <Navbar />
                <div className="space-y-5 p-2">
                    <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Welcome to the Dashboard
                    </h1>

                    <div>
                        <input
                            type="text"
                            className="block w-full customBreakpoint:w-sm md:w-xl  mx-auto rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            placeholder="Search User.."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>

                    {filteredUsers.length === 0 && (
                        <p className="my-40 text-center text-xl text-gray-500 ">
                            No user found
                        </p>
                    )}

                    {/* user list container */}
                    <UserList
                        data={filteredUsers}
                        updateUserData={updateUserData}
                        deleteUserData={deleteUserData}
                    />

                    {/* pagination container */}

                    {filteredUsers.length !== 0 && (
                        <Pagination
                            currentPage={currentPage}
                            data={data}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </>
        );
    }
};

export default Dashboard;
