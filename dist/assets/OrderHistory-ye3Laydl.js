import{c as le,r as o,j as e,X as ee,g as ne,M as ce,o as T}from"./index-CohOkScd.js";import{T as oe}from"./Table-DocE7bAL.js";import{S as se}from"./shopping-bag-B3WcOBxW.js";import{T as xe}from"./trending-up-zAZlPwhH.js";import{C as de}from"./check-DcRj7hJr.js";import{C as ae,T as me}from"./truck-BTfmdSjt.js";import{E as ge}from"./eye-3Odhj4-V.js";import{C as he}from"./calendar-JhLPwOg0.js";import{H as ue}from"./hash-Dv9EQIDY.js";import{P as pe,C as ye}from"./phone-kHJVcjvh.js";import{N as be}from"./navigation-CMLNiUgQ.js";import{P as re}from"./package-BDGlA2Dh.js";import{D as Ne}from"./dollar-sign-DI9Exk5w.js";import{C as je}from"./circle-check-big-Bm7jh6jd.js";/**
 * @license lucide-react v0.543.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],ve=le("printer",fe),we=({order:n,onClose:C,onConfirm:h,onCancel:E,onComplete:I,onPending:M})=>{var y,v,w,R,O,$,b,S,F,U,P,z,_,N,G,L,V,B,K;if(!n)return null;const s=n.originalData||n,u=d=>{switch(d){case"DELIVERED":return"text-green-600 bg-green-50";case"CONFIRMED":return"text-blue-600 bg-blue-50";case"PENDING":return"text-orange-600 bg-orange-50";case"INITIATED":return"text-yellow-600 bg-yellow-50";case"CANCELLED":return"text-red-600 bg-red-50";default:return"text-gray-600 bg-gray-50"}},c=d=>{switch(d){case"SUCCESS":return"bg-green-100 text-green-800";case"NOT_REQUIRED":return"bg-blue-100 text-blue-800";case"PENDING":return"bg-yellow-100 text-yellow-800";case"FAILED":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}},te=s.status==="PENDING"||s.status==="CONFIRMED",x=d=>d?new Date(d).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A",p=d=>`₹${(d||0).toFixed(2)}`;return e.jsx("div",{className:"fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto",children:[e.jsxs("div",{className:"bg-green-600 text-white px-6 py-4 flex items-center justify-between rounded-t-lg sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(se,{size:24}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold",children:"Order Details"}),e.jsxs("p",{className:"text-sm text-green-100",children:["Order #",((y=s._id)==null?void 0:y.substring(0,8).toUpperCase())||"N/A"]})]})]}),e.jsx("button",{onClick:C,className:"text-white hover:bg-green-700 p-2 rounded-full transition-colors",children:e.jsx(ee,{size:20})})]}),e.jsxs("div",{className:"p-6 space-y-6",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsxs("div",{className:`p-4 rounded-lg ${u(s.status)}`,children:[e.jsx("p",{className:"text-xs font-medium mb-1",children:"Order Status"}),e.jsx("p",{className:"text-lg font-bold",children:s.status})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsxs("p",{className:"text-xs text-gray-600 mb-1 flex items-center gap-1",children:[e.jsx(he,{size:12})," Created At"]}),e.jsx("p",{className:"text-sm font-semibold text-gray-800",children:x(s.createdAt)})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsxs("p",{className:"text-xs text-gray-600 mb-1 flex items-center gap-1",children:[e.jsx(ae,{size:12})," Last Updated"]}),e.jsx("p",{className:"text-sm font-semibold text-gray-800",children:x(s.updatedAt)})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsxs("p",{className:"text-xs text-gray-600 mb-1 flex items-center gap-1",children:[e.jsx(ue,{size:12})," Cart ID"]}),e.jsxs("p",{className:"text-sm font-semibold text-gray-800 font-mono",children:[(v=s.cartId)==null?void 0:v.substring(0,12),"..."]})]})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsxs("h3",{className:"text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2",children:[e.jsx(ne,{className:"text-green-600",size:20}),"Customer Information"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"User ID"}),e.jsx("p",{className:"font-medium text-gray-800 font-mono text-sm",children:((w=s.user)==null?void 0:w._id)||"N/A"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm text-gray-600 flex items-center gap-1",children:[e.jsx(pe,{size:14})," Mobile Number"]}),e.jsx("p",{className:"font-medium text-gray-800",children:((R=s.user)==null?void 0:R.mobile)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"User Role"}),e.jsx("p",{className:"font-medium text-gray-800 capitalize",children:((O=s.user)==null?void 0:O.role)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Account Created"}),e.jsx("p",{className:"font-medium text-gray-800",children:x(($=s.user)==null?void 0:$.createdAt)})]})]})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsxs("h3",{className:"text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2",children:[e.jsx(ce,{className:"text-green-600",size:20}),"Delivery Location"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Full Address"}),e.jsx("p",{className:"font-medium text-gray-800",children:((b=s.deliveryLocation)==null?void 0:b.formattedAddress)||((S=s.deliveryLocation)==null?void 0:S.address)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Name"}),e.jsx("p",{className:"font-medium text-gray-800",children:((F=s.deliveryLocation)==null?void 0:F.name)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Shop/Building"}),e.jsx("p",{className:"font-medium text-gray-800",children:((U=s.deliveryLocation)==null?void 0:U.shopOrBuildingNumber)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Area"}),e.jsx("p",{className:"font-medium text-gray-800",children:((P=s.deliveryLocation)==null?void 0:P.area)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"City"}),e.jsx("p",{className:"font-medium text-gray-800",children:((z=s.deliveryLocation)==null?void 0:z.city)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"District"}),e.jsx("p",{className:"font-medium text-gray-800",children:((_=s.deliveryLocation)==null?void 0:_.district)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"State"}),e.jsx("p",{className:"font-medium text-gray-800",children:((N=s.deliveryLocation)==null?void 0:N.state)||"N/A"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Zipcode"}),e.jsx("p",{className:"font-medium text-gray-800",children:((G=s.deliveryLocation)==null?void 0:G.zipcode)||"N/A"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm text-gray-600 flex items-center gap-1",children:[e.jsx(be,{size:14})," Coordinates"]}),e.jsx("p",{className:"font-medium text-gray-800 font-mono text-sm",children:(L=s.deliveryLocation)!=null&&L.coordinates?`${s.deliveryLocation.coordinates[0]}, ${s.deliveryLocation.coordinates[1]}`:"N/A"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm text-gray-600 flex items-center gap-1",children:[e.jsx(me,{size:14})," Distance from Store"]}),e.jsxs("p",{className:"font-medium text-gray-800",children:[(V=s.distanceKm)==null?void 0:V.toFixed(2)," km"]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Is Default Address"}),e.jsx("p",{className:"font-medium text-gray-800",children:(B=s.deliveryLocation)!=null&&B.isDefault?"Yes":"No"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Address Created"}),e.jsx("p",{className:"font-medium text-gray-800",children:x((K=s.deliveryLocation)==null?void 0:K.createdAt)})]})]})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsxs("h3",{className:"text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2",children:[e.jsx(re,{className:"text-green-600",size:20}),"Order Items"]}),e.jsx("div",{className:"space-y-3",children:s.items&&s.items.length>0?s.items.map((d,A)=>{var H,Q,q,J,D,W,X,Y;return e.jsxs("div",{className:"flex items-center justify-between bg-gray-50 p-3 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-3 flex-1",children:[((H=d.product)==null?void 0:H.image)&&e.jsx("img",{src:d.product.image,alt:((Q=d.product)==null?void 0:Q.name)||"Product",className:"w-16 h-16 object-cover rounded-md"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"font-semibold text-gray-800",children:((q=d.product)==null?void 0:q.name)||"Unknown Product"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Brand: ",((J=d.product)==null?void 0:J.brand)||"N/A"]}),e.jsxs("p",{className:"text-sm text-gray-500",children:["SKU: ",((D=d.product)==null?void 0:D.SKU)||"N/A"]}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Weight: ",(W=d.product)!=null&&W.weightInKg?`${d.product.weightInKg} kg`:"N/A"]}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Quantity: ",d.quantity]}),((X=d.product)==null?void 0:X.isActive)===!1&&e.jsx("p",{className:"text-xs text-red-500 mt-1",children:"⚠️ Product Inactive"}),((Y=d.product)==null?void 0:Y.isDeleted)===!0&&e.jsx("p",{className:"text-xs text-red-500",children:"⚠️ Product Deleted"})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("p",{className:"font-bold text-green-600",children:p(d.price*d.quantity)}),e.jsxs("p",{className:"text-sm text-gray-500",children:[p(d.price)," each"]})]})]},A)}):e.jsx("p",{className:"text-gray-500",children:"No items found"})})]}),e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsxs("h3",{className:"text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2",children:[e.jsx(Ne,{className:"text-green-600",size:20}),"Payment Details"]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Sub Total"}),e.jsx("span",{className:"font-medium text-gray-800",children:p(s.subTotal)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Delivery Charge"}),e.jsx("span",{className:"font-medium text-gray-800",children:p(s.deliveryCharge)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Payment Method"}),e.jsx("span",{className:"font-medium text-gray-800",children:s.paymentMethod||"COD"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Payment Status"}),e.jsx("span",{className:`px-3 py-1 rounded-full text-xs font-medium ${c(s.paymentStatus)}`,children:s.paymentStatus||"NOT_REQUIRED"})]}),e.jsxs("div",{className:"flex justify-between pt-2 border-t border-gray-200",children:[e.jsx("span",{className:"font-semibold text-gray-800",children:"Total Payable Amount"}),e.jsx("span",{className:"font-bold text-green-600 text-lg",children:p(s.payableAmount)})]})]})]}),s.transactions&&s.transactions.length>0&&e.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[e.jsxs("h3",{className:"text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2",children:[e.jsx(ye,{className:"text-green-600",size:20}),"Transaction History"]}),e.jsx("div",{className:"space-y-2",children:s.transactions.map((d,A)=>e.jsx("div",{className:"bg-gray-50 p-3 rounded-lg",children:e.jsxs("div",{className:"grid grid-cols-2 gap-2 text-sm",children:[e.jsxs("p",{children:[e.jsx("span",{className:"text-gray-600",children:"Transaction ID:"})," ",d.transactionId||"N/A"]}),e.jsxs("p",{children:[e.jsx("span",{className:"text-gray-600",children:"Amount:"})," ",p(d.amount)]}),e.jsxs("p",{children:[e.jsx("span",{className:"text-gray-600",children:"Status:"})," ",d.status||"N/A"]}),e.jsxs("p",{children:[e.jsx("span",{className:"text-gray-600",children:"Date:"})," ",x(d.createdAt)]})]})},A))})]})]}),e.jsxs("div",{className:"bg-gray-50 px-6 py-4 rounded-b-lg flex justify-between items-center sticky bottom-0",children:[te?e.jsx("div",{className:"flex flex-wrap gap-3",children:s.status==="CONFIRMED"?e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>I(n),className:"flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors",children:[e.jsx(re,{size:18}),"Out for Delivery"]}),e.jsxs("button",{onClick:()=>E(n),className:"flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors",children:[e.jsx(ee,{size:18}),"Cancel Order"]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>I(n),className:"flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors",children:[e.jsx(je,{size:18}),"Mark Delivered"]}),e.jsxs("button",{onClick:()=>M(n),className:"flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors",children:[e.jsx(ae,{size:18}),"Mark Pending"]}),e.jsxs("button",{onClick:()=>h(n),className:"flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors",children:[e.jsx(de,{size:18}),"Confirm Order"]}),e.jsxs("button",{onClick:()=>E(n),className:"flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors",children:[e.jsx(ee,{size:18}),"Cancel Order"]})]})}):e.jsx("div",{className:"text-sm text-gray-500",children:s.status==="DELIVERED"?"✓ Order completed":s.status==="CANCELLED"?"✗ Order cancelled":"Order status cannot be changed"}),e.jsx("button",{onClick:C,className:"bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors",children:"Close"})]})]})})},$e=()=>{const[n,C]=o.useState([]),[h,E]=o.useState(!0),[I,M]=o.useState(null),[s,u]=o.useState(null),[c,te]=o.useState("All"),[x,p]=o.useState("all"),[y,v]=o.useState(1),[w,R]=o.useState(1),[O,$]=o.useState(0),[b,S]=o.useState({totalOrders:0,totalRevenue:0,deliveredOrders:0,pendingOrders:0,cancelledOrders:0}),F=(t,a=10)=>{const r={page:t,limit:a};return c!=="All"&&(r.status=c),x!=="all"&&(r.month=x),r},U=t=>{var r,i,l,m,j,f,g,Z,k;let a=[];return(i=(r=t==null?void 0:t.data)==null?void 0:r.data)!=null&&i.data&&Array.isArray(t.data.data.data)?a=t.data.data.data:(l=t==null?void 0:t.data)!=null&&l.data&&Array.isArray(t.data.data)?a=t.data.data:Array.isArray(t==null?void 0:t.data)?a=t.data:Array.isArray(t)&&(a=t),{orders:a,total:((j=(m=t==null?void 0:t.data)==null?void 0:m.data)==null?void 0:j.total)??((f=t==null?void 0:t.data)==null?void 0:f.total)??a.length,totalPages:((Z=(g=t==null?void 0:t.data)==null?void 0:g.data)==null?void 0:Z.totalPages)??((k=t==null?void 0:t.data)==null?void 0:k.totalPages)??1}},P=async(t,a=10)=>{const r=await T.getOrders(F(t,a));return console.log("Orders API Response:",r),U(r)},z=(t,a)=>({totalOrders:a,totalRevenue:t.reduce((r,i)=>r+(i.payableAmount||i.totalAmount||0),0),deliveredOrders:t.filter(r=>r.status==="DELIVERED").length,pendingOrders:t.filter(r=>r.status==="PENDING").length,cancelledOrders:t.filter(r=>r.status==="CANCELLED").length}),_=async t=>{const a=[],r=Math.max(1,t.totalPages||1);for(let l=1;l<=r;l+=1){const m=l===t.page?t:await P(l);a.push(...m.orders)}const i=z(a,t.total);return c==="DELIVERED"?i.deliveredOrders=t.total:c==="PENDING"?i.pendingOrders=t.total:c==="CANCELLED"&&(i.cancelledOrders=t.total),i},N=async()=>{E(!0);try{const t=await P(y),a=t.orders;C(a),$(t.total),R(t.totalPages),M(null);try{const r=await _(t);S(r)}catch(r){console.error("Error calculating order stats:",r),S(z(a,t.total))}}catch(t){console.error("Error fetching orders:",t),M("Failed to load orders. Please try again."),C([])}finally{E(!1)}};o.useEffect(()=>{N()},[y,c,x]);const G=t=>{var r,i,l,m,j;const a=f=>f?new Date(f).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A";return{id:t._id,orderNumber:((r=t._id)==null?void 0:r.substring(0,8).toUpperCase())||"N/A",customerName:((i=t.user)==null?void 0:i.mobile)||"Unknown",phone:((l=t.user)==null?void 0:l.mobile)||"N/A",address:((m=t.deliveryLocation)==null?void 0:m.formattedAddress)||((j=t.deliveryLocation)==null?void 0:j.address)||"N/A",orderDate:a(t.createdAt),totalAmount:t.payableAmount||0,status:t.status||"PENDING",paymentMethod:t.paymentMethod||"COD",paymentStatus:t.paymentStatus||"NOT_REQUIRED",subTotal:t.subTotal||0,deliveryCharge:t.deliveryCharge||0,items:t.items||[],distanceKm:t.distanceKm,cartId:t.cartId,locationId:t.locationId,user:t.user,deliveryLocation:t.deliveryLocation,transactions:t.transactions||[],createdAt:t.createdAt,updatedAt:t.updatedAt,originalData:t}},L=n.map(G),V=[{key:"orderNumber",header:"Order ID",className:"whitespace-nowrap font-medium text-green-600"},{key:"customerName",header:"Customer",className:"whitespace-nowrap font-semibold"},{key:"orderDate",header:"Order Date",className:"whitespace-nowrap text-gray-600"},{key:"totalAmount",header:"Total Amount",className:"whitespace-nowrap font-bold text-green-700",render:t=>`₹${(t||0).toFixed(2)}`},{key:"paymentMethod",header:"Payment",className:"whitespace-nowrap text-gray-700"},{key:"paymentStatus",header:"Payment Status",className:"whitespace-nowrap",render:t=>{const a=r=>{switch(r){case"SUCCESS":return"bg-green-100 text-green-800";case"NOT_REQUIRED":return"bg-blue-100 text-blue-800";case"PENDING":return"bg-yellow-100 text-yellow-800";case"FAILED":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}};return e.jsx("span",{className:`px-3 py-1 rounded-full text-xs font-medium ${a(t)}`,children:t})}},{key:"status",header:"Order Status",render:t=>{const a=r=>{switch(r){case"DELIVERED":return"bg-green-100 text-green-800";case"CONFIRMED":return"bg-blue-100 text-blue-800";case"PENDING":return"bg-orange-100 text-orange-800";case"INITIATED":return"bg-yellow-100 text-yellow-800";case"CANCELLED":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}};return e.jsx("span",{className:`px-3 py-1 rounded-full text-xs font-medium ${a(t)}`,children:t})}}],B=[{icon:e.jsx(ge,{size:16}),onClick:K,className:"text-blue-600 hover:text-blue-900 hover:bg-blue-100",title:"View Details"},{icon:e.jsx(ve,{size:16}),onClick:A,className:"text-green-600 hover:text-green-900 hover:bg-green-100",title:"Print Invoice"}];function K(t){u(t)}function d(){u(null)}function A(t){var m,j,f;const a=window.open("","_blank","width=800,height=600"),r=t.originalData||t,i=r.deliveryLocation||{};i.coordinates&&`${i.coordinates[0]}${i.coordinates[1]}`;const l=`
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
              <div style="font-size:5.5pt;"><b>User:</b> ${((j=(m=r.user)==null?void 0:m._id)==null?void 0:j.substring(0,12))||"N/A"}</div>
            </div>
            <div class="col">
              <div class="section">ADDRESS</div>
              <div style="font-size:5.5pt;"><b>${i.name||"N/A"}</b></div>
              <div style="font-size:5.5pt;">${i.shopOrBuildingNumber||""} ${i.area||""}</div>
              <div style="font-size:5.5pt;">${i.city||""} - ${i.zipcode||""}</div>
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
              ${t.items&&t.items.length>0?t.items.map((g,Z)=>{var k;return`
                <tr>
                  <td>${Z+1}</td>
                  <td>${(((k=g.product)==null?void 0:k.name)||"Unknown").substring(0,22)}</td>
                  <td>${g.quantity}</td>
                  <td>₹${(g.price||0).toFixed(2)}</td>
                  <td style="text-align:right;">₹${((g.price||0)*(g.quantity||1)).toFixed(2)}</td>
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
            <div><b>ID:</b> ${((f=r._id)==null?void 0:f.substring(0,10))||t.id||"N/A"}</div>
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
    `;a.document.write(l),a.document.close()}async function H(t){try{const a=t.id||t._id;await T.updateOrder(a,{status:"CONFIRMED"}),await N(),u(null)}catch(a){console.error("Error updating order status:",a),alert("Failed to update order status. Please try again.")}}async function Q(t){if(window.confirm("Are you sure you want to cancel this order?"))try{const a=t.id||t._id;await T.updateOrder(a,{status:"CANCELLED"}),await N(),u(null)}catch(a){console.error("Error updating order status:",a),alert("Failed to update order status. Please try again.")}}async function q(t){try{const a=t.id||t._id;await T.updateOrder(a,{status:"DELIVERED"}),await N(),u(null)}catch(a){console.error("Error updating order status:",a),alert("Failed to update order status. Please try again.")}}async function J(t){try{const a=t.id||t._id;await T.updateOrder(a,{status:"PENDING"}),await N(),u(null)}catch(a){console.error("Error updating order status:",a),alert("Failed to update order status. Please try again.")}}const D=c==="All"?L:L.filter(t=>t.status===c),W=b.totalRevenue,X=b.deliveredOrders,Y=b.pendingOrders,ie=b.cancelledOrders;return e.jsx("div",{className:"min-h-screen bg-gray-50 p-6",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"mb-6",children:[e.jsxs("h1",{className:"text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3",children:[e.jsx(se,{className:"text-green-600",size:36}),"🍚 NVS RICE MART - Order History"]}),e.jsx("p",{className:"text-gray-600",children:"Track and manage all customer orders"})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-5 gap-4 mb-6",children:[e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Total Orders"}),e.jsx("p",{className:"text-2xl font-bold text-gray-800",children:h?"...":b.totalOrders})]}),e.jsx(se,{className:"text-green-600",size:32})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Total Revenue"}),e.jsx("p",{className:"text-2xl font-bold text-green-600",children:h?"...":`₹${W.toFixed(2)}`})]}),e.jsx(xe,{className:"text-green-600",size:32})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Delivered"}),e.jsx("p",{className:"text-2xl font-bold text-green-600",children:h?"...":X})]}),e.jsx(de,{className:"text-green-600",size:32})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Pending"}),e.jsx("p",{className:"text-2xl font-bold text-orange-600",children:h?"...":Y})]}),e.jsx(ae,{className:"text-orange-600",size:32})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Cancelled"}),e.jsx("p",{className:"text-2xl font-bold text-red-600",children:h?"...":ie})]}),e.jsx(ee,{className:"text-red-600",size:32})]})})]}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("label",{className:"text-sm font-medium text-gray-700",children:"Month:"}),e.jsxs("select",{value:x,onChange:t=>{p(t.target.value),v(1)},className:"px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent",children:[e.jsx("option",{value:"all",children:"All Months"}),e.jsx("option",{value:"1",children:"January"}),e.jsx("option",{value:"2",children:"February"}),e.jsx("option",{value:"3",children:"March"}),e.jsx("option",{value:"4",children:"April"}),e.jsx("option",{value:"5",children:"May"}),e.jsx("option",{value:"6",children:"June"}),e.jsx("option",{value:"7",children:"July"}),e.jsx("option",{value:"8",children:"August"}),e.jsx("option",{value:"9",children:"September"}),e.jsx("option",{value:"10",children:"October"}),e.jsx("option",{value:"11",children:"November"}),e.jsx("option",{value:"12",children:"December"})]})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4",children:e.jsx("div",{className:"flex flex-wrap gap-2",children:["All","INITIATED","PENDING","CONFIRMED","DELIVERED","CANCELLED"].map(t=>e.jsx("button",{onClick:()=>{te(t),v(1)},className:`px-4 py-2 rounded-md font-medium transition-colors ${c===t?"bg-green-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:t},t))})}),e.jsxs("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200",children:[e.jsxs("div",{className:"px-6 py-4 border-b border-gray-200 flex justify-between items-center",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-800",children:"Orders"}),e.jsxs("span",{className:"text-sm text-gray-500",children:["Showing ",D.length," of ",O," orders"]})]}),h?e.jsx("div",{className:"p-8 text-center text-gray-500",children:"Loading orders..."}):I?e.jsx("div",{className:"p-8 text-center text-red-500",children:I}):D.length===0?e.jsx("div",{className:"p-8 text-center text-gray-500",children:"No orders found."}):e.jsx(e.Fragment,{children:e.jsx(oe,{columns:V,data:D,actions:B,emptyMessage:"No orders found."})}),w>1&&e.jsx("div",{className:"bg-white px-4 py-3 border-t border-gray-200 sm:px-6",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"text-sm text-gray-700",children:["Page ",y," of ",w," • Total: ",O," orders"]}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("button",{onClick:()=>v(t=>Math.max(t-1,1)),disabled:y===1,className:"px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",children:"Previous"}),e.jsx("button",{onClick:()=>v(t=>Math.min(t+1,w)),disabled:y===w,className:"px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",children:"Next"})]})]})})]}),s&&e.jsx(we,{order:s,onClose:d,onConfirm:H,onCancel:Q,onComplete:q,onPending:J})]})})};export{$e as default};
