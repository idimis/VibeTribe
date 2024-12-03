"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Event {
  id: string;
  title: string;
  description: string;
}

const ReviewPage: React.FC = () => {
  const params = useParams();
  const eventId = params?.id; // Assuming the event ID comes from the URL
  const [event, setEvent] = useState<Event | null>(null);
  const [reviews, setReviews] = useState<Array<{ rating: number; comment: string; user: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newReview, setNewReview] = useState<{ rating: number; comment: string }>({ rating: 0, comment: "" });

  useEffect(() => {
    if (!eventId) return;

    const fetchEventDetails = async () => {
      try {
        const res = await fetch(`/api/v1/events/${eventId}`);
        const data = await res.json();
        setEvent(data.event);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleReviewSubmit = async () => {
    if (!newReview.rating || !newReview.comment) {
      alert("Please provide a rating and comment.");
      return;
    }

    try {
      const res = await fetch(`/api/v1/events/${eventId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      const newReviewData = await res.json();
      setReviews((prev) => [...prev, newReviewData]);
      setNewReview({ rating: 0, comment: "" }); // Reset the form
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-16 text-lg">Loading...</div>;
  }

  if (!event) {
    return <div className="text-center mt-16 text-lg text-gray-600">Event not found.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">{event.title}</h1>
      <p className="text-gray-700 mb-8">{event.description}</p>

      {/* Reviews Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Reviews</h2>
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review, index) => (
              <li key={index} className="p-4 border rounded-lg bg-gray-50">
                <p className="text-lg font-medium">Rating: {review.rating} / 5</p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500">- {review.user}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
        )}
      </section>

      {/* Add Review Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Leave a Review</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Rating (1-5)</label>
          <input
            type="number"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
            className="w-full p-2 border rounded-lg"
            min={1}
            max={5}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Comment</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={4}
          />
        </div>
        <button
          onClick={handleReviewSubmit}
          className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition"
        >
          Submit Review
        </button>
      </section>
    </div>
  );
};

export default ReviewPage;
