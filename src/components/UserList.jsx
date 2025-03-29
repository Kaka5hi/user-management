import User from "./User";

const UserList = ({ data, updateUserData, deleteUserData }) => {
    return (
        <div className="max-w-lg mx-auto space-y-5">
            {data?.map((user) => {
                return (
                    <User
                        key={user.id}
                        user={user}
                        updateUserData={updateUserData}
                        deleteUserData={deleteUserData}
                    />
                );
            })}
        </div>
    );
};

export default UserList;
