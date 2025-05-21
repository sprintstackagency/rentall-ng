
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReviewCard } from "@/components/review-card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  userAvatar?: string;
  createdAt: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  itemId: string;
  onAddReview?: (review: Omit<Review, "id" | "createdAt" | "userName" | "userAvatar">) => Promise<void>;
}

export function ReviewsSection({ reviews, itemId, onAddReview }: ReviewsSectionProps) {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to leave a review",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    if (comment.trim() === "") {
      toast({
        title: "Comment required",
        description: "Please provide a comment for your review",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (onAddReview) {
        await onAddReview({
          rating,
          comment,
        });
      }

      // Reset form
      setRating(0);
      setComment("");
      
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message || "There was an error submitting your review",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate average rating
  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  // Group reviews by rating
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
    return { rating, count, percentage };
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Rating summary */}
        <div className="bg-muted p-6 rounded-lg md:w-1/3">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold mb-2">{averageRating}</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(parseFloat(averageRating))
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Rating breakdown */}
          <div className="space-y-2">
            {ratingCounts.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center text-sm">
                <div className="w-16 flex items-center">
                  <span>{rating}</span>
                  <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right text-muted-foreground">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review form */}
        <div className="md:w-2/3">
          <h3 className="text-lg font-medium mb-4">Write a Review</h3>
          {isAuthenticated ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="mb-2 text-sm">Your rating</p>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHoveredRating(value)}
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          value <= (hoveredRating || rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Textarea
                  placeholder="Share your experience with this equipment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>
              <Button 
                type="submit" 
                className="bg-brand hover:bg-brand-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          ) : (
            <div className="bg-muted p-6 rounded-lg text-center">
              <p className="mb-4 text-muted-foreground">
                Please log in to leave a review
              </p>
              <Button asChild variant="outline">
                <a href="/auth/login">Log In</a>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Review list */}
      <div>
        <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted rounded-lg">
            <p className="text-muted-foreground">No reviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
