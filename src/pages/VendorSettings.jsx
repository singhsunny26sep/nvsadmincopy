import React, { useState, useEffect, useCallback } from "react";
import {
  Store,
  Truck,
  ArrowLeft,
  XCircle,
  Check,
  MapPin,
  Package,
  Navigation,
  CreditCard,
  Percent,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { vendorsAPI } from "../components/api/api";

const initialFormData = {
  isEnabled: false,
  baseCharge: "30",
  perKmRate: "5",
  perKgRate: "1.5",
  minDeliveryCharge: "40",
  baseMaxCharge: "150",
  maxPerKgIncrement: "1.2",
  maxPerKmIncrement: "4",
  freeDeliveryAbove: "",
  minOrderAmount: "0",
  maxRadiusKm: "",
};

/* ============================================================
   Moved OUTSIDE the main component to prevent focus loss.
   Defining components inside another component causes them
   to be recreated on every render → inputs lose focus.
   ============================================================ */

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon: Icon,
  suffix = "",
  placeholder = "",
  step,
  min,
  max,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
        </div>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value === null || value === undefined ? "" : value}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        autoComplete="off"
        className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white outline-none transition-all duration-200 hover:border-green-300`}
      />
    </div>
    {suffix && <p className="mt-1 text-xs text-gray-400">{suffix}</p>}
  </div>
);

const SectionHeaderInline = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="h-9 w-9 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
      <Icon size={18} className="text-green-600" />
    </div>
    <span className="font-semibold text-gray-800 text-sm">{title}</span>
  </div>
);

/* ============================================================
   Main Component
   ============================================================ */

const VendorSettings = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const vendorId = user?._id || "";

  const [formData, setFormData] = useState(initialFormData);
  const [savedData, setSavedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchDeliverySettings = useCallback(async () => {
    if (!vendorId) {
      setError("No vendor ID found. Please login again.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await vendorsAPI.getVendor(vendorId);
      if (response.data && response.data.success && response.data.data?.delivery) {
        const d = response.data.data.delivery;
        setFormData({
          isEnabled: d.isEnabled ?? false,
          baseCharge: d.baseCharge ?? "30",
          perKmRate: d.perKmRate ?? "5",
          perKgRate: d.perKgRate ?? "1.5",
          minDeliveryCharge: d.minDeliveryCharge ?? "40",
          baseMaxCharge: d.baseMaxCharge ?? "150",
          maxPerKgIncrement: d.maxPerKgIncrement ?? "1.2",
          maxPerKmIncrement: d.maxPerKmIncrement ?? "4",
          freeDeliveryAbove:
            d.freeDeliveryAbove != null ? String(d.freeDeliveryAbove) : "",
          minOrderAmount:
            d.minOrderAmount != null ? String(d.minOrderAmount) : "0",
          maxRadiusKm:
            d.maxRadiusKm != null ? String(d.maxRadiusKm) : "",
        });
        setSavedData(d);
      } else {
        setError("Failed to load delivery settings.");
      }
    } catch (err) {
      console.error("Error fetching delivery settings:", err);
      setError(
        err.response?.data?.message || "Failed to fetch delivery settings."
      );
    } finally {
      setLoading(false);
    }
  }, [vendorId]);

  useEffect(() => {
    fetchDeliverySettings();
  }, [fetchDeliverySettings]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setSaveSuccess(false);
  };

  const getNumericValue = (key) => {
    const val = formData[key];
    if (val === "" || val === null || val === undefined) return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaveSuccess(false);

    const payload = {
      isEnabled: formData.isEnabled,
      baseCharge: getNumericValue("baseCharge"),
      perKmRate: getNumericValue("perKmRate"),
      perKgRate: getNumericValue("perKgRate"),
      minDeliveryCharge: getNumericValue("minDeliveryCharge"),
      baseMaxCharge: getNumericValue("baseMaxCharge"),
      maxPerKgIncrement: getNumericValue("maxPerKgIncrement"),
      maxPerKmIncrement: getNumericValue("maxPerKmIncrement"),
      freeDeliveryAbove: getNumericValue("freeDeliveryAbove"),
      minOrderAmount: getNumericValue("minOrderAmount"),
      maxRadiusKm: getNumericValue("maxRadiusKm"),
    };

    try {
      const response = await vendorsAPI.updateDelivery(payload);
      if (response.data && response.data.success) {
        setSaveSuccess(true);
        setSavedData(payload);
        setTimeout(() => {
          setSaveSuccess(false);
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(
          (response.data && response.data.message) ||
            "Failed to update delivery settings."
        );
      }
    } catch (err) {
      console.error("Error updating delivery settings:", err);
      setError(
        err.response?.data?.message || "Failed to update delivery settings."
      );
    } finally {
      setSubmitting(false);
    }
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
            Loading delivery settings...
          </p>
        </div>
      </div>
    );
  }

  if (error && !savedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Error Loading Settings
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate("/vendor-login")}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Delivery Settings
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Configure your delivery charges and options
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/vendor-profile")}
              className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm shadow-sm"
            >
              <ArrowLeft size={16} />
              Back to Profile
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {saveSuccess && (
          <div className="mb-6 flex items-center p-4 bg-green-50 border border-green-100 rounded-xl">
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-sm text-green-700 font-medium">
              Delivery settings updated successfully!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-semibold text-gray-800">
                    Delivery Status
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isEnabled"
                    checked={formData.isEnabled}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {formData.isEnabled ? "Enabled" : "Disabled"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <SectionHeaderInline title="Delivery Charges" icon={Truck} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  label="Base Charge"
                  name="baseCharge"
                  value={formData.baseCharge}
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  icon={CreditCard}
                  suffix="₹"
                  placeholder="30"
                />
                <FormField
                  label="Per KM Rate"
                  name="perKmRate"
                  value={formData.perKmRate}
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  icon={Navigation}
                  suffix="₹/km"
                  placeholder="5"
                />
                <FormField
                  label="Per KG Rate"
                  name="perKgRate"
                  value={formData.perKgRate}
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  icon={Package}
                  suffix="₹/kg"
                  placeholder="1.5"
                />
                <FormField
                  label="Min Delivery Charge"
                  name="minDeliveryCharge"
                  value={formData.minDeliveryCharge}
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  icon={ShieldCheck}
                  suffix="₹"
                  placeholder="40"
                />
                <FormField
                  label="Max Base Charge"
                  name="baseMaxCharge"
                  value={formData.baseMaxCharge}
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  icon={CreditCard}
                  suffix="₹"
                  placeholder="150"
                />
                <FormField
                  label="Max Per KG Increment"
                  name="maxPerKgIncrement"
                  value={formData.maxPerKgIncrement}
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  icon={Package}
                  suffix="₹"
                  placeholder="1.2"
                />
                <FormField
                  label="Max Per KM Increment"
                  name="maxPerKmIncrement"
                  value={formData.maxPerKmIncrement}
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  icon={Navigation}
                  suffix="₹"
                  placeholder="4"
                />
                <FormField
                  label="Free Delivery Above"
                  name="freeDeliveryAbove"
                  value={formData.freeDeliveryAbove}
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  icon={Percent}
                  suffix="₹"
                  placeholder="Leave empty for no free delivery"
                />
                <FormField
                  label="Min Order Amount"
                  name="minOrderAmount"
                  value={formData.minOrderAmount}
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  icon={ShoppingBag}
                  suffix="₹"
                  placeholder="0"
                />
                <FormField
                  label="Max Radius (KM)"
                  name="maxRadiusKm"
                  value={formData.maxRadiusKm}
                  onChange={handleInputChange}
                  type="number"
                  step="0.1"
                  icon={MapPin}
                  suffix="km"
                  placeholder="Leave empty for no limit"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/vendor-profile")}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-[1.01] active:scale-[0.99]"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorSettings;