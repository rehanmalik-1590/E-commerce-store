import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
    const { keyword } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery({ keyword });

    return (
        <>
            {!keyword ? <Header /> : null}
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Message variant="danger">
                    {isError?.data.message || isError.error}
                </Message>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="ml-[20rem] mt-[3rem] text-[3rem]">
                            Special Products
                        </h1>

                        <Link
                            to="/shop"
                            className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[3rem]"
                        >
                            Shop
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-between px-10 mt-[3rem]">
                        {data.products.map((product, index) => (
                            <div key={product._id} className={`w-full md:w-[45%] lg:w-[30%] px-2 mb-8 ${index === data.products.length - 1 ? '' : 'mb-8'}`}>
                                <Product product={product} />
                            </div>
                        ))}
                    </div>

                </>
            )}
        </>
    );
};

export default Home;
