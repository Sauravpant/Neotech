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
import { Plus } from "lucide-react";
import type { AddProduct } from "@/types/admin/product.types";
import { useCreateProduct } from "@/hooks/admin/useAdminProducts";

const AddProductCard = () => {
  const { mutate, isPending } = useCreateProduct();

  const [form, setForm] = useState<Omit<AddProduct, "productImage">>({
    name: "",
    description: "",
    price: 0,
    category: "",
    discount: 0,
    countInStock: 0,
  });
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["price", "discount", "countInStock"].includes(name) ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setProductImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!form.name || !form.description || !form.price || !form.category || !form.countInStock || !productImage) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, String(value)));
    formData.append("productImage", productImage);

    mutate(formData);
    setForm({ name: "", description: "", price: 0, category: "", discount: 0, countInStock: 0 });
    setProductImage(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-xl border border-gray-200 bg-white p-4 sm:p-6 max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader className="border-b border-gray-100 pb-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">Add New Product</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">Fill in product details and click Add Product to create one.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Product Name
            </Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="resize-none w-full max-w-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              wrap="soft"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                Price ($)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount" className="text-sm font-medium text-gray-700">
                Discount (%)
              </Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                value={form.discount || ""}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="countInStock" className="text-sm font-medium text-gray-700">
                Stock Count
              </Label>
              <Input
                id="countInStock"
                name="countInStock"
                type="number"
                value={form.countInStock}
                onChange={handleChange}
                placeholder="Available units"
                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category ID or name"
                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productImage" className="text-sm font-medium text-gray-700">
              Product Image
            </Label>
            <Input
              id="productImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            {productImage && <p className="text-xs text-gray-500 mt-1">{productImage.name}</p>}
          </div>
        </div>

        <DialogFooter className="flex gap-3 pt-4 border-t border-gray-100">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isPending} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
            Add Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductCard;
