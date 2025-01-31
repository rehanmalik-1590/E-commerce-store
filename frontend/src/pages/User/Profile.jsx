import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading: loadingUpdatedProfile }] =
        useProfileMutation();

    useEffect(() => {
        if (userInfo) {
        setUsername(userInfo.username || "");
        setEmail(userInfo.email || "");
        }
    }, [userInfo]);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
        }

        try {
        const res = await updateProfile({
            _id: userInfo._id,
            username,
            email,
            password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        } catch (error) {
        toast.error(error?.data?.message || "Failed to update profile");
        }
    };

return (
    <div className="container mx-auto p-4 mt-4">
        <div className="flex flex-col justify-center items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8 md:items-start">
            <div className="w-full md:w-1/2 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-white text-center">
                Update Profile
            </h2>
            <form onSubmit={submitHandler}>
                {/* Username */}
                <div className="mb-4">
                <label htmlFor="name" className="block text-white mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="form-input p-2 border rounded-sm w-full text-black"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>

                {/* Email */}
                <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="form-input p-2 border rounded-sm w-full text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>

                {/* Password */}
                <div className="mb-4">
                <label htmlFor="password" className="block text-white mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter a new password"
                    className="form-input p-2 border rounded-sm w-full text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-white mb-2">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    className="form-input p-2 border rounded-sm w-full text-black"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    disabled={loadingUpdatedProfile}
                >
                    Update
                </button>

                <Link
                    to="/user-orders"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center transition duration-300"
                >
                    My Orders
                </Link>
                </div>
            </form>
            </div>
            {loadingUpdatedProfile && (
            <div className="w-full md:w-1/3 flex justify-center">
                <Loader />
            </div>
            )}
        </div>
    </div>
);
};

export default Profile;
