import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch cart data from localStorage on component mount
  useEffect(() => {
    const prevData = localStorage.getItem("cart");
    if (prevData) {
      setCartItems(JSON.parse(prevData));
    }
  }, []);

  // Calculate total whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      const calculatedTotal = cartItems
        .map((data) => data.price * data.quantity * 1500)
        .reduce((a, b) => a + b, 0);
      setTotal(calculatedTotal);
    } else {
      setTotal(0);
    }
  }, [cartItems]);

  // Handle quantity change for each item
  function handleQuantity(id, event) {
    const value = parseInt(event.target.value) || 1; // Ensure a number
    setCartItems((prev) => {
      const updatedItems = prev.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

  // Remove item from cart
  function removeItem(id) {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <span className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="w-8 md:w-11 h-[3px] bg-[#414141]"></p>
      </span>
      <div className="bg-white shadow-md rounded-lg p-6">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No items in the cart
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 py-4"
            >
              {/* Item details */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover"
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2 text-sm text-gray-600">
                    <p className="text-[1.3rem] text-red-700 font-bold">
                      ₦{(item.price * 1500).toLocaleString()}
                    </p>
                    <p className="font-bold">In Stock: {item.stock}</p>
                  </div>
                </div>
              </div>

              {/* Quantity and remove button */}
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <input
                  type="number"
                  min={1}
                  max={item.stock}
                  className="w-16 text-center border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={item.quantity}
                  name={item.id}
                  onChange={(event) => handleQuantity(item.id, event)}
                />
                <FaTrashAlt
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 cursor-pointer hover:text-red-800 transition duration-300"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total summary */}
      {cartItems.length > 0 && (
        <div className="mt-8 sm:float-right w-full sm:w-[500px]">
          <p className="text-2xl font-bold text-gray-700">Cart Total:</p>
          <div className="flex justify-between border-b-2 p-3">
            <p>Subtotal</p>
            <p>₦{total.toLocaleString()}</p>
          </div>
          <div className="flex justify-between border-b-2 p-3">
            <p>Shipping fee</p>
            <p>₦10,000</p>
          </div>
          <div className="flex justify-between border-b-2 p-3">
            <p className="font-bold text-2xl text-gray-700">Total:</p>
            <p>₦{(total + 10000).toLocaleString()}</p>
          </div>
          <div className="flex justify-end mt-3">
            <button
              className="bg-black text-white px-5 py-2 rounded-md"
              onClick={() => navigate("/place-order")}
            >
              Proceed to check out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
