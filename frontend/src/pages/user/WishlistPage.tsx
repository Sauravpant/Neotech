import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useClearWishlist, useGetMyWishlist, useRemoveFromWishlist } from "@/hooks/user/useWishlist";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyResult } from "@/components/ui/EmptyMessage";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import WishListCard from "@/components/user/wishlist/WishListCard";
import WishlistHeader from "@/components/user/wishlist/WishListHeader";
import { useAddToCart } from "@/hooks/user/useCart";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

const WishlistPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: wishlists, isLoading: wishListsLoading, isError: wishListsError, refetch } = useGetMyWishlist();
  const { mutate: clearWishlist, isPending: isClearing } = useClearWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();
  const { mutate: addToCart } = useAddToCart();
  const navigate = useNavigate();

  const wishlistItems = wishlists?.data?.products || [];

  const handleClearWishlist = () => {
    if (!isAuthenticated) return;
    clearWishlist();
  };

  const handleRemoveFromWishlist = (productId: string) => {
    if (!isAuthenticated) return;
    removeFromWishlist(productId);
  };

  const handleAddToCart = (productId: string) => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    addToCart(productId);
  };

  if (wishListsLoading) {
    return <LoadingScreen title="Loading wishlists" subtitle="Loading your wishlists items" />;
  }

  if (wishListsError) {
    return <ErrorMessage title="Failed to fetch the wishlist items" refetch={refetch} />;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 py-4 sm:py-6">
        <div className="flex flex-col items-center mx-auto px-3 sm:px-4 lg:px-6 max-w-6xl">
          <EmptyResult title="Your wishlist is empty" subtitle="Start adding products you love to your wishlist!" />
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2  cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 md:px-6 py-3 md:py-4 rounded-xl hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            Explore Products
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 py-4 sm:py-6">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-6xl">
        <WishlistHeader
          itemCount={wishlistItems.length}
          onSaleCount={wishlistItems.filter((item) => item.discount && item.discount > 0).length}
          outOfStockCount={wishlistItems.filter((item) => item.countInStock === 0).length}
          onClearWishlist={handleClearWishlist}
          isClearing={isClearing}
        />
        <WishListCard wishlists={wishlistItems} onRemove={handleRemoveFromWishlist} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default WishlistPage;
