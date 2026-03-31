import React, { useEffect, useState } from "react";
import "../../styles/table.css";
import "../../styles/filter.css";
import { useReviews } from "../../../hooks/useReviews";

const Reviews = () => {
  const {
    reviews,
    loading,
    error,
    fetchReviews,
    approveReview,
    rejectReview,
    stats,
    fetchReviewStats,
  } = useReviews();
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    fetchReviews({ isApproved: filter === "approved" });
    fetchReviewStats();
  }, [filter]);

  return (
    <div className="page" id="page-reviews">
      <div className="page-header">
        <div>
          <div className="page-title-lg">Reviews & Ratings</div>
          <div className="page-sub">
            {stats?.totalReviews || 0} total reviews
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className={`tag-filter${filter === "pending" ? " active" : ""}`}
            onClick={() => setFilter("pending")}>
            Pending ({stats?.pendingReviews || 0})
          </button>
          <button
            className={`tag-filter${filter === "approved" ? " active" : ""}`}
            onClick={() => setFilter("approved")}>
            Approved ({stats?.approvedReviews || 0})
          </button>
        </div>
      </div>

      {stats && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
          }}>
          <div
            className="card"
            style={{ padding: "16px", textAlign: "center" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--red)",
              }}>
              {stats.avgRating}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Average Rating
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center" }}>
          Loading reviews...
        </div>
      ) : error ? (
        <div
          style={{ padding: "40px", textAlign: "center", color: "var(--red)" }}>
          Error: {error}
        </div>
      ) : (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Dish Name</th>
                  <th>Customer</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id}>
                    <td>{review.dishId?.name}</td>
                    <td>
                      {review.userId?.fName} {review.userId?.lName}
                    </td>
                    <td>
                      <span
                        style={{ color: "var(--saffron)", fontWeight: "600" }}>
                        {"⭐".repeat(review.rating)} ({review.rating}/5)
                      </span>
                    </td>
                    <td
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "12px",
                        maxWidth: "200px",
                      }}>
                      {review.comment}
                    </td>
                    <td>
                      {!review.isApproved && (
                        <>
                          <button
                            className="btn btn-sm"
                            style={{
                              background: "rgba(16,185,129,0.1)",
                              color: "#10B981",
                              marginRight: "4px",
                            }}
                            onClick={() => approveReview(review._id)}>
                            Approve
                          </button>
                          <button
                            className="btn btn-sm"
                            style={{
                              background: "rgba(239,68,68,0.1)",
                              color: "#EF4444",
                            }}
                            onClick={() => rejectReview(review._id)}>
                            Reject
                          </button>
                        </>
                      )}
                      {review.isApproved && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "var(--completed)",
                          }}>
                          ✓ Approved
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
