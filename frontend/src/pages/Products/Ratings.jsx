import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
    const fullStars = Math.floor(value);
    const halfStars = value - fullStars > 0.5 ? 1 : 0;
    const emptyStar = 5 - fullStars - halfStars;

    return (
        <div className="flex items-center sm:flex-row md:flex-row ml-[3rem] sm:ml-[2rem] md:ml-[3rem] lg:ml-[4rem]">
            {/* Full stars */}
            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={index} className={`text-${color} ml-1`} />
            ))}

            {/* Half star (if applicable) */}
            {halfStars === 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}

            {/* Empty stars */}
            {[...Array(emptyStar)].map((_, index) => (
                <FaRegStar key={index} className={`text-${color} ml-1`} />
            ))}

            {/* Review text */}
            {text && (
                <span className={`rating-text ml-2 text-${color}`}>
                    {text}
                </span>
            )}
        </div>
    );
};

Ratings.defaultProps = {
    color: "yellow-500",
};

export default Ratings;
