import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { FaStar, FaBox, FaShoppingCart, FaClock } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from './ProductTabs';
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(productId);
    const { userInfo } = useSelector((state) => state.auth);
    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success("Review created successfully");
        } catch (error) {
            toast.error(error?.data || error.message);
        }
    };

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    const handleQtyChange = (e) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQty(value);
        }
    };

    return (
        <div className="overflow-x-hidden">
            <div className="ml-10 sm:ml-20 mt-4">
                <Link to="/" className="text-red-600 font-semibold hover:underline">
                    Go Back
                </Link>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.message || error.message}</Message>
            ) : (
                <div className="flex flex-col items-center mt-1 px-4 lg:px-10 gap-8">
                    <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-8">
                        <div className="w-full lg:w-1/3 shadow-lg rounded-lg bg-gradient-to-br from-purple-400 via-pink-300 to-orange-200 bg-opacity-90 hover:bg-gradient-to-tl hover:from-purple-500 hover:via-pink-400 hover:to-orange-300 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg transition-transform duration-500 transform hover:scale-110"
                                />
                                <div className="absolute top-[2.7rem] right-[-1rem]">
                                    <HeartIcon product={product} />
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 bg-gradient-to-r from-white/50 to-white/80 p-6 rounded-xl shadow-lg backdrop-blur-md border border-gray-200">
                            <table className="table-auto w-full text-left border-collapse">
                                <tbody>
                                    <tr className="group border-b hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 transition-all">
                                        <th className="py-4 px-6 text-gray-900 font-bold text-lg group-hover:text-purple-700">Name:</th>
                                        <td className="py-4 px-6 text-gray-700 group-hover:text-gray-900">{product.name}</td>
                                    </tr>
                                    <tr className="group border-b hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 transition-all">
                                        <th className="py-4 px-6 text-gray-900 font-bold text-lg group-hover:text-purple-700">Price:</th>
                                        <td className="py-4 px-6 text-blue-600 font-bold text-lg group-hover:text-blue-800">$ {product.price.toFixed(2)}</td>
                                    </tr>
                                    <tr className="group border-b hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 transition-all">
                                        <th className="py-4 px-6 text-gray-900 font-bold text-lg group-hover:text-purple-700">Description:</th>
                                        <td className="py-4 px-6 text-gray-700 group-hover:text-gray-900">{product.description}</td>
                                    </tr>
                                    <tr className="group border-b hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 transition-all">
                                        <th className="py-4 px-6 text-gray-900 font-bold text-lg group-hover:text-purple-700">Brand:</th>
                                        <td className="py-4 px-6 text-gray-700 group-hover:text-gray-900">{product.brand}</td>
                                    </tr>
                                    <tr className="group border-b hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 transition-all">
                                        <th className="py-4 px-6 text-gray-900 font-bold text-lg group-hover:text-purple-700 flex items-center">
                                            <FaBox className="mr-2 text-green-500" />
                                            Stock:
                                        </th>
                                        <td className={`py-4 px-6 font-bold text-lg ${product.countInStock > 0 ? "text-green-600 group-hover:text-green-700" : "text-red-600 group-hover:text-red-700"}`}>
                                            {product.countInStock > 0 ? `${product.countInStock} items in stock` : "Out of Stock"}
                                        </td>
                                    </tr>
                                    <tr className="group border-b hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 transition-all">
                                        <th className="py-4 px-6 text-gray-900 font-bold text-lg group-hover:text-purple-700 flex items-center">
                                            <FaClock className="mr-2 text-gray-500" />
                                            Released:
                                        </th>
                                        <td className="py-4 px-6 text-gray-700 group-hover:text-gray-900">
                                            {moment(product.createdAt).format("MMMM Do YYYY")}
                                        </td>
                                    </tr>
                                    <tr className="group border-b hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 transition-all">
                                        <th className="py-4 px-6 text-gray-900 font-bold text-lg group-hover:text-purple-700 flex items-center">
                                            <FaShoppingCart className="mr-2 text-blue-500" />
                                            Quantity:
                                        </th>
                                        <td className=" py-4 px-6 text-gray-700 group-hover:text-gray-900">
                                            {product.quantity}
                                        </td>
                                    </tr>
                                    <tr className="group border-b hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 transition-all">
                                        <td className="py-4 px-6 text-lg group-hover:text-purple-700">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                                <div className="flex items-center">
                                                    <span className="font-bold text-lg">
                                                        <FaStar className="text-yellow-500 mr-2" />
                                                    </span>
                                                    <span className="font-bold text-gray-900">Rating:</span>
                                                </div>
                                                <div className="flex justify-center items-center sm:ml-[5rem]">
                                                    <Ratings value={product.rating} />
                                                </div>
                                                <div className="text-right text-gray-700 group-hover:text-gray-900 ml-[8rem] sm:ml-[10rem]">
                                                    {product.numReviews} reviews
                                                </div>
                                            </div>
                                        </td>
                                        {product.countInStock > 0 && (
                                            <td className="sm:col-span-3 flex justify-start items-center mt-[2rem] ml-[3rem] sm:ml-[12rem]">
                                                <select
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                    className="p-2 w-[5rem] rounded-lg text-black"
                                                >
                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                            <div className="w-full mt-6">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="container w-full flex flex-wrap items-start justify-between mx-auto mt-12">
                    <div className="w-full flex items-center justify-between ml-[5rem] mr-[5rem]">
                        <ProductTabs
                            loadingProductReview={loadingProductReview}
                            userInfo={userInfo}
                            submitHandler={submitHandler}
                            rating={rating}
                            setRating={setRating}
                            comment={comment}
                            setComment={setComment}
                            product={product}
                        />
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
