import { AlertBox } from "@/components/common/AlertBox";
import { useDeleteReview } from "@/hooks/admin/useAdminReviews";
import type { UserReviews } from "@/types/admin/review.types";
import { Star } from "lucide-react";

interface ReviewsTableProps {
  reviews: UserReviews[];
}

export const ReviewsTable: React.FC<ReviewsTableProps> = ({ reviews }) => {
  const { mutate: deleteReview } = useDeleteReview();

  const handleDelete = (id: string) => {
    deleteReview(id);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">SN</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Reviewed By</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Product</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Rating</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Comment</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.map((review, index) => (
              <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-600 font-medium">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900 text-sm">{review.reviewedBy}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900 text-sm">{review.reviewedProduct}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                    <span className="text-xs text-gray-500 ml-1">({review.rating})</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600 text-sm max-w-[200px] truncate" title={review.comment}>
                    {review.comment || "No comment"}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <AlertBox
                    className="bg-red-500 hover:bg-red-600 text-xs text-white px-3 py-1 rounded-lg"
                    button="Delete"
                    question="Are you sure you want to delete this review?"
                    description="This action will remove all the review details"
                    confirmButton="Delete"
                    cancelButton="Cancel"
                    onSubmit={handleDelete}
                    id={review._id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star key={index} className={`h-3 w-3 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
  ));
};
