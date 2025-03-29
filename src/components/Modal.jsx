import { useState } from "react";

const Modal = ({ setShowModal, userData, updateUserData }) => {
    const [error, setError] = useState({ status: false, msg: "error" });

    const [userEditedData, setUserEditedData] = useState(userData);

    function handleInputChange(e) {
        if (error.status) {
            setError({ status: false, msg: "error" });
        }
        setUserEditedData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    }

    function handleUserDataEdit(e) {
        e.preventDefault();

        if (
            userEditedData?.first_name === "" &&
            userEditedData?.last_name === "" &&
            userEditedData?.email === ""
        ) {
            setError({ status: true, msg: "Input fields cannot be empty" });
            return;
        } else if (userEditedData?.first_name === "") {
            setError({ status: true, msg: "First name cannot be empty" });
            return;
        } else if (userEditedData?.last_name === "") {
            setError({ status: true, msg: "Last name cannot be empty" });
            return;
        } else if (userEditedData?.email === "") {
            setError({ status: true, msg: "Email cannot be empty" });
            return;
        }

        updateUserData(userEditedData, userData.id);
        setShowModal(false);
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/25 flex items-center justify-center p-2.5">
            <div className="w-lg mx-auto bg-white p-5 rounded-md space-y-5">
                <div>
                    <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Edit User
                    </h2>
                    {error.status && (
                        <p className="mt-5 text-center text-md/9 font-semibold tracking-tight text-red-600">
                            {error.msg}
                        </p>
                    )}
                </div>
                <form className="space-y-6 ">
                    <div>
                        <label
                            htmlFor="first_name"
                            className="text-md/6 font-medium text-gray-900"
                        >
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                autoComplete="false"
                                defaultValue={userData?.first_name}
                                onChange={(e) => handleInputChange(e)}
                                className="w-full rounded-md bg-white px-3 py-2  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="last_name"
                            className="text-md/6 font-medium text-gray-900"
                        >
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                autoComplete="false"
                                defaultValue={userData?.last_name}
                                onChange={(e) => handleInputChange(e)}
                                className="w-full rounded-md bg-white px-3 py-2  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="text-md/6 font-medium text-gray-900"
                        >
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="false"
                                defaultValue={userData?.email}
                                onChange={(e) => handleInputChange(e)}
                                className="w-full rounded-md bg-white px-3 py-2  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                        </div>
                    </div>
                </form>
                <div className="flex items-center justify-between">
                    <button
                        onClick={(e) => handleUserDataEdit(e)}
                        className="rounded-md  bg-green-600 px-4 py-2 text-md/6 font-semibold capitalize text-white shadow-xs hover:cursor-pointer hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        save
                    </button>
                    <button
                        className="rounded-md  bg-red-600 px-4 py-2 text-md/6 font-semibold capitalize text-white shadow-xs hover:cursor-pointer hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        onClick={() => setShowModal(false)}
                    >
                        cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
