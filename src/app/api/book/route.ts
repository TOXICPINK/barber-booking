import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.serviceId || !body.barberId || !body.date || !body.time || !body.name || !body.phone) {
    return NextResponse.json({ ok: false, message: "اطلاعات ناقص است" }, { status: 400 });
  }
  // Mock: just echo back the payload
  return NextResponse.json({ ok: true, booking: body }, { status: 200 });
}
