import { useDeleteAccount } from "@/hooks/user/useAuth";
import { Loader } from "lucide-react";
import { useState } from "react";

const DeleteAccountButton = () => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const { mutate, isPending } = useDeleteAccount();
  const handleDelete = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    mutate();
  };

  return (
    <div>
      {isConfirming ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <p className="text-[#EF4444] font-medium">This action cannot be undone. Are you sure?</p>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-[#DC2626] text-white rounded-xl hover:bg-[#B91C1C] focus:outline-none focus:ring-2 focus:ring-[#DC2626] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Permanently Delete Account
            </button>
            <button
              onClick={() => setIsConfirming(false)}
              className="px-4 py-2 bg-[#E2E8F0] text-[#64748B] rounded-xl hover:bg-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#94A3B8] transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-4 py-2 bg-[#DC2626] text-white rounded-xl hover:bg-[#B91C1C] focus:outline-none focus:ring-2 focus:ring-[#DC2626] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        >
          {isPending ? <Loader className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mx-auto" /> : "Delete Account"}
        </button>
      )}
    </div>
  );
};

export default DeleteAccountButton;
