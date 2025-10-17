import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { User, Mail, Phone, MapPin, ShieldCheck, Ban, FileText, ClipboardList, CheckCircle2, XCircle, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetUserById } from "@/hooks/admin/useAdminUsers";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export const UserDetailsCard = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useGetUserById(userId);
  const user = data?.data;

  if (isLoading) {
    return <LoadingScreen title="Loading user" subtitle="Loading user details" />;
  }

  if (!user) return null;

  const getStatusBadge = (isDeactivated: boolean) =>
    isDeactivated ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 px-3 py-1 text-xs border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white border border-gray-200 p-4 sm:p-6 rounded-lg">
        <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
          <img
            src={user.imageUrl || "/default-avatar.png"}
            alt={user.name}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gray-200 object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{user.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border", getRoleColor(user.role))}>
                {user.role === "admin" ? <Crown className="w-3 h-3" /> : <User className="w-3 h-3" />}
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-3 py-4">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600">Contact</p>
              <p className="text-sm font-medium text-gray-900">{user.contactNumber || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600">Address</p>
              <p className="text-sm font-medium text-gray-900">{user.address || "Not provided"}</p>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-4 rounded-lg border border-gray-100 bg-gray-50 space-y-3">
          <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Account Status
          </h4>
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full border",
                user.isVerified ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
              )}
            >
              {user.isVerified ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
              {user.isVerified ? "Verified" : "Not Verified"}
            </span>

            <span
              className={cn("flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full border", getStatusBadge(user.isDeactivated))}
            >
              {user.isDeactivated ? <Ban className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
              {user.isDeactivated ? "Deactivated" : "Active"}
            </span>
          </div>
        </div>
        <div className="p-3 sm:p-4 rounded-lg border border-gray-100 bg-white space-y-3">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-green-600" />
            Activity Summary
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                Total Orders
              </span>
              <span className="text-sm font-semibold text-gray-900">{user.totalOrders || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-gray-400" />
                Reports Made
              </span>
              <span className="text-sm font-semibold text-gray-900">{user.reportsMade || 0}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    default:
      return "bg-blue-50 text-blue-700 border-blue-200";
  }
};
