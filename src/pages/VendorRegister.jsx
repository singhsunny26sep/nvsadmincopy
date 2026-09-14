import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, UserPlus, Phone, User,
  ShieldCheck, List, ArrowLeft, UserPlus as RegisterIcon, Search, Plus,
  Users, TrendingUp, Package, ShoppingBag, MapPin, Landmark, CreditCard,
  Percent, Navigation, Store, Briefcase, FileText, Smartphone, Globe,
  Map, Hash, Pin, ChevronDown, ChevronUp, Edit
} from "lucide-react";
import { usersAPI, vendorsAPI } from "../components/api/api";

const FormField = memo(({ label, name, value, onChange, type = "text", required = false, placeholder, icon: Icon, optional = false, maxLength }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
      {optional && <span className="text-gray-400 font-normal"> (optional)</span>}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
        </div>
      )}
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white outline-none transition-all duration-200 hover:border-green-300`}
        placeholder={placeholder || ""}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
));

const SectionHeader = memo(({ section, title, icon: Icon, expanded, onToggle }) => (
  <button
    type="button"
    onClick={() => onToggle(section)}
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
));

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
    legalName: "",
    gstNumber: "",
    fssaiNumber: "",
    supportMobile: "",
    commissionPercent: "",
    payout: {
      accountHolder: "",
      accountNumber: "",
      ifsc: "",
      upiId: "",
    },
    branch: {
      name: "",
      shopOrBuildingNumber: "",
      address: "",
      area: "",
      city: "",
      district: "",
      state: "",
      country: "",
      zipcode: "",
      coordinates: {
        latitude: "",
        longitude: "",
      },
      isDefault: false,
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [vendorsLoading, setVendorsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ total: 0, active: 0, thisMonth: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVendors, setTotalVendors] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    business: true,
    support: true,
    payout: true,
    branch: true,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    fetchVendors(currentPage);
  }, [currentPage]);

  const fetchVendors = async (page = 1) => {
    try {
      setVendorsLoading(true);
      const response = await usersAPI.getUsers({ role: "vendor", page, limit: 10 });
      let data = [];
      let total = 0;
      let pages = 1;

      if (response.data && response.data.success) {
        if (response.data.data && response.data.data.data && Array.isArray(response.data.data.data)) {
          data = response.data.data.data;
          total = response.data.data.total || 0;
          pages = response.data.data.totalPages || 1;
        } else if (Array.isArray(response.data.data)) {
          data = response.data.data;
          total = data.length;
          pages = 1;
        }
      } else if (Array.isArray(response.data)) {
        data = response.data;
        total = data.length;
        pages = 1;
      }

      setVendors(data);
      setTotalPages(pages);
      setTotalVendors(total);
      setStats({
        total: total,
        active: data.filter(v => v.isActive !== false).length,
        thisMonth: data.filter(v => {
          const created = new Date(v.createdAt);
          const now = new Date();
          return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
        }).length
      });
    } catch (err) {
      console.error("Error fetching vendors:", err);
    } finally {
      setVendorsLoading(false);
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("payout.")) {
      const payoutField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        payout: { ...prev.payout, [payoutField]: value },
      }));
    } else if (name.startsWith("branch.")) {
      const branchField = name.split(".")[1];
      if (branchField === "coordinates") {
        const coordField = name.split(".")[2];
        setFormData((prev) => ({
          ...prev,
          branch: {
            ...prev.branch,
            coordinates: { ...prev.branch.coordinates, [coordField]: value },
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          branch: { ...prev.branch, [branchField]: type === "checkbox" ? checked : value },
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const toggleSection = useCallback((section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const handleEdit = (vendor) => {
    setFormData({
      shopName: vendor.shopName || "",
      name: vendor.name || "",
      email: vendor.email || "",
      mobile: vendor.mobile || "",
      password: "",
      legalName: vendor.legalName || "",
      gstNumber: vendor.gstNumber || "",
      fssaiNumber: vendor.fssaiNumber || "",
      supportMobile: vendor.supportMobile || "",
      commissionPercent: vendor.commissionPercent !== undefined ? vendor.commissionPercent : "",
      payout: {
        accountHolder: vendor.payout?.accountHolder || "",
        accountNumber: vendor.payout?.accountNumber || "",
        ifsc: vendor.payout?.ifsc || "",
        upiId: vendor.payout?.upiId || "",
      },
      branch: {
        name: vendor.branch?.name || "",
        shopOrBuildingNumber: vendor.branch?.shopOrBuildingNumber || "",
        address: vendor.branch?.address || "",
        area: vendor.branch?.area || "",
        city: vendor.branch?.city || "",
        district: vendor.branch?.district || "",
        state: vendor.branch?.state || "",
        country: vendor.branch?.country || "",
        zipcode: vendor.branch?.zipcode || "",
        coordinates: {
          latitude: vendor.branch?.coordinates?.[0] !== undefined && vendor.branch?.coordinates?.[0] !== null ? vendor.branch.coordinates[0] : "",
          longitude: vendor.branch?.coordinates?.[1] !== undefined && vendor.branch?.coordinates?.[1] !== null ? vendor.branch.coordinates[1] : "",
        },
        isDefault: vendor.branch?.isDefault || false,
      },
    });
    setEditingVendor(vendor);
    setShowForm(true);
    setRegisterSuccess("");
    setRegisterError("");
  };

  const handleCancelEdit = () => {
    setEditingVendor(null);
    resetForm();
    setShowForm(false);
  };

  const buildPayload = () => {
    const isEdit = !!editingVendor;
    return {
      shopName: formData.shopName || undefined,
      name: formData.name || undefined,
      mobile: formData.mobile || undefined,
      legalName: formData.legalName || undefined,
      gstNumber: formData.gstNumber || undefined,
      fssaiNumber: formData.fssaiNumber || undefined,
      supportMobile: formData.supportMobile || undefined,
      commissionPercent: formData.commissionPercent || undefined,
      payout: {
        accountHolder: formData.payout.accountHolder || undefined,
        accountNumber: formData.payout.accountNumber || undefined,
        ifsc: formData.payout.ifsc || undefined,
        upiId: formData.payout.upiId || undefined,
      },
      ...(isEdit ? {} : {
        email: formData.email || undefined,
        password: formData.password || undefined,
        branch: {
          name: formData.branch.name || undefined,
          shopOrBuildingNumber: formData.branch.shopOrBuildingNumber || undefined,
          address: formData.branch.address || undefined,
          area: formData.branch.area || undefined,
          city: formData.branch.city || undefined,
          district: formData.branch.district || undefined,
          state: formData.branch.state || undefined,
          country: formData.branch.country || undefined,
          zipcode: formData.branch.zipcode || undefined,
          coordinates: [
            formData.branch.coordinates.latitude || undefined,
            formData.branch.coordinates.longitude || undefined,
          ].filter(v => v !== undefined),
          isDefault: formData.branch.isDefault,
        },
      }),
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    setSubmitting(true);

    const payload = buildPayload();

    try {
      let response;
      if (editingVendor) {
        response = await vendorsAPI.updateVendor(editingVendor._id, payload);
      } else {
        response = await vendorsAPI.createVendor(payload);
      }

      if (response.data && response.data.success) {
        setRegisterSuccess(editingVendor ? "Vendor updated successfully!" : "Vendor registered successfully!");
        resetForm();
        setEditingVendor(null);
        setCurrentPage(1);
        fetchVendors(1);
        setTimeout(() => {
          setShowForm(false);
          setRegisterSuccess("");
        }, 2000);
      } else {
        setRegisterError(
          (response.data && response.data.message) || "Failed to save vendor. Please try again."
        );
      }
    } catch (err) {
      console.error("Error saving vendor:", err);
      setRegisterError(
        err.response?.data?.message || "An error occurred while saving the vendor."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (vendorId, currentStatus) => {
    try {
      const newStatus = currentStatus !== false ? "SUSPENDED" : "APPROVED";
      await vendorsAPI.updateVendorStatus(vendorId, newStatus);
      setVendors((prev) =>
        prev.map((v) => (v._id === vendorId ? { ...v, isActive: newStatus === "APPROVED" } : v))
      );
      setStats((prev) => ({
        ...prev,
        active: newStatus === "APPROVED" ? prev.active + 1 : Math.max(0, prev.active - 1),
      }));
    } catch (err) {
      console.error("Failed to update vendor status:", err);
      alert("Failed to update vendor status. Please try again.");
    }
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.mobile?.includes(searchQuery)
  );

  const resetForm = () => {
    setFormData({
      shopName: "",
      name: "",
      email: "",
      mobile: "",
      password: "",
      legalName: "",
      gstNumber: "",
      fssaiNumber: "",
      supportMobile: "",
      commissionPercent: "",
      payout: { accountHolder: "", accountNumber: "", ifsc: "", upiId: "" },
      branch: {
        name: "",
        shopOrBuildingNumber: "",
        address: "",
        area: "",
        city: "",
        district: "",
        state: "",
        country: "",
        zipcode: "",
        coordinates: { latitude: "", longitude: "" },
        isDefault: false,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Vendor Management
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">Register and manage vendor accounts</p>
                </div>
              </div>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25 transition-all duration-200 font-medium text-sm"
              >
                <Plus size={18} />
                Register New Vendor
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {!showForm && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Vendors</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Vendors</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
                </div>
                <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">This Month</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.thisMonth}</p>
                </div>
                <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {/* Alerts */}
          {registerError && (
            <div className="mx-6 mt-6 flex items-center p-4 bg-red-50 border border-red-100 rounded-2xl">
              <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-sm text-red-700 font-medium">{registerError}</p>
            </div>
          )}

          {registerSuccess && (
            <div className="mx-6 mt-6 flex items-center p-4 bg-green-50 border border-green-100 rounded-2xl">
              <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <ShieldCheck className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-sm text-green-700 font-medium">{registerSuccess}</p>
            </div>
          )}

          {showForm ? (
            /* Registration / Edit Form */
            <form onSubmit={handleRegister} className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                    <RegisterIcon size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {editingVendor ? "Edit Vendor" : "Register New Vendor"}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {editingVendor ? "Update vendor details" : "Fill in the details below"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setRegisterSuccess("");
                    setRegisterError("");
                    resetForm();
                    setEditingVendor(null);
                  }}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to List
                </button>
              </div>

              {editingVendor && (
                <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <Edit size={16} className="text-blue-600" />
                  <span className="text-sm text-blue-700 font-medium">
                    Editing: {editingVendor.name} — changes will update the existing vendor record
                  </span>
                </div>
              )}

              {/* Basic Information Section */}
              <SectionHeader
                section="basic"
                title="Basic Information"
                icon={User}
                expanded={expandedSections.basic}
                onToggle={toggleSection}
              />
              {expandedSections.basic && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <FormField
                      label="Shop Name"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleInputChange}
                      required={true}
                      placeholder="Enter shop name"
                      icon={Store}
                    />
                  </div>
                  <FormField
                    label="Vendor Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={true}
                    placeholder="Enter vendor full name"
                    icon={User}
                  />
                  {!editingVendor && (
                    <FormField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      icon={Mail}
                      optional={true}
                    />
                  )}
                  {!editingVendor && (
                    <FormField
                      label="Mobile Number"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter mobile number"
                      icon={Phone}
                      optional={true}
                    />
                  )}
                  {!editingVendor && (
                    <div className="md:col-span-2">
                      <div className="relative group">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                          </div>
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            minLength="6"
                            className="w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white outline-none transition-all duration-200 hover:border-green-300"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                            )}
                          </button>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Password must be at least 6 characters</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Business Details Section */}
              <SectionHeader
                section="business"
                title="Business Details"
                icon={Briefcase}
                expanded={expandedSections.business}
                onToggle={toggleSection}
              />
              {!editingVendor && expandedSections.business && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    label="Legal Name"
                    name="legalName"
                    value={formData.legalName}
                    onChange={handleInputChange}
                    placeholder="Enter legal entity name"
                    icon={FileText}
                    optional={true}
                  />
                  <FormField
                    label="GST Number"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 29ABCDE1234F1Z5"
                    icon={Hash}
                    optional={true}
                    maxLength={15}
                  />
                  <FormField
                    label="FSSAI Number"
                    name="fssaiNumber"
                    value={formData.fssaiNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 11223344556677"
                    icon={FileText}
                    optional={true}
                    maxLength={14}
                  />
                  <FormField
                    label="Commission Percent"
                    name="commissionPercent"
                    type="number"
                    value={formData.commissionPercent}
                    onChange={handleInputChange}
                    placeholder="e.g., 5"
                    icon={Percent}
                    optional={true}
                  />
                </div>
              )}

              {/* Support Contact Section */}
              <SectionHeader
                section="support"
                title="Support Contact"
                icon={Smartphone}
                expanded={expandedSections.support}
                onToggle={toggleSection}
              />
              {expandedSections.support && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    label="Support Mobile"
                    name="supportMobile"
                    type="tel"
                    value={formData.supportMobile}
                    onChange={handleInputChange}
                    placeholder="Support mobile number"
                    icon={Phone}
                    optional={true}
                  />
                </div>
              )}

              {/* Payout Details Section */}
              <SectionHeader
                section="payout"
                title="Payout Details"
                icon={Landmark}
                expanded={expandedSections.payout}
                onToggle={toggleSection}
              />
              {expandedSections.payout && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    label="Account Holder Name"
                    name="payout.accountHolder"
                    value={formData.payout.accountHolder}
                    onChange={handleInputChange}
                    placeholder="Account holder name"
                    icon={User}
                    optional={true}
                  />
                  <FormField
                    label="Account Number"
                    name="payout.accountNumber"
                    value={formData.payout.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Bank account number"
                    icon={CreditCard}
                    optional={true}
                  />
                  <FormField
                    label="IFSC Code"
                    name="payout.ifsc"
                    value={formData.payout.ifsc}
                    onChange={handleInputChange}
                    placeholder="e.g., SBIN0001234"
                    icon={Landmark}
                    optional={true}
                    maxLength={11}
                  />
                  <FormField
                    label="UPI ID"
                    name="payout.upiId"
                    value={formData.payout.upiId}
                    onChange={handleInputChange}
                    placeholder="e.g., nagraj@okaxis"
                    icon={Smartphone}
                    optional={true}
                  />
                </div>
              )}

              {/* Branch Information Section */}
              {!editingVendor && (
                <SectionHeader
                  section="branch"
                  title="Branch Information"
                  icon={MapPin}
                  expanded={expandedSections.branch}
                  onToggle={toggleSection}
                />
              )}
              {!editingVendor && expandedSections.branch && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    label="Branch Name"
                    name="branch.name"
                    value={formData.branch.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Main Branch"
                    icon={Store}
                    optional={true}
                  />
                  <FormField
                    label="Shop / Building Number"
                    name="branch.shopOrBuildingNumber"
                    value={formData.branch.shopOrBuildingNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 24"
                    icon={Hash}
                    optional={true}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      label="Address"
                      name="branch.address"
                      value={formData.branch.address}
                      onChange={handleInputChange}
                      placeholder="Full address"
                      icon={Map}
                      optional={true}
                    />
                  </div>
                  <FormField
                    label="Area"
                    name="branch.area"
                    value={formData.branch.area}
                    onChange={handleInputChange}
                    placeholder="Area / locality"
                    icon={Map}
                    optional={true}
                  />
                  <FormField
                    label="City"
                    name="branch.city"
                    value={formData.branch.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    icon={Globe}
                    optional={true}
                  />
                  <FormField
                    label="District"
                    name="branch.district"
                    value={formData.branch.district}
                    onChange={handleInputChange}
                    placeholder="District"
                    icon={Globe}
                    optional={true}
                  />
                  <FormField
                    label="State"
                    name="branch.state"
                    value={formData.branch.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    icon={Globe}
                    optional={true}
                  />
                  <FormField
                    label="Country"
                    name="branch.country"
                    value={formData.branch.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    icon={Globe}
                    optional={true}
                  />
                  <FormField
                    label="Zipcode"
                    name="branch.zipcode"
                    value={formData.branch.zipcode}
                    onChange={handleInputChange}
                    placeholder="Postal code"
                    icon={Pin}
                    optional={true}
                    maxLength={6}
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      label="Latitude"
                      name="branch.coordinates.latitude"
                      type="number"
                      step="any"
                      value={formData.branch.coordinates.latitude}
                      onChange={handleInputChange}
                      placeholder="e.g., 14.4644"
                      icon={Navigation}
                      optional={true}
                    />
                    <FormField
                      label="Longitude"
                      name="branch.coordinates.longitude"
                      type="number"
                      step="any"
                      value={formData.branch.coordinates.longitude}
                      onChange={handleInputChange}
                      placeholder="e.g., 75.9218"
                      icon={Navigation}
                      optional={true}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="branch.isDefault"
                        checked={formData.branch.isDefault}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">Set as Default Branch</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting || !formData.name || (!editingVendor && !formData.password)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{editingVendor ? "Update Vendor" : "Register Vendor"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Vendors List */
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <div className="h-8 w-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                    <List size={16} className="text-green-600" />
                  </div>
                  Registered Vendors
                  <span className="text-sm font-normal text-gray-400">({totalVendors})</span>
                </h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search vendors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all w-full sm:w-64"
                    />
                  </div>
                </div>
              </div>

              {vendorsLoading ? (
                <div className="py-20 text-center">
                  <div className="relative inline-flex">
                    <div className="w-12 h-12 border-4 border-green-100 rounded-full"></div>
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 font-medium">Loading vendors...</p>
                </div>
              ) : filteredVendors.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="h-10 w-10 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium mb-1">No vendors found</p>
                  <p className="text-sm text-gray-400">
                    {searchQuery ? "Try a different search term" : "Get started by registering your first vendor"}
                  </p>
                  {!searchQuery && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="mt-4 inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      <Plus size={16} />
                      Register Vendor
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vendor</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Mobile</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredVendors.map((vendor, index) => (
                        <tr
                          key={vendor._id}
                          className="hover:bg-gradient-to-r hover:from-green-50/30 hover:to-emerald-50/30 transition-all duration-200 group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-green-700">
                                  {vendor.name?.charAt(0)?.toUpperCase() || 'V'}
                                </span>
                              </div>
                              <span className="font-semibold text-gray-900">{vendor.name || "N/A"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">{vendor.email || "N/A"}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{vendor.mobile || "N/A"}</td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <button
                              onClick={() => handleToggleStatus(vendor._id, vendor.isActive !== false)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                                vendor.isActive !== false ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                  vendor.isActive !== false ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                            <p className="mt-1 text-xs text-gray-500">
                              {vendor.isActive !== false ? 'Active' : 'Inactive'}
                            </p>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <button
                              onClick={() => handleEdit(vendor)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                            >
                              <Edit size={14} />
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages} • Total: {totalVendors} vendors
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ArrowLeft size={14} />
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-4 text-center border border-gray-100">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our{" "}
                <span className="text-green-600 font-medium cursor-pointer hover:underline">Terms of Service</span>
                {" "}and{" "}
                <span className="text-green-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
