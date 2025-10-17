import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUpdateReview } from "@/hooks/user/useReviews";
import type { UpdateReview } from "@/types/user/review.types";
import { Edit } from "lucide-react";

interface UpdateReviewDialogProps {
  reviewId: string;
}

const UpdateReviewBox: React.FC<UpdateReviewDialogProps> = ({ reviewId }) => {
  const { mutate } = useUpdateReview();

  const [rating, setRating] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const handleSubmit = () => {
    const data: UpdateReview = {};
    if (rating) data.rating = Number(rating);
    if (comment.trim()) data.comment = comment.trim();
    mutate({ reviewId, data });
    setRating("");
    setComment("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">
          <Edit className="h-3 w-3" />
          Update
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Update Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rating" className="text-sm sm:text-base">
              Rating (1–5)
            </Label>
            <Input
              id="rating"
              type="text"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Enter your rating"
              className="text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm sm:text-base">
              Comment
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment"
              className="resize-none text-sm sm:text-base"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="mt-4 sm:mt-6">
          <DialogClose asChild>
            <Button variant="outline" className="text-sm sm:text-base">
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleSubmit} className="text-sm sm:text-base">
            Update Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateReviewBox;
