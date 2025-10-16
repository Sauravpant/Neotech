import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Package, MapPin, CreditCard, Truck, DollarSign, CheckCircle2, XCircle, Clock, Zap, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetOrderById } from "@/hooks/user/useOrders";

interface OrderDetailsProps {
  orderId: string;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const { data } = useGetOrderById(orderId);
  const order = data?.data;
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-blue-600 text-white border-none shadow-sm hover:bg-blue-700 transition-all text-xs lg:text-sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] max-h-[85vh] overflow-y-auto bg-white border border-gray-200 p-4 sm:p-6 rounded-xl space-y-4">
        <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Order #{order.id.slice(-8)}
            </h3>
            <span className={cn("flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border", getStatusColor(order.status))}>
              {getStatusIcon(order.status)}
              {order.status}
            </span>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <p>👤 {order.user}</p>
            <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            Shipping & Payment
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>Address: {order.shippingAddress}</span>
            </p>
            <p className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <span>Method: {order.paymentMethod}</span>
            </p>
            <p className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span>
                Paid:{" "}
                {order.isPaid ? (
                  <span className="text-green-600">Yes ({new Date(order.paidAt!).toLocaleString()})</span>
                ) : (
                  <span className="text-red-600">No</span>
                )}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <span>
                Delivered:{" "}
                {order.isDelivered ? (
                  <span className="text-green-600">Yes ({order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : "N/A"})</span>
                ) : (
                  <span className="text-amber-600">No</span>
                )}
              </span>
            </p>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-green-600" />
            Ordered Products
          </h3>
          <div className="space-y-3">
            {order.products.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 hover:border-blue-300 transition-all"
              >
                <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover border border-gray-300" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                  <p className="text-xs text-gray-600">
                    {item.quantity} × ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-blue-700">${(item.quantity * item.product.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-blue-200 bg-blue-50 text-center">
          <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2 flex justify-center items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Total Price
          </h3>
          <p className="text-lg lg:text-xl font-bold text-blue-800">${order.totalPrice.toFixed(2)}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Pending":
      return <Clock className="w-3 h-3" />;
    case "Processing":
      return <Zap className="w-3 h-3" />;
    case "Shipped":
      return <Truck className="w-3 h-3" />;
    case "Delivered":
      return <CheckCircle2 className="w-3 h-3" />;
    case "Cancelled":
      return <XCircle className="w-3 h-3" />;
    default:
      return <Clock className="w-3 h-3" />;
  }
};
