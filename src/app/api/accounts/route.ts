import { NextRequest, NextResponse } from "next/server";

interface CustomField {
  key: string;
  value: string;
}

interface Account {
  id: number;
  username: string;
  description?: string;
  reputation: number | string;
  vouches: number | string;
  price: string;
  hidden?: boolean;
  customFields?: CustomField[];
  accountDetails?: CustomField[];
}

// In-memory store (in production, use a database)
let accountsStore: Account[] = [
  {
    id: 1,
    username: "premium",
    reputation: 1250,
    vouches: 89,
    price: "$2,500",
    accountDetails: [
      { key: "Status", value: "Available for Purchase" },
      { key: "Account Type", value: "Premium OGU Account" },
      { key: "Transfer Method", value: "Email & Password" },
      { key: "Delivery Time", value: "Within 24 hours" },
    ],
  },
  {
    id: 2,
    username: "elite",
    reputation: 980,
    vouches: 67,
    price: "$1,800",
    accountDetails: [
      { key: "Status", value: "Available for Purchase" },
      { key: "Account Type", value: "Premium OGU Account" },
      { key: "Transfer Method", value: "Email & Password" },
      { key: "Delivery Time", value: "Within 24 hours" },
    ],
  },
  {
    id: 3,
    username: "vip",
    reputation: 2100,
    vouches: 145,
    price: "$3,200",
    accountDetails: [
      { key: "Status", value: "Available for Purchase" },
      { key: "Account Type", value: "Premium OGU Account" },
      { key: "Transfer Method", value: "Email & Password" },
      { key: "Delivery Time", value: "Within 24 hours" },
    ],
  },
  {
    id: 4,
    username: "exclusive",
    reputation: 750,
    vouches: 42,
    price: "$1,200",
    accountDetails: [
      { key: "Status", value: "Available for Purchase" },
      { key: "Account Type", value: "Premium OGU Account" },
      { key: "Transfer Method", value: "Email & Password" },
      { key: "Delivery Time", value: "Within 24 hours" },
    ],
  },
  {
    id: 5,
    username: "rare",
    reputation: 3200,
    vouches: 201,
    price: "$4,500",
    accountDetails: [
      { key: "Status", value: "Available for Purchase" },
      { key: "Account Type", value: "Premium OGU Account" },
      { key: "Transfer Method", value: "Email & Password" },
      { key: "Delivery Time", value: "Within 24 hours" },
    ],
  },
  {
    id: 6,
    username: "unique",
    reputation: 1650,
    vouches: 98,
    price: "$2,100",
    accountDetails: [
      { key: "Status", value: "Available for Purchase" },
      { key: "Account Type", value: "Premium OGU Account" },
      { key: "Transfer Method", value: "Email & Password" },
      { key: "Delivery Time", value: "Within 24 hours" },
    ],
  },
];

// GET - Fetch all accounts
export async function GET() {
  return NextResponse.json(accountsStore);
}

// POST - Update accounts (requires authentication)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accounts, authToken } = body;

    // Simple authentication check
    if (authToken !== "bevo_auth_token_9009") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (Array.isArray(accounts)) {
      accountsStore = accounts;
      return NextResponse.json({ success: true, accounts: accountsStore });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
