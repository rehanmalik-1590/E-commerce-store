import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaStar, FaStore, FaShoppingCart, FaBox } from "react-icons/fa";

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true, // Built-in arrows enabled
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    arrows: true, // Built-in arrows enabled for desktop
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: true, // Keep arrows on medium screens
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    arrows: true, // Keep arrows on small screens
                },
            },
        ],
    };

    const productList = Array.isArray(products) ? products : [];

    return (
        <div className="mb-8 flex justify-center mr-12">
            {isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.message}
                </Message>
            ) : productList.length === 0 ? (
                <p className="text-center text-white">No products available</p>
            ) : (
                <div className="relative">
                    <Slider {...settings} className="w-[100%] xl:w-[70rem] lg:w-[60rem] md:w-[50rem] sm:w-[40rem]">
                        {productList.map(
                            ({ image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock }) => (
                                <div key={_id} className="relative">
                                    <img src={image} alt={name} className="w-full object-cover h-full max-h-[30rem] max-w-[100%]" />
                                    <div className="absolute bottom-4 left-4 bg-blue-500 bg-opacity-55 p-4 rounded-lg shadow-lg">
                                        <h1 className="text-lg font-bold text-white">{name}</h1>
                                        <p className="text-white">{description?.substring(0, 60)}...</p>
                                        <p className="text-white text-sm">
                                            <FaStore className="inline-block mr-1" /> Brand: {brand} | Released: {moment(createdAt).format("MMMM Do YYYY")}
                                        </p>
                                        <div className="flex items-center mt-2">
                                            <FaStar className="text-yellow-500 mr-1" />
                                            <span>{Math.round(rating)} ({numReviews} reviews)</span>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <FaShoppingCart className="text-green-500 mr-1" />
                                            <span>Quantity: {quantity}</span>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <FaBox className="text-blue-500 mr-1" />
                                            <span>In Stock: {countInStock}</span>
                                        </div>
                                        <p className="text-white text-lg font-bold mt-2">$ {price.toFixed(2)}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default ProductCarousel;
