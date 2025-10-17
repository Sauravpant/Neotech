import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit3 } from "lucide-react";
import type { UpdateCategory } from "@/types/admin/category.types";
import { useUpdateCategory } from "@/hooks/admin/useAdminCategories";

interface UpdateCategoryDialogProps {
  categoryId: string;
}

const UpdateCategoryCard: React.FC<UpdateCategoryDialogProps> = ({ categoryId }) => {
  const { mutate } = useUpdateCategory();
  const [form, setForm] = useState<UpdateCategory>({ name: "", slug: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const data: UpdateCategory = {};
    if (form.name !== undefined && form.name.trim()) data.name = form.name.trim();
    if (form.slug !== undefined && form.slug.trim()) data.slug = form.slug.trim();
    if (form.description !== undefined && form.description.trim()) data.description = form.description.trim();
    mutate({ categoryId, data });
    setForm({ name: "", slug: "", description: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
          <Edit3 className="h-3 w-3" />
          Update
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-800">Update Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={form.name || ""} onChange={handleChange} placeholder="Enter new name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" value={form.slug || ""} onChange={handleChange} placeholder="Enter new slug" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              placeholder="Update description..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="mt-5 flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryCard;
