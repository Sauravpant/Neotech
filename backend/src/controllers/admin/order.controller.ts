import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { getOrdersSchema, updateOrderSchema } from "../../validators/admin/order.validators";
import { deleteOrderService, getAllOrdersService, getOrderStatsService, updateOrderStatusService } from "../../services/admin/order.services";
import { ApiResponse } from "../../utils/api-response";

export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const filters = getOrdersSchema.parse(req.query);
  const result = await getAllOrdersService(filters);
  return res.status(200).json(new ApiResponse(200, result, "Orders fetched successfully"));
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const status = updateOrderSchema.parse(req.body);
  const result = await updateOrderStatusService(orderId, status);
  return res.status(200).json(new ApiResponse(200, result, "Order status updated successfully"));
});

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  await deleteOrderService(orderId);
  return res.status(200).json(new ApiResponse(200, null, "Order deleted successfully"));
});

export const getOrderStats = asyncHandler(async ( req: Request, res: Response) => {
  const result = await getOrderStatsService();
  return res.status(200).json(new ApiResponse(200, result, "Order stats fetched successfully"));
});