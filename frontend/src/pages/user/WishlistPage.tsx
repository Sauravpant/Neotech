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
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-6xl">
          <EmptyResult title="Your wishlist is empty" subtitle="Start adding products you love to your wishlist!" />
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
