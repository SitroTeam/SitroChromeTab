# Market New Tab - Chrome Extension 📈

یک صفحه تب جدید زیبا و کاربردی برای کروم که قیمت لحظه‌ای رمزارزها، آب‌وهوا و جستجوی گوگل را در یکجا نمایش می‌دهد.

![Market New Tab](https://img.shields.io/badge/Version-1.3.0-blue.svg)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ ویژگی‌ها

### 🎯 ویژگی‌های اصلی
- **💰 قیمت لحظه‌ای رمزارزها** - پشتیبانی از 70+ رمزارز مختلف
- **🌤️ اطلاعات آب‌وهوا** - نمایش شرایط جوی برای شهرهای مختلف
- **🔍 جستجوی گوگل** - دسترسی سریع به جستجوی گوگل
- **🎨 رابط کاربری زیبا** - طراحی مدرن با تم تاریک/روشن
- **📱 ریسپانسیو** - سازگار با تمام دستگاه‌ها

### 🔄 قابلیت آپدیت خودکار
- **🔄 بررسی خودکار آپدیت** - هر 6 ساعت چک می‌کند
- **🔔 نوتیفیکیشن آپدیت** - اطلاع‌رسانی هنگام موجود بودن نسخه جدید
- **📥 دانلود آسان** - نصب آپدیت با یک کلیک
- **📋 تاریخچه تغییرات** - نمایش notes انتشار

## 🚀 نصب و راه‌اندازی

### روش ۱: نصب از Chrome Web Store (پیشنهادی)
```bash
# به زودی در دسترس خواهد بود
```

### روش ۲: نصب دستی (Developer Mode)
1. دانلود آخرین نسخه از [Releases Page](https://github.com/YOUR_USERNAME/YOUR_REPO/releases)
2. اکسترکت فایل ZIP در یک پوشه
3. مرورگر کروم را باز کنید و به `chrome://extensions/` بروید
4. **Developer mode** را در بالا سمت راست فعال کنید
5. روی **Load unpacked** کلیک کنید و پوشه اکسترکت شده را انتخاب کنید

## ⚙️ پیکربندی

### تنظیمات اولیه
1. روی آیکون افزونه کلیک کنید
2. به تب **Settings** بروید
3. تنظیمات مورد نظر خود را اعمال کنید

### API Keys (اختیاری)
- **WeatherAPI**: برای اطلاعات آب‌وهوا از [weatherapi.com](https://www.weatherapi.com/)
- **MetalsAPI**: برای قیمت طلا و فلزات گرانبها

## 🛠️ توسعه

### ساختار پروژه
```
market-newtab/
├── manifest.json          # تنظیمات افزونه
├── service-worker.js      # Background processes
├── newtab.html           # صفحه اصلی
├── newtab.js             # منطق اصلی
├── styles.css            # استایل‌ها
├── icons/                # آیکون‌ها
│   └── icon128.png
└── images/               # تصاویر
    ├── bg.jpg
    └── google-logo.png
```

### توسعه本地
```bash
# کلون ریپازیتوری
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git

# رفتن به پوشه پروژه
cd market-newtab

# اعمال تغییرات مورد نظر

# بارگذاری در کروم
# 1. chrome://extensions/
# 2. Developer mode → Load unpacked
# 3. انتخاب پوشه پروژه
```

### ساخت نسخه انتشار
```bash
# ایجاد فایل ZIP برای انتشار
zip -r market-newtab-v1.3.0.zip . -x "*.git*" "*.DS_Store" "node_modules/*"
```

## 📡 API های استفاده شده

| سرویس | کاربرد | وضعیت |
|-------|--------|--------|
| CoinGecko API | قیمت رمزارزها | ✅ رایگان |
| Bitpin API | قیمت ریالی رمزارزها | ✅ رایگان |
| ExchangeRate API | نرخ ارز | ✅ رایگان |
| WeatherAPI | اطلاعات آب‌وهوا | 🔑 نیاز به API Key |
| MetalsAPI | قیمت طلا | 🔑 نیاز به API Key |
| GitHub API | بررسی آپدیت | ✅ رایگان |

## 🎨 شخصی‌سازی

### رمزارزهای قابل نمایش
```javascript
// در تنظیمات می‌توانید این رمزارزها را انتخاب کنید
['bitcoin', 'ethereum', 'tether', 'cardano', 'polkadot', 'solana', 'dogecoin']
```

### واحدهای پولی پشتیبانی شده
- 🇺🇸 USD (دلار آمریکا)
- 🇪🇺 EUR (یورو)
- 🇮🇷 IRR (ریال ایران)

### تنظیمات پس‌زمینه
- 🖼️ تصویر پیش‌فرض
- 📤 آپلود عکس شخصی
- 🔗 لینک عکس خارجی
- 🎨 رنگ ساده

## 🔄 سیستم آپدیت

### نحوه کار
1. افزونه هر 6 ساعت به صورت خودکار چک می‌کند
2. در صورت موجود بودن نسخه جدید، نوتیفیکیشن نمایش داده می‌شود
3. کاربر می‌تواند آپدیت را نصب کند
4. پس از دانلود، افزونه ری‌لود می‌شود

### انتشار نسخه جدید
```bash
# ایجاد تگ جدید
git tag v1.3.0
git push origin v1.3.0

# ایجاد Release در GitHub
# آپلود فایل ZIP در بخش Assets
```

## 🐛 عیب‌یابی

### مشکلات متداول
1. **قیمت‌ها نمایش داده نمی‌شوند**
   - اتصال اینترنت را بررسی کنید
   - API CoinGecko ممکن است موقتا down باشد

2. **آب‌وهوا کار نمی‌کند**
   - API Key WeatherAPI را بررسی کنید
   - نام شهر را به درستی وارد کنید

3. **آپدیت کار نمی‌کند**
   - اتصال به GitHub را بررسی کنید
   - مطمئن شوید Releaseها به درستی تگ شده‌اند

### لاگ‌گیری
برای دیباگ، کنسول توسعه‌دهنده را باز کنید (F12):
```javascript
// مشاهده خطاها
console.error('Error message');

// مشاهده اطلاعات دیباگ
console.log('Debug info');
```

## 🤝 مشارکت

مشارکت‌ها همیشه مورد استقبال هستند! 

1. فورک ریپازیتوری
2. ایجاد Branch برای feature جدید (`git checkout -b feature/AmazingFeature`)
3. کامیت تغییرات (`git commit -m 'Add some AmazingFeature'`)
4. Push به Branch (`git push origin feature/AmazingFeature`)
5. باز کردن Pull Request

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است - برای جزئیات به فایل [LICENSE](LICENSE) مراجعه کنید.

## 👥 توسعه‌دهندگان

- **You** - توسعه اصلی - [GitHub](https://github.com/YOUR_USERNAME)

## 🙏 تشکر

- [CoinGecko](https://www.coingecko.com/) برای API رایگان رمزارزها
- [Bitpin](https://bitpin.ir/) برای قیمت‌های ریالی
- [WeatherAPI](https://www.weatherapi.com/) برای اطلاعات آب‌وهوا
- [Vazir Font](https://github.com/rastikerdar/vazir-font) برای فونت فارسی

## 📞 پشتیبانی

- 📧 Email: your-email@example.com
- 🐛 [Issues](https://github.com/YOUR_USERNAME/YOUR_REPO/issues)
- 💬 [Discussions](https://github.com/YOUR_USERNAME/YOUR_REPO/discussions)

---

**توجه**: قبل از استفاده، مطمئن شوید که با قوانین API های استفاده شده آشنا هستید و از API Keys خود به صورت امن محافظت کنید.

<div align="center">

**از استفاده از این افزونه لذت ببرید! 🌟**

</div>