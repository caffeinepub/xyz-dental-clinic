import { Eye, EyeOff, X } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface HiddenAdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HiddenAdminLoginModal({
  isOpen,
  onClose,
}: HiddenAdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === "6352174912" && password === "63521") {
      sessionStorage.setItem("adminAuthenticated", "true");
      onClose();
      window.location.href = "/admin";
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          padding: "2rem",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#666",
          }}
        >
          <X size={20} />
        </button>

        <h2
          style={{
            color: "#1a1a1a",
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Admin Access
        </h2>
        <p
          style={{
            color: "#666",
            fontSize: "0.875rem",
            marginBottom: "1.5rem",
          }}
        >
          Enter your credentials to continue
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="admin-username"
              style={{
                display: "block",
                color: "#333",
                fontWeight: 600,
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              Username
            </label>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "0.875rem",
                color: "#1a1a1a",
                backgroundColor: "#fff",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="admin-password"
              style={{
                display: "block",
                color: "#333",
                fontWeight: 600,
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  paddingRight: "3rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  color: "#1a1a1a",
                  backgroundColor: "#fff",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#1e40af",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
