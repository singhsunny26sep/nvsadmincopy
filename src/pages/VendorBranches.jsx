import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Search,
  Store,
  MapPin,
  ArrowLeft,
  Loader2,
  XCircle,
  Hash,
  List,
  Building2,
  Navigation,
  Calendar,
  Check,
  X,
  Plus,
} from "lucide-react";
import { usersAPI, vendorsAPI } from "../components/api/api";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const VendorBranches = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchMode, setSearchMode] = useState("id");
  const [vendorId, setVendorId] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    shopOrBuildingNumber: "",
    address: "",
    area: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    zipcode: "",
    coordinates: { latitude: "", longitude: "" },
    isDefault: false,
  });
  const searchTimeoutRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchBranches = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await vendorsAPI.getBranches(id);
      let data = [];
      if (response.data?.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data?.data && typeof response.data.data === "object") {
        data = [response.data.data];
      }
      setBranches(data);
      setVendorId(id);
    } catch (err) {
      console.error("Error fetching branches:", err);
      setError("Failed to fetch branches. Please check the Vendor ID.");
      setBranches([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleNameSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    setSearchLoading(true);
    try {
      const response = await usersAPI.getUsers({ role: "vendor", limit: 100 });
      let vendors = [];
      if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
        vendors = response.data.data.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        vendors = response.data.data;
      }
      const filtered = vendors.filter(
        (v) =>
          v.name?.toLowerCase().includes(query.toLowerCase()) ||
          v.shopName?.toLowerCase().includes(query.toLowerCase()) ||
          v.mobile?.includes(query)
      );
      setSearchResults(filtered);
      setShowResults(filtered.length > 0);
    } catch (err) {
      console.error("Error searching vendors:", err);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchMode === "name" && value.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        handleNameSearch(value);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    if (searchMode === "id") {
      setVendorName("");
      fetchBranches(searchInput.trim());
      setShowResults(false);
    } else {
      if (searchResults.length === 1) {
        setVendorId(searchResults[0]._id);
        setVendorName(searchResults[0].name || searchResults[0].shopName || "");
        fetchBranches(searchResults[0]._id);
        setShowResults(false);
      } else if (searchResults.length > 1) {
        setShowResults(true);
      } else {
        setError("No vendor found matching your search.");
        setBranches([]);
      }
    }
  };

  const handleVendorClick = (vendor) => {
    setVendorId(vendor._id);
    setVendorName(vendor.name || vendor.shopName || "");
    setShowResults(false);
    fetchBranches(vendor._id);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      shopOrBuildingNumber: "",
      address: "",
      area: "",
      city: "",
      district: "",
      state: "",
      country: "India",
      zipcode: "",
      coordinates: { latitude: "", longitude: "" },
      isDefault: false,
    });
    setFormError(null);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("coordinates.")) {
      const coordField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        coordinates: { ...prev.coordinates, [coordField]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCreateBranch = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      const payload = {
        name: formData.name || undefined,
        shopOrBuildingNumber: formData.shopOrBuildingNumber || undefined,
        address: formData.address || undefined,
        area: formData.area || undefined,
        city: formData.city || undefined,
        district: formData.district || undefined,
        state: formData.state || undefined,
        country: formData.country || undefined,
        zipcode: formData.zipcode || undefined,
        coordinates: [
          formData.coordinates.latitude || undefined,
          formData.coordinates.longitude || undefined,
        ].filter((v) => v !== undefined && v !== ""),
        isDefault: formData.isDefault,
      };
      const response = await vendorsAPI.createBranch(vendorId, payload);
      setShowCreateForm(false);
      resetForm();
      await fetchBranches(vendorId);
    } catch (err) {
      console.error("Error creating branch:", err);
      setFormError(
        err.response?.data?.message || "Failed to create branch. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (isDefault) => {
    if (isDefault) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <Check className="h-3 w-3" />
          Default
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <X className="h-3 w-3" />
        Not Default
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Vendor Branches
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                View branch details for any vendor
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  searchMode === "id"
                    ? "Enter Vendor ID (e.g., 6aa72b7afeb1f26d7a6ba2a0)"
                    : "Search by vendor name, shop name, or phone..."
                }
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-11 pr-24 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white outline-none transition-all duration-200 hover:border-green-300 text-sm"
              />
              {searchMode === "name" && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {searchLoading && (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  )}
                </div>
              )}
              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div
                  ref={resultsRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 max-h-64 overflow-y-auto"
                >
                  {searchResults.map((vendor) => (
                    <button
                      key={vendor._id}
                      onClick={() => handleVendorClick(vendor)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors border-b border-gray-50 last:border-b-0 text-left"
                    >
                      <div className="h-9 w-9 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-green-700">
                          {(vendor.name || "V").charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {vendor.name || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {vendor.shopName || "N/A"} • {vendor.mobile || "N/A"}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                          vendor.isActive !== false
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {vendor.isActive !== false ? "Active" : "Inactive"}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                <button
                  onClick={() => {
                    setSearchMode("id");
                    setSearchInput("");
                    setSearchResults([]);
                    setShowResults(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    searchMode === "id"
                      ? "bg-white text-green-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Hash className="inline h-3 w-3 mr-1" />
                  ID
                </button>
                <button
                  onClick={() => {
                    setSearchMode("name");
                    setSearchInput("");
                    setSearchResults([]);
                    setShowResults(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    searchMode === "name"
                      ? "bg-white text-green-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="inline h-3 w-3 mr-1" />
                  Name
                </button>
              </div>
              <button
                onClick={handleSearch}
                disabled={!searchInput.trim() || loading || searchLoading}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3.5 rounded-xl hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25 transition-all duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {loading || searchLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Search
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {searchMode === "id"
              ? "Enter the Vendor ID to view branches."
              : "Type to search by vendor name, shop name, or phone number. Click a result to view branches."}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setBranches([]);
                setVendorId("");
                setVendorName("");
                setSearchInput("");
              }}
              className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear
            </button>
          </div>
        )}

        {/* Vendor Info Banner */}
        {vendorId && !loading && (
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 rounded-2xl mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Store className="h-6 w-6 text-white" />
              <div>
                <h2 className="text-lg font-bold text-white">
                  {vendorName || "Vendor Branches"}
                </h2>
                <p className="text-sm text-green-100">
                  Vendor ID: {vendorId}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-green-100">
                {branches.length} branch{branches.length !== 1 ? "es" : ""} found
              </span>
              <button
                onClick={() => {
                  resetForm();
                  setShowCreateForm(true);
                }}
                className="inline-flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-xl hover:bg-green-50 shadow-lg transition-all duration-200 font-medium text-sm"
              >
                <Plus className="h-4 w-4" />
                Create Branch
              </button>
            </div>
          </div>
        )}

        {/* Branches Loading */}
        {loading && (
          <div className="py-20 text-center">
            <div className="relative inline-flex">
              <div className="w-12 h-12 border-4 border-green-100 rounded-full"></div>
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-sm text-gray-500 font-medium">
              Loading branches...
            </p>
          </div>
        )}

        {/* Branches List */}
        {!loading && branches.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg shadow-gray-200/30 border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-4 border-b border-green-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {branch.name || "Branch"}
                      </h3>
                      {branch.shopOrBuildingNumber && (
                        <p className="text-xs text-gray-500">
                          #{branch.shopOrBuildingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(branch.isDefault)}
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <Navigation className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-sm font-medium text-gray-800">
                        {branch.address || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Store className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Area</p>
                      <p className="text-sm font-medium text-gray-800">
                        {branch.area || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">City</p>
                        <p className="text-sm font-medium text-gray-800">
                          {branch.city || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">District</p>
                        <p className="text-sm font-medium text-gray-800">
                          {branch.district || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">State</p>
                        <p className="text-sm font-medium text-gray-800">
                          {branch.state || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Hash className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Zipcode</p>
                        <p className="text-sm font-medium text-gray-800">
                          {branch.zipcode || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
                    <Navigation className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Coordinates</p>
                      <p className="text-xs font-mono text-gray-700">
                        {branch.coordinates
                          ? `${branch.coordinates[0]}, ${branch.coordinates[1]}`
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-xs text-gray-500">
                      Created: {formatDate(branch.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && branches.length === 0 && vendorId && !error && (
          <div className="py-20 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-10 w-10 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium mb-1">No branches found</p>
            <p className="text-sm text-gray-400">
              This vendor has no branches registered.
            </p>
          </div>
        )}

        {/* Create Branch Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Create New Branch
                </h2>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    resetForm();
                  }}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleCreateBranch} className="p-6 space-y-5">
                {formError && (
                  <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mr-3" />
                    <p className="text-sm text-red-700 font-medium">{formError}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Branch Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g., Shivaji Nagar Branch"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Shop / Building Number
                    </label>
                    <input
                      type="text"
                      name="shopOrBuildingNumber"
                      value={formData.shopOrBuildingNumber}
                      onChange={handleFormChange}
                      placeholder="e.g., 8"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Area
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleFormChange}
                      placeholder="e.g., Shivaji Nagar"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      placeholder="Full address"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      placeholder="e.g., Davangere"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      District
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleFormChange}
                      placeholder="e.g., Davangere"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      placeholder="e.g., Karnataka"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Zipcode
                    </label>
                    <input
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleFormChange}
                      placeholder="e.g., 577002"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                </div>

                {/* Coordinates */}
                <div className="border border-green-200 rounded-xl p-4 bg-green-50">
                  <h3 className="font-semibold text-green-800 mb-3">
                    Coordinates
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="coordinates.latitude"
                        value={formData.coordinates.latitude}
                        onChange={handleFormChange}
                        placeholder="e.g., 14.4712"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="coordinates.longitude"
                        value={formData.coordinates.longitude}
                        onChange={handleFormChange}
                        placeholder="e.g., 75.9105"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Is Default */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleFormChange}
                    className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Set as Default Branch
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Branch"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      resetForm();
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorBranches;
