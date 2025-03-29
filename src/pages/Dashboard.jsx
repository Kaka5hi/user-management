import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import UserList from "../components/UserList";
import Pagination from "../components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../components/Spinner";

let BASE_URL = "https://reqres.in/";

const Dashboard = () => {
    const [dataFetching, setDataFetching] = useState(true);

    // state to store fetched data
    const [data, setData] = useState([]);

    // state to store current page
    const [currentPage, setCurrentPage] = useState(1);

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

    // calling the getData function
    // scrolling the view to top
    useEffect(() => {
        getData();
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

                    {/* user list container */}
                    <UserList
                        data={data}
                        updateUserData={updateUserData}
                        deleteUserData={deleteUserData}
                    />

                    {/* pagination container */}
                    <Pagination
                        currentPage={currentPage}
                        data={data}
                        setCurrentPage={setCurrentPage}
                    />
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
