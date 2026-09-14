import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Search,
  Store,
  User,
  Phone,
  MapPin,
  ShoppingBag,
  Eye,
  X,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Package,
  CreditCard,
  Clock,
  XCircle,
  Hash,
  Navigation,
  Calendar,
  Truck,
  FileText,
  List,
  Filter,
  Building2,
} from "lucide-react";
import { ordersAPI, usersAPI, vendorsAPI } from "../components/api/api";
import { useNavigate } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status) {
    case "DELIVERED":
      return "text-green-600 bg-green-50";
    case "CONFIRMED":
      return "text-blue-600 bg-blue-50";
    case "PENDING":
      return "text-orange-600 bg-orange-50";
    case "INITIATED":
      return "text-yellow-600 bg-yellow-50";
    case "CANCELLED":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

const getPaymentStatusBadge = (status) => {
  switch (status) {
    case "SUCCESS":
      return "bg-green-100 text-green-800";
    case "NOT_REQUIRED":
      return "bg-blue-100 text-blue-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "FAILED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

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
  return `₹${(amount || 0).toFixed(2)}`;
};

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;
  const apiOrder = order.originalData || order;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-green-600 text-white px-6 py-4 flex items-center justify-between rounded-t-lg sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} />
            <div>
              <h2 className="text-xl font-bold">Order Details</h2>
              <p className="text-sm text-green-100">
                Order #{apiOrder.orderNumber || apiOrder._id?.substring(0, 8).toUpperCase() || "N/A"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-green-700 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg ${getStatusColor(apiOrder.status)}`}>
              <p className="text-xs font-medium mb-1">Order Status</p>
              <p className="text-lg font-bold">{apiOrder.status}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                <Calendar size={12} /> Created At
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {formatDate(apiOrder.createdAt)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                <Clock size={12} /> Last Updated
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {formatDate(apiOrder.updatedAt)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                <Hash size={12} /> Cart ID
              </p>
              <p className="text-sm font-semibold text-gray-800 font-mono">
                {apiOrder.cartId?.substring(0, 12)}...
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="text-green-600" size={20} />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-medium text-gray-800 font-mono text-sm">
                  {apiOrder.user?._id || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone size={14} /> Mobile Number
                </p>
                <p className="font-medium text-gray-800">
                  {apiOrder.user?.mobile || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">User Role</p>
                <p className="font-medium text-gray-800 capitalize">
                  {apiOrder.user?.role || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Created</p>
                <p className="font-medium text-gray-800">
                  {formatDate(apiOrder.user?.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="text-green-600" size={20} />
              Delivery Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Full Address</p>
                <p className="font-medium text-gray-800">
                  {apiOrder.deliveryLocation?.formattedAddress ||
                    apiOrder.deliveryLocation?.address ||
                    "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-800">
                  {apiOrder.deliveryLocation?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Shop/Building</p>
                <p className="font-medium text-gray-800">
                  {apiOrder.deliveryLocation?.shopOrBuildingNumber || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Area</p>
                <p className="font-medium text-gray-800">
                  {apiOrder.deliveryLocation?.area || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p className="font-medium text-gray-800">
                  {apiOrder.deliveryLocation?.city || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">District</p>
                <p className="font-medium text-gray-800">
                  {apiOrder.deliveryLocation?.district || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">State</p>
                <p className="font-medium text-gray-800">
                  {apiOrder.deliveryLocation?.state || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Zipcode</p>
                <p className="font-medium text-gray-800">
                  {apiOrder.deliveryLocation?.zipcode || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Navigation size={14} /> Coordinates
                </p>
                <p className="font-medium text-gray-800 font-mono text-sm">
                  {apiOrder.deliveryLocation?.coordinates
                    ? `${apiOrder.deliveryLocation.coordinates[0]}, ${apiOrder.deliveryLocation.coordinates[1]}`
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Truck size={14} /> Distance from Store
                </p>
                <p className="font-medium text-gray-800">
                  {apiOrder.distanceKm?.toFixed(2)} km
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Is Default Address</p>
                <p className="font-medium text-gray-800">
                  {apiOrder.deliveryLocation?.isDefault ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="text-green-600" size={20} />
              Order Items
            </h3>
            <div className="space-y-3">
              {apiOrder.items && apiOrder.items.length > 0 ? (
                apiOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product?.name || "Product"}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {item.product?.name || "Unknown Product"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Brand: {item.product?.brand || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          SKU: {item.product?.SKU || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Weight: {item.product?.weightInKg ? `${item.product.weightInKg} kg` : "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        {item.product?.isActive === false && (
                          <p className="text-xs text-red-500 mt-1">
                            ⚠️ Product Inactive
                          </p>
                        )}
                        {item.product?.isDeleted === true && (
                          <p className="text-xs text-red-500">
                            ⚠️ Product Deleted
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items found</p>
              )}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="text-green-600" size={20} />
              Payment Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Sub Total</span>
                <span className="font-medium text-gray-800">
                  {formatCurrency(apiOrder.subTotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="font-medium text-gray-800">
                  {formatCurrency(apiOrder.deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium text-gray-800">
                  {apiOrder.paymentMethod || "COD"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadge(apiOrder.paymentStatus)}`}
                >
                  {apiOrder.paymentStatus || "NOT_REQUIRED"}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-semibold text-gray-800">
                  Total Payable Amount
                </span>
                <span className="font-bold text-green-600 text-lg">
                  {formatCurrency(apiOrder.payableAmount)}
                </span>
              </div>
            </div>
          </div>

          {apiOrder.statusHistory && apiOrder.statusHistory.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="text-green-600" size={20} />
                Status History
              </h3>
              <div className="space-y-2">
                {apiOrder.statusHistory.map((sh, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                  >
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        sh.status === "DELIVERED"
                          ? "bg-green-500"
                          : sh.status === "CANCELLED"
                          ? "bg-red-500"
                          : sh.status === "PENDING"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {sh.status}
                      </p>
                      <p className="text-xs text-gray-500">
                        Changed by: {sh.changedByRole || "system"}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatDate(sh.at)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end items-center sticky bottom-0">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const VendorDetails = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchMode, setSearchMode] = useState("id");
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [vendorData, setVendorData] = useState(null);
  const [vendorLoading, setVendorLoading] = useState(false);
  const [vendorError, setVendorError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeoutRef = useRef(null);
  const resultsRef = useRef(null);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSearchForm, setShowSearchForm] = useState(true);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchVendorDetails = useCallback(async (vendorId) => {
    if (!vendorId) return;
    setVendorLoading(true);
    setVendorError(null);
    try {
      const response = await usersAPI.getUsers({ role: "vendor", limit: 100 });
      let vendors = [];
      if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
        vendors = response.data.data.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        vendors = response.data.data;
      }

      const found = vendors.find((v) => v._id === vendorId);
      if (found) {
        setVendorData(found);
      } else {
        setVendorError("Vendor not found.");
        setVendorData(null);
      }
    } catch (err) {
      console.error("Error fetching vendor:", err);
      setVendorError("Failed to fetch vendor details.");
      setVendorData(null);
    } finally {
      setVendorLoading(false);
    }
  }, []);

  const fetchVendorOrders = useCallback(
    async (vendorId, page = 1) => {
      if (!vendorId) return;
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const response = await ordersAPI.getOrders({
          page,
          limit: 10,
          vendorId,
        });

        let data = [];
        let total = 0;
        let pages = 1;

        if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
          data = response.data.data.data;
          total = response.data.data.total || 0;
          pages = response.data.data.totalPages || 1;
        } else if (response.data?.data && Array.isArray(response.data.data)) {
          data = response.data.data;
          total = data.length;
          pages = 1;
        }

        setOrders(data);
        setTotalPages(pages);
        setTotalOrders(total);

        // Calculate stats from current page first (instant display)
        const calculateStats = (ordersList) => ({
          totalOrders: total,
          totalRevenue: ordersList.reduce(
            (sum, o) => sum + (o.payableAmount || 0),
            0
          ),
          deliveredOrders: ordersList.filter((o) => o.status === "DELIVERED").length,
          pendingOrders: ordersList.filter((o) => o.status === "PENDING").length,
          cancelledOrders: ordersList.filter((o) => o.status === "CANCELLED").length,
        });

        setOrderStats(calculateStats(data));

        // Fetch all pages for accurate stats
        if (pages > 1) {
          const allOrdersData = [...data];
          const pagePromises = [];
          for (let p = 2; p <= pages; p++) {
            pagePromises.push(
              ordersAPI.getOrders({ page: p, limit: 10, vendorId }).then((res) => {
                let pageData = [];
                if (res.data?.data?.data && Array.isArray(res.data.data.data)) {
                  pageData = res.data.data.data;
                } else if (res.data?.data && Array.isArray(res.data.data)) {
                  pageData = res.data.data;
                }
                return pageData;
              }).catch(() => [])
            );
          }
          const additionalPages = await Promise.all(pagePromises);
          additionalPages.forEach((pageData) => allOrdersData.push(...pageData));
          setOrderStats(calculateStats(allOrdersData));
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrdersError("Failed to fetch orders.");
      } finally {
        setOrdersLoading(false);
      }
    },
    []
  );

  const handleVendorSelect = (vendorId) => {
    setSelectedVendorId(vendorId);
    setShowResults(false);
    setCurrentPage(1);
    fetchVendorDetails(vendorId);
    fetchVendorOrders(vendorId, 1);
  };

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
      setSelectedVendorId(searchInput.trim());
      setShowSearchForm(false);
      setCurrentPage(1);
      fetchVendorDetails(searchInput.trim());
      fetchVendorOrders(searchInput.trim(), 1);
      setShowResults(false);
    } else {
      if (searchResults.length === 1) {
        handleVendorSelect(searchResults[0]._id);
      } else if (searchResults.length > 1) {
        setShowResults(true);
      } else {
        setVendorError("No vendor found matching your search.");
        setVendorData(null);
      }
    }
  };

  const handleVendorClick = (vendor) => {
    setVendorData(vendor);
    setSelectedVendorId(vendor._id);
    setShowResults(false);
    setShowSearchForm(false);
    setCurrentPage(1);
    fetchVendorOrders(vendor._id, 1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (selectedVendorId) {
      fetchVendorOrders(selectedVendorId, newPage);
    }
  };

  const mapOrderData = (apiOrder) => ({
    id: apiOrder._id,
    orderNumber:
      apiOrder.orderNumber || apiOrder._id?.substring(0, 8).toUpperCase() || "N/A",
    customerName: apiOrder.user?.mobile || "Unknown",
    phone: apiOrder.user?.mobile || "N/A",
    address:
      apiOrder.deliveryLocation?.formattedAddress ||
      apiOrder.deliveryLocation?.address ||
      "N/A",
    orderDate: formatDate(apiOrder.createdAt),
    totalAmount: apiOrder.payableAmount || 0,
    status: apiOrder.status || "PENDING",
    paymentMethod: apiOrder.paymentMethod || "COD",
    paymentStatus: apiOrder.paymentStatus || "NOT_REQUIRED",
    subTotal: apiOrder.subTotal || 0,
    deliveryCharge: apiOrder.deliveryCharge || 0,
    items: apiOrder.items || [],
    distanceKm: apiOrder.distanceKm,
    cartId: apiOrder.cartId,
    locationId: apiOrder.locationId,
    user: apiOrder.user,
    deliveryLocation: apiOrder.deliveryLocation,
    statusHistory: apiOrder.statusHistory || [],
    createdAt: apiOrder.createdAt,
    updatedAt: apiOrder.updatedAt,
    originalData: apiOrder,
  });

  const mappedOrders = orders.map(mapOrderData);

  const columns = [
    {
      key: "orderNumber",
      header: "Order ID",
      className: "whitespace-nowrap font-medium text-green-600",
    },
    {
      key: "customerName",
      header: "Customer",
      className: "whitespace-nowrap font-semibold",
    },
    {
      key: "orderDate",
      header: "Order Date",
      className: "whitespace-nowrap text-gray-600",
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      className: "whitespace-nowrap font-bold text-green-700",
      render: (value) => `₹${(value || 0).toFixed(2)}`,
    },
    {
      key: "paymentMethod",
      header: "Payment",
      className: "whitespace-nowrap text-gray-700",
    },
    {
      key: "status",
      header: "Order Status",
      render: (value) => {
        const getBadgeColor = (status) => {
          switch (status) {
            case "DELIVERED":
              return "bg-green-100 text-green-800";
            case "CONFIRMED":
              return "bg-blue-100 text-blue-800";
            case "PENDING":
              return "bg-orange-100 text-orange-800";
            case "INITIATED":
              return "bg-yellow-100 text-yellow-800";
            case "CANCELLED":
              return "bg-red-100 text-red-800";
            default:
              return "bg-gray-100 text-gray-800";
          }
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(value)}`}
          >
            {value}
          </span>
        );
      },
    },
  ];

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
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Vendor Details
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                View vendor information and their orders
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
                    ? "Search by Vendor ID (e.g., 6aa72b7afeb1f26d7a6ba2a0)"
                    : "Search by vendor name, shop name, or phone..."
                }
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-11 pr-24 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white outline-none transition-all duration-200 hover:border-green-300 text-sm"
              />
              {searchMode === "name" && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {searchLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  ) : null}
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
                disabled={!searchInput.trim() || vendorLoading || searchLoading}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3.5 rounded-xl hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25 transition-all duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {vendorLoading || searchLoading ? (
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
              ? "Enter the Vendor ID to view details and orders. You can copy it from the Vendor Register page."
              : "Type to search by vendor name, shop name, or phone number. Click a result to view details."}
          </p>
        </div>

        {/* Vendor Data */}
        {vendorData && !vendorLoading && (
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Store className="h-6 w-6 text-white" />
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {vendorData.shopName || "Vendor Details"}
                  </h2>
                  <p className="text-sm text-green-100">
                    Vendor ID: {vendorData._id}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/vendor-branches?vendorId=${vendorData._id}`)}
                  className="inline-flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-xl hover:bg-green-50 shadow-lg transition-all duration-200 font-medium text-sm"
                >
                  <Building2 className="h-4 w-4" />
                  View Branches
                </button>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    vendorData.isActive !== false
                      ? "bg-green-400/30 text-green-100"
                      : "bg-red-400/30 text-red-100"
                  }`}
                >
                  {vendorData.isActive !== false ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Vendor Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <User className="h-3 w-3" /> Vendor Name
                  </p>
                  <p className="font-semibold text-gray-800">
                    {vendorData.name || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Store className="h-3 w-3" /> Shop Name
                  </p>
                  <p className="font-semibold text-gray-800">
                    {vendorData.shopName || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Mobile
                  </p>
                  <p className="font-semibold text-gray-800">
                    {vendorData.mobile || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Hash className="h-3 w-3" /> Email
                  </p>
                  <p className="font-semibold text-gray-800">
                    {vendorData.email || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Role
                  </p>
                  <p className="font-semibold text-gray-800 capitalize">
                    {vendorData.role || "vendor"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Registered
                  </p>
                  <p className="font-semibold text-gray-800">
                    {formatDate(vendorData.createdAt)}
                  </p>
                </div>
              </div>

              {/* Order Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-600 font-medium">Total Orders</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {orderStats.totalOrders}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100/50 p-4 rounded-xl border border-green-100">
                  <p className="text-xs text-green-600 font-medium">Revenue</p>
                  <p className="text-2xl font-bold text-green-800">
                    {formatCurrency(orderStats.totalRevenue)}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 p-4 rounded-xl border border-emerald-100">
                  <p className="text-xs text-emerald-600 font-medium">Delivered</p>
                  <p className="text-2xl font-bold text-emerald-800">
                    {orderStats.deliveredOrders}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-4 rounded-xl border border-orange-100">
                  <p className="text-xs text-orange-600 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {orderStats.pendingOrders}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100/50 p-4 rounded-xl border border-red-100">
                  <p className="text-xs text-red-600 font-medium">Cancelled</p>
                  <p className="text-2xl font-bold text-red-800">
                    {orderStats.cancelledOrders}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {vendorError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">{vendorError}</p>
            <button
              onClick={() => {
                setVendorError(null);
                setVendorData(null);
                setSearchInput("");
                setSelectedVendorId("");
                setShowSearchForm(true);
              }}
              className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear
            </button>
          </div>
        )}

        {/* Orders Section */}
        {!showSearchForm && vendorData && (
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-green-600" />
                Vendor Orders
                <span className="text-sm font-normal text-gray-400">
                  ({totalOrders})
                </span>
              </h2>
              <button
                onClick={() => {
                  setShowSearchForm(true);
                  setVendorData(null);
                  setOrders([]);
                  setSelectedVendorId("");
                  setSearchInput("");
                }}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Search
              </button>
            </div>

            {ordersLoading ? (
              <div className="py-20 text-center">
                <div className="relative inline-flex">
                  <div className="w-12 h-12 border-4 border-green-100 rounded-full"></div>
                  <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="mt-4 text-sm text-gray-500 font-medium">
                  Loading orders...
                </p>
              </div>
            ) : ordersError ? (
              <div className="py-20 text-center">
                <p className="text-red-500 font-medium">{ordersError}</p>
              </div>
            ) : mappedOrders.length === 0 ? (
              <div className="py-20 text-center">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="h-10 w-10 text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium mb-1">No orders found</p>
                <p className="text-sm text-gray-400">
                  This vendor has no orders yet.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Order Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Total Amount
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Payment
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {mappedOrders.map((order, index) => (
                        <tr
                          key={order.id}
                          className="hover:bg-gradient-to-r hover:from-green-50/30 hover:to-emerald-50/30 transition-all duration-200"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-6 py-4">
                            <span className="font-medium text-green-600 font-mono text-sm">
                              {order.orderNumber}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-blue-700">
                                  {(order.customerName || "U").charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {order.customerName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {order.phone}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td
                            className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell"
                          >
                            {order.orderDate}
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-green-700 text-sm">
                              {formatCurrency(order.totalAmount)}
                            </span>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <span className="text-sm text-gray-700">
                              {order.paymentMethod || "COD"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === "DELIVERED"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "CANCELLED"
                                  ? "bg-red-100 text-red-800"
                                  : order.status === "PENDING"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Eye size={14} />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages} • Total: {totalOrders}{" "}
                        orders
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                          disabled={currentPage === 1}
                          className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ArrowLeft size={14} />
                          Previous
                        </button>
                        <button
                          onClick={() =>
                            handlePageChange(Math.min(currentPage + 1, totalPages))
                          }
                          disabled={currentPage === totalPages}
                          className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Next
                          <ArrowLeft size={14} className="rotate-180" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </div>
  );
};

export default VendorDetails;
