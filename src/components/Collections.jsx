import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { RotatingLines } from "react-loader-spinner";

export default function Collections({ searchValue }) {
  const navigate = useNavigate();
  const url = searchValue
    ? `https://dummyjson.com/products/search?q=${searchValue}&limit=100`
    : `https://dummyjson.com/products?limit=100`;
  const [height, setHeight] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false); // Set loading to false once products are fetched
      });
  }, [searchValue]);

  const categories = [...new Set(products.map((product) => product.category))];

  const [categoriesState, setCategoriesState] = useState({});

  function handleFilter(e) {
    setCategoriesState({
      ...categoriesState,
      [e.target.name]: e.target.checked,
    });
  }

  const isAnyCategorySelected = Object.values(categoriesState).some(
    (checked) => checked
  );

  // Render the loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="gray"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <div className="col-span-1">
        Filters
        <div>
          <div
            className={`overflow-hidden duration-300 border-2 p-3 md:mt-4 ${
              height ? "max-h-screen" : "max-h-[110px]"
            }`}
          >
            <div className="flex justify-between items-center">
              <p>CATEGORIES</p>
              <div onClick={() => setHeight(!height)}>
                {height ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>

            {/* Categories checkbox */}
            <div className="flex items-center">
              <div>
                {categories.map((category) => (
                  <label
                    key={category}
                    htmlFor={category}
                    className="flex items-center px-3 py-2 text-sm leading-5 text-gray-700 rounded-md bg-white hover:bg-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <input
                      type="checkbox"
                      id={category}
                      name={category}
                      className="form-checkbox focus:ring-blue-500 h-4 w-4 text-primary-600"
                      onChange={handleFilter}
                    />
                    <span className="ml-3 uppercase">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3">
        <div className="flex justify-between items-center">
          <p>ALL COLLECTIONS</p>
          <p>
            <select className="p-2">
              <option value="">Sort by: Price Low to High</option>
            </select>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.1 }}
        >
          {products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              {products
                .filter((item) =>
                  isAnyCategorySelected ? categoriesState[item.category] : true
                )
                .map((product) => (
                  <div
                    key={product.id}
                    className="overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="bg-slate-200 rounded-md"
                    />
                    <h3>{product.title}</h3>
                    <p className="">
                      ₦
                      {(product.price * 1500).toLocaleString("default", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <p>No products found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
