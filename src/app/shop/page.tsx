"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ShiftingGlyphs from "../components/ShiftingGlyphs";

interface CustomField {
  key: string;
  value: string;
}

interface Account {
  id: number;
  username: string;
  description?: string;
  reputation: number;
  vouches: number;
  price: string;
  hidden?: boolean;
  customFields?: CustomField[];
  accountDetails?: CustomField[];
}

// Default accounts data
const defaultAccounts: Account[] = [
  {
    id: 1,
    username: "premium",
    reputation: 1250,
    vouches: 89,
    price: "$2,500",
  },
  {
    id: 2,
    username: "elite",
    reputation: 980,
    vouches: 67,
    price: "$1,800",
  },
  {
    id: 3,
    username: "vip",
    reputation: 2100,
    vouches: 145,
    price: "$3,200",
  },
  {
    id: 4,
    username: "exclusive",
    reputation: 750,
    vouches: 42,
    price: "$1,200",
  },
  {
    id: 5,
    username: "rare",
    reputation: 3200,
    vouches: 201,
    price: "$4,500",
  },
  {
    id: 6,
    username: "unique",
    reputation: 1650,
    vouches: 98,
    price: "$2,100",
  },
];

// Sparkle data for the animated dots - same as homepage
const sparkles = [
  { left: "56.87%", top: "70%", size: 2, color: "rgb(114, 0, 0)", duration: 3.06, delay: 2.34 },
  { left: "28.28%", top: "61.04%", size: 3.2, color: "rgb(139, 26, 26)", duration: 3.8, delay: 4.88 },
  { left: "42.56%", top: "1.15%", size: 1.32, color: "rgb(255, 255, 255)", duration: 2.16, delay: 3.6 },
  { left: "37.31%", top: "70.95%", size: 2.65, color: "rgb(114, 0, 0)", duration: 2.35, delay: 1.44 },
  { left: "49.5%", top: "68.52%", size: 2.27, color: "rgb(179, 51, 51)", duration: 2.99, delay: 1.54 },
  { left: "18.61%", top: "61.22%", size: 2.23, color: "rgb(204, 82, 82)", duration: 3.82, delay: 1.89 },
  { left: "22.91%", top: "14.83%", size: 1.02, color: "rgb(255, 255, 255)", duration: 4.11, delay: 1.81 },
  { left: "16.02%", top: "69.61%", size: 2.49, color: "rgb(139, 26, 26)", duration: 4.53, delay: 0.36 },
  { left: "62.66%", top: "53.87%", size: 3.32, color: "rgb(114, 0, 0)", duration: 2.81, delay: 1.04 },
  { left: "68.58%", top: "56.86%", size: 1.48, color: "rgb(114, 0, 0)", duration: 4.09, delay: 2.52 },
  { left: "41.35%", top: "23.94%", size: 1.4, color: "rgb(179, 51, 51)", duration: 3.18, delay: 3.11 },
  { left: "18.18%", top: "50.57%", size: 2.06, color: "rgb(204, 82, 82)", duration: 4.41, delay: 1.94 },
  { left: "1.88%", top: "1.61%", size: 3.67, color: "rgb(114, 0, 0)", duration: 3.55, delay: 3.08 },
  { left: "10.32%", top: "68.17%", size: 1.4, color: "rgb(139, 26, 26)", duration: 3.64, delay: 1.16 },
  { left: "54.56%", top: "35.51%", size: 3.45, color: "rgb(204, 82, 82)", duration: 3.88, delay: 0.83 },
  { left: "11.84%", top: "38.77%", size: 2.88, color: "rgb(179, 51, 51)", duration: 2.5, delay: 4.66 },
  { left: "78.88%", top: "61.96%", size: 2.95, color: "rgb(204, 82, 82)", duration: 3.4, delay: 4.46 },
  { left: "98.31%", top: "38.3%", size: 2.68, color: "rgb(179, 51, 51)", duration: 2.84, delay: 3.1 },
  { left: "8.34%", top: "16.92%", size: 1.89, color: "rgb(204, 82, 82)", duration: 3.76, delay: 2.95 },
  { left: "97.61%", top: "40.95%", size: 3.88, color: "rgb(139, 26, 26)", duration: 3.19, delay: 4 },
  { left: "87.02%", top: "18.92%", size: 2.51, color: "rgb(139, 26, 26)", duration: 2.78, delay: 4.41 },
  { left: "43.31%", top: "51.83%", size: 2.81, color: "rgb(204, 82, 82)", duration: 4.28, delay: 0.07 },
  { left: "80.38%", top: "27.18%", size: 3.98, color: "rgb(255, 255, 255)", duration: 3.61, delay: 1.27 },
  { left: "39.44%", top: "93.4%", size: 1.63, color: "rgb(204, 82, 82)", duration: 3.87, delay: 3.81 },
  { left: "29.5%", top: "59.94%", size: 1.54, color: "rgb(139, 26, 26)", duration: 4.07, delay: 4.38 },
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedAccount, setExpandedAccount] = useState<number | null>(null);
  const [accounts, setAccounts] = useState<Account[]>(defaultAccounts);

  // Load accounts from localStorage
  useEffect(() => {
    const savedAccounts = localStorage.getItem("ogu_accounts");
    if (savedAccounts) {
      try {
        const parsed = JSON.parse(savedAccounts);
        setAccounts(parsed);
      } catch (e) {
        console.error("Error loading accounts:", e);
      }
    }
  }, []);

  // Listen for storage changes to sync accounts
  useEffect(() => {
    const handleStorageChange = () => {
      const savedAccounts = localStorage.getItem("ogu_accounts");
      if (savedAccounts) {
        try {
          const parsed = JSON.parse(savedAccounts);
          setAccounts(parsed);
        } catch (e) {
          console.error("Error loading accounts:", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Also check periodically for same-tab updates
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const categories = ["All"];
  const filteredAccounts = accounts;

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0404 0%, #120606 30%, #1a0a0a 50%, #120606 70%, #0a0404 100%)",
      }}
    >
      {/* Central glow effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(114,0,0,0.15) 0%, rgba(74,0,0,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Sparkle dots */}
      {sparkles.map((sparkle, index) => (
        <div
          key={index}
          className="absolute rounded-full pointer-events-none sparkle-dot"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
            boxShadow: `${sparkle.color} 0px 0px ${sparkle.size * 2}px`,
          }}
        />
      ))}

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold animate-fade-in-up"
            style={{ color: "#cc5252" }}
          >
            ← Back
          </Link>
          <h1
            className="text-3xl md:text-4xl font-bold animate-fade-in-up"
            style={{ color: "#cc5252", animationDelay: "0.2s" }}
          >
            Premium Accounts
          </h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Category Filter */}
      <div className="relative z-10 px-6 mb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "text-white border-white/30"
                  : "text-gray-400 border-white/10 hover:border-white/20"
              } border backdrop-blur-sm`}
              style={{
                background:
                  selectedCategory === category
                    ? "rgba(114,0,0,0.3)"
                    : "rgba(114,0,0,0.1)",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Accounts Grid */}
      <main className="relative z-10 flex-1 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccounts.map((account, index) => (
              <div
                key={account.id}
                className="group relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(114,0,0,0.3)] animate-fade-in-up flex flex-col items-center text-center"
                style={{
                  animationDelay: `${0.6 + index * 0.1}s`,
                }}
              >
                {/* Arrow button for additional information */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newExpandedId = expandedAccount === account.id ? null : account.id;
                    setExpandedAccount(newExpandedId);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all duration-300 z-10"
                  style={{ color: "#cc5252" }}
                  aria-label="Show additional information"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${expandedAccount === account.id ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Avatar */}
                <div className="mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10">
                    <img
                      src="/pfp.png"
                      alt={account.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Username */}
                <h3 className="text-lg font-semibold mb-6 text-gray-300">
                  {account.hidden ? <ShiftingGlyphs length={8} /> : account.username}
                </h3>

                {/* Stats */}
                <div className="flex items-center gap-8 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Reputation</p>
                    <p className="text-base font-semibold" style={{ color: "#cc5252" }}>
                      {account.reputation}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Vouches</p>
                    <p className="text-base font-semibold" style={{ color: "#cc5252" }}>
                      {account.vouches}
                    </p>
                  </div>
                </div>

                {/* Additional Information (Expandable) */}
                {expandedAccount !== null && expandedAccount === account.id && (
                  <div className="w-full mb-4 p-4 rounded-lg border border-white/10 animate-fade-in" style={{ background: "rgba(114,0,0,0.1)" }}>
                    <div className="space-y-2 text-left">
                      <div>
                        <p className="text-xs text-gray-500">Account ID</p>
                        <p className="text-sm text-gray-300">#{account.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="text-sm" style={{ color: "#cc5252" }}>Available</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Account Type</p>
                        <p className="text-sm text-gray-300">Premium OGU Account</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Transfer Method</p>
                        <p className="text-sm text-gray-300">Email & Password</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Price and Buy Button */}
                <div className="w-full mt-auto">
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Price</p>
                    <p className="text-2xl font-bold" style={{ color: "#cc5252" }}>
                      {account.price}
                    </p>
                  </div>
                  <button
                    className="w-full px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(114,0,0,0.5)] border border-white/10 hover:border-white/20"
                    style={{ background: "rgba(114,0,0,0.3)" }}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Side Panel for Additional Information */}
      {expandedAccount !== null && (
        <div
          className="fixed top-0 right-0 h-full w-96 bg-black/40 backdrop-blur-md border-l border-white/10 z-50 animate-fade-in-up overflow-y-auto"
          style={{
            background: "linear-gradient(135deg, rgba(10,4,4,0.95) 0%, rgba(18,6,6,0.95) 100%)",
            boxShadow: "-10px 0 30px rgba(114,0,0,0.3)",
          }}
        >
          {(() => {
            const account = accounts.find((a) => a.id === expandedAccount);
            if (!account) return null;
            return (
              <div className="p-6">
                {/* Close button */}
                <button
                  onClick={() => setExpandedAccount(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                  style={{ color: "#cc5252" }}
                  aria-label="Close"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>

                {/* Account Header */}
                <div className="flex flex-col items-center mb-8 mt-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 mb-4">
                    <img
                      src="/pfp.png"
                      alt={account.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: "#cc5252" }}>
                    {account.hidden ? <ShiftingGlyphs length={8} /> : account.username}
                  </h2>
                  <p className="text-sm text-gray-400">Account #{account.id}</p>
                </div>

                {/* Detailed Information */}
                <div className="space-y-6">
                  <div className="p-4 rounded-lg border border-white/10" style={{ background: "rgba(114,0,0,0.1)" }}>
                    <h3 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wide">Account Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Reputation</span>
                        <span className="text-base font-semibold" style={{ color: "#cc5252" }}>
                          {account.reputation}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Vouches</span>
                        <span className="text-base font-semibold" style={{ color: "#cc5252" }}>
                          {account.vouches}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-white/10" style={{ background: "rgba(114,0,0,0.1)" }}>
                    <h3 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wide">Account Details</h3>
                    <div className="space-y-3">
                      {account.description && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Description</p>
                          <p className="text-sm text-gray-300">{account.description}</p>
                        </div>
                      )}
                      {/* Account Details Fields (Status, Account Type, Transfer Method, etc.) */}
                      {account.accountDetails && account.accountDetails.length > 0 && (
                        <>
                          {account.accountDetails.map((field, idx) => (
                            <div key={idx}>
                              <p className="text-xs text-gray-500 mb-1">{field.key}</p>
                              <p className="text-sm text-gray-300">{field.value}</p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-white/10" style={{ background: "rgba(114,0,0,0.1)" }}>
                    <h3 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wide">Pricing</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Price</span>
                        <span className="text-2xl font-bold" style={{ color: "#cc5252" }}>
                          {account.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <button
                    className="w-full px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(114,0,0,0.5)] border border-white/10 hover:border-white/20"
                    style={{ background: "rgba(114,0,0,0.3)" }}
                  >
                    Purchase Account
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #720000, transparent)" }}
      />
    </div>
  );
}
