import { AlertBox } from "@/components/common/AlertBox";
import { useDeleteOrder } from "@/hooks/admin/useAdminOrders";
import { formatDate } from "@/lib/helpers";
import type { Order } from "@/types/admin/order.types";
import { OrderDetailsCard } from "./OrderDetails";
import  UpdateOrderBox from "./UpdateOrder";

interface OrdersTableProps {
  orders: Order[];
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const { mutate: deleteOrder } = useDeleteOrder();

  const handleDelete = (orderId: string) => {
    deleteOrder(orderId);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">User</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Items</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Payment</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900 text-sm">{order.user}</div>
                  <div className="text-gray-500 text-xs">{order.email}</div>
                </td>
                <td className="py-3 px-4 text-gray-600">{formatDate(order.createdAt)}</td>
                <td className="py-3 px-4">
                  <div className="text-gray-900 text-sm font-medium">
                    {order.products.reduce((total, product) => total + product.quantity, 0)} items
                  </div>
                  <div className="text-gray-500 text-xs">${order.totalPrice}</div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(order.paymentMethod)}`}>
                    {order.paymentMethod}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <OrderDetailsCard order={order} />
                    <UpdateOrderBox orderId={order._id}/>
                    <AlertBox
                      className="bg-red-500 hover:bg-red-600 text-xs text-white px-3 py-1 rounded-lg"
                      button="Delete"
                      question="Are you sure you want to delete this order?"
                      description="This action will remove all the order details"
                      confirmButton="Delete"
                      cancelButton="Cancel"
                      onSubmit={handleDelete}
                      id={order._id}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-50 text-green-700";
    case "Pending":
      return "bg-yellow-50 text-yellow-700";
    case "Processing":
      return "bg-blue-50 text-blue-700";
    case "Shipped":
      return "bg-purple-50 text-purple-700";
    case "Cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

const getPaymentColor = (method: string) => {
  return method === "Stripe" ? "bg-indigo-50 text-indigo-700" : "bg-orange-50 text-orange-700";
};
