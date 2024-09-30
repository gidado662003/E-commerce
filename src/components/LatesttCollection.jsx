import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router";
function LatesttCollection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterdata, setFilterData] = useState([]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState([]);
  const url = `https://dummyjson.com/products`;
  const { toast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setData(data.products);
        setFilterData(data.products.sort(() => Math.random() - 0.5));
      })
      .catch((error) => console.error("Error:", error));

    const prev = localStorage.getItem("email");
    if (prev) {
      setEmail(JSON.parse(prev));
    }
  }, []);

  const handleSubscribe = () => {
    if (!input.includes("@") || !input.includes(".")) {
      alert("Please enter a valid email address");
    } else {
      if (email.includes(input)) {
        toast({
          variant: "destructive",
          title: "Uh oh! Email already exists.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        setEmail((prev) => [...prev, input]);
        toast({
          variant: "success",
          title: "Subscribed successfully!",
          description: "You've been subscribed with the email address.",
        });
      }
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      localStorage.setItem("email", JSON.stringify(email));
    }
  }, [email]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1.1 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-1 text-[35px]">
          <h2>
            LATEST <span className="font-bold">COLLECTION</span>{" "}
          </h2>
          <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
        </p>
      </motion.div>

      {/* LATEST COLLECTION */}
      <div className="mt-5">
        <div className="flex justify-center">
          {loading && (
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="gray"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          )}
        </div>
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.1 }}
            className="grid  md:grid-cols-5 grid-cols-2 justify-center items-center gap-x-4"
          >
            {data.slice(0, 10).map((products) => (
              <div
                key={products.id}
                className="text-center shadow-md py-3 cursor-pointer"
                onClick={() => navigate(`/product/${products.id}`)}
              >
                <img
                  src={products.thumbnail}
                  alt=""
                  className="object-cover w-full h-48"
                />
                <p>{products.title}</p>
                <p>₦{(products.price * 1500).toLocaleString()}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* BEST SELLER */}
      <div className="mt-[90px]">
        <div className="flex items-center justify-center gap-1 text-[35px]">
          <h2>
            <span className="text-gray-800">BEST</span>{" "}
            <span className="font-bold">SELLER</span>{" "}
          </h2>
          <p className="w-8 md:w-20 h-[1px] bg-[#414141]"></p>
        </div>
        <div className="flex justify-center">
          {loading && (
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="gray"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          )}
        </div>
        <div className="grid grid-cols-3 gap-20">
          {filterdata.slice(0, 3).map((items) => (
            <div key={items.id} className="text-center shadow-md py-3">
              <img
                src={items.thumbnail}
                alt=""
                className="object-cover w-full h-48"
              />
              <p>{items.title}</p>
              <p>₦{(items.price * 1500).toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Subscribe Section */}
        <div className="flex justify-center my-[300px] text-center">
          <div>
            <h1 className="mb-2 text-[25px]">Subscribe now & get 20% off</h1>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email id"
                value={input}
                className="py-3 indent-3 border-2 w-[300px] sm:min-w-[420px] focus:border-red-700"
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="bg-black text-white px-3"
                onClick={handleSubscribe}
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatesttCollection;
