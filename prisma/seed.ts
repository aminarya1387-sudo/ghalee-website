import { PrismaClient, RequestType, SubmissionStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding with extracted Castleco content...');

  // 1. Seed Products
  const products = [
    {
      slug: 'castle-backup',
      titleFa: 'Castle Backup (پشتیبان‌گیری و بازگردانی زمان‌بندی‌شده)',
      titleEn: 'Castle Backup - SQL Server & VMware Protection',
      subtitle: 'سامانه بومی پشتیبان‌گیری، فشرده‌سازی، رمزنگاری و بازیابی بانک‌های اطلاعاتی و ماشین‌های مجازی',
      description:
        'Castle Backup نرم‌افزار کم‌حجم و قدرتمندی است که توسط شرکت قلعه فناوران به‌صورت ۱۰۰٪ بومی تهیه شده و به شما امکان می‌دهد تا از اطلاعات مهم سیستم در ساعت‌های مشخص عملیات پشتیبان تهیه یا بازگردان نمایید. این نرم‌افزار برخلاف نرم‌افزارهای موجود در بازار، بدون نیاز به دسترسی مستقیم به سرور از سیاست‌های تعریف‌شده در SQL Server تبعیت نموده و فایل‌های تولیدشده را فشرده، رمزنگاری و به مقاصد امن انتقال می‌دهد.',
      highlights: JSON.stringify([
        'پشتیبان‌گیری از تمامی نسخه‌های بانک‌های اطلاعاتی SQL Server',
        'پیروی از ۳ روش استاندارد Full Backup، Differential Backup و Log Backup',
        'پشتیبان‌گیری آنلاین و بدون قطعی از ماشین‌های مجازی VMware ESXi با کمترین Downtime',
        'انتقال فایل‌ها در بستر شبکه، FTP، FTPS و حافظه جانبی USB',
        'انتقال خودکار به فضاهای ابری جهانی Google Drive و Amazon Cloud S3',
        'فشرده‌سازی پیشرفته و تکه‌تکه‌کردن (Split) فایل‌های حجیم',
        'رمزنگاری فایل‌های پشتیبان با الگوریتم‌های استاندارد امنیتی',
        'کنترل صحت فایل قبل و بعد از انتقال با الگوریتم‌های CRC، MD5، SHA-1، SHA-256 و SHA-512',
        'بازگردانی و بازیابی سریع و راحت داده‌ها در شرایط بحرانی',
      ]),
      specifications: JSON.stringify({
        databaseSupport: 'Microsoft SQL Server (All Versions)',
        virtualizationSupport: 'VMware vSphere / ESXi (Live Hot Backup)',
        compressionAlgorithms: 'Multi-threaded High Compression',
        encryptionHashing: 'CRC32, MD5, SHA-1, SHA-256, SHA-512',
        destinations: 'Local, Network Share (SMB/Domain/Workgroup), FTP, FTPS, USB, Google Drive, Amazon S3',
        deploymentType: 'Client-based Remote Management (No Server Direct Login Required)',
      }),
      downloadLink: '/CastleFile/CastleBackup_Trial.rar',
      iconName: 'Database',
      isFeatured: true,
      isFree: false,
      order: 1,
      isActive: true,
    },
    {
      slug: 'professional-system-information',
      titleFa: 'نرم‌افزار هوشمند جمع‌آوری اطلاعات سخت‌افزار و نرم‌افزار (PSI)',
      titleEn: 'Professional System Information (Hardware & Software Inventory)',
      subtitle: 'مدیریت بهینه منابع، پایش سلامت هارددیسک و کنسول تحت وب سازمانی',
      description:
        'ابزار قدرتمند و پیشرفته برای مدیریت بهینه وضعیت سخت‌افزار در سازمان که قادر است دقیق‌ترین اطلاعات موجود در مورد سخت‌افزارهای سیستم را به مدیران شبکه ارائه دهد. این نرم‌افزار دارای کنسول تحت وب بوده و علاوه بر ارائه آمار دقیق و کامل از وضعیت سخت‌افزار و نرم‌افزار، تغییرات سخت‌افزاری در سیستم کاربران و اتصال تجهیزات جانبی را شناسایی و اطلاع می‌دهد.',
      highlights: JSON.stringify([
        'پایش عملکرد و درصد سلامت هارددیسک با دو الگوریتم نرمال و سخت‌گیرانه',
        'گزارش سکتورهای خراب و خطاهای بحرانی دیسک پیش از خرابی کامل',
        'شناسایی تمامی قطعات داخل کیس: مادربرد، پردازنده، رم (DDR تا DDR5)، کارت گرافیک',
        'شناسایی تجهیزات متصل: پرینتر، اسکنر، درایوهای نوری و کارت شبکه',
        'گزارش دقیق تغییرات سخت‌افزاری کاربران به مدیر سیستم',
        'گزارش اتصال حافظه‌های جانبی غیرمجاز (Flash Memory / External HDD)',
        'گزارش نصب نرم‌افزارهای غیرمجاز و فیلترشده در شبکه',
        'تفکیک چارت سازمانی و واحدهای اداری بر اساس محدوده IP',
        'اسکنر خودکار محدوده IP و پورت‌های باز شبکه',
        'ثبت قراردادهای واحد فناوری، انبار قطعات، شناسنامه سیستم و سیستم اسقاط',
        'خروجی کامل اکسل در تمامی بخش‌ها و گزارش‌ها',
      ]),
      specifications: JSON.stringify({
        consoleType: 'Web-based Enterprise Management Console',
        clientAgent: 'Ultra-lightweight Windows Service (< 10 MB)',
        hddHealthAlgorithm: 'Dual Algorithm (Normal & Strict Smart Check)',
        reportingFormats: 'Interactive Web Dashboard, Printable Hardware Passport, Excel Export',
        networkProtocols: 'WMI, SNMP, TCP/IP Port Scanner, ICMP',
      }),
      downloadLink: '/CastleFile/Ghalee.Hwinfo.rar',
      iconName: 'Cpu',
      isFeatured: true,
      isFree: false,
      order: 2,
      isActive: true,
    },
    {
      slug: 'sql-data-compare',
      titleFa: 'مقایسه ساختار و داده‌های بانک‌های اطلاعاتی SQL Server',
      titleEn: 'SQL Server Schema & Data Compare',
      subtitle: 'ابزار تخصصی برنامه‌نویسان و مدیران پایگاه داده جهت شناسایی و اعمال تغییرات',
      description:
        'با این نرم‌افزار قادر به مقایسه ساختار بانک اطلاعاتی از یک سرور با سرور راه دور بدون در نظر گرفتن نسخه SQL Server خواهید بود. برنامه‌نویسان حوزه پایگاه داده می‌توانند اسکریپت‌های تغییریافته در جدول‌ها، توابع، ویوها و پروسیجرها را با یک کلیک شناسایی و همگام‌سازی نمایند. همچنین امکان مقایسه داده‌ها و رکوردهای جداول و تبدیل آنها به اسکریپت یا اکسل فراهم شده است.',
      highlights: JSON.stringify([
        'مقایسه ساختار دیتابیس (Schema Compare) بین دو سرور محلی و ریموت',
        'عدم وابستگی به نسخه SQL Server در مقایسه ساختارها',
        'ردگیری تغییرات در Tables, Stored Procedures, Functions و Views',
        'اعمال و همگام‌سازی تغییرات در پایگاه داده تنها با یک کلیک',
        'مقایسه داده‌ها (Data Compare)، تعداد رکوردها و فیلدهای جداول',
        'تبدیل اطلاعات جداول به اسکریپت‌های SQL یا انتقال مستقیم به اکسل',
        'ارائه به صورت کاملاً رایگان به جامعه برنامه‌نویسان و مدیران IT',
      ]),
      specifications: JSON.stringify({
        licenseType: '100% Free Edition',
        supportedDatabases: 'Microsoft SQL Server (2008 R2, 2012, 2014, 2016, 2019, 2022)',
        comparisonModes: 'Schema Only, Data Only, Full Synchronize',
        exportFormats: 'SQL Script (.sql), Microsoft Excel (.xlsx), Diff Viewer',
      }),
      downloadLink: '/CastleFile/SqlCompare.rar',
      iconName: 'Server',
      isFeatured: false,
      isFree: true,
      order: 3,
      isActive: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
    console.log(`  ✓ Product seeded: ${product.slug}`);
  }

  // 2. Seed Site Settings
  const settings = [
    {
      key: 'sales_phone',
      value: '01333663355',
      description: 'شماره تلفن ثابت واحد فروش و امور قراردادها',
    },
    {
      key: 'sales_mobile',
      value: '09113349852',
      description: 'شماره تلفن همراه واحد فروش',
    },
    {
      key: 'support_phone',
      value: '09113349852',
      description: 'شماره تلفن همراه اصلی واحد پشتیبانی فنی',
    },
    {
      key: 'support_mobile_secondary',
      value: '09118297437',
      description: 'شماره تلفن همراه دوم واحد پشتیبانی فنی',
    },
    {
      key: 'company_address',
      value: 'استان گیلان، مستقر در پارک علم و فناوری گیلان',
      description: 'نشانی پستی شرکت قلعه فناوران هیمن',
    },
    {
      key: 'company_email',
      value: 'info@castleco.ir',
      description: 'آدرس پست الکترونیکی رسمی شرکت',
    },
    {
      key: 'brand_tagline',
      value: 'داده‌های شما امن است. ساده، انعطاف‌پذیر، قابل اعتماد، قدرتمند.',
      description: 'شعار و بیانیه مأموریت برند',
    },
    {
      key: 'trial_download_url',
      value: '/CastleFile/Ghalee.Hwinfo.rar',
      description: 'لینک دانلود مستقیم پیش‌فرض برای نسخه‌های رایگان',
    },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, description: setting.description },
      create: setting,
    });
    console.log(`  ✓ Setting seeded: ${setting.key}`);
  }

  // 3. Seed Page Contents
  const contents = [
    {
      key: 'about_company_history',
      title: 'تاریخچه و معرفی شرکت قلعه فناوران هیمن',
      section: 'about',
      content:
        'شرکت قلعه فناوران هیمن در سال ۱۳۹۴ توسط گروهی از برنامه‌نویسان خلاق و خوش‌فکر تأسیس گردید. هدف اصلی این گروه، تولید نرم‌افزارهای تخصصی و بومی برای مدیران حوزه فناوری اطلاعات بوده که با تلاش شبانه‌روزی موفق به تولید محصولات کاربردی در حوزه ISMS گردیدند. این شرکت از سال ۱۳۹۷ تا سال ۱۳۹۹ توسط معاونت علمی و فناوری ریاست جمهوری به‌عنوان شرکت دانش‌بنیان تأیید شد.',
    },
    {
      key: 'purchase_terms_in_person',
      title: 'خرید حضوری و استقرار سازمانی',
      section: 'purchase',
      content:
        'در صورت رضایت از دموی محصولات و درخواست خرید، چنانچه نیاز به حضور واحد فروش و پشتیبانی در محل سازمان شما باشد، با هماهنگی واحد پشتیبانی همکاران جهت آموزش، نصب، راه‌اندازی و عقد قرارداد رسمی به سازمان شما مراجعه خواهند نمود.',
    },
    {
      key: 'purchase_terms_remote',
      title: 'خرید غیرحضوری و فاکتور شرکتی',
      section: 'purchase',
      content:
        'در صورت رضایت از دموی محصولات و تماس تلفنی با واحد پشتیبانی یا فروش، پس از پرداخت مبلغ نرم‌افزار، فرآیند نصب از طریق نرم‌افزارهای ریموت دسکتاپ امن انجام شده و آموزش کامل کاربران نیز از طریق بستر ویدئو کنفرانس صورت می‌پذیرد.',
    },
  ];

  for (const item of contents) {
    await prisma.pageContent.upsert({
      where: { key: item.key },
      update: { title: item.title, content: item.content, section: item.section },
      create: item,
    });
    console.log(`  ✓ Content seeded: ${item.key}`);
  }

  console.log('✅ Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
