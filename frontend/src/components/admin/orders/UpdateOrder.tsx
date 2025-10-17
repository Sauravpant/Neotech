import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { UpdateOrder } from "@/types/admin/order.types";
import { Edit3 } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUpdateOrderStatus } from "@/hooks/admin/useAdminOrders";

const orderStatus: string[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

interface UpdateOrderBoxProps {
  orderId: string;
}

const UpdateOrderBox: React.FC<UpdateOrderBoxProps> = ({ orderId }) => {
  const { mutate } = useUpdateOrderStatus();

  const [status, setStatus] = useState<UpdateOrder["status"]>();
  const [isPaid, setIsPaid] = useState<UpdateOrder["isPaid"]>();

  const handleSubmit = () => {
    const data: UpdateOrder = {};
    if (status) data.status = status;
    if (isPaid) data.isPaid = isPaid;
    mutate({ orderId, data });
    setStatus(undefined);
    setIsPaid(undefined);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="Edit order"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
        >
          <Edit3 className="w-3 h-3" />
          Update
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white rounded-lg border border-gray-200">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-blue-600" />
            Update Order
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label htmlFor="status" className="text-sm font-medium text-gray-700">
              Order Status
            </Label>
            <Select value={status} onValueChange={(val) => setStatus(val as UpdateOrder["status"])}>
              <SelectTrigger
                id="status"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <SelectValue placeholder="Select status..." />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                {orderStatus.map((status) => (
                  <SelectItem key={status} value={status} className="text-sm py-2 hover:bg-gray-50">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Payment Status</Label>
            <RadioGroup value={isPaid} onValueChange={(val) => setIsPaid(val as UpdateOrder["isPaid"])} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="paid-yes" className="text-blue-600 border-gray-300 focus:ring-blue-500" />
                <Label htmlFor="paid-yes" className="text-sm text-gray-700 font-normal cursor-pointer">
                  Paid
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="paid-no" className="text-blue-600 border-gray-300 focus:ring-blue-500" />
                <Label htmlFor="paid-no" className="text-sm text-gray-700 font-normal cursor-pointer">
                  Not Paid
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="flex gap-3 pt-4 border-t border-gray-200">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1 text-sm border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleSubmit} className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            Update Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrderBox;
