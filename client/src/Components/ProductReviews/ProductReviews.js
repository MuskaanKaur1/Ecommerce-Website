import { useState, useEffect } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

const ProductReviews = () => {
    const { id } = useParams(); // Get product ID from URL
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: "", email: "", rating: 0, comment: "" });

    // Fetch reviews when the component mounts
    useEffect(() => {
        axios.get(`/api/reviews/${id}`)
            .then((res) => {
                console.log("Fetched Reviews:", res.data); // Debugging
                setReviews(res.data);
            })
            .catch((err) => console.error("Error fetching reviews:", err));
    }, [id]);
    

    // Handle review submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!newReview.name || !newReview.comment || newReview.rating === 0) {
            alert("Please fill in all fields and give a rating.");
            return;
        }
    
        const reviewData = { productId: id, ...newReview };
        console.log("Sending Review Data:", reviewData); // Debugging
    
        try {
            const res = await axios.post("http://localhost:4000/api/reviews", reviewData); // Fix URL
            console.log("Response from Server:", res.data); // Debugging
            setReviews([...reviews, res.data]); // Update the reviews list
            setNewReview({ name: "", email: "", rating: 0, comment: "" }); // Reset form
        } catch (error) {
            console.error("Error adding review:", error.response?.data || error);
        }
    };
    
    

    return (
        <div className="tabContent">
            <div className="row">
                <div className="col-md-8">
                    <h4>Customer question and answers</h4>

                    {reviews.map((review) => (
                        <div className="card p-3 reviewsCard flex-row" key={review._id}>
                            <div className="image">
                                <div className="rounded-circle">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1w9nrxoVTrDkakk9R221mcaniNdt8zn9Xrg&s"
                                        alt={review.name}
                                    />
                                </div>
                                <span className="text-g d-block font-weight-bold text-center">
                                    {review.name}
                                </span>
                            </div>

                            <div className="info p-3">
                                <div className="d-flex align-items-center">
                                    <h6 className="text-light">{new Date(review.date).toDateString()}</h6>
                                    <div className="ml-auto">
                                        <Rating name="read-only" value={review.rating} precision={0.5} readOnly size="small" />
                                    </div>
                                </div>
                                <p>{review.comment}</p>
                            </div>
                        </div>
                    ))}

                    <br /><br />

                    {/* Review Submission Form */}
                    <form className="reviewForm" onSubmit={handleReviewSubmit}>
                        <h4>Add a Review</h4>

                        <div className="form-group">
                            <textarea
                                className="form-control"
                                placeholder="Write a review"
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={newReview.name}
                                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                        style={{ width: "100%", height: "45px" }}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={newReview.email}
                                        onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                                        style={{ width: "100%", height: "45px" }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Rate this product:</label>
                            <Rating
                                name="user-rating"
                                value={newReview.rating}
                                precision={0.5}
                                onChange={(event, newValue) => setNewReview({ ...newReview, rating: newValue })}
                            />
                        </div>

                        <div className="form-group">
                            <Button className="btn-g btn-lg" type="submit">
                                Submit Review
                            </Button>
                        </div>
                    </form>
                </div>
                {/* Right Side - Review Summary */}
                <div className="col-md-4 pl-5">
                    <h4>Customer reviews</h4>
                    <br />
                    <div className="d-flex align-items-center mt-2">
                        <Rating name="average-rating" defaultValue={4} precision={0.5} readOnly size="small" />
                        <strong className="ml-3">4 out of 5</strong>
                    </div>
                    <br />

                    <div className="progressBarBox d-flex align-items-center">
                        <span className="mr-3">5 star</span>
                        <div className="progress" style={{ width: "80%", height: "20px" }}>
                            <div className="progress-bar bg-success" style={{ width: "95%" }}>90%</div>
                        </div>
                    </div>

                    <div className="progressBarBox d-flex align-items-center">
                        <span className="mr-3">4 star</span>
                        <div className="progress" style={{ width: "80%", height: "20px" }}>
                            <div className="progress-bar bg-success" style={{ width: "75%" }}>75%</div>
                        </div>
                    </div>

                    <div className="progressBarBox d-flex align-items-center">
                        <span className="mr-3">3 star</span>
                        <div className="progress" style={{ width: "80%", height: "20px" }}>
                            <div className="progress-bar bg-success" style={{ width: "55%" }}>55%</div>
                        </div>
                    </div>

                    <div className="progressBarBox d-flex align-items-center">
                        <span className="mr-3">2 star</span>
                        <div className="progress" style={{ width: "80%", height: "20px" }}>
                            <div className="progress-bar bg-success" style={{ width: "35%" }}>35%</div>
                        </div>
                    </div>

                    <div className="progressBarBox d-flex align-items-center">
                        <span className="mr-3">1 star</span>
                        <div className="progress" style={{ width: "80%", height: "20px" }}>
                            <div className="progress-bar bg-success" style={{ width: "25%" }}>25%</div>
                        </div>
                    </div>

            </div>
        </div>
        </div>
    );
};

export default ProductReviews;
