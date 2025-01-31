import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

return (
    <div className="container w-[85%] ml-[8rem]">
        <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

        {isLoading ? (
            <Loader />
        ) : error ? (
            <Message variant="danger">{error?.data?.error || error.error}</Message>
        ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full bg-transparent">
                <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-gray-100">Image</th>
                    <th className="px-6 py-3 text-left text-gray-100">ID</th>
                    <th className="px-12 py-3 text-left text-gray-100">Date</th>
                    <th className="px-12 py-3 text-left text-gray-100">Total</th>
                    <th className="px-4 py-3 text-left text-gray-100">Paid</th>
                    <th className="px-4 py-3 text-left text-gray-100">Delivered</th>
                </tr>
                </thead>

                <tbody className="border-t border-gray-300">
                {orders.map((order) => (
                    <tr key={order._id}>
                    <td className="px-4 py-4">
                        <img
                        src={order.orderItems[0].image}
                        alt={order.user}
                        className="h-auto w-[10rem] sm:w-[8rem] md:w-[10rem] lg:w-[10rem] rounded-lg object-cover shadow-md"
                        />
                    </td>

                    <td className="px-6 py-3">{order._id}</td>
                    <td className="px-6 py-3">
                        {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="px-6 py-3">$ {order.totalPrice}</td>

                    <td className="px-6 py-3">
                        {order.isPaid ? (
                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                            Completed
                        </p>
                        ) : (
                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                            Pending
                        </p>
                        )}
                    </td>

                    <td className="px-6 py-3">
                        {order.isDelivered ? (
                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                            Completed
                        </p>
                        ) : (
                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                            Pending
                        </p>
                        )}
                    </td>

                    <td className="px-6 py-3">
                        <Link to={`/order/${order._id}`}>
                        <button className="bg-pink-400 text-back py-2 px-3 rounded">
                            View Details
                        </button>
                        </Link>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
};

export default UserOrder;
