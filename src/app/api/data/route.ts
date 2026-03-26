import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/data";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    await savePortfolioData(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
