"use client";

import { useState, useEffect } from "react";

const USERNAME = "bevo";
const PASSWORD = "bevo9009";

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
  accountDetails?: CustomField[]; // For Status, Account Type, Transfer Method, etc.
}

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [newAccount, setNewAccount] = useState({
    username: "",
    description: "",
    reputation: "",
    vouches: "",
    price: "",
    hidden: false,
  });
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [customFieldKey, setCustomFieldKey] = useState("");
  const [customFieldValue, setCustomFieldValue] = useState("");

  // Load accounts from API on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/api/accounts");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setAccounts(data);
            return;
          }
        }
      } catch (e) {
        console.error("Error fetching accounts:", e);
      }
    };
    fetchAccounts();

    // Check if already authenticated
    const authStatus = sessionStorage.getItem("dash_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === USERNAME && password === PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("dash_authenticated", "true");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("dash_authenticated");
    setUsername("");
    setPassword("");
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAccount.username || !newAccount.reputation || !newAccount.vouches || !newAccount.price) {
      setError("All fields are required");
      return;
    }

    setAccounts((prevAccounts) => {
      const account: Account = {
        id: prevAccounts.length > 0 ? Math.max(...prevAccounts.map(a => a.id)) + 1 : 1,
        username: newAccount.username,
        description: newAccount.description || undefined,
        reputation: parseInt(newAccount.reputation),
        vouches: parseInt(newAccount.vouches),
        price: newAccount.price.startsWith("$") ? newAccount.price : `$${newAccount.price}`,
        hidden: newAccount.hidden,
        customFields: [],
        accountDetails: [
          { key: "Status", value: "Available for Purchase" },
          { key: "Account Type", value: "Premium OGU Account" },
          { key: "Transfer Method", value: "Email & Password" },
          { key: "Delivery Time", value: "Within 24 hours" },
        ],
      };

      const updatedAccounts = [...prevAccounts, account];
      saveAccountsToAPI(updatedAccounts);
      return updatedAccounts;
    });
    
    setNewAccount({ username: "", description: "", reputation: "", vouches: "", price: "", hidden: false });
    setError("");
  };

  const saveAccountsToAPI = async (accountsToSave: Account[]) => {
    try {
      await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accounts: accountsToSave,
          authToken: "bevo_auth_token_9009",
        }),
      });
    } catch (e) {
      console.error("Error saving accounts:", e);
    }
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount({ ...account });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccount) return;

    setAccounts((prevAccounts) => {
      const updatedAccounts = prevAccounts.map((acc) =>
        acc.id === editingAccount.id ? editingAccount : acc
      );
      saveAccountsToAPI(updatedAccounts);
      return updatedAccounts;
    });
    setEditingAccount(null);
    setError("");
  };

  const handleCancelEdit = () => {
    setEditingAccount(null);
    setError("");
  };

  const handleAddCustomField = (accountId: number) => {
    if (!customFieldKey || !customFieldValue) {
      setError("Field name and value are required");
      return;
    }

    setAccounts((prevAccounts) => {
      const updatedAccounts = prevAccounts.map((acc) => {
        if (acc.id === accountId) {
          const customFields = acc.customFields || [];
          return {
            ...acc,
            customFields: [...customFields, { key: customFieldKey, value: customFieldValue }],
          };
        }
        return acc;
      });
      saveAccountsToAPI(updatedAccounts);
      return updatedAccounts;
    });
    setCustomFieldKey("");
    setCustomFieldValue("");
    setError("");
  };

  const handleRemoveCustomField = (accountId: number, fieldKey: string) => {
    setAccounts((prevAccounts) => {
      const updatedAccounts = prevAccounts.map((acc) => {
        if (acc.id === accountId) {
          const customFields = (acc.customFields || []).filter((f) => f.key !== fieldKey);
          return { ...acc, customFields };
        }
        return acc;
      });
      saveAccountsToAPI(updatedAccounts);
      return updatedAccounts;
    });
  };

  const handleRemoveAccount = (id: number) => {
    setAccounts((prevAccounts) => {
      const updatedAccounts = prevAccounts.filter((account) => account.id !== id);
      saveAccountsToAPI(updatedAccounts);
      return updatedAccounts;
    });
  };

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

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
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

      {!isAuthenticated ? (
        /* Login Form */
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "#cc5252" }}>
              Dashboard Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(114,0,0,0.5)] border border-white/10 hover:border-white/20"
                style={{ background: "rgba(114,0,0,0.3)" }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Dashboard */
        <div className="relative z-10 w-full max-w-6xl px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold" style={{ color: "#cc5252" }}>
              Account Management
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(114,0,0,0.5)] border border-white/10 hover:border-white/20"
              style={{ background: "rgba(114,0,0,0.3)" }}
            >
              Logout
            </button>
          </div>

          {/* Add Account Form */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "#cc5252" }}>
              Add New Account
            </h2>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  value={newAccount.username}
                  onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                  placeholder="Username"
                  required
                />
                <input
                  type="number"
                  value={newAccount.reputation}
                  onChange={(e) => setNewAccount({ ...newAccount, reputation: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                  placeholder="Reputation"
                  required
                />
                <input
                  type="number"
                  value={newAccount.vouches}
                  onChange={(e) => setNewAccount({ ...newAccount, vouches: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                  placeholder="Vouches"
                  required
                />
                <input
                  type="text"
                  value={newAccount.price}
                  onChange={(e) => setNewAccount({ ...newAccount, price: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                  placeholder="Price (e.g., $2,500)"
                  required
                />
              </div>
              <textarea
                value={newAccount.description}
                onChange={(e) => setNewAccount({ ...newAccount, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all min-h-[80px] resize-y"
                placeholder="Description (optional)"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hidden"
                  checked={newAccount.hidden}
                  onChange={(e) => setNewAccount({ ...newAccount, hidden: e.target.checked })}
                  className="w-4 h-4 rounded border-white/10 bg-black/30"
                />
                <label htmlFor="hidden" className="text-sm text-gray-400">
                  Hide username (show shifting glyphs)
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(114,0,0,0.5)] border border-white/10 hover:border-white/20"
                style={{ background: "rgba(114,0,0,0.3)" }}
              >
                Add Account
              </button>
            </form>
            {error && (
              <p className="text-sm text-red-400 mt-2">{error}</p>
            )}
          </div>

          {/* Accounts List */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "#cc5252" }}>
              Accounts ({accounts.length})
            </h2>
            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="space-y-3">
                  {editingAccount?.id === account.id ? (
                    /* Edit Form */
                    <form onSubmit={handleSaveEdit} className="p-4 rounded-lg border border-white/10 bg-black/20 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <input
                          type="number"
                          value={editingAccount.id}
                          onChange={(e) => setEditingAccount({ ...editingAccount, id: parseInt(e.target.value) || 0 })}
                          className="px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                          placeholder="Account ID"
                          required
                        />
                        <input
                          type="text"
                          value={editingAccount.username}
                          onChange={(e) => setEditingAccount({ ...editingAccount, username: e.target.value })}
                          className="px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                          placeholder="Username"
                          required
                        />
                        <input
                          type="number"
                          value={editingAccount.reputation}
                          onChange={(e) => setEditingAccount({ ...editingAccount, reputation: parseInt(e.target.value) || 0 })}
                          className="px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                          placeholder="Reputation"
                          required
                        />
                        <input
                          type="number"
                          value={editingAccount.vouches}
                          onChange={(e) => setEditingAccount({ ...editingAccount, vouches: parseInt(e.target.value) || 0 })}
                          className="px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                          placeholder="Vouches"
                          required
                        />
                        <input
                          type="text"
                          value={editingAccount.price}
                          onChange={(e) => setEditingAccount({ ...editingAccount, price: e.target.value })}
                          className="px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all"
                          placeholder="Price"
                          required
                        />
                      </div>
                      <textarea
                        value={editingAccount.description || ""}
                        onChange={(e) => setEditingAccount({ ...editingAccount, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all min-h-[80px] resize-y"
                        placeholder="Description (optional)"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`hidden-${account.id}`}
                          checked={editingAccount.hidden || false}
                          onChange={(e) => setEditingAccount({ ...editingAccount, hidden: e.target.checked })}
                          className="w-4 h-4 rounded border-white/10 bg-black/30"
                        />
                        <label htmlFor={`hidden-${account.id}`} className="text-sm text-gray-400">
                          Hide username
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(114,0,0,0.5)] border border-white/10 hover:border-white/20"
                          style={{ background: "rgba(114,0,0,0.3)" }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-4 py-2 rounded-full text-sm font-medium text-gray-400 transition-all duration-300 border border-white/10 hover:border-white/20"
                          style={{ background: "rgba(0,0,0,0.3)" }}
                        >
                          Cancel
                        </button>
                      </div>
                      {/* Account Details Fields (Status, Account Type, etc.) */}
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-sm text-gray-400 mb-2 font-semibold">Account Details (Status, Account Type, Transfer Method, etc.):</p>
                        {(editingAccount.accountDetails || []).map((field, idx) => (
                          <div key={idx} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={field.key}
                              onChange={(e) => {
                                const newFields = [...(editingAccount.accountDetails || [])];
                                newFields[idx].key = e.target.value;
                                setEditingAccount({ ...editingAccount, accountDetails: newFields });
                              }}
                              className="flex-1 px-3 py-1 rounded bg-black/30 border border-white/10 text-white text-sm"
                              placeholder="Field name (e.g., Status)"
                            />
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) => {
                                const newFields = [...(editingAccount.accountDetails || [])];
                                newFields[idx].value = e.target.value;
                                setEditingAccount({ ...editingAccount, accountDetails: newFields });
                              }}
                              className="flex-1 px-3 py-1 rounded bg-black/30 border border-white/10 text-white text-sm"
                              placeholder="Field value"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newFields = (editingAccount.accountDetails || []).filter((_, i) => i !== idx);
                                setEditingAccount({ ...editingAccount, accountDetails: newFields });
                              }}
                              className="px-3 py-1 rounded text-sm text-red-400 border border-red-500/30"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAccount({
                              ...editingAccount,
                              accountDetails: [...(editingAccount.accountDetails || []), { key: "", value: "" }],
                            });
                          }}
                          className="mt-2 px-3 py-1 rounded text-sm text-gray-400 border border-white/10"
                        >
                          + Add Account Detail Field
                        </button>
                      </div>

                      {/* Custom Fields in Edit */}
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-sm text-gray-400 mb-2 font-semibold">Additional Custom Fields:</p>
                        {(editingAccount.customFields || []).map((field, idx) => (
                          <div key={idx} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={field.key}
                              onChange={(e) => {
                                const newFields = [...(editingAccount.customFields || [])];
                                newFields[idx].key = e.target.value;
                                setEditingAccount({ ...editingAccount, customFields: newFields });
                              }}
                              className="flex-1 px-3 py-1 rounded bg-black/30 border border-white/10 text-white text-sm"
                              placeholder="Field name"
                            />
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) => {
                                const newFields = [...(editingAccount.customFields || [])];
                                newFields[idx].value = e.target.value;
                                setEditingAccount({ ...editingAccount, customFields: newFields });
                              }}
                              className="flex-1 px-3 py-1 rounded bg-black/30 border border-white/10 text-white text-sm"
                              placeholder="Field value"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newFields = (editingAccount.customFields || []).filter((_, i) => i !== idx);
                                setEditingAccount({ ...editingAccount, customFields: newFields });
                              }}
                              className="px-3 py-1 rounded text-sm text-red-400 border border-red-500/30"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAccount({
                              ...editingAccount,
                              customFields: [...(editingAccount.customFields || []), { key: "", value: "" }],
                            });
                          }}
                          className="mt-2 px-3 py-1 rounded text-sm text-gray-400 border border-white/10"
                        >
                          + Add Custom Field
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Display Account */
                    <>
                      <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-black/20 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-6 flex-1 flex-wrap">
                          <div>
                            <p className="text-sm text-gray-400">ID</p>
                            <p className="text-base font-semibold text-gray-300">#{account.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Username</p>
                            <p className="text-base font-semibold" style={{ color: "#cc5252" }}>
                              {account.username} {account.hidden && "(Hidden)"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Reputation</p>
                            <p className="text-base font-semibold" style={{ color: "#cc5252" }}>
                              {account.reputation}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Vouches</p>
                            <p className="text-base font-semibold" style={{ color: "#cc5252" }}>
                              {account.vouches}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Price</p>
                            <p className="text-base font-semibold" style={{ color: "#cc5252" }}>
                              {account.price}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditAccount(account)}
                            className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(114,0,0,0.5)] border border-white/10 hover:border-white/20"
                            style={{ background: "rgba(114,0,0,0.3)" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleRemoveAccount(account.id)}
                            className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(114,0,0,0.5)] border border-red-500/30 hover:border-red-500/50"
                            style={{ background: "rgba(220, 38, 38, 0.3)" }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      {/* Custom Fields Display */}
                      {(account.customFields && account.customFields.length > 0) && (
                        <div className="p-3 rounded-lg border border-white/10 bg-black/10">
                          <p className="text-xs text-gray-500 mb-2">Custom Fields:</p>
                          <div className="flex flex-wrap gap-2">
                            {account.customFields.map((field, idx) => (
                              <div key={idx} className="text-xs">
                                <span className="text-gray-400">{field.key}:</span>{" "}
                                <span className="text-gray-300">{field.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              {accounts.length === 0 && (
                <p className="text-center text-gray-500 py-8">No accounts yet. Add one above.</p>
              )}
            </div>
          </div>
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
