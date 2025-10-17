import { Search } from "lucide-react";

interface UsersHeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

export const UsersHeader: React.FC<UsersHeaderProps> = ({ search, setSearch }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, address or contact number"
            className="block w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
};
