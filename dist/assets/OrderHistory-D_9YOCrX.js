import{c as he,r as y,j as e,X as C,h as ue,M as pe,o as v}from"./index-QibEhG9G.js";import{T as ye}from"./Table-Bs9HjbBa.js";import{S as re}from"./shopping-bag-04mUee-p.js";import{T as be}from"./trending-up-Ba7OBmHf.js";import{C as oe}from"./check-DVasXknp.js";import{C as de}from"./clock-pJ43kRO9.js";import{C as ne}from"./circle-check-big-BssjV5Ti.js";import{P as ie}from"./package-CacZ9V80.js";import{T as le}from"./truck-BtLNBwso.js";import{E as Ne}from"./eye-83Qya4Pj.js";import{C as fe}from"./calendar-CHAcJjA9.js";import{H as je}from"./hash-9THV7zcS.js";import{P as ve}from"./phone-ZPW6Fy_Q.js";import{N as we}from"./navigation-BsKKkO-w.js";import{D as Ee}from"./dollar-sign-CQKTAOCv.js";import{C as De}from"./credit-card-DK-1BuUy.js";/**
 * @license lucide-react v0.543.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],Ae=he("printer",Ce),Oe=({order:m,onClose:A,onConfirm:g,onCancel:f,onComplete:O,onPending:z,onPacked:L,onOutForDelivery:b})=>{var j,F,I,M,p,P,$,_,k,T,U,N,V,R,K,G,B,J,Y;if(!m)return null;const s=m.originalData||m,se=i=>{switch(i){case"DELIVERED":return"text-green-600 bg-green-50";case"CONFIRMED":return"text-blue-600 bg-blue-50";case"PENDING":return"text-orange-600 bg-orange-50";case"INITIATED":return"text-yellow-600 bg-yellow-50";case"CANCELLED":return"text-red-600 bg-red-50";case"REJECTED":return"text-red-600 bg-red-50";case"ACCEPTED":return"text-blue-600 bg-blue-50";case"PACKED":return"text-indigo-600 bg-indigo-50";case"OUT_FOR_DELIVERY":return"text-cyan-600 bg-cyan-50";default:return"text-gray-600 bg-gray-50"}},w=i=>{switch(i){case"SUCCESS":return"bg-green-100 text-green-800";case"NOT_REQUIRED":return"bg-blue-100 text-blue-800";case"PENDING":return"bg-yellow-100 text-yellow-800";case"FAILED":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}},ae=s.status==="PENDING"||s.status==="CONFIRMED"||s.status==="INITIATED"||s.status==="ACCEPTED"||s.status==="PACKED"||s.status==="OUT_FOR_DELIVERY",h=i=>i?new Date(i).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A",u=i=>`₹${(i||0).toFixed(2)}`;return e.jsx("div",{className:"fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto",children:[e.jsxs("div",{className:"bg-green-600 text-white px-6 py-4 flex items-center justify-between rounded-t-lg sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(re,{size:24}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold",children:"Order Details"}),e.jsxs("p",{className:"text-sm text-green-100",children:["Order #",((j=s._id)==null?void 0:j.substring(0,8).toUpperCase())||"N/A"]})]})]}),e.jsx("button",{onClick:A,className:"text-white hover:bg-green-700 p-2 rounded-full transition-colors",children:e.jsx(C,{size:20})})]}),e.jsxs("div",{className:"p-6 space-y-6",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsxs("div",{className:`p-4 rounded-lg ${se(s.status)}`,children:[e.jsx("p",{className:"text-xs font-medium mb-1",children:"Order Status"}),e.jsx("p",{className:"text-lg font-bold",children:s.status})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsxs("p",{className:"text-xs text-gray-600 mb-1 flex items-center gap-1",children:[e.jsx(fe,{size:12})," Created At"]}),e.jsx("p",{className:"text-sm font-semibold text-gray-800",children:h(s.createdAt)})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsxs("p",{className:"text-xs text-gray-600 mb-1 flex items-center gap-1",children:[e.jsx(de,{size:12})," Last Updated"]}),e.jsx("p",{className:"text-sm font-semibold text-gray-800",children:h(s.updatedAt)})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsxs("p",{className:"text-xs text-gray-600 mb-1 flex items-center gap-1",children:[e.jsx(je,{size:12})," Cart ID"]}),e.jsxs("p",{className:"text-sm font-semibold text-gray-800 font-mono",children:[(F=s.cartId)==null?void 0:F.substring(0,12),"..."]})]})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsxs("h3",{className:"text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2",children:[e.jsx(ue,{className:"text-green-600",size:20}),"Customer Information"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"User ID"}),e.jsx("p",{className:"font-medium text-gray-800 font-mono text-sm",children:((I=s.user)==null?void 0:I._id)||"N/A"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm text-gray-600 flex items-center gap-1",children:[e.jsx(ve,{size:14})," Mobile Number"]}),e.jsx("p",{className:"font-medium text-gray-800",children:((M=s.user)==null?void 0:M.mobile)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"User Role"}),e.jsx("p",{className:"font-medium text-gray-800 capitalize",children:((p=s.user)==null?void 0:p.role)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Account Created"}),e.jsx("p",{className:"font-medium text-gray-800",children:h((P=s.user)==null?void 0:P.createdAt)})]})]})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsxs("h3",{className:"text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2",children:[e.jsx(pe,{className:"text-green-600",size:20}),"Delivery Location"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Full Address"}),e.jsx("p",{className:"font-medium text-gray-800",children:(($=s.deliveryLocation)==null?void 0:$.formattedAddress)||((_=s.deliveryLocation)==null?void 0:_.address)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Name"}),e.jsx("p",{className:"font-medium text-gray-800",children:((k=s.deliveryLocation)==null?void 0:k.name)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Shop/Building"}),e.jsx("p",{className:"font-medium text-gray-800",children:((T=s.deliveryLocation)==null?void 0:T.shopOrBuildingNumber)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Area"}),e.jsx("p",{className:"font-medium text-gray-800",children:((U=s.deliveryLocation)==null?void 0:U.area)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"City"}),e.jsx("p",{className:"font-medium text-gray-800",children:((N=s.deliveryLocation)==null?void 0:N.city)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"District"}),e.jsx("p",{className:"font-medium text-gray-800",children:((V=s.deliveryLocation)==null?void 0:V.district)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"State"}),e.jsx("p",{className:"font-medium text-gray-800",children:((R=s.deliveryLocation)==null?void 0:R.state)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Zipcode"}),e.jsx("p",{className:"font-medium text-gray-800",children:((K=s.deliveryLocation)==null?void 0:K.zipcode)||"N/A"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm text-gray-600 flex items-center gap-1",children:[e.jsx(we,{size:14})," Coordinates"]}),e.jsx("p",{className:"font-medium text-gray-800 font-mono text-sm",children:(G=s.deliveryLocation)!=null&&G.coordinates?`${s.deliveryLocation.coordinates[0]}, ${s.deliveryLocation.coordinates[1]}`:"N/A"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm text-gray-600 flex items-center gap-1",children:[e.jsx(le,{size:14})," Distance from Store"]}),e.jsxs("p",{className:"font-medium text-gray-800",children:[(B=s.distanceKm)==null?void 0:B.toFixed(2)," km"]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Is Default Address"}),e.jsx("p",{className:"font-medium text-gray-800",children:(J=s.deliveryLocation)!=null&&J.isDefault?"Yes":"No"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Address Created"}),e.jsx("p",{className:"font-medium text-gray-800",children:h((Y=s.deliveryLocation)==null?void 0:Y.createdAt)})]})]})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsxs("h3",{className:"text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2",children:[e.jsx(ie,{className:"text-green-600",size:20}),"Order Items"]}),e.jsx("div",{className:"space-y-3",children:s.items&&s.items.length>0?s.items.map((i,E)=>{var H,Q,q,W,D,X,Z,ee;return e.jsxs("div",{className:"flex items-center justify-between bg-gray-50 p-3 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-3 flex-1",children:[((H=i.product)==null?void 0:H.image)&&e.jsx("img",{src:i.product.image,alt:((Q=i.product)==null?void 0:Q.name)||"Product",className:"w-16 h-16 object-cover rounded-md"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"font-semibold text-gray-800",children:((q=i.product)==null?void 0:q.name)||"Unknown Product"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Brand: ",((W=i.product)==null?void 0:W.brand)||"N/A"]}),e.jsxs("p",{className:"text-sm text-gray-500",children:["SKU: ",((D=i.product)==null?void 0:D.SKU)||"N/A"]}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Weight: ",(X=i.product)!=null&&X.weightInKg?`${i.product.weightInKg} kg`:"N/A"]}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Quantity: ",i.quantity]}),((Z=i.product)==null?void 0:Z.isActive)===!1&&e.jsx("p",{className:"text-xs text-red-500 mt-1",children:"⚠️ Product Inactive"}),((ee=i.product)==null?void 0:ee.isDeleted)===!0&&e.jsx("p",{className:"text-xs text-red-500",children:"⚠️ Product Deleted"})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("p",{className:"font-bold text-green-600",children:u(i.price*i.quantity)}),e.jsxs("p",{className:"text-sm text-gray-500",children:[u(i.price)," each"]})]})]},E)}):e.jsx("p",{className:"text-gray-500",children:"No items found"})})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsxs("h3",{className:"text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2",children:[e.jsx(Ee,{className:"text-green-600",size:20}),"Payment Details"]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Sub Total"}),e.jsx("span",{className:"font-medium text-gray-800",children:u(s.subTotal)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Delivery Charge"}),e.jsx("span",{className:"font-medium text-gray-800",children:u(s.deliveryCharge)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Payment Method"}),e.jsx("span",{className:"font-medium text-gray-800",children:s.paymentMethod||"COD"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Payment Status"}),e.jsx("span",{className:`px-3 py-1 rounded-full text-xs font-medium ${w(s.paymentStatus)}`,children:s.paymentStatus||"NOT_REQUIRED"})]}),e.jsxs("div",{className:"flex justify-between pt-2 border-t border-gray-200",children:[e.jsx("span",{className:"font-semibold text-gray-800",children:"Total Payable Amount"}),e.jsx("span",{className:"font-bold text-green-600 text-lg",children:u(s.payableAmount)})]})]})]}),s.transactions&&s.transactions.length>0&&e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsxs("h3",{className:"text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2",children:[e.jsx(De,{className:"text-green-600",size:20}),"Transaction History"]}),e.jsx("div",{className:"space-y-2",children:s.transactions.map((i,E)=>e.jsx("div",{className:"bg-gray-50 p-3 rounded-lg",children:e.jsxs("div",{className:"grid grid-cols-2 gap-2 text-sm",children:[e.jsxs("p",{children:[e.jsx("span",{className:"text-gray-600",children:"Transaction ID:"})," ",i.transactionId||"N/A"]}),e.jsxs("p",{children:[e.jsx("span",{className:"text-gray-600",children:"Amount:"})," ",u(i.amount)]}),e.jsxs("p",{children:[e.jsx("span",{className:"text-gray-600",children:"Status:"})," ",i.status||"N/A"]}),e.jsxs("p",{children:[e.jsx("span",{className:"text-gray-600",children:"Date:"})," ",h(i.createdAt)]})]})},E))})]})]}),e.jsxs("div",{className:"bg-gray-50 px-6 py-4 rounded-b-lg flex justify-between items-center sticky bottom-0",children:[ae?e.jsx("div",{className:"flex flex-wrap gap-3",children:s.status==="OUT_FOR_DELIVERY"?e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>O(m),className:"flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors",children:[e.jsx(ne,{size:18}),"Mark Delivered"]}),e.jsxs("button",{onClick:()=>f(m),className:"flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors",children:[e.jsx(C,{size:18}),"Cancel Order"]})]}):s.status==="PACKED"?e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>b(m),className:"flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors",children:[e.jsx(le,{size:18}),"Out for Delivery"]}),e.jsxs("button",{onClick:()=>f(m),className:"flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors",children:[e.jsx(C,{size:18}),"Cancel Order"]})]}):s.status==="ACCEPTED"||s.status==="CONFIRMED"?e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>L(m),className:"flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors",children:[e.jsx(ie,{size:18}),"Mark Packed"]}),e.jsxs("button",{onClick:()=>f(m),className:"flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors",children:[e.jsx(C,{size:18}),"Cancel Order"]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>O(m),className:"flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors",children:[e.jsx(ne,{size:18}),"Mark Delivered"]}),e.jsxs("button",{onClick:()=>z(m),className:"flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors",children:[e.jsx(de,{size:18}),"Mark Pending"]}),e.jsxs("button",{onClick:()=>g(m),className:"flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors",children:[e.jsx(oe,{size:18}),"Confirm Order"]}),e.jsxs("button",{onClick:()=>f(m),className:"flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors",children:[e.jsx(C,{size:18}),"Cancel Order"]})]})}):e.jsx("div",{className:"text-sm text-gray-500",children:s.status==="DELIVERED"?"✓ Order completed":s.status==="CANCELLED"||s.status==="REJECTED"?"✗ Order cancelled":"Order status cannot be changed"}),e.jsx("button",{onClick:A,className:"bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors",children:"Close"})]})]})})},Be=()=>{const[m,A]=y.useState([]),[g,f]=y.useState(!0),[O,z]=y.useState(null),[L,b]=y.useState(null),[s,se]=y.useState("All"),[w,ae]=y.useState("all"),[h,u]=y.useState(1),[j,F]=y.useState(1),[I,M]=y.useState(0),[p,P]=y.useState({totalOrders:0,totalRevenue:0,deliveredOrders:0,pendingOrders:0,cancelledOrders:0}),$=(t,r=10)=>{const a={page:t,limit:r};return s!=="All"&&(a.status=s),w!=="all"&&(a.month=w),a},_=t=>{var a,d,l,o,x,n,c,te,S;let r=[];return(d=(a=t==null?void 0:t.data)==null?void 0:a.data)!=null&&d.data&&Array.isArray(t.data.data.data)?r=t.data.data.data:(l=t==null?void 0:t.data)!=null&&l.data&&Array.isArray(t.data.data)?r=t.data.data:Array.isArray(t==null?void 0:t.data)?r=t.data:Array.isArray(t)&&(r=t),{orders:r,total:((x=(o=t==null?void 0:t.data)==null?void 0:o.data)==null?void 0:x.total)??((n=t==null?void 0:t.data)==null?void 0:n.total)??r.length,totalPages:((te=(c=t==null?void 0:t.data)==null?void 0:c.data)==null?void 0:te.totalPages)??((S=t==null?void 0:t.data)==null?void 0:S.totalPages)??1}},k=async(t,r=10)=>{const a=await v.getOrders($(t,r));return console.log("Orders API Response:",a),_(a)},T=(t,r)=>({totalOrders:r,totalRevenue:t.reduce((a,d)=>a+(d.payableAmount||d.totalAmount||0),0),deliveredOrders:t.filter(a=>a.status==="DELIVERED").length,pendingOrders:t.filter(a=>a.status==="PENDING").length,acceptedOrders:t.filter(a=>a.status==="ACCEPTED"||a.status==="CONFIRMED").length,packedOrders:t.filter(a=>a.status==="PACKED").length,outForDeliveryOrders:t.filter(a=>a.status==="OUT_FOR_DELIVERY").length,cancelledOrders:t.filter(a=>a.status==="CANCELLED"||a.status==="REJECTED").length}),U=async t=>{const r=[],a=Math.max(1,t.totalPages||1);for(let l=1;l<=a;l+=1){const o=l===t.page?t:await k(l);r.push(...o.orders)}const d=T(r,t.total);return s==="DELIVERED"?d.deliveredOrders=t.total:s==="PENDING"?d.pendingOrders=t.total:s==="CANCELLED"&&(d.cancelledOrders=t.total),d},N=async()=>{f(!0);try{const t=await k(h),r=t.orders;A(r),M(t.total),F(t.totalPages),z(null);try{const a=await U(t);P(a)}catch(a){console.error("Error calculating order stats:",a),P(T(r,t.total))}}catch(t){console.error("Error fetching orders:",t),z("Failed to load orders. Please try again."),A([])}finally{f(!1)}};y.useEffect(()=>{N()},[h,s,w]);const V=t=>{var a,d,l,o,x;const r=n=>n?new Date(n).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A";return{id:t._id,orderNumber:((a=t._id)==null?void 0:a.substring(0,8).toUpperCase())||"N/A",customerName:((d=t.user)==null?void 0:d.mobile)||"Unknown",phone:((l=t.user)==null?void 0:l.mobile)||"N/A",address:((o=t.deliveryLocation)==null?void 0:o.formattedAddress)||((x=t.deliveryLocation)==null?void 0:x.address)||"N/A",orderDate:r(t.createdAt),totalAmount:t.payableAmount||0,status:t.status||"PENDING",paymentMethod:t.paymentMethod||"COD",paymentStatus:t.paymentStatus||"NOT_REQUIRED",subTotal:t.subTotal||0,deliveryCharge:t.deliveryCharge||0,items:t.items||[],distanceKm:t.distanceKm,cartId:t.cartId,locationId:t.locationId,user:t.user,deliveryLocation:t.deliveryLocation,transactions:t.transactions||[],createdAt:t.createdAt,updatedAt:t.updatedAt,originalData:t}},R=m.map(V),K=[{key:"orderNumber",header:"Order ID",className:"whitespace-nowrap font-medium text-green-600"},{key:"customerName",header:"Customer",className:"whitespace-nowrap font-semibold"},{key:"orderDate",header:"Order Date",className:"whitespace-nowrap text-gray-600"},{key:"totalAmount",header:"Total Amount",className:"whitespace-nowrap font-bold text-green-700",render:t=>`₹${(t||0).toFixed(2)}`},{key:"paymentMethod",header:"Payment",className:"whitespace-nowrap text-gray-700"},{key:"paymentStatus",header:"Payment Status",className:"whitespace-nowrap",render:t=>{const r=a=>{switch(a){case"SUCCESS":return"bg-green-100 text-green-800";case"NOT_REQUIRED":return"bg-blue-100 text-blue-800";case"PENDING":return"bg-yellow-100 text-yellow-800";case"FAILED":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}};return e.jsx("span",{className:`px-3 py-1 rounded-full text-xs font-medium ${r(t)}`,children:t})}},{key:"status",header:"Order Status",render:t=>{const r=a=>{switch(a){case"DELIVERED":return"bg-green-100 text-green-800";case"CONFIRMED":return"bg-blue-100 text-blue-800";case"PENDING":return"bg-orange-100 text-orange-800";case"INITIATED":return"bg-yellow-100 text-yellow-800";case"CANCELLED":return"bg-red-100 text-red-800";case"REJECTED":return"bg-red-100 text-red-800";case"ACCEPTED":return"bg-blue-100 text-blue-800";case"PACKED":return"bg-indigo-100 text-indigo-800";case"OUT_FOR_DELIVERY":return"bg-cyan-100 text-cyan-800";default:return"bg-gray-100 text-gray-800"}};return e.jsx("span",{className:`px-3 py-1 rounded-full text-xs font-medium ${r(t)}`,children:t})}}],G=[{icon:e.jsx(Ne,{size:16}),onClick:B,className:"text-blue-600 hover:text-blue-900 hover:bg-blue-100",title:"View Details"},{icon:e.jsx(Ae,{size:16}),onClick:Y,className:"text-green-600 hover:text-green-900 hover:bg-green-100",title:"Print Invoice"}];function B(t){b(t)}function J(){b(null)}function Y(t){var o,x,n;const r=window.open("","_blank","width=800,height=600"),a=t.originalData||t,d=a.deliveryLocation||{};d.coordinates&&`${d.coordinates[0]}${d.coordinates[1]}`;const l=`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${t.orderNumber}</title>
        <style>
          @page {
            size: 10cm 7.5cm;
            margin: 0;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          html, body {
            width: 10cm;
            height: 7.5cm;
            overflow: hidden;
            font-family: Arial, sans-serif;
            font-size: 6pt;
            color: #000;
            background: white;
          }
          .invoice-container {
            width: 9.8cm;
            height: 7.4cm;
            padding: 0.15cm;
            overflow: hidden;
            background: white;
          }
          .row {
            display: flex;
            gap: 0.15cm;
            margin-bottom: 0.1cm;
          }
          .col {
            flex: 1;
          }
          .section {
            font-weight: bold;
            font-size: 6.5pt;
            color: #10b981;
            border-bottom: 0.5px solid #10b981;
            margin: 0.08cm 0 0.03cm 0;
            padding-bottom: 1px;
          }
          .header {
            text-align: center;
            border-bottom: 1px solid #10b981;
            padding-bottom: 0.1cm;
            margin-bottom: 0.1cm;
          }
          .header-title {
            font-size: 9pt;
            font-weight: bold;
            color: #10b981;
          }
          .header-sub {
            font-size: 5pt;
            color: #6b7280;
            margin-top: 1px;
          }
          table.items {
            width: 100%;
            border-collapse: collapse;
            font-size: 5.5pt;
            margin-top: 0.03cm;
          }
          table.items th {
            background: #f3f4f6;
            padding: 1px 2px;
            text-align: left;
            border: 0.5px solid #ccc;
            font-weight: 600;
          }
          table.items td {
            padding: 1px 2px;
            border: 0.5px solid #ccc;
            vertical-align: top;
          }
          .totals {
            width: 100%;
            font-size: 6pt;
            margin-top: 0.05cm;
          }
          .totals td {
            padding: 0px 2px;
            text-align: right;
          }
          .grand {
            font-weight: bold;
            font-size: 7pt;
            color: #10b981;
          }
          .footer-row {
            display: flex;
            justify-content: space-between;
            font-size: 5pt;
            color: #6b7280;
            margin-top: 0.08cm;
            border-top: 0.5px solid #ccc;
            padding-top: 0.05cm;
          }
          .print-btn {
            display: block;
            position: fixed;
            bottom: 10px;
            right: 10px;
            background: #10b981;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            z-index: 1000;
          }
          @media print {
            .print-btn { display: none; }
            html, body {
              padding: 0;
              margin: 0;
              width: 10cm;
              height: 7.5cm;
              overflow: hidden;
            }
            .invoice-container {
              padding: 0.15cm;
              width: 9.8cm;
              height: 7.4cm;
              overflow: hidden;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <div class="header-title">🍚 NVS RICE MART</div>
            <div class="header-sub">GSTIN: 29ABCDE1234F1Z5 | CIN: U12345KA2020PTC123456</div>
            <div class="header-sub">#123, MG Road, Davangere, KA - 577001</div>
            <div style="font-weight:bold; font-size:6.5pt; margin-top:1px;">TAX INVOICE</div>
            <div style="font-size:5.5pt;">#${t.orderNumber} | ${t.orderDate}</div>
          </div>
          
          <div class="row">
            <div class="col">
              <div class="section">CUSTOMER</div>
              <div style="font-size:5.5pt;"><b>Mobile:</b> ${t.customerName||"N/A"}</div>
              <div style="font-size:5.5pt;"><b>User:</b> ${((x=(o=a.user)==null?void 0:o._id)==null?void 0:x.substring(0,12))||"N/A"}</div>
            </div>
            <div class="col">
              <div class="section">ADDRESS</div>
              <div style="font-size:5.5pt;"><b>${d.name||"N/A"}</b></div>
              <div style="font-size:5.5pt;">${d.shopOrBuildingNumber||""} ${d.area||""}</div>
              <div style="font-size:5.5pt;">${d.city||""} - ${d.zipcode||""}</div>
            </div>
          </div>
          
          <div class="section">ITEMS</div>
          <table class="items">
            <thead>
              <tr>
                <th style="width:5%">#</th>
                <th style="width:45%">Item</th>
                <th style="width:10%">Qty</th>
                <th style="width:20%">Price</th>
                <th style="width:20%; text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${t.items&&t.items.length>0?t.items.map((c,te)=>{var S;return`
                <tr>
                  <td>${te+1}</td>
                  <td>${(((S=c.product)==null?void 0:S.name)||"Unknown").substring(0,22)}</td>
                  <td>${c.quantity}</td>
                  <td>₹${(c.price||0).toFixed(2)}</td>
                  <td style="text-align:right;">₹${((c.price||0)*(c.quantity||1)).toFixed(2)}</td>
                </tr>
              `}).join(""):'<tr><td colspan="5" style="text-align:center">No items</td></tr>'}
            </tbody>
          </table>
          
          <table class="totals">
            <tr>
              <td style="text-align:right;"><b>Subtotal:</b></td>
              <td style="width:70px;">₹${(t.subTotal||0).toFixed(2)}</td>
            </tr>
            <tr>
              <td style="text-align:right;"><b>Delivery:</b></td>
              <td>₹${(t.deliveryCharge||0).toFixed(2)}</td>
            </tr>
            <tr style="border-top:0.5px solid #10b981;">
              <td style="text-align:right;"><b class="grand">TOTAL:</b></td>
              <td class="grand">₹${(t.totalAmount||t.payableAmount||0).toFixed(2)}</td>
            </tr>
          </table>
          
          <div class="footer-row">
            <div><b>Method:</b> ${t.paymentMethod||"COD"} | <b>Status:</b> ${t.paymentStatus||"NOT_REQUIRED"}</div>
            <div><b>ID:</b> ${((n=a._id)==null?void 0:n.substring(0,10))||t.id||"N/A"}</div>
          </div>
        </div>
        <button class="print-btn" onclick="window.print()">🖨️ Print Invoice</button>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        <\/script>
      </body>
      </html>
    `;r.document.write(l),r.document.close()}async function i(t){var d,l,o,x;const r=window.prompt("Enter a note for this order confirmation:","Order confirm, packing shuru");if(r===null)return;const a=r.trim()||"Order confirmed";if(window.confirm(`Confirm this order with note: "${a}"?`))try{const n=t.id||t._id,c=await v.updateOrderStatus(n,{status:"ACCEPTED",note:a});((l=(d=c.data)==null?void 0:d.data)==null?void 0:l.status)==="ACCEPTED"&&console.log("Order accepted:",c.data.data),await N(),b(null)}catch(n){console.error("Error updating order status:",n),alert(((x=(o=n.response)==null?void 0:o.data)==null?void 0:x.message)||"Failed to update order status. Please try again.")}}async function E(t){var d,l,o,x;const r=window.prompt("Please enter a reason for canceling this order:","Stock khatam ho gaya");if(r===null)return;const a=r.trim()||"No reason provided";if(window.confirm(`Cancel this order with reason: "${a}"?`))try{const n=t.id||t._id,c=await v.updateOrderStatus(n,{status:"REJECTED",reason:a});((l=(d=c.data)==null?void 0:d.data)==null?void 0:l.status)==="REJECTED"&&console.log("Order rejected:",c.data.data),await N(),b(null)}catch(n){console.error("Error updating order status:",n),alert(((x=(o=n.response)==null?void 0:o.data)==null?void 0:x.message)||"Failed to update order status. Please try again.")}}async function H(t){var d,l,o,x;const r=window.prompt("Enter a note for delivery confirmation:","Order delivered successfully");if(r===null)return;const a=r.trim()||"Order delivered";if(window.confirm(`Mark this order as delivered with note: "${a}"?`))try{const n=t.id||t._id,c=await v.updateOrderStatus(n,{status:"DELIVERED",note:a});((l=(d=c.data)==null?void 0:d.data)==null?void 0:l.status)==="DELIVERED"&&console.log("Order delivered:",c.data.data),await N(),b(null)}catch(n){console.error("Error updating order status:",n),alert(((x=(o=n.response)==null?void 0:o.data)==null?void 0:x.message)||"Failed to update order status. Please try again.")}}async function Q(t){var d,l,o,x;const r=window.prompt("Enter a note for packing:","Items pack ho gaye");if(r===null)return;const a=r.trim()||"Order packed";if(window.confirm(`Mark this order as packed with note: "${a}"?`))try{const n=t.id||t._id,c=await v.updateOrderStatus(n,{status:"PACKED",note:a});((l=(d=c.data)==null?void 0:d.data)==null?void 0:l.status)==="PACKED"&&console.log("Order packed:",c.data.data),await N(),b(null)}catch(n){console.error("Error updating order status:",n),alert(((x=(o=n.response)==null?void 0:o.data)==null?void 0:x.message)||"Failed to update order status. Please try again.")}}async function q(t){var d,l,o,x;const r=window.prompt("Enter a note for delivery dispatch:","Out For Delivery");if(r===null)return;const a=r.trim()||"Out for delivery";if(window.confirm(`Mark this order as out for delivery with note: "${a}"?`))try{const n=t.id||t._id,c=await v.updateOrderStatus(n,{status:"OUT_FOR_DELIVERY",note:a});((l=(d=c.data)==null?void 0:d.data)==null?void 0:l.status)==="OUT_FOR_DELIVERY"&&console.log("Order out for delivery:",c.data.data),await N(),b(null)}catch(n){console.error("Error updating order status:",n),alert(((x=(o=n.response)==null?void 0:o.data)==null?void 0:x.message)||"Failed to update order status. Please try again.")}}async function W(t){try{const r=t.id||t._id;await v.updateOrder(r,{status:"PENDING"}),await N(),b(null)}catch(r){console.error("Error updating order status:",r),alert("Failed to update order status. Please try again.")}}const D=s==="All"?R:R.filter(t=>t.status===s),X=p.totalRevenue,Z=p.deliveredOrders,ee=p.pendingOrders,ce=p.cancelledOrders,xe=p.acceptedOrders,me=p.packedOrders,ge=p.outForDeliveryOrders;return e.jsx("div",{className:"min-h-screen bg-gray-50 p-6",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"mb-6",children:[e.jsxs("h1",{className:"text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3",children:[e.jsx(re,{className:"text-green-600",size:36}),"🍚 NVS RICE MART - Order History"]}),e.jsx("p",{className:"text-gray-600",children:"Track and manage all customer orders"})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-5 gap-4 mb-6",children:[e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Total Orders"}),e.jsx("p",{className:"text-2xl font-bold text-gray-800",children:g?"...":p.totalOrders})]}),e.jsx(re,{className:"text-green-600",size:32})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Total Revenue"}),e.jsx("p",{className:"text-2xl font-bold text-green-600",children:g?"...":`₹${X.toFixed(2)}`})]}),e.jsx(be,{className:"text-green-600",size:32})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Delivered"}),e.jsx("p",{className:"text-2xl font-bold text-green-600",children:g?"...":Z})]}),e.jsx(oe,{className:"text-green-600",size:32})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Pending"}),e.jsx("p",{className:"text-2xl font-bold text-orange-600",children:g?"...":ee})]}),e.jsx(de,{className:"text-orange-600",size:32})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Accepted"}),e.jsx("p",{className:"text-2xl font-bold text-blue-600",children:g?"...":xe})]}),e.jsx(ne,{className:"text-blue-600",size:32})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Packed"}),e.jsx("p",{className:"text-2xl font-bold text-indigo-600",children:g?"...":me})]}),e.jsx(ie,{className:"text-indigo-600",size:32})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Out for Delivery"}),e.jsx("p",{className:"text-2xl font-bold text-cyan-600",children:g?"...":ge})]}),e.jsx(le,{className:"text-cyan-600",size:32})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Cancelled"}),e.jsx("p",{className:"text-2xl font-bold text-red-600",children:g?"...":ce})]}),e.jsx(C,{className:"text-red-600",size:32})]})})]}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("label",{className:"text-sm font-medium text-gray-700",children:"Month:"}),e.jsxs("select",{value:w,onChange:t=>{ae(t.target.value),u(1)},className:"px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[e.jsx("option",{value:"all",children:"All Months"}),e.jsx("option",{value:"1",children:"January"}),e.jsx("option",{value:"2",children:"February"}),e.jsx("option",{value:"3",children:"March"}),e.jsx("option",{value:"4",children:"April"}),e.jsx("option",{value:"5",children:"May"}),e.jsx("option",{value:"6",children:"June"}),e.jsx("option",{value:"7",children:"July"}),e.jsx("option",{value:"8",children:"August"}),e.jsx("option",{value:"9",children:"September"}),e.jsx("option",{value:"10",children:"October"}),e.jsx("option",{value:"11",children:"November"}),e.jsx("option",{value:"12",children:"December"})]})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4",children:e.jsx("div",{className:"flex flex-wrap gap-2",children:["All","INITIATED","PENDING","ACCEPTED","CONFIRMED","PACKED","OUT_FOR_DELIVERY","DELIVERED","CANCELLED","REJECTED"].map(t=>e.jsx("button",{onClick:()=>{se(t),u(1)},className:`px-4 py-2 rounded-md font-medium transition-colors ${s===t?"bg-green-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:t},t))})}),e.jsxs("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200",children:[e.jsxs("div",{className:"px-6 py-4 border-b border-gray-200 flex justify-between items-center",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-800",children:"Orders"}),e.jsxs("span",{className:"text-sm text-gray-500",children:["Showing ",D.length," of ",I," orders"]})]}),g?e.jsx("div",{className:"p-8 text-center text-gray-500",children:"Loading orders..."}):O?e.jsx("div",{className:"p-8 text-center text-red-500",children:O}):D.length===0?e.jsx("div",{className:"p-8 text-center text-gray-500",children:"No orders found."}):e.jsx(e.Fragment,{children:e.jsx(ye,{columns:K,data:D,actions:G,emptyMessage:"No orders found."})}),j>1&&e.jsx("div",{className:"bg-white px-4 py-3 border-t border-gray-200 sm:px-6",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"text-sm text-gray-700",children:["Page ",h," of ",j," • Total: ",I," orders"]}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("button",{onClick:()=>u(t=>Math.max(t-1,1)),disabled:h===1,className:"px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",children:"Previous"}),e.jsx("button",{onClick:()=>u(t=>Math.min(t+1,j)),disabled:h===j,className:"px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",children:"Next"})]})]})})]}),L&&e.jsx(Oe,{order:L,onClose:J,onConfirm:i,onCancel:E,onComplete:H,onPending:W,onPacked:Q,onOutForDelivery:q})]})})};export{Be as default};
