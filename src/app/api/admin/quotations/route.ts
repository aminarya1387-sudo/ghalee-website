import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/auth';
import { getSubmissions } from '@/lib/data-store';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'عدم دسترسی. لطفاً وارد سیستم شوید.' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('q')?.toLowerCase() || '';
  const status = searchParams.get('status');
  const product = searchParams.get('product');

  let items = await getSubmissions();

  if (status && status !== 'ALL') {
    items = items.filter((i) => i.status === status);
  }

  if (product && product !== 'ALL') {
    items = items.filter((i) => (i.productSlug || '').toLowerCase().includes(product.toLowerCase()));
  }

  if (search) {
    items = items.filter(
      (i) =>
        i.name.toLowerCase().includes(search) ||
        i.company.toLowerCase().includes(search) ||
        i.phone.toLowerCase().includes(search) ||
        (i.email && i.email.toLowerCase().includes(search)) ||
        i.message.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ submissions: items });
}
