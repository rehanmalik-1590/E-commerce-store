import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop);

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (filteredProductsQuery.isLoading) return;

    // If no filters are applied (checked, radio, price), show all products
    if (!checked.length && !radio.length && !priceFilter && !selectedBrand) {
      dispatch(setProducts(filteredProductsQuery.data));
      return;
    }

    // Filter products based on selected filters
    const filteredProducts = filteredProductsQuery.data.filter((product) => {
      const matchesCategory = checked.length
        ? checked.includes(product.category)
        : true;

      const matchesBrand = selectedBrand
        ? product.brand === selectedBrand
        : true;

      const matchesPrice =
        priceFilter === "" ||
        product.price.toString().includes(priceFilter);

      return matchesCategory && matchesBrand && matchesPrice;
    });

    dispatch(setProducts(filteredProducts));
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, selectedBrand]);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const handleChecked = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...new Set(filteredProductsQuery.data?.map((product) => product.brand).filter(Boolean)),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row gap-5 ml-[5rem]">
          {/* Sidebar */}
          <div
            className="bg-gray-700 p-6 rounded-md shadow-lg w-full md:w-1/5 max-h-[calc(100vh-3rem)] overflow-y-auto"
          >
            <div className="flex flex-col h-auto">
              {/* Filter by Categories */}
              <h2 className="text-lg font-semibold text-center mb-4 bg-gray-500 hover:bg-gray-800 text-white rounded-full py-2 transition-all">
                Filter by Categories
              </h2>
              <div>
                {categories?.length ? (
                  categories.map((c) => (
                    <div key={c._id} className="mb-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          onChange={(e) => handleChecked(e.target.checked, c._id)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring focus:ring-blue-500"
                        />
                        <span>{c.name}</span>
                      </label>
                    </div>
                  ))
                ) : (
                  <p>No categories available.</p>
                )}
              </div>

              {/* Filter by Brands */}
              <h2 className="text-lg font-semibold text-center mb-4 bg-gray-500 hover:bg-gray-800 text-white rounded-full py-2 transition-all">
                Filter by Brands
              </h2>
              <div>
                {uniqueBrands?.length ? (
                  uniqueBrands.map((brand) => (
                    <div key={brand} className="mb-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="brand"
                          onChange={() => handleBrandClick(brand)}
                          className="w-4 h-4 rounded text-blue-400 focus:ring focus:ring-blue-500"
                        />
                        <span>{brand}</span>
                      </label>
                    </div>
                  ))
                ) : (
                  <p>No brands available.</p>
                )}
              </div>

              {/* Filter by Price */}
              <h2 className="text-lg font-semibold text-center mb-4 mt-6 bg-transparent hover:bg-gray-600 rounded-full py-2 transition-all">
                Filter by Price
              </h2>
              <div>
                <input
                  type="text"
                  placeholder="Enter Price"
                  value={priceFilter}
                  onChange={handlePriceChange}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:ring focus:ring-blue-500"
                />
              </div>

              {/* Reset Button */}
              <button
                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset?")) {
                    window.location.reload();
                  }
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Product List */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-center mb-4">
              {products?.length} Products
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {products?.length === 0 ? (
                <p>No products found.</p>
              ) : (
                products.map((p) => <ProductCard key={p._id} p={p} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
