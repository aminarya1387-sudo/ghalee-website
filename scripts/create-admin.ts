import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

function prompt(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function main() {
  console.log('\n========================================');
  console.log('🛡️  ایجاد کاربر ادمین شرکت قلعه فناوران  🛡️');
  console.log('========================================\n');

  const username = await prompt('نام کاربری ادمین (حداقل ۳ کاراکتر): ');
  if (!username || username.length < 3) {
    console.error('❌ خطا: نام کاربری باید حداقل ۳ کاراکتر باشد.');
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({
    where: { username },
  });

  if (existing) {
    console.error(`❌ خطا: کاربری با نام «${username}» از قبل در دیتابیس وجود دارد.`);
    process.exit(1);
  }

  const name = await prompt('نام و نام خانوادگی ادمین (اختیاری): ');

  const password = await prompt('رمز عبور امن (الزامی: حداقل ۱۲ کاراکتر): ');
  if (!password || password.length < 12) {
    console.error('❌ خطا: طبق الزامات امنیتی، حداقل طول رمز عبور باید ۱۲ کاراکتر باشد.');
    process.exit(1);
  }

  const confirmPassword = await prompt('تکرار رمز عبور: ');
  if (password !== confirmPassword) {
    console.error('❌ خطا: رمزهای عبور واردشده یکسان نیستند.');
    process.exit(1);
  }

  console.log('\n⏳ در حال هش کردن رمز عبور با الگوریتم bcrypt (Cost 12)...');
  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: {
      username,
      name: name || 'مدیر ارشد سیستم',
      passwordHash,
      role: Role.ADMIN,
      twoFactorEnabled: false,
    },
  });

  // Log in Audit Logs
  await prisma.adminAuditLog.create({
    data: {
      userId: newUser.id,
      action: 'ADMIN_USER_CREATED_CLI',
      entity: 'User',
      details: `کاربر ادمین جدید با شناسه ${newUser.username} از طریق خط فرمان ایجاد گردید.`,
      ipAddress: '127.0.0.1',
    },
  });

  console.log('\n✅ کاربر ادمین با موفقیت ایجاد گردید:');
  console.log(`   - شناسه کاربر: ${newUser.id}`);
  console.log(`   - نام کاربری: ${newUser.username}`);
  console.log(`   - نقش دسترسی: ${newUser.role}`);
  console.log(`   - هش پسورد: ایمن (Bcrypt Cost 12)`);
  console.log('\n💡 توجه: می‌توانید با این مشخصات وارد پنل مدیریت شوید.\n');
}

main()
  .catch((e) => {
    console.error('❌ خطا در ایجاد کاربر ادمین:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
