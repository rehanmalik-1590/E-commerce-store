import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress, savePaymentMethod } from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-5 px-4 sm:px-6 lg:px-8">
      <ProgressSteps step1 step2 step3 />
      <div className="mt-10 flex justify-center items-center flex-wrap">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-3xl p-6 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-semibold mb-6 text-white">Shipping</h1>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="city">
              City
            </label>
            <input
              id="city"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Postal Code */}
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="postalCode">
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          {/* Country */}
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="country">
              Country
            </label>
            <input
              id="country"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-white mb-2">Payment Method</label>
            <div className="flex items-center">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2 text-white">PayPal or Credit Card</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
