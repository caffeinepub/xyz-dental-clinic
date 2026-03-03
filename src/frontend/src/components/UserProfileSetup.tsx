import type React from "react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
} from "../hooks/useQueries";

export default function UserProfileSetup() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading, isFetched } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const isAuthenticated = !!identity;
  const showProfileSetup =
    isAuthenticated && !isLoading && isFetched && userProfile === null;

  if (!showProfileSetup) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    try {
      await saveProfile.mutateAsync({ name: name.trim() });
    } catch {
      setError("Failed to save profile. Please try again.");
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
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            color: "#1a1a1a",
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Welcome!
        </h2>
        <p
          style={{
            color: "#666",
            fontSize: "0.875rem",
            marginBottom: "1.5rem",
          }}
        >
          Please enter your name to complete your profile.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="user-profile-name"
              style={{
                display: "block",
                color: "#333",
                fontWeight: 600,
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              Your Name
            </label>
            <input
              id="user-profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
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
            disabled={saveProfile.isPending}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: saveProfile.isPending ? "#93c5fd" : "#1e40af",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: saveProfile.isPending ? "not-allowed" : "pointer",
            }}
          >
            {saveProfile.isPending ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
