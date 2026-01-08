import React from "react";
import { FaTruck, FaShieldAlt, FaTag, FaCreditCard } from "react-icons/fa";

const advantages = [
  {
    icon: <FaTruck className="text-red-600 w-14 h-10" />,
    title: "Express Delivery",
    subtitle: "Ships in 24 Hours",
  },
  {
    icon: <FaShieldAlt className="text-red-600 w-14 h-10" />,
    title: "Brand Warranty",
    subtitle: "100% Original products",
  },
  {
    icon: <FaTag className="text-red-600 w-14 h-10" />,
    title: "Exciting Deals",
    subtitle: "On all prepaid orders",
  },
  {
    icon: <FaCreditCard className="text-red-600 w-14 h-10" />,
    title: "Secure Payments",
    subtitle: "SSL / Secure certificate",
  },
];

const Advantages = () => {
  return (
    <section className="bg-black text-gray-500 py-12 ">
      <div className="max-w-6xl mx-auto text-center my-12">
        <h2 className="text-2xl font-bold text-grey-400">Our Advantages</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-40 my-10">
        {advantages.map((adv, index) => (
          <div
            key={index}
            className="flex items-center gap-4 max-w-xs"
          >
            {adv.icon}
            <div className="text-left">
              <h3 className="font-bold text-gray-400">{adv.title}</h3>
              <p className="text-gray-400 text-m">{adv.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advantages;
