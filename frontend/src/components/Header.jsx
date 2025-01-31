import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
    const { data, isLoading, error } = useGetTopProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <h1>ERROR</h1>;
    }

    return (
        <div className="flex flex-col items-center overflow-x-hidden">
            {/* ProductCarousel takes the top position */}
            <div className="w-full ml-[5rem]">
                <ProductCarousel />
            </div>

            {/* SmallProduct items displayed below the carousel */}
            <div className="flex flex-wrap justify-between gap-y-10 w-full px-10 mt-10 ml-12">
                {data && data.length > 0 ? (
                    data.map((product) => (
                        <SmallProduct key={product._id} product={product} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 w-full">
                        No products available
                    </p>
                )}
            </div>
        </div>
    );
};

export default Header;
