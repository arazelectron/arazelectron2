import React, { useState } from "react";

export default function OrderForm() {
  const [orders, setOrders] = useState([
    { id: 1, name: "Hikvision Kamera", price: "125 AZN" },
    { id: 2, name: "DVR NVR Qurğu", price: "220 AZN" },
  ]);

  // Sadə offline şəkil (link problemi olmasın)
  const placeholder =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'>
        <rect width='100%' height='100%' fill='#eee'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
          fill='#555' font-family='Arial'>Şəkil yoxdur</text>
      </svg>`
    );

  return (
    <div style={{ padding: 20 }}>
      <h2>Satış səhifəsi</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {orders.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", borderRadius: 10, padding: 10 }}>
            <img
              src={placeholder}
              alt={p.name}
              style={{ width: "100%", height: 150, borderRadius: 8, objectFit: "cover" }}
            />
            <h3>{p.name}</h3>
            <p>{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
