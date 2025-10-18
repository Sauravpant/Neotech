import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSendOtp } from "@/hooks/user/useAuth";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { toast } from "react-hot-toast";

export function ForgetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useSendOtp();
  const [email, setEmail] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync(email).then(() => {
      navigate("/auth/reset-password");
    }).catch(err => {
      toast.error(getErrorMessage(err) || "Failed to send OTP");
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">Welcome to NeoTech</h1>
            <div className="text-center text-sm">
              Enter the email below to recieve OTP
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email"> Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              {isPending ? <LoaderIcon className="animate-spin" /> : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
