import { useDeactivateAccount } from "@/hooks/user/useUser";
import { useState } from "react";

const DeactivateAccountButton = () => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const { mutateAsync } = useDeactivateAccount();
  const handleDeactivate = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    await mutateAsync();
  };

  return (
    <div>
      {isConfirming ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <p className="text-[#EF4444] font-medium">Are you sure?</p>
          <div className="flex gap-3">
            <button
              onClick={handleDeactivate}
              className="px-4 py-2 bg-[#EF4444] text-white rounded-xl hover:bg-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#EF4444] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Confirm Deactivation
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
          onClick={handleDeactivate}
          className="px-4 py-2 bg-[#EF4444] text-white rounded-xl hover:bg-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#EF4444] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        >
          Deactivate Account
        </button>
      )}
    </div>
  );
};

export default DeactivateAccountButton;
