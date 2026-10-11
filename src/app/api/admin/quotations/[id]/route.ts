import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/auth';
import { updateSubmission, deleteSubmission, createAuditLog } from '@/lib/data-store';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const user = token ? await verifyAdminToken(token) : null;
  if (!user) {
    return NextResponse.json({ error: 'عدم دسترسی.' }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();
  const { status, adminNotes } = body;

  const updated = await updateSubmission(id, { status, adminNotes });
  if (!updated) {
    return NextResponse.json({ error: 'استعلام مورد نظر یافت نشد.' }, { status: 404 });
  }

  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  await createAuditLog(
    'QUOTATION_UPDATED',
    `تغییر وضعیت یا یادداشت استعلام ${updated.company} به وضعیت ${status || 'تغییر نیافته'} توسط ${user.username}`,
    'ContactSubmission',
    user.id,
    ipAddress
  );

  return NextResponse.json({ success: true, submission: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const user = token ? await verifyAdminToken(token) : null;
  if (!user) {
    return NextResponse.json({ error: 'عدم دسترسی.' }, { status: 401 });
  }

  const { id } = params;
  const success = await deleteSubmission(id);

  if (!success) {
    return NextResponse.json({ error: 'آیتم مورد نظر جهت حذف یافت نشد.' }, { status: 404 });
  }

  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  await createAuditLog(
    'QUOTATION_DELETED',
    `حذف پرونده استعلام شناسه ${id} توسط ${user.username}`,
    'ContactSubmission',
    user.id,
    ipAddress
  );

  return NextResponse.json({ success: true, message: 'پرونده با موفقیت حذف گردید.' });
}
