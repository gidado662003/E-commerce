import React, { useEffect, useState } from "react";

function PlaceOrder() {
  const [data, setData] = useState();
  const [total, setTotal] = useState();
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    const prevData = localStorage.getItem("cart");
    if (prevData) {
      setData(JSON.parse(prevData));
    }
  }, []);

  useEffect(() => {
    if (data) {
      const sum = data.reduce(
        (acc, curr) => acc + curr.price * curr.quantity * 1500,
        0
      );
      setTotal(sum);
    }
  }, [data]);

  const formattedAmountNGN = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);

  const getInputData = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", inputData);
  };
  useEffect(() => {
    fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer /* YOUR_ACCESS_TOKEN_HERE */", // Pass JWT via Authorization header
      },
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    })
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return (
    <div className="max-w-5xl mx-auto  p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Delivery Information Section */}
        <div>
          <h1 className="text-xl text-gray-700  tracking-wider mb-6  border-gray-200 pb-2 inline-block">
            DELIVERY <span className="font-bold">INFORMATION</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* First and Last Name */}
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base focus:ring-2 focus:ring-blue-500"
                  placeholder="First name"
                  required
                  onChange={getInputData}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base focus:ring-2 focus:ring-blue-500"
                  placeholder="Last name"
                  required
                  onChange={getInputData}
                />
              </div>

              {/* Email */}
              <div className="col-span-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base focus:ring-2 focus:ring-blue-500"
                  placeholder="Email address"
                  required
                  onChange={getInputData}
                />
              </div>

              {/* Street */}
              <div className="col-span-2">
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base focus:ring-2 focus:ring-blue-500"
                  placeholder="Street"
                  required
                  onChange={getInputData}
                />
              </div>

              {/* City and State */}
              <div>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base focus:ring-2 focus:ring-blue-500"
                  placeholder="City"
                  required
                  onChange={getInputData}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base focus:ring-2 focus:ring-blue-500"
                  placeholder="State"
                  required
                  onChange={getInputData}
                />
              </div>

              {/* Zip Code and Country */}
              <div>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base focus:ring-2 focus:ring-blue-500"
                  placeholder="Zipcode"
                  required
                  onChange={getInputData}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base focus:ring-2 focus:ring-blue-500"
                  placeholder="Country"
                  required
                  onChange={getInputData}
                />
              </div>

              {/* Phone */}
              <div className="col-span-2">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone"
                  required
                  onChange={getInputData}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300"
            >
              CONFIRM ORDER
            </button>
          </form>
        </div>

        {/* Cart Totals Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 pb-2 mb-6 border-gray-200">
            CART TOTALS
          </h2>

          <div className="flex justify-between mb-2 text-lg">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-bold">{formattedAmountNGN(total)}</span>
          </div>
          <div className="flex justify-between mb-6 text-lg">
            <span className="text-gray-600">Shipping Fee</span>
            <span className="font-bold">{formattedAmountNGN(10000)}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-bold text-gray-800">Total</span>
            <span className="font-bold text-gray-800">
              {formattedAmountNGN(total + 10000)}
            </span>
          </div>

          {/* Payment Methods */}
          <h2 className="text-xl font-bold text-gray-800 border-b-2 pb-2 my-6 border-gray-200">
            PAYMENT METHOD
          </h2>
          <div className="flex items-center mb-4 space-x-4">
            <button className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 hover:border-blue-500 focus:ring-2 focus:ring-blue-500">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Stripe_logo%2C_revised_2016.png"
                alt="stripe"
                className="h-6"
              />
            </button>
            <button className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 hover:border-blue-500 focus:ring-2 focus:ring-blue-500">
              <img
                src="https://razorpay.com/assets/razorpay-glyph.svg"
                alt="razorpay"
                className="h-6"
              />
            </button>
            <button className="flex items-center justify-center bg-green-100 border border-gray-300 rounded-lg px-4 py-3 text-green-600 hover:border-green-500 focus:ring-2 focus:ring-green-500">
              <span>Cash on Delivery</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
