import React, { useState, useEffect, useCallback } from "react";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Check,
  Loader2,
  Store,
  Navigation,
  Clock,
  ShoppingBag,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersAPI, vendorsAPI, serviceAreasAPI } from "../components/api/api";

const ServiceAreas = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isVendor = user?.role === "vendor";
  const vendorIdFromAuth = user?._id || "";

  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [vendorsLoading, setVendorsLoading] = useState(false);

  const [branches, setBranches] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [branchesLoading, setBranchesLoading] = useState(false);

  const [serviceAreas, setServiceAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    locationId: "",
    areas: [
      {
        zipcode: "",
        city: "",
        district: "",
        state: "",
        country: "India",
        etaMinutes: "",
        minOrderAmount: "",
        freeDeliveryAbove: "",
      },
    ],
  });

  const fetchVendors = useCallback(async () => {
    if (isVendor) return;
    setVendorsLoading(true);
    try {
      const response = await usersAPI.getUsers({ role: "vendor", limit: 100 });
      let data = [];
      if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
        data = response.data.data.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }
      setVendors(data);
    } catch (err) {
      console.error("Error fetching vendors:", err);
    } finally {
      setVendorsLoading(false);
    }
  }, [isVendor]);

  useEffect(() => {
    if (!isVendor) {
      fetchVendors();
    } else {
      setSelectedVendorId(vendorIdFromAuth);
    }
  }, [isVendor, vendorIdFromAuth, fetchVendors]);

  const fetchServiceAreas = useCallback(
    async (vendorId) => {
      if (!vendorId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await serviceAreasAPI.getServiceAreas(vendorId);
        let data = [];
        if (response.data?.data?.areas && Array.isArray(response.data.data.areas)) {
          data = response.data.data.areas;
        } else if (response.data?.data && Array.isArray(response.data.data)) {
          data = response.data.data;
        } else if (Array.isArray(response.data)) {
          data = response.data;
        }
        setServiceAreas(data);
        setSelectedVendorId(vendorId);
      } catch (err) {
        console.error("Error fetching service areas:", err);
        setError("Failed to fetch service areas.");
        setServiceAreas([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (selectedVendorId) {
      fetchServiceAreas(selectedVendorId);
    }
  }, [selectedVendorId, fetchServiceAreas]);

  const fetchBranches = useCallback(async (vendorId) => {
    setBranchesLoading(true);
    setBranches([]);
    try {
      const response = await vendorsAPI.getBranches(vendorId);
      let data = [];
      if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
        data = response.data.data.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }
      setBranches(data);
    } catch (err) {
      console.error("Error fetching branches:", err);
      setBranches([]);
    } finally {
      setBranchesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedVendorId) {
      fetchBranches(selectedVendorId);
    }
  }, [selectedVendorId, fetchBranches]);

  const handleVendorChange = (e) => {
    const vendorId = e.target.value;
    setSelectedVendorId(vendorId);
    setSelectedBranchId("");
    setBranches([]);
    setServiceAreas([]);
    setFormData((prev) => ({ ...prev, locationId: "" }));
  };

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranchId(branchId);
    setFormData((prev) => ({ ...prev, locationId: branchId }));
  };

  const handleAreaChange = (index, field, value) => {
    setFormData((prev) => {
      const newAreas = [...prev.areas];
      newAreas[index] = { ...newAreas[index], [field]: value };
      return { ...prev, areas: newAreas };
    });
    setSuccessMsg(false);
  };

  const addArea = () => {
    setFormData((prev) => ({
      ...prev,
      areas: [
        ...prev.areas,
        {
          zipcode: "",
          city: "",
          district: "",
          state: "",
          country: "India",
          etaMinutes: "",
          minOrderAmount: "",
          freeDeliveryAbove: "",
        },
      ],
    }));
    setSuccessMsg(false);
  };

  const removeArea = (index) => {
    setFormData((prev) => ({
      ...prev,
      areas: prev.areas.filter((_, i) => i !== index),
    }));
    setSuccessMsg(false);
  };

  const resetForm = () => {
    setFormData({
      locationId: "",
      areas: [
        {
          zipcode: "",
          city: "",
          district: "",
          state: "",
          country: "India",
          etaMinutes: "",
          minOrderAmount: "",
          freeDeliveryAbove: "",
        },
      ],
    });
    setSelectedBranchId("");
    setEditingArea(null);
    setShowForm(false);
    setFormError(null);
    setSuccessMsg(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const areas = formData.areas.filter(
      (a) => a.zipcode.trim() || a.city.trim()
    );
    if (areas.length === 0) {
      setFormError("Please add at least one area with zipcode or city.");
      setSubmitting(false);
      return;
    }

    const payload = {
      locationId: formData.locationId || undefined,
      areas: areas.map((a) => ({
        zipcode: a.zipcode || undefined,
        city: a.city || undefined,
        district: a.district || undefined,
        state: a.state || undefined,
        country: a.country || undefined,
        etaMinutes: a.etaMinutes ? Number(a.etaMinutes) : undefined,
        minOrderAmount: a.minOrderAmount ? Number(a.minOrderAmount) : undefined,
        freeDeliveryAbove: a.freeDeliveryAbove
          ? Number(a.freeDeliveryAbove)
          : undefined,
      })),
    };

    try {
      const response = await serviceAreasAPI.createServiceArea(
        selectedVendorId,
        payload
      );
      setShowForm(false);
      resetForm();
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 2000);
      await fetchServiceAreas(selectedVendorId);
    } catch (err) {
      console.error("Error creating service area:", err);
      setFormError(
        err.response?.data?.message || "Failed to add service area."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (areaId) => {
    if (!window.confirm("Are you sure you want to delete this service area?"))
      return;
    try {
      setLoading(true);
      // Delete would need a separate endpoint; using a placeholder
      // If no delete endpoint exists, this can be extended
      setLoading(false);
    } catch (err) {
      setError("Failed to delete service area.");
      setLoading(false);
    }
  };

  const filteredAreas = serviceAreas.filter((area) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      area.zipcode?.toLowerCase().includes(term) ||
      area.city?.toLowerCase().includes(term) ||
      area.district?.toLowerCase().includes(term) ||
      area.state?.toLowerCase().includes(term)
    );
  });

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
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Service Areas
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage service areas and delivery zones for vendors
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <X className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Vendor Selector */}
        {!isVendor && (
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Vendor
                </label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  {vendorsLoading ? (
                    <div className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      <span className="text-sm text-gray-500">Loading vendors...</span>
                    </div>
                  ) : (
                    <select
                      value={selectedVendorId}
                      onChange={handleVendorChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white outline-none text-sm appearance-none"
                    >
                      <option value="">Select a vendor</option>
                      {vendors.map((v) => (
                        <option key={v._id} value={v._id}>
                          {v.name || v.shopName || "Unknown Vendor"} (
                          {v.mobile || "N/A"})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="flex items-end">
                <span className="text-xs text-gray-400">
                  {serviceAreas.length} area
                  {serviceAreas.length !== 1 ? "s" : ""} found
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        {selectedVendorId && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search areas by zipcode, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm w-full"
              />
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-lg hover:from-green-700 hover:to-emerald-700 shadow-md transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Add Service Area
            </button>
          </div>
        )}

        {/* Success Message */}
        {successMsg && (
          <div className="mb-6 flex items-center p-4 bg-green-50 border border-green-100 rounded-xl">
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-sm text-green-700 font-medium">
              Service area added successfully!
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <div className="relative inline-flex">
              <div className="w-12 h-12 border-4 border-green-100 rounded-full"></div>
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-sm text-gray-500 font-medium">
              Loading service areas...
            </p>
          </div>
        )}

        {/* Service Areas List */}
        {!loading && filteredAreas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAreas.map((area, index) => (
              <div
                key={area._id || index}
                className="bg-white rounded-2xl shadow-lg shadow-gray-200/30 border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-4 border-b border-green-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {area.city || "Unknown City"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        ZIP: {area.zipcode || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <Navigation className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">District</p>
                      <p className="text-sm font-medium text-gray-800">
                        {area.district || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">State</p>
                        <p className="text-sm font-medium text-gray-800">
                          {area.state || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Country</p>
                        <p className="text-sm font-medium text-gray-800">
                          {area.country || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">ETA</p>
                        <p className="text-sm font-medium text-gray-800">
                          {area.etaMinutes ? `${area.etaMinutes} min` : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShoppingBag className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Min Order</p>
                        <p className="text-sm font-medium text-gray-800">
                          {area.minOrderAmount ? `₹${area.minOrderAmount}` : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <p className="text-xs text-gray-500">
                      Free Delivery Above:{" "}
                      {area.freeDeliveryAbove ? `₹${area.freeDeliveryAbove}` : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredAreas.length === 0 && selectedVendorId && (
          <div className="py-20 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-10 w-10 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium mb-1">No service areas found</p>
            <p className="text-sm text-gray-400">
              Add service areas for this vendor to get started.
            </p>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingArea ? "Edit Service Area" : "Add Service Area"}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {formError && (
                  <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl">
                    <X className="h-5 w-5 text-red-600 flex-shrink-0 mr-3" />
                    <p className="text-sm text-red-700 font-medium">{formError}</p>
                  </div>
                )}

                {/* Branch Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Select Branch
                  </label>
                  {branchesLoading ? (
                    <div className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      <span className="text-sm text-gray-500">Loading branches...</span>
                    </div>
                  ) : branches.length === 0 ? (
                    <div className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 flex items-center gap-2">
                      <span className="text-sm text-gray-500">No branches found for this vendor</span>
                    </div>
                  ) : (
                    <select
                      value={formData.locationId}
                      onChange={handleBranchChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm appearance-none"
                    >
                      <option value="">Select a branch</option>
                      {branches.map((branch) => (
                        <option
                          key={branch._id || branch.id}
                          value={branch._id || branch.id}
                        >
                          {branch.name || "Unnamed Branch"}
                          {branch.shopOrBuildingNumber
                            ? ` (#${branch.shopOrBuildingNumber})`
                            : ""}
                          {branch.city ? ` - ${branch.city}` : ""}
                          {branch.isDefault ? " (Default)" : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Areas List */}
                {formData.areas.map((area, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-700 text-sm">
                        Area {index + 1}
                      </h4>
                      {formData.areas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArea(index)}
                          className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Zipcode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={area.zipcode}
                          onChange={(e) =>
                            handleAreaChange(index, "zipcode", e.target.value)
                          }
                          placeholder="e.g., 577001"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={area.city}
                          onChange={(e) =>
                            handleAreaChange(index, "city", e.target.value)
                          }
                          placeholder="e.g., Davangere"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          District
                        </label>
                        <input
                          type="text"
                          value={area.district}
                          onChange={(e) =>
                            handleAreaChange(index, "district", e.target.value)
                          }
                          placeholder="e.g., Davangere"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          value={area.state}
                          onChange={(e) =>
                            handleAreaChange(index, "state", e.target.value)
                          }
                          placeholder="e.g., Karnataka"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          value={area.country}
                          onChange={(e) =>
                            handleAreaChange(index, "country", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          ETA (Minutes)
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={area.etaMinutes}
                          onChange={(e) =>
                            handleAreaChange(index, "etaMinutes", e.target.value)
                          }
                          placeholder="e.g., 60"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Min Order Amount (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={area.minOrderAmount}
                          onChange={(e) =>
                            handleAreaChange(index, "minOrderAmount", e.target.value)
                          }
                          placeholder="e.g., 199"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Free Delivery Above (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={area.freeDeliveryAbove}
                          onChange={(e) =>
                            handleAreaChange(
                              index,
                              "freeDeliveryAbove",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 499"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addArea}
                  className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium px-3 py-2 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Area
                </button>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        {editingArea ? "Update" : "Add"} Service Area
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
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

export default ServiceAreas;
