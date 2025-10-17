import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit3 } from "lucide-react";
import type { UpdateProduct } from "@/types/admin/product.types";
import { useUpdateProduct } from "@/hooks/admin/useAdminProducts";

interface UpdateProductDialogProps {
  productId: string;
  initialData?: {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    discount?: number;
    countInStock?: number;
  };
}

const UpdateProductCard: React.FC<UpdateProductDialogProps> = ({ productId, initialData }) => {
  const { mutate, isPending } = useUpdateProduct();

  const [form, setForm] = useState<UpdateProduct>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || undefined,
    category: initialData?.category || "",
    discount: initialData?.discount || undefined,
    countInStock: initialData?.countInStock || undefined,
    productImage: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "discount" || name === "countInStock" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, productImage: e.target.files![0] }));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") formData.append(key, value as any);
    });
    mutate({ productId, data: formData });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">
          <Edit3 className="h-3 w-3" />
          Update
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl p-6 overflow-y-auto max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-800">Update Product</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">Update only the fields you want to change. Leave others blank.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" value={form.name || ""} onChange={handleChange} placeholder="Enter product name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              placeholder="Enter product description"
              className="resize-none w-full max-w-md border-gray-300"
              wrap="soft"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" name="price" type="number" value={form.price ?? ""} onChange={handleChange} placeholder="Enter price" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input id="discount" name="discount" type="number" value={form.discount ?? ""} onChange={handleChange} placeholder="Optional" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="countInStock">Stock Count</Label>
              <Input
                id="countInStock"
                name="countInStock"
                type="number"
                value={form.countInStock ?? ""}
                onChange={handleChange}
                placeholder="Available units"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" value={form.category || ""} onChange={handleChange} placeholder="Category ID or name" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productImage">Product Image</Label>
            <Input id="productImage" type="file" accept="image/*" onChange={handleFileChange} />
            {form.productImage && <p className="text-xs text-gray-500 mt-1">{form.productImage.name}</p>}
          </div>
        </div>

        <DialogFooter className="mt-5 flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isPending}>
            Update Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductCard;
