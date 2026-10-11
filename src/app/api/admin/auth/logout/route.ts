import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/auth';
import { createAuditLog } from '@/lib/data-store';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    let username = 'کاربر';
    if (token) {
      const decoded = await verifyAdminToken(token);
      if (decoded) {
        username = decoded.username;
      }
    }

    await createAuditLog(
      'AUTH_LOGOUT',
      `خروج از پنل مدیریت توسط ${username}`,
      'Auth',
      undefined,
      ipAddress
    );

    const response = NextResponse.json({ success: true, message: 'خروج موفقیت‌آمیز بود.' });
    response.cookies.delete(ADMIN_COOKIE_NAME);
    return response;
  } catch (err) {
    const response = NextResponse.json({ success: true });
    response.cookies.delete(ADMIN_COOKIE_NAME);
    return response;
  }
}
