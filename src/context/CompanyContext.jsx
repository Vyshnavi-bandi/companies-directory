import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const CompanyContext = createContext();

export const useCompanies = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // filters
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("All");
  
  // view mode: 'card' or 'table'
  const [viewMode, setViewMode] = useState("card");
  
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://companies-api-fxob.onrender.com/companies");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // derive unique industries and locations
  const industries = useMemo(
    () => ["All", ...Array.from(new Set(companies.map((c) => c.industry)))],
    [companies]
  );
  const locations = useMemo(
    () => ["All", ...Array.from(new Set(companies.map((c) => c.location)))],
    [companies]
  );

  // filtered results
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return companies.filter((c) => {
      if (industry !== "All" && c.industry !== industry) return false;
      if (location !== "All" && c.location !== location) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        (c.description || "").toLowerCase().includes(q)
      );
    });
  }, [companies, search, industry, location]);

  // paginated results
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  }, [filtered, currentPage, itemsPerPage]);

  // pagination info
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const totalItems = filtered.length;

  // pagination functions
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, industry, location]);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        loading,
        error,
        search,
        setSearch,
        industry,
        setIndustry,
        location,
        setLocation,
        industries,
        locations,
        filtered,
        paginatedResults,
        viewMode,
        setViewMode,
        // pagination
        currentPage,
        itemsPerPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleItemsPerPageChange,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
