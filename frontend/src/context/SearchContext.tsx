import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface Search {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchContext = createContext<Search | undefined>(undefined);

const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>("");

  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
};

export default SearchContextProvider;
