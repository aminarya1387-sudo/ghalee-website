import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/auth';
import { getSubmissions, getAuditLogs } from '@/lib/data-store';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'عدم دسترسی.' }, { status: 401 });
  }

  const submissions = await getSubmissions();
  const auditLogs = await getAuditLogs(10);

  const total = submissions.length;
  const newCount = submissions.filter((s) => s.status === 'NEW').length;
  const inProgressCount = submissions.filter((s) => s.status === 'IN_PROGRESS').length;
  const closedCount = submissions.filter((s) => s.status === 'CLOSED').length;

  const castleBackupCount = submissions.filter((s) =>
    (s.productSlug || s.message || '').toLowerCase().includes('castle') ||
    (s.productSlug || s.message || '').toLowerCase().includes('backup')
  ).length;

  const psiCount = submissions.filter((s) =>
    (s.productSlug || s.message || '').toLowerCase().includes('psi') ||
    (s.productSlug || s.message || '').toLowerCase().includes('مانیتور')
  ).length;

  const sqlCompareCount = submissions.filter((s) =>
    (s.productSlug || s.message || '').toLowerCase().includes('sql') ||
    (s.productSlug || s.message || '').toLowerCase().includes('compare')
  ).length;

  return NextResponse.json({
    kpis: {
      total,
      newCount,
      inProgressCount,
      closedCount,
      castleBackupCount,
      psiCount,
      sqlCompareCount,
    },
    recentSubmissions: submissions.slice(0, 5),
    recentAuditLogs: auditLogs.slice(0, 6),
  });
}
