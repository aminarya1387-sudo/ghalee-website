import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, signAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'نام کاربری و رمز عبور الزامی است.' },
        { status: 400 }
      );
    }

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    const authResult = await authenticateAdmin(username.trim(), password, ipAddress);

    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { error: authResult.error, remainingAttempts: authResult.remainingAttempts },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = await signAdminToken(authResult.user);

    const response = NextResponse.json({
      success: true,
      user: authResult.user,
    });

    // Set secure cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('Admin Login Route Error:', err);
    return NextResponse.json(
      { error: 'خطای سیستمی در فرآیند احراز هویت ادمین.' },
      { status: 500 }
    );
  }
}
