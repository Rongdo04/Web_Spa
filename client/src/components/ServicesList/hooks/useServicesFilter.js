import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { servicesAPI, categoriesAPI } from "../../../services/public";

const useServicesFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    priceRange: searchParams.get("priceRange") || "all",
    duration: searchParams.get("duration") || "all",
    sort: searchParams.get("sort") || "newest",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 9,
  });

  const searchTimeoutRef = useRef(null);

  // Reset to page 1 when search, category, or sort changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [filters.search, filters.category, filters.sort]);

  // Load services and categories from API
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Load services with server-side pagination and sorting
        const servicesParams = {
          page: currentPage,
          limit: pagination.itemsPerPage,
          ...(filters.search && { search: filters.search }),
          ...(filters.category && { category: filters.category }),
          ...(filters.sort && { sort: filters.sort }),
        };

        const [servicesResponse, categoriesResponse] = await Promise.all([
          servicesAPI.getServices(servicesParams),
          categoriesAPI.getCategories({ limit: 1000 }), // Lấy tất cả categories không filter theo level
        ]);

        if (servicesResponse.services) {
          setServices(servicesResponse.services || []);
          // Update pagination from API response
          if (servicesResponse.pagination) {
            setPagination((prev) => ({
              ...prev,
              currentPage: servicesResponse.pagination.currentPage,
              totalPages: servicesResponse.pagination.totalPages,
              totalItems: servicesResponse.pagination.totalItems,
              itemsPerPage: servicesResponse.pagination.itemsPerPage,
            }));
          }
        }

        if (categoriesResponse.categories) {
          console.log(
            "🔍 Categories loaded:",
            categoriesResponse.categories.length,
            "categories"
          );
          console.log(
            "🔍 Categories by level:",
            categoriesResponse.categories.reduce((acc, cat) => {
              acc[cat.level] = (acc[cat.level] || 0) + 1;
              return acc;
            }, {})
          );
          setCategories(categoriesResponse.categories || []);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [
    currentPage,
    filters.search,
    filters.category,
    filters.sort,
    pagination.itemsPerPage,
  ]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.priceRange !== "all")
      params.set("priceRange", filters.priceRange);
    if (filters.duration !== "all") params.set("duration", filters.duration);
    if (filters.sort !== "newest") params.set("sort", filters.sort);
    if (currentPage > 1) params.set("page", currentPage.toString());

    setSearchParams(params);
  }, [filters, currentPage, setSearchParams]);

  // Filter services (client-side filters only - price range and duration)
  const filteredAndSortedServices = useMemo(() => {
    let filtered = [...services];

    // Price range filter (client-side)
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((service) => {
        const price = service.price;
        return price >= min && price <= max;
      });
    }

    // Duration filter (client-side)
    if (filters.duration !== "all") {
      const [min, max] = filters.duration.split("-").map(Number);
      filtered = filtered.filter((service) => {
        const duration = service.duration;
        return duration >= min && duration <= max;
      });
    }

    return filtered;
  }, [services, filters.priceRange, filters.duration]);

  // Use services directly from API (already paginated by server)
  const paginatedServices = filteredAndSortedServices;

  // Use pagination data from API
  const totalPages = pagination.totalPages;

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.priceRange !== "all") count++;
    if (filters.duration !== "all") count++;
    return count;
  }, [filters]);

  // Filter change handler
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Search handler with debounce
  const handleSearch = (searchTerm) => {
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout
    searchTimeoutRef.current = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchTerm,
      }));
      setCurrentPage(1);
    }, 300); // 300ms debounce
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      priceRange: "all",
      duration: "all",
      sort: "newest",
    });
    setCurrentPage(1);
  };

  return {
    filters,
    currentPage,
    totalPages,
    paginatedServices,
    filteredAndSortedServices,
    activeFiltersCount,
    categories,
    loading,
    error,
    pagination,
    handleFilterChange,
    handleSearch,
    clearFilters,
    setCurrentPage,
  };
};

export { useServicesFilter };
