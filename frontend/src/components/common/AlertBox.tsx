import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type React from "react";

interface AlertBoxProps {
  id: string;
  button: string;
  question: string;
  description: string;
  cancelButton: string;
  confirmButton: string;
  onSubmit: (id: string) => void;
  className?: string;
}
import { cn } from "@/lib/utils";

export const AlertBox: React.FC<AlertBoxProps> = ({ id, button, question, description, cancelButton, confirmButton, onSubmit, className }) => {
  const handleSubmit = () => {
    onSubmit(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className={cn("bg-gray-50 cursor-pointer", className)}>
          {button}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{question}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">{cancelButton}</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer bg-red-500 hover:bg-red-400" onClick={handleSubmit}>
            {confirmButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
