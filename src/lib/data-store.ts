import fs from 'fs';
import path from 'path';
import { prisma } from './prisma';

export interface SubmissionItem {
  id: string;
  name: string;
  company: string;
  phone: string;
  email?: string | null;
  productSlug?: string | null;
  requestType: 'DEMO' | 'CONTACT' | 'TRIAL' | 'PURCHASE';
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'CLOSED';
  adminNotes?: string | null;
  ipAddress?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogItem {
  id: string;
  userId?: string | null;
  action: string;
  entity?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  createdAt: string;
}

export interface SettingItem {
  key: string;
  value: string;
  description?: string | null;
}

interface FallbackDb {
  submissions: SubmissionItem[];
  auditLogs: AuditLogItem[];
  settings: Record<string, SettingItem>;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db_fallback.json');

// Cached DB online state to prevent waiting for TCP connection timeouts
let isDbAvailable: boolean | null = null;
let lastDbCheck = 0;

export async function isDatabaseOnline(): Promise<boolean> {
  const now = Date.now();
  if (isDbAvailable !== null && now - lastDbCheck < 30000) {
    return isDbAvailable;
  }

  try {
    const queryPromise = prisma.$queryRaw`SELECT 1`;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('DB Timeout')), 400)
    );
    await Promise.race([queryPromise, timeoutPromise]);
    isDbAvailable = true;
  } catch {
    isDbAvailable = false;
  }
  lastDbCheck = now;
  return isDbAvailable;
}

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getFallbackDb(): FallbackDb {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    const initial: FallbackDb = {
      submissions: [
        {
          id: 'sub-sample-01',
          name: 'مهندس حسینی',
          company: 'شرکت آب و فاضلاب استان گیلان',
          phone: '09121112233',
          email: 'it@gilan-water.ir',
          productSlug: 'castle-backup',
          requestType: 'PURCHASE',
          message:
            'محصول انتخابی: Castle Backup\nپلن: کلاستر مجازی‌سازی VMware ESXi (محبوب‌ترین پلن)\nنام سازمان: شرکت آب و فاضلاب استان گیلان\nشخص رابط: مهندس حسینی\nمشخصات فنی ۱: SQL Server 2019 Enterprise\nمشخصات فنی ۲: ۴ هاست ESXi و ۳۲ ماشین مجازی',
          status: 'NEW',
          adminNotes: 'استعلام فوری از طریق پرتال ثبت شده است. کارشناس زیرساخت نیازمند مشاوره تلفنی.',
          ipAddress: '192.168.1.105',
          createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        },
        {
          id: 'sub-sample-02',
          name: 'دکتر امینی',
          company: 'بیمارستان تخصصی پارس رشت',
          phone: '09113349852',
          email: 'support@hospital-pars.ir',
          productSlug: 'psi',
          requestType: 'PURCHASE',
          message:
            'محصول انتخابی: سامانه پایش سخت‌افزار و نرم‌افزار (PSI)\nپلن: بسته ۵۰ تا ۲۵۰ کلاینت (شبکه سازمانی)\nنام سازمان: بیمارستان پارس رشت\nمشخصات فنی ۱: ۱۴۰ سیستم در ۴ بخش و درمانگاه\nمشخصات فنی ۲: ۵ سرور فیزیکی اتاق سرور',
          status: 'IN_PROGRESS',
          adminNotes: 'جلسه دموی تحت وب آنلاین برای روز شنبه ساعت ۱۰ هماهنگ شد.',
          ipAddress: '5.160.82.14',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 43200000).toISOString(),
        },
        {
          id: 'sub-sample-03',
          name: 'مهندس رضایی',
          company: 'اداره کل بنادر و دریانوردی انزلی',
          phone: '01344445555',
          email: 'rezaei@anzali-port.gov.ir',
          productSlug: 'sql-compare',
          requestType: 'DEMO',
          message: 'درخواست مشاوره جهت یکپارچه‌سازی ابزار مقایسه با فرآیندهای CI/CD سازمان بنادر',
          status: 'CLOSED',
          adminNotes: 'فایل کاتالوگ و راهنمای نسخه سازمانی ارسال گردید. پروژه تایید شد.',
          ipAddress: '2.180.12.90',
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
      ],
      auditLogs: [
        {
          id: 'audit-init-01',
          userId: 'admin',
          action: 'SYSTEM_BOOT',
          entity: 'System',
          details: 'راه‌اندازی اولیه سامانه مدیریت و سیستم رهگیری استعلام‌های سازمانی قلعه فناوران',
          ipAddress: '127.0.0.1',
          createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
        },
      ],
      settings: {
        sales_phone: {
          key: 'sales_phone',
          value: '013-33663355',
          description: 'شماره تلفن ثابت واحد فروش و استعلام قراردادها',
        },
        sales_mobile: {
          key: 'sales_mobile',
          value: '09113349852',
          description: 'شماره همراه کارشناس ارشد فروش سازمانی',
        },
        support_phone: {
          key: 'support_phone',
          value: '09113349852',
          description: 'شماره مستقیم مرکز پشتیبانی ۲۴ ساعته',
        },
        support_mobile_secondary: {
          key: 'support_mobile_secondary',
          value: '09118297437',
          description: 'شماره همراه کشیک پشتیبانی زیرساخت',
        },
        company_address: {
          key: 'company_address',
          value: 'استان گیلان، رشت، مستقر در پارک علم و فناوری گیلان',
          description: 'نشانی پستی رسمی شرکت قلعه فناوران هیمن',
        },
        company_email: {
          key: 'company_email',
          value: 'info@castleco.ir',
          description: 'رایانامه رسمی شرکت جهت مکاتبات',
        },
        system_alert: {
          key: 'system_alert',
          value: 'کلیه پشتیبان‌گیری‌ها و پایش‌های سرورهای مستقر در دیتاسنتر در وضعیت نرمال قرار دارند.',
          description: 'پیام وضعیت فوری در بالای پنل مدیریت',
        },
      },
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { submissions: [], auditLogs: [], settings: {} };
  }
}

function saveFallbackDb(data: FallbackDb): void {
  ensureDataDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Audit Logging Service
 */
export async function createAuditLog(
  action: string,
  details?: string,
  entity?: string,
  userId?: string,
  ipAddress?: string
): Promise<void> {
  const online = await isDatabaseOnline();
  if (online) {
    try {
      await prisma.adminAuditLog.create({
        data: {
          action,
          details: details || null,
          entity: entity || 'General',
          userId: userId || null,
          ipAddress: ipAddress || '127.0.0.1',
        },
      });
      return;
    } catch {}
  }

  // Fallback
  const db = getFallbackDb();
  db.auditLogs.unshift({
    id: 'audit-' + Date.now(),
    action,
    details: details || null,
    entity: entity || 'General',
    userId: userId || null,
    ipAddress: ipAddress || '127.0.0.1',
    createdAt: new Date().toISOString(),
  });
  if (db.auditLogs.length > 500) {
    db.auditLogs = db.auditLogs.slice(0, 500);
  }
  saveFallbackDb(db);
}

/**
 * Get Submissions (Quotations & Contacts)
 */
export async function getSubmissions(): Promise<SubmissionItem[]> {
  const online = await isDatabaseOnline();
  if (online) {
    try {
      const items = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return items.map((i) => ({
        id: i.id,
        name: i.name,
        company: i.company,
        phone: i.phone,
        email: i.email,
        productSlug: i.productSlug,
        requestType: i.requestType as SubmissionItem['requestType'],
        message: i.message,
        status: i.status as SubmissionItem['status'],
        adminNotes: i.adminNotes,
        ipAddress: i.ipAddress,
        createdAt: i.createdAt.toISOString(),
        updatedAt: i.updatedAt.toISOString(),
      }));
    } catch {}
  }

  const db = getFallbackDb();
  return db.submissions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Update Submission Status & Admin Notes
 */
export async function updateSubmission(
  id: string,
  data: { status?: 'NEW' | 'IN_PROGRESS' | 'CLOSED'; adminNotes?: string }
): Promise<SubmissionItem | null> {
  const online = await isDatabaseOnline();
  if (online) {
    try {
      const updated = await prisma.contactSubmission.update({
        where: { id },
        data: {
          status: data.status,
          adminNotes: data.adminNotes,
        },
      });
      return {
        id: updated.id,
        name: updated.name,
        company: updated.company,
        phone: updated.phone,
        email: updated.email,
        productSlug: updated.productSlug,
        requestType: updated.requestType as SubmissionItem['requestType'],
        message: updated.message,
        status: updated.status as SubmissionItem['status'],
        adminNotes: updated.adminNotes,
        ipAddress: updated.ipAddress,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      };
    } catch {}
  }

  const db = getFallbackDb();
  const idx = db.submissions.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  if (data.status) db.submissions[idx].status = data.status;
  if (data.adminNotes !== undefined) db.submissions[idx].adminNotes = data.adminNotes;
  db.submissions[idx].updatedAt = new Date().toISOString();
  saveFallbackDb(db);
  return db.submissions[idx];
}

/**
 * Delete Submission
 */
export async function deleteSubmission(id: string): Promise<boolean> {
  const online = await isDatabaseOnline();
  if (online) {
    try {
      await prisma.contactSubmission.delete({
        where: { id },
      });
      return true;
    } catch {}
  }

  const db = getFallbackDb();
  const filtered = db.submissions.filter((s) => s.id !== id);
  if (filtered.length !== db.submissions.length) {
    db.submissions = filtered;
    saveFallbackDb(db);
    return true;
  }
  return false;
}

/**
 * Get Audit Logs
 */
export async function getAuditLogs(limit = 50): Promise<AuditLogItem[]> {
  const online = await isDatabaseOnline();
  if (online) {
    try {
      const logs = await prisma.adminAuditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        include: { user: { select: { username: true, name: true } } },
      });
      return logs.map((l) => ({
        id: l.id,
        userId: l.user?.username || l.userId || 'سیستم',
        action: l.action,
        entity: l.entity,
        details: l.details,
        ipAddress: l.ipAddress,
        createdAt: l.createdAt.toISOString(),
      }));
    } catch {}
  }

  const db = getFallbackDb();
  return db.auditLogs.slice(0, limit);
}

/**
 * Get Site Settings
 */
export async function getSiteSettings(): Promise<Record<string, SettingItem>> {
  const online = await isDatabaseOnline();
  if (online) {
    try {
      const settings = await prisma.siteSetting.findMany();
      const result: Record<string, SettingItem> = {};
      for (const s of settings) {
        result[s.key] = {
          key: s.key,
          value: s.value,
          description: s.description,
        };
      }
      return result;
    } catch {}
  }

  const db = getFallbackDb();
  return db.settings;
}

/**
 * Update Multiple Site Settings in one atomic pass
 */
export async function updateAllSiteSettings(settingsMap: Record<string, string>): Promise<void> {
  const online = await isDatabaseOnline();
  if (online) {
    try {
      for (const [key, value] of Object.entries(settingsMap)) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
      return;
    } catch {}
  }

  const db = getFallbackDb();
  for (const [key, value] of Object.entries(settingsMap)) {
    if (!db.settings[key]) {
      db.settings[key] = { key, value };
    } else {
      db.settings[key].value = value;
    }
  }
  saveFallbackDb(db);
}
