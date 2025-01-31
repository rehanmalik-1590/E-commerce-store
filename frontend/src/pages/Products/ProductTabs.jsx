import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="flex mb-4 space-x-4 overflow-x-auto">
        <button
          onClick={() => handleTabClick(1)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            activeTab === 1
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"
          }`}
        >
          Write Your Review
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            activeTab === 2
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"
          }`}
        >
          All Reviews
        </button>
        <button
          onClick={() => handleTabClick(3)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            activeTab === 3
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"
          }`}
        >
          Related Products
        </button>
      </div>

      {activeTab === 1 && (
        <div className="w-full p-6 bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg">
          {userInfo ? (
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label htmlFor="rating" className="block text-xl mb-2 text-blue-700">
                  Rating
                </label>
                <select
                  id="rating"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full p-2 border rounded-lg text-gray-800 bg-gradient-to-r from-gray-100 to-white"
                >
                  <option value="">Select</option>
                  <option value="1">Inferior</option>
                  <option value="2">Decent</option>
                  <option value="3">Great</option>
                  <option value="4">Excellent</option>
                  <option value="5">Exceptional</option>
                </select>
              </div>

              <div>
                <label htmlFor="comment" className="block text-xl mb-2 text-blue-700">
                  Comment
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border rounded-lg text-gray-800 bg-gradient-to-r from-gray-100 to-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loadingProductReview}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-800"
              >
                Submit
              </button>
            </form>
          ) : (
            <p className="text-center text-blue-700">
              Please{" "}
              <Link
                to="/login"
                className="text-blue-600 underline hover:bg-pink-400 hover:text-white px-2 py-1 rounded"
              >
                sign in
              </Link>{" "}
              to write a review.
            </p>
          )}
        </div>
      )}

      {activeTab === 2 && (
        <div className="w-full p-6 bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg">
          {product.reviews.length === 0 ? (
            <p className="text-center text-gray-800">No Reviews</p>
          ) : (
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left text-blue-700">Reviewer</th>
                  <th className="border border-gray-300 p-2 text-left text-blue-700">Review</th>
                </tr>
              </thead>
              <tbody>
                {product.reviews.map((review) => (
                  <tr key={review._id}>
                    <td className="border border-gray-300 p-2 text-gray-800">
                      <strong>{review.name}</strong>
                      <p className="text-sm text-gray-500">
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </td>
                    <td className="border border-gray-300 p-2 text-gray-800">
                      <p>{review.comment}</p>
                      <Ratings value={review.rating} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 3 && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {!data ? (
            <Loader />
          ) : (
            data.map((product) => (
              <div
                key={product._id}
                className="bg-gradient-to-br from-gray-600 to-gray-800 p-6 shadow-md rounded-lg flex flex-col items-center justify-between"
              >
                <div className="relative w-full h-[250px] group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full rounded-lg object-cover bg-gradient-to-br from-blue-300 via-transparent to-purple-300 group-hover:opacity-80 group-hover:scale-110 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <div className="mt-4 bg-gradient-to-br from-white to-gray-500 p-4 rounded-lg shadow w-full text-center flex flex-col items-center">
                  <p className="font-semibold text-lg text-gray-800 truncate">{product.name}</p>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  <Link
                    to={`/product/${product._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
