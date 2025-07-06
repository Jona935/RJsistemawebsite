import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  // This test route is disabled and not available in a static export.
  // It is configured to be static to prevent build errors.
  return new NextResponse('This route is not available in a static export.', {
    status: 404,
  });
}
