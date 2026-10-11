import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/auth';
import { getSiteSettings, updateAllSiteSettings, createAuditLog } from '@/lib/data-store';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'عدم دسترسی.' }, { status: 401 });
  }

  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const user = token ? await verifyAdminToken(token) : null;
  if (!user) {
    return NextResponse.json({ error: 'عدم دسترسی.' }, { status: 401 });
  }

  const body = await req.json();
  const { settings } = body; // key-value map

  if (settings && typeof settings === 'object') {
    await updateAllSiteSettings(settings);
  }

  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  await createAuditLog(
    'SETTINGS_UPDATED',
    `بروزرسانی تنظیمات عمومی سایت توسط ${user.username}`,
    'SiteSetting',
    user.id,
    ipAddress
  );

  return NextResponse.json({ success: true, message: 'تنظیمات با موفقیت ذخیره گردید.' });
}
