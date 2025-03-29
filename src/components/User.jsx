import { useState } from "react";
import Modal from "./Modal";

const User = ({ user, updateUserData, deleteUserData }) => {
    // state to toggle modal
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="flex items-center border border-gray-300 p-2.5 rounded-md">
                <img
                    className="hidden shrink-0 size-15.5 rounded-full customBreakpoint:inline-block "
                    src={user?.avatar}
                    alt="Avatar"
                />
                <div className="ms-3">
                    <h3 className="text-md/6 font-medium text-gray-900">
                        {user?.first_name} {user?.last_name}
                    </h3>
                    <p className="text-sm  text-gray-500 ">{user?.email}</p>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-300 rounded-sm capitalize hover:cursor-pointer"
                        onClick={() => setShowModal(true)}
                    >
                        edit
                    </button>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-300 rounded-sm capitalize hover:cursor-pointer"
                        onClick={() => deleteUserData(user?.id)}
                    >
                        delete
                    </button>
                </div>
            </div>
            {showModal && (
                <Modal
                    setShowModal={setShowModal}
                    userData={user}
                    updateUserData={updateUserData}
                />
            )}
        </>
    );
};

export default User;
