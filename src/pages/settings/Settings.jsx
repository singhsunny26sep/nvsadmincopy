import React, { useState, useEffect } from "react";
import { Settings as SettingsIcon, Save, RefreshCw, MapPin, CreditCard, Check, XCircle } from "lucide-react";
import { settingsAPI } from "../../components/api/api";

const initialFormData = {
  maxRadiusKm: "",
  maxAllowedDeliveryCharge: "",
};

const Settings = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await settingsAPI.getSettings();
      const data = response.data?.data;
      const delivery = data?.delivery || data;

      if (delivery) {
        setFormData({
          maxRadiusKm:
            delivery.maxRadiusKm != null ? String(delivery.maxRadiusKm) : "",
          maxAllowedDeliveryCharge:
            delivery.maxAllowedDeliveryCharge != null
              ? String(delivery.maxAllowedDeliveryCharge)
              : "",
        });
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
      setError(
        err.response?.data?.message || "Failed to load settings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaveSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaveSuccess(false);

    const payload = {
      maxRadiusKm: formData.maxRadiusKm !== "" ? Number(formData.maxRadiusKm) : 0,
      maxAllowedDeliveryCharge:
        formData.maxAllowedDeliveryCharge !== ""
          ? Number(formData.maxAllowedDeliveryCharge)
          : 0,
    };

    try {
      const response = await settingsAPI.updateDeliverySettings(payload);
      if (response.data && response.data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setError(
          response.data?.message || "Failed to update delivery settings."
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
            Loading settings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <SettingsIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Configure delivery and system settings
              </p>
            </div>
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
              <div className="flex items-center gap-3 mb-6">
                <div className="h-9 w-9 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-semibold text-gray-800 text-sm">
                  Delivery Configuration
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Radius (KM)
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="maxRadiusKm"
                      value={formData.maxRadiusKm}
                      onChange={handleInputChange}
                      placeholder="e.g. 50"
                      step="0.1"
                      min="0"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white outline-none transition-all duration-200 hover:border-green-300"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Maximum delivery distance in kilometers
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Allowed Delivery Charge
                  </label>
                  <div className="relative group">
                    <CreditCard className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="maxAllowedDeliveryCharge"
                      value={formData.maxAllowedDeliveryCharge}
                      onChange={handleInputChange}
                      placeholder="e.g. 200"
                      step="0.01"
                      min="0"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white outline-none transition-all duration-200 hover:border-green-300"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Maximum cap on delivery charges
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={fetchSettings}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {submitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
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

export default Settings;
