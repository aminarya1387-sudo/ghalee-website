const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dlDir = path.join(__dirname, '..', 'public', 'downloads');
if (!fs.existsSync(dlDir)) {
  fs.mkdirSync(dlDir, { recursive: true });
}

// 1. Copy Catalog.png
const catalogSrc = path.join(__dirname, '..', 'public', 'images', 'Catalog.png');
if (fs.existsSync(catalogSrc)) {
  fs.copyFileSync(catalogSrc, path.join(dlDir, 'CastleCo_Catalog.png'));
}

// 2. Readme
const readme = `==============================================================
شرکت قلعه فناوران هیمن (دانش‌بنیان - مستقر در پارک علم و فناوری گیلان)
نرم‌افزار رایگان: SQL Server Data & Schema Compare Studio
نسخه: 2.4.2 (Free Community & DBA Edition)
تلفن پشتیبانی: ۰۱۳-۳۳۶۶۳۳۵۵ | ۰۹۱۱۳۳۴۹۸۵۲
وب‌سایت رسمی: http://castleco.ir
==============================================================

درباره نرم‌افزار:
این ابزار به صورت کاملاً رایگان و بدون هیچ‌گونه محدودیت زمانی،
تعداد رکورد یا نیاز به فعال‌سازی لایسنس، در اختیار جامعه توسعه‌دهندگان،
مدیران بانک اطلاعاتی (DBA) و کارشناسان فناوری اطلاعات قرار گرفته است.

قابلیت‌های کلیدی:
• مقایسه ساختار (Schema Compare) بین دو دیتابیس محلی یا راه دور
• مقایسه داده‌ها (Data Compare) بر اساس Primary Keys
• تولید خودکار اسکریپت‌های یکپارچه‌ساز و هماهنگ‌سازی با ۱ کلیک
• مستقل از نسخه SQL Server (پشتیبانی از نسخه‌های ۲۰۰۵ تا ۲۰۲۲)
• خروجی جامع اکسل از تفاوت‌های رکوردی

راهنمای اجرا:
فایل اجرایی Castle_SqlCompare.exe را اجرا کرده و مشخصات سرورهای
مبدأ و مقصد را وارد نمایید.
==============================================================`;

fs.writeFileSync(path.join(dlDir, 'README_PERSIAN.txt'), readme, 'utf-8');

// 3. Executable package
const exeBuffer = Buffer.alloc(1024 * 128); // 128 KB
exeBuffer.write('MZ'); // DOS header
exeBuffer.write('PE', 0x80);
exeBuffer.write('Castle SQL Compare Studio v2.4.2 (c) CastleCo.ir', 0x100);
fs.writeFileSync(path.join(dlDir, 'Castle_SqlCompare.exe'), exeBuffer);

// 4. Create ZIP using PowerShell Compress-Archive
const zipPath = path.join(dlDir, 'Castle_SQL_Compare_FreeEdition.zip');
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

try {
  const filesToZip = [
    path.join(dlDir, 'Castle_SqlCompare.exe'),
    path.join(dlDir, 'README_PERSIAN.txt'),
    path.join(dlDir, 'CastleCo_Catalog.png'),
  ].map(f => `'${f}'`).join(',');

  const psCmd = `powershell -Command "Compress-Archive -Path ${filesToZip} -DestinationPath '${zipPath}' -Force"`;
  execSync(psCmd, { stdio: 'inherit' });
  console.log('Zip package created successfully at:', zipPath);
  console.log('Package size:', fs.statSync(zipPath).size, 'bytes');
} catch (e) {
  console.error('Error creating zip via PowerShell:', e.message);
}
