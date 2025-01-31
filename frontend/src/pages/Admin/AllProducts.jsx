import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {
    // Fetch all products
    const { data, isLoading, isError } = useAllProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading products</div>;
    }

    // Ensure products is an array or default to an empty array
    const products = Array.isArray(data?.products) ? data.products : [];

    return (
        <>
            <div className="container mx-auto px-4 md:px-12 py-8 ml-[5rem]">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="w-full md:w-5/6">
                        <div className="text-xl font-bold mb-6 text-center">
                            All Products ({products.length})
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[10rem] gap-y-10">
                            {products.map((product) => (
                                <Link
                                    key={product._id}
                                    to={`/admin/product/update/${product._id}`}
                                    className="block overflow-hidden shadow-lg rounded-lg bg-gradient-to-r from-blue-200 via-white to-green-200 hover:shadow-xl transition-shadow duration-300 w-full sm:w-[320px]"
                                >
                                    <div className="relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col justify-between min-h-[200px]">
                                        <div>
                                            <h5 className="text-lg font-semibold text-gray-800">
                                                {product?.name}
                                            </h5>
                                            <p className="text-gray-500 text-xs mb-2">
                                                {moment(product.createdAt).format("MMMM Do YYYY")}
                                            </p>
                                            <p className="text-gray-600 text-sm mb-4">
                                                {product?.description?.substring(0, 160)}...
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center mt-auto">
                                            <p className="text-green-500 text-lg font-bold">
                                                $ {product?.price}
                                            </p>
                                            <Link
                                                to={`/admin/product/update/${product._id}`}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                            >
                                                Update
                                                <svg
                                                    className="w-3.5 h-3.5 ml-2"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 10"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 p-3 mt-6 md:mt-0">
                        <AdminMenu />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllProducts;
