import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RotatingLines } from "react-loader-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";

function Product({ cartLength, setCartLength }) {
  const { id } = useParams();
  const url = `https://dummyjson.com/products/${id}`;
  const [data, setData] = useState();
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    // Fetch product data
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));

    // Fetch cart details from localStorage
    const prev = localStorage.getItem("cart");
    if (prev) {
      const parsedCart = JSON.parse(prev);
      setCartDetails(parsedCart);
      setCartLength(parsedCart.length); // Set initial length of the cart
    }
  }, [url]);

  function handleCart() {
    const newCart = [...cartDetails];
    const item = newCart.find((item) => item.id === data.id);

    if (item) {
      const updatedCart = newCart.map((item) =>
        item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartDetails(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartLength(updatedCart.length); // Update length after adding
    } else {
      newCart.push({
        id: data.id,
        name: data.title,
        price: data.price,
        quantity: 1,
        image: data.thumbnail,
        rating: data.rating,
        stock: data.stock,
      });
      setCartDetails(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCartLength(newCart.length); // Update length after adding
    }
  }

  // Category search
  const categoryUrl = `https://dummyjson.com/products/category/${data?.category}`;
  const [categoryProducts, setCategoryProducts] = useState([]);
  useEffect(() => {
    fetch(categoryUrl)
      .then((response) => response.json())
      .then((data) => setCategoryProducts(data.products));
  }, [categoryUrl]);
  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
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

  const fullRating = Math.floor(data.rating);
  const halfRating = data.rating % 1 !== 0;
  function handleChangeProduct(data) {
    setData(data);
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6 px-6" id="x">
        {/* Center column for the main thumbnail */}
        <div className="col-span-3 relative">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex flex-col space-y-2 md:space-y-4">
              <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
                {data.images.map((image) => (
                  <img
                    src={image}
                    alt=""
                    key={image}
                    className="rounded-md object-cover w-full h-16 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                  />
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={data.thumbnail}
                alt={data.title}
                className="w-full h-[500px] md:h-96 object-cover rounded-md"
              />
              <div className="absolute hover:scale-[1.3] duration-200 cursor-pointer top-2 left-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg">
                {data.discountPercentage}% Off
              </div>
            </div>
          </div>
        </div>

        {/* Right column for product details */}
        <div className="col-span-3 p-6 bg-white rounded-md">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            {data.title}
          </h1>
          <p className="flex">
            {[...Array(fullRating)].map((_, index) => (
              <IoIosStar className="text-yellow-500" key={index} />
            ))}
            {halfRating && <IoIosStarHalf className="text-yellow-500" />}
          </p>
          <div className="flex items-end">
            <div className="flex">
              <p className="text-[3rem] text-green-600 font-semibold mb-2">
                ₦{(data.price * 1500).toLocaleString(undefined)}
              </p>
              <p className="line-through text-gray-500 text-2xl font-bold ml-4">
                ₦
                {Math.floor(
                  (data.price * 1500) / (1 - data.discountPercentage / 100)
                ).toLocaleString(undefined)}
              </p>
            </div>
          </div>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {data.description}
          </p>
          <button
            onClick={handleCart}
            className="bg-black mb-[30px] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add to Cart
          </button>

          <hr className=" border-[1.2px] border-[#707070] mb-4" />
          <div className="text-gray-600 font-serif">
            <p>{data.warrantyInformation}</p>
            <p>{data.shippingInformation}</p>
            <p>{data.availabilityStatus}</p>
          </div>
        </div>
      </div>
      <div className="col-span-7 px-6 bg-white rounded-md shadow-md">
        <Tabs defaultValue="Description" className="w-full">
          <TabsList>
            <TabsTrigger value="Description">Description</TabsTrigger>
            <TabsTrigger value="Reviews">
              Reviews ({data.reviews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Description">
            <div className="text-gray-700 text-base leading-relaxed mb-6">
              {data.description}
            </div>
          </TabsContent>
          <TabsContent value="Reviews">
            {data.reviews.map((review) => (
              <div key={review} className="border-b border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {review.reviewerName}
                </p>
                <p className="text-sm text-gray-700 mb-2 flex items-center">
                  {[...Array(review.rating)].map((_, index) => (
                    <IoIosStar key={index} className="text-yellow-400" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, index) => (
                    <IoIosStarOutline key={index} className="text-yellow-400" />
                  ))}
                  <div className="ml-3">({review.rating}/5 Stars)</div>
                </p>
                <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                <p className="text-xs text-gray-500">
                  {new Date(review.date).toLocaleString("default", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <div className="flex items-center justify-center text-[35px] gap-2 font-bold">
          <p>RELATED PRODUCTS</p>
          <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 cursor-pointer text-center">
          {categoryProducts.length > 0 ? (
            categoryProducts
              .filter((items) => items.id !== data.id)
              .slice(0, 4)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md hover:shadow-lg p-4 transition-shadow duration-300 ease-in-out gap-2"
                  onClick={() => {
                    document
                      .getElementById("x")
                      .scrollIntoView({ behavior: "smooth" });
                    handleChangeProduct(product);
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-40 w-full object-cover rounded-md mb-3 hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                  <p className="text-lg font-semibold text-gray-700">
                    {product.title}
                  </p>
                  <p className="text-green-600 font-bold text-xl">
                    ₦{(product.price * 1500).toLocaleString()}{" "}
                  </p>
                </div>
              ))
          ) : (
            <p className="text-gray-500 col-span-full text-lg font-semibold">
              NO RELATED ITEMS
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
