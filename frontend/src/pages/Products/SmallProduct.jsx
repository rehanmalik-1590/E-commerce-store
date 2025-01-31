import { Link } from "react-router-dom";
import { FaTag } from "react-icons/fa";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
    return (
        <div className="w-[16rem] p-3 shadow-lg rounded-lg bg-gradient-to-r from-blue-200 via-white to-green-200 bg-animate bg-pulse bg-speed-60 hover:shadow-xl transition-shadow duration-300 mx-3">
            <div className="relative">
                {/* Product Image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[13rem] object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-105 overflow-hidden"
                />
                <HeartIcon product={product}/>
                {/* Product Details */}
                <div className="p-4">
                    <Link to={`/product/${product._id}`}>
                        {/* Product Name */}
                        <h1 className="text-lg font-semibold text-black hover:text-blue-600 transition-colors">
                            {product.name}
                        </h1>
                    </Link>

                    {/* Product Price with Icon */}
                    <div className="flex items-center mt-2">
                        <FaTag className="text-blue-700 mr-2" />
                        <span className="text-blue-700 font-medium text-lg">
                            $ {product.price}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmallProduct;
