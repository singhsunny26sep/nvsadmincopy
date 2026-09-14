import React, { useState, useEffect, useCallback } from "react";
import {
  Store,
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  Calendar,
  Hash,
  Navigation,
  Building2,
  ArrowLeft,
  Loader2,
  XCircle,
  Check,
  X,
  ShoppingBag,
  TrendingUp,
  Package,
  CreditCard,
  Percent,
  Truck,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { vendorsAPI } from "../components/api/api";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (amount) => {
  return `₹${(amount || 0).toLocaleString("en-IN")}`;
};

const SectionHeader = ({ title, icon: Icon, expanded, onToggle }) => (
  <button
    type="button"
    onClick={() => onToggle(title)}
    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl hover:from-gray-100 hover:to-gray-100/50 transition-all duration-200 mb-4"
  >
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
        <Icon size={18} className="text-green-600" />
      </div>
      <span className="font-semibold text-gray-800 text-sm">{title}</span>
    </div>
    {expanded ? (
      <ChevronUp size={18} className="text-gray-400" />
    ) : (
      <ChevronDown size={18} className="text-gray-400" />
    )}
  </button>
);

const VendorProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const vendorId = user?._id || "";

  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    vendor: true,
    delivery: true,
    branches: true,
    stats: true,
  });

  const fetchVendorProfile = useCallback(async () => {
    if (!vendorId) {
      setError("No vendor ID found. Please login again.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await vendorsAPI.getVendor(vendorId);
      if (response.data && response.data.success) {
        setVendorData(response.data.data);
      } else {
        setError("Failed to load vendor profile.");
      }
    } catch (err) {
      console.error("Error fetching vendor profile:", err);
      setError(
        err.response?.data?.message || "Failed to fetch vendor profile."
      );
    } finally {
      setLoading(false);
    }
  }, [vendorId]);

  useEffect(() => {
    fetchVendorProfile();
  }, [fetchVendorProfile]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-flex">
            <div className="w-12 h-12 border-4 border-green-100 rounded-full"></div>
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-sm text-gray-500 font-medium">
            Loading vendor profile...
          </p>
        </div>
      </div>
    );
  }

  if (error && !vendorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Error Loading Profile
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const data = vendorData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                  <Store className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Vendor Profile
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Your shop details and information
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/vendor-register")}
              className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm shadow-sm"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Vendor Header Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-6 sm:p-8 mb-6 shadow-lg shadow-green-500/25">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="h-20 w-20 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
              <span className="text-3xl font-bold text-white">
                {(data?.shopName || data?.vendor?.name || "V")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">
                  {data?.shopName || "N/A"}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    data?.status === "APPROVED"
                      ? "bg-green-400/30 text-white"
                      : "bg-yellow-400/30 text-yellow-100"
                  }`}
                >
                  {data?.status || "N/A"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-green-100 text-sm">
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {data?.vendor?.name || "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={14} />
                  {data?.vendor?.mobile || "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <Mail size={14} />
                  {data?.vendor?.email || "N/A"}
                </span>
              </div>
              <p className="mt-2 text-xs text-green-200 font-mono">
                Vendor ID: {data?._id || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Orders</p>
                <p className="text-xl font-bold text-gray-900">
                  {data?.orderCount || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Revenue</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(data?.deliveredRevenue)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Branches</p>
                <p className="text-xl font-bold text-gray-900">
                  {data?.branchCount || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Service Areas</p>
                <p className="text-xl font-bold text-gray-900">
                  {data?.serviceAreaCount || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-6">
          {/* Basic Info */}
          <div className="p-6 sm:p-8">
            <SectionHeader
              section="basic"
              title="Shop Information"
              icon={Store}
              expanded={expandedSections.basic}
              onToggle={toggleSection}
            />
            {expandedSections.basic && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Store className="h-3 w-3" /> Shop Name
                  </p>
                  <p className="font-semibold text-gray-800">
                    {data?.shopName || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Hash className="h-3 w-3" /> Vendor ID
                  </p>
                  <p className="font-semibold text-gray-800 font-mono text-sm">
                    {data?._id || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Status
                  </p>
                  <p className="font-semibold text-gray-800 capitalize">
                    {data?.status || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Percent className="h-3 w-3" /> Commission
                  </p>
                  <p className="font-semibold text-gray-800">
                    {data?.commissionPercent || 0}%
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Default Location
                  </p>
                  <p className="font-semibold text-gray-800">
                    {data?.defaultLocationId
                      ? data?.defaultLocationId.substring(0, 8) + "..."
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Registered
                  </p>
                  <p className="font-semibold text-gray-800">
                    {formatDate(data?.createdAt)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Vendor Account Info */}
          <div className="px-6 sm:px-8 pb-2">
            <SectionHeader
              section="vendor"
              title="Account Details"
              icon={User}
              expanded={expandedSections.vendor}
              onToggle={toggleSection}
            />
          </div>
          {expandedSections.vendor && (
            <div className="px-6 sm:px-8 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <User className="h-3 w-3" /> Name
                  </p>
                  <p className="font-semibold text-gray-800">
                    {data?.vendor?.name || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Mail className="h-3 w-3" /> Email
                  </p>
                  <p className="font-semibold text-gray-800">
                    {data?.vendor?.email || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Mobile
                  </p>
                  <p className="font-semibold text-gray-800">
                    {data?.vendor?.mobile || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Active
                  </p>
                  <p className="font-semibold text-gray-800">
                    {data?.vendor?.isActive !== false ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Settings */}
          <div className="px-6 sm:px-8 pb-2">
            <SectionHeader
              section="delivery"
              title="Delivery Configuration"
              icon={Truck}
              expanded={expandedSections.delivery}
              onToggle={toggleSection}
            />
          </div>
          {expandedSections.delivery && (
            <div className="px-6 sm:px-8 pb-6">
              {data?.delivery ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Truck className="h-3 w-3" /> Enabled
                    </p>
                    <p className="font-semibold text-gray-800">
                      {data.delivery.isEnabled ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <CreditCard className="h-3 w-3" /> Base Charge
                    </p>
                    <p className="font-semibold text-gray-800">
                      ₹{data.delivery.baseCharge}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Navigation className="h-3 w-3" /> Per KM Rate
                    </p>
                    <p className="font-semibold text-gray-800">
                      ₹{data.delivery.perKmRate}/km
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Package className="h-3 w-3" /> Per KG Rate
                    </p>
                    <p className="font-semibold text-gray-800">
                      ₹{data.delivery.perKgRate}/kg
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> Min Charge
                    </p>
                    <p className="font-semibold text-gray-800">
                      ₹{data.delivery.minDeliveryCharge}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> Max Charge
                    </p>
                    <p className="font-semibold text-gray-800">
                      ₹{data.delivery.baseMaxCharge}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Package className="h-3 w-3" /> Max Per KG
                    </p>
                    <p className="font-semibold text-gray-800">
                      ₹{data.delivery.maxPerKgIncrement}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Navigation className="h-3 w-3" /> Max Per KM
                    </p>
                    <p className="font-semibold text-gray-800">
                      ₹{data.delivery.maxPerKmIncrement}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <CreditCard className="h-3 w-3" /> Free Above
                    </p>
                    <p className="font-semibold text-gray-800">
                      {data.delivery.freeDeliveryAbove
                        ? `₹${data.delivery.freeDeliveryAbove}`
                        : "Not set"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <ShoppingBag className="h-3 w-3" /> Min Order
                    </p>
                    <p className="font-semibold text-gray-800">
                      ₹{data.delivery.minOrderAmount}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Max Radius
                    </p>
                    <p className="font-semibold text-gray-800">
                      {data.delivery.maxRadiusKm
                        ? `${data.delivery.maxRadiusKm} km`
                        : "Not set"}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No delivery configuration found.</p>
              )}
            </div>
          )}

          {/* Branch Locations */}
          <div className="px-6 sm:px-8 pb-2">
            <SectionHeader
              section="branches"
              title="Branch Locations"
              icon={MapPin}
              expanded={expandedSections.branches}
              onToggle={toggleSection}
            />
          </div>
          {expandedSections.branches && (
            <div className="px-6 sm:px-8 pb-6">
              {data?.branches && data.branches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.branches.map((branch, index) => (
                    <div
                      key={branch._id || index}
                      className="bg-gray-50 rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <p className="font-semibold text-gray-800 text-sm">
                            {branch.city || "Branch"}
                          </p>
                        </div>
                        {branch.isDefault && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <Check className="h-3 w-3" />
                            Default
                          </span>
                        )}
                      </div>
                      <div className="space-y-1.5 text-sm">
                        <p className="text-gray-600">
                          Zipcode:{" "}
                          <span className="font-medium text-gray-800">
                            {branch.zipcode || "N/A"}
                          </span>
                        </p>
                        <p className="text-gray-600">
                          Coordinates:{" "}
                          <span className="font-mono font-medium text-gray-800 text-xs">
                            {branch.coordinates
                              ? `${branch.coordinates[0]}, ${branch.coordinates[1]}`
                              : "N/A"}
                          </span>
                        </p>
                        <p className="text-gray-600">
                          ID:{" "}
                          <span className="font-mono font-medium text-gray-800 text-xs">
                            {branch._id?.substring(0, 8)}...
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No branches found.</p>
              )}
            </div>
          )}

          {/* Zipcodes */}
          {data?.zipcodes && data.zipcodes.length > 0 && (
            <div className="px-6 sm:px-8 pb-6">
              <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <Hash className="h-3 w-3" /> Service Zipcodes
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.zipcodes.map((zip, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700"
                    >
                      {zip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
