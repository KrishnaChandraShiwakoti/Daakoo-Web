import React, { useEffect, useState } from "react";
import "../../styles/table.css";
import "../../styles/filter.css";
import { useCustomers } from "../../../hooks/useCustomers";

const Customers = () => {
  const {
    customers,
    loading,
    error,
    fetchCustomers,
    searchCustomers,
    stats,
    fetchCustomerStats,
  } = useCustomers();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCustomers();
    fetchCustomerStats();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchCustomers(query);
    } else {
      fetchCustomers();
    }
  };

  return (
    <div className="page" id="page-customers">
      <div className="page-header">
        <div>
          <div className="page-title-lg">Customers</div>
          <div className="page-sub">
            {stats?.totalCustomers || 0} total customers
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-search">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {stats && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
          }}>
          <div className="card" style={{ padding: "16px" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--red)",
              }}>
              {stats.totalCustomers}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Total Customers
            </div>
          </div>
          <div className="card" style={{ padding: "16px" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--saffron)",
              }}>
              £{stats.totalCustomerSpent}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Total Revenue
            </div>
          </div>
          <div className="card" style={{ padding: "16px" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--prepared)",
              }}>
              £{stats.avgCustomerSpent}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Avg. Spent/Customer
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center" }}>
          Loading customers...
        </div>
      ) : error ? (
        <div
          style={{ padding: "40px", textAlign: "center", color: "var(--red)" }}>
          Error: {error}
        </div>
      ) : (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Total Orders</th>
                  <th>Total Spent</th>
                  <th>Last Order</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td>
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}>
                      {customer.email}
                    </td>
                    <td style={{ fontSize: "12px" }}>{customer.phone}</td>
                    <td style={{ textAlign: "center", fontWeight: "600" }}>
                      {customer.totalOrders}
                    </td>
                    <td style={{ fontWeight: "600", color: "var(--saffron)" }}>
                      £{customer.totalSpent}
                    </td>
                    <td
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}>
                      {customer.lastOrderDate
                        ? new Date(customer.lastOrderDate).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
