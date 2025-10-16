import React from "react";
import { Package, Clock, Truck, CheckCircle, XCircle, MapPin, CreditCard, Calendar, Wallet } from "lucide-react";
import type { OrderResponse } from "@/types/user/order.types";
import { formatDate, formatPrice } from "@/lib/helpers";
import { OrderDetails } from "./OrderDetails";
import { useCancelOrder } from "@/hooks/user/useOrders";

interface OrdersCardProps {
  order: OrderResponse;
}

const OrdersCard: React.FC<OrdersCardProps> = ({ order }) => {
  const { mutate } = useCancelOrder();

  const handleCancelOrder = (orderId: string) => {
    mutate(orderId);
  };

  const canCancel = order.status === "Pending" || order.status === "Processing";

  return (
    <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 space-y-2 sm:space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="font-medium text-sm sm:text-base text-gray-900">Order #{order._id.slice(-8)}</span>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              <span className="hidden sm:inline">{order.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
              <span className="text-sm sm:text-base font-bold text-gray-900">{formatPrice(order.totalPrice)}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                {getPaymentMethodIcon(order.paymentMethod)}
                <span className="text-xs sm:text-sm text-gray-600">{order.paymentMethod}</span>
              </div>

              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${order.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-xs sm:text-sm text-gray-600">{order.isPaid ? "Paid" : "Unpaid"}</span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-1">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{order.shippingAddress}</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Ordered: {formatDate(order.createdAt)}</span>
            </div>
            {order.paidAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Paid: {formatDate(order.paidAt)}</span>
              </div>
            )}
          </div>
          <OrderDetails orderId={order._id} />
        </div>
        {canCancel && (
          <div className="flex sm:flex-col gap-2 sm:gap-3">
            <button
              onClick={() => handleCancelOrder(order._id)}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-all duration-200 text-xs sm:text-sm font-medium"
            >
              <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersCard;

const getStatusIcon = (status: OrderResponse["status"]) => {
  switch (status) {
    case "Pending":
      return <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />;
    case "Processing":
      return <Package className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />;
    case "Shipped":
      return <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />;
    case "Delivered":
      return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />;
    case "Cancelled":
      return <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />;
    default:
      return <Package className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />;
  }
};

const getPaymentMethodIcon = (method: string) => {
  switch (method.toLowerCase()) {
    case "stripe":
      return <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />;
    case "cod":
      return <Wallet className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />;
    default:
      return <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />;
  }
};

const getStatusColor = (status: OrderResponse["status"]) => {
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
