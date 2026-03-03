import React from "react";

export default function AccessDenied() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛡️</div>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#1a1a1a",
          marginBottom: "0.5rem",
        }}
      >
        Access Denied
      </h1>
      <p style={{ color: "#666", marginBottom: "2rem", maxWidth: "400px" }}>
        You don't have permission to access this page. Please log in with admin
        credentials.
      </p>
      <button
        type="button"
        onClick={() => {
          window.location.href = "/";
        }}
        style={{
          padding: "0.75rem 2rem",
          backgroundColor: "#1e40af",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: "0.875rem",
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
