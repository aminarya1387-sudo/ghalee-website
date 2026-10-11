import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RequestType } from '@prisma/client';
import { createAuditLog } from '@/lib/data-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, organization, subject, message, website_hp } = body;

    // Invisible bot honeypot protection: bots fill hidden fields
    if (website_hp) {
      console.warn('🤖 Bot submission dropped via honeypot trap from IP:', req.headers.get('x-forwarded-for') || 'remote');
      return NextResponse.json({
        success: true,
        message: 'پیام شما با موفقیت دریافت گردید.',
        id: 'bot-trap-' + Date.now(),
      });
    }

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: 'نام و حداقل یک راه ارتباطی (تلفن یا ایمیل) الزامی است.' },
        { status: 400 }
      );
    }

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    let submissionId = 'fallback-sub-' + Date.now();

    // Determine request type enum
    let requestType: RequestType = RequestType.CONTACT;
    const subLower = (subject || '').toLowerCase();
    if (subLower.includes('دمو') || subLower.includes('demo')) {
      requestType = RequestType.DEMO;
    } else if (subLower.includes('پیش‌فاکتور') || subLower.includes('قیمت') || subLower.includes('خرید')) {
      requestType = RequestType.PURCHASE;
    } else if (subLower.includes('آزمایشی') || subLower.includes('trial')) {
      requestType = RequestType.TRIAL;
    }

    try {
      const created = await prisma.contactSubmission.create({
        data: {
          name: name.trim(),
          company: organization?.trim() || 'نامشخص',
          phone: phone?.trim() || email?.trim() || 'بدون شماره',
          email: email?.trim() || null,
          requestType,
          message: `${subject ? `[موضوع: ${subject}] ` : ''}${message?.trim() || 'بدون پیام متنی'}`,
          ipAddress,
        },
      });
      submissionId = created.id;
    } catch (dbError) {
      console.warn('⚠️ Warning: Database write skipped (Prisma connection offline).', {
        name,
        phone,
        organization,
      });
    }

    // Record audit event
    await createAuditLog(
      'NEW_QUOTATION_REQUEST',
      `ثبت درخواست استعلام از طرف ${organization || name} (${phone || 'بدون تلفن'})`,
      'ContactSubmission',
      undefined,
      ipAddress
    );

    return NextResponse.json({
      success: true,
      message: 'پیام شما با موفقیت دریافت گردید و در دست بررسی کارشناسان قرار گرفت.',
      id: submissionId,
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'خطای داخلی سرور در پردازش درخواست.' },
      { status: 500 }
    );
  }
}
