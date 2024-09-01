import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const allowedIp = 'YOUR_IP_ADDRESS'; // Replace with your actual IP address
  const ip = req.headers.get('x-forwarded-for') || req.ip || '0.0.0.0';

  if (ip !== allowedIp) {
    return new NextResponse('Access denied', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/', // Apply to all routes
};
