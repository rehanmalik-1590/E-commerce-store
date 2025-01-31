import { useSelector } from "react-redux"

const FavoritesCount = () => {

    const favorites = useSelector((state) => state.favorites);
    const favoritesCount = favorites.length;
    return (
        <div className="absolute left-2 top-5">
            {favoritesCount > 0 && (
                <span className="px-1 py-0 cursor-pointer flex justify-center text-sm items-center w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg transform transition-transform duration-300 hover:scale-125">
                    {favoritesCount}
                </span>
            )}
        </div>
    )
}

export default FavoritesCount