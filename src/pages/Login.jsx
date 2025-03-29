import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://reqres.in/";

const Login = () => {
    let navigate = useNavigate();

    const [userCredential, setUserCredential] = useState({
        email: "eve.holt@reqres.in",
        password: "cityslicka",
    });

    const [error, setError] = useState({ status: false, msg: "" });

    function handleLogin(e) {
        // prevent default behaviour of form in browser
        e.preventDefault();

        if (userCredential.email === "" && userCredential.password === "") {
            setError({ status: true, msg: "Input fields required" });
            return;
        }

        if (userCredential.email === "") {
            setError({ status: true, msg: "Email cannot be empty" });
            return;
        }

        if (userCredential.password === "") {
            setError({ status: true, msg: "Password cannot be empty" });
            return;
        }

        // making axios POST request with the user credential
        axios
            .post(`${BASE_URL}api/login`, userCredential)
            .then((response) => {
                // if response status is 200
                // save the token in session storage
                // then navigate the user to dashboard
                if (response.status === 200) {
                    const { token } = response.data;
                    sessionStorage.setItem("token", JSON.stringify(token));
                    navigate("/dashboard");
                }
            })
            .catch((error) => {
                setError({ status: true, msg: "User not found" });
                setUserCredential({
                    email: "eve.holt@reqres.in",
                    password: "cityslicka",
                });
            });
    }

    useEffect(() => {
        let userToken = sessionStorage.getItem("token");
        if (userToken) {
            navigate("/dashboard");
        }
    }, []);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Log in to your account
                </h2>
                {error.status && (
                    <p className="mt-5 text-center text-md/9 font-semibold tracking-tight text-red-600">
                        {error.msg}
                    </p>
                )}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-md/6 font-medium text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="false"
                                value={userCredential.email}
                                onChange={(e) => {
                                    setUserCredential((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    });
                                }}
                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-md/6 font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="false"
                                value={userCredential.password}
                                onChange={(e) => {
                                    setUserCredential((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    });
                                }}
                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-md/6 font-semibold text-white shadow-xs hover:cursor-pointer hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e) => handleLogin(e)}
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
