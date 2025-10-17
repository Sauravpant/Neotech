import type { UserDetails } from "@/types/admin/user.types";
import { UserDetailsCard } from "./UserDetails";
import { useDeleteUser } from "@/hooks/admin/useAdminUsers";
import { AlertBox } from "@/components/common/AlertBox";

interface UsersTableProps {
  users: UserDetails[];
}

export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = (userId: string) => {
    deleteUser(userId);
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">SN</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Contact</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Address</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Verified</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Active</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-600 font-medium">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{user.email}</div>
                </td>
                <td className="py-3 px-4 text-gray-600">{user.contactNumber}</td>
                <td className="py-3 px-4 text-gray-600 text-xs">{user.address || "Not mentioned"}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.isVerified ? "text-green-600 bg-green-50" : "text-gray-600 bg-gray-50"
                    }`}
                  >
                    {user.isVerified ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.isDeactivated ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50"
                    }`}
                  >
                    {user.isDeactivated ? "No" : "Yes"}
                  </span>
                </td>
                <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                    <UserDetailsCard userId={user._id} />
                    <AlertBox
                      className="bg-red-500 hover:bg-red-600 text-xs text-white px-3 py-1 rounded-lg"
                      button="Delete"
                      question="Are you sure you want to delete this user"
                      description="This action will remove all the user details"
                      confirmButton="Delete"
                      cancelButton="Cancel"
                      onSubmit={handleDelete}
                      id={user._id}
                    />
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
