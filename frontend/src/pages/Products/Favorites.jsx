import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct);

    return (
        <div className="mt-10 px-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-white">
                Favorite Products
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {favorites.length > 0 ? (
                    favorites.map((product) => (
                        <Product key={product._id} product={product} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        No favorite products added yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
