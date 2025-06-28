"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

/**
 * MobileMenu component
 * Renders a full-screen overlay menu for mobile navigation.
 * - Shows when 'open' is true
 * - Contains site name, nav links, theme toggle, and close button
 * - Calls onClose when a link or the close button is clicked
 */
export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  // If not open, render nothing
  if (!open) return null;

  return (
    // Full-screen overlay
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "#181818",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
    }}>
      {/* Site name at the top */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ fontWeight: 700, fontSize: 22 }}>Your Name</span>
      </div>
      {/* Navigation links */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
        <Link href="/" style={{ fontSize: 20, color: "#fff", textDecoration: "none" }} onClick={onClose}>Blog</Link>
        <Link href="/projects" style={{ fontSize: 20, color: "#fff", textDecoration: "none" }} onClick={onClose}>Projects</Link>
        <Link href="/about" style={{ fontSize: 20, color: "#fff", textDecoration: "none" }} onClick={onClose}>About</Link>
        <Link href="/newsletter" style={{ fontSize: 20, color: "#fff", textDecoration: "none" }} onClick={onClose}>Newsletter</Link>
      </nav>
      {/* Theme toggle below links */}
      <div style={{ margin: "40px 0 0 0" }}>
        <ThemeToggle />
      </div>
      {/* Close (X) button at the bottom */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          right: 0,
          margin: "0 auto",
          background: "none",
          border: "none",
          cursor: "pointer",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* X icon SVG */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="8" y1="8" x2="24" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="8" x2="8" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
} 