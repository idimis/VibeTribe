"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  eventName: string;
  customerName: string;
  rating: number;
  review: string;
}

const BASE_URL = "http://localhost:8080";

const ReviewPopup: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/reviews`);
        const data = await response.json();
        if (data.success && data.data && data.data.content) {
          setReviews(data.data.content); // Set reviews based on response content
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div className="relative w-full max-w-[1440px] mx-auto p-6">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Event Reviews
      </h2>
      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <AnimatePresence>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mb-6"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVariants}
              transition={{ duration: 0.5, delay: index * 0.3 }}  // Stagger animation delay for each review
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center text-xl font-semibold text-gray-600">
                  {review.customerName[0]}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {review.customerName}
                  </p>
                  <p className="text-xs text-gray-500">{review.eventName}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic mb-3">"{review.review}"</p>
              <p className="text-yellow-500 text-sm font-bold">
                Rating: {review.rating} / 5
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewPopup;
