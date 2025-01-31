import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    addToFavorites,
    removeFromFavorites,
    setFavorites,
} from '../../redux/features/favorites/favoriteSlice';
import {
    addFavoritesToLocalStorage,
    getFavoritesFromLocalStorage,
    removeFavoriteFromLocalStorage,
} from '../../Utils/localStorage';

const HeartIcon = ({ product }) => {
    if (!product) {
        console.error("HeartIcon received an undefined product");
        return null;
    }

    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites || []);
    const isFavorite = favorites.some((p) => p._id === product._id);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        dispatch(setFavorites(favoritesFromLocalStorage));
    }, [dispatch]);

    const toggleFavorites = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);

        if (isFavorite) {
            dispatch(removeFromFavorites(product));
            removeFavoriteFromLocalStorage(product._id);
        } else {
            dispatch(addToFavorites(product));
            addFavoritesToLocalStorage(product);
        }
    };

    return (
        <div
            onClick={toggleFavorites}
            className={`absolute bottom-2 right-5 cursor-pointer flex justify-center items-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg transform transition-transform duration-300 hover:scale-125 ${
                isAnimating ? "animate-heart" : ""
            }`}
        >
            {isFavorite ? (
                <FaHeart className="text-white text-1xl" />
            ) : (
                <FaRegHeart className="text-white text-1xl" />
            )}
        </div>
    );
};

export default HeartIcon;
