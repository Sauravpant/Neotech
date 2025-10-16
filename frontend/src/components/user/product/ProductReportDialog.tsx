import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DialogBoxProps {
  buttonText: string;
  title: string;
  description: string;
  isSubmitting: boolean;
  onSubmit: (data: { reason: string; description: string }) => void;
}

export const ReportProductBox: React.FC<DialogBoxProps> = ({ title, buttonText, description, isSubmitting, onSubmit }) => {
  const [reason, setReason] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const handleSubmit = () => {
    onSubmit({ reason, description: details });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonText !== "Cancel" ? "destructive" : "secondary"} className="cursor-pointer px-2 lg:px-4 py-4 lg:p-6 rounded-lg">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="reason">Reason</Label>
            <Input id="reason" type="text" onChange={(e) => setReason(e.target.value)} className=" outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="details">Description</Label>
            <Input id="details" type="text" onChange={(e) => setDetails(e.target.value)} />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant={"destructive"} className="cursor-pointer" onClick={handleSubmit}>
              {isSubmitting ? "Submitting" : buttonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
