# Market New Tab - Chrome Extension 📈

![Version](https://img.shields.io/badge/Version-1.1.0-blue.svg)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

یک صفحه تب جدید زیبا و کاربردی برای کروم که قیمت لحظه‌ای رمزارزها، اطلاعات آب‌وهوا و جستجوی گوگل را در یکجا نمایش می‌دهد.

## ✨ ویژگی‌های نسخه 1.1.0

### 🎯 ویژگی‌های اصلی
- **💰 قیمت لحظه‌ای رمزارزها** - پشتیبانی از 30+ رمزارز مختلف با قیمت ریالی و جهانی
- **🌤️ اطلاعات آب‌وهوا** - نمایش شرایط جوی برای شهرهای مختلف با WeatherAPI
- **🔍 جستجوی گوگل** - دسترسی سریع به جستجوی گوگل و مرور مستقیم URL
- **🎨 رابط کاربری زیبا** - طراحی مدرن با تم تاریک و پشتیبانی از راست‌چین
- **📱 ریسپانسیو** - سازگار با تمام دستگاه‌ها

### 🔄 سیستم آپدیت هوشمند
- **🔄 بررسی دستی آپدیت** - دکمه اختصاصی برای بررسی نسخه جدید
- **🔔 نوتیفیکیشن آپدیت** - اطلاع‌رسانی هنگام موجود بودن نسخه جدید
- **📥 دانلود آسان** - هدایت مستقیم به صفحه انتشارات گیتهاب

### 💰 پشتیبانی از ارزها
- **🇺🇸 USD (دلار آمریکا)**
- **🇪🇺 EUR (یورو)** 
- **🇮🇷 IRR (ریال ایران)** - با قیمت‌های واقعی از صرافی بیت‌پین

## 🚀 نصب و راه‌اندازی

### روش ۱: نصب از Chrome Web Store
```bash
# به زودی در دسترس خواهد بود
```

### روش ۲: نصب دستی (Developer Mode)
1. دانلود آخرین نسخه از [صفحه Releases](https://github.com/SitroTeam/SitroChromeTab/releases)
2. اکسترکت فایل ZIP در یک پوشه
3. مرورگر کروم را باز کنید و به `chrome://extensions/` بروید
4. **Developer mode** را در بالا سمت راست فعال کنید
5. روی **Load unpacked** کلیک کنید و پوشه اکسترکت شده را انتخاب کنید

## ⚙️ پیکربندی

### تنظیمات اولیه
1. روی آیکون 🔧 در هدر کلیک کنید
2. تنظیمات مورد نظر خود را اعمال کنید
3. روی **ذخیره** کلیک کنید

### API Keys (اختیاری)
- **WeatherAPI**: برای اطلاعات آب‌وهوا از [weatherapi.com](https://www.weatherapi.com/signup.aspx)
- **MetalsAPI**: برای قیمت طلا و فلزات گرانبها

### تنظیمات قابل تغییر
- **واحد پول پایه** (USD, EUR, IRR)
- **لیست رمزارزها** (با کاما جدا کنید)
- **شهرهای آب‌وهوا** (با کاما جدا کنید) 
- **پس‌زمینه** (پیش‌فرض، آپلود، لینک، رنگ)


## 📡 API های استفاده شده

| سرویس | کاربرد | وضعیت | منبع |
|-------|--------|--------|-------|
| CoinGecko API | قیمت رمزارزهای جهانی | ✅ رایگان | [coingecko.com](https://www.coingecko.com/) |
| Bitpin API | قیمت ریالی رمزارزها | ✅ رایگان | [bitpin.ir](https://bitpin.ir/) |
| ExchangeRate API | نرخ ارز | ✅ رایگان | [exchangerate.host](https://exchangerate.host/) |
| WeatherAPI | اطلاعات آب‌وهوا | 🔑 نیاز به API Key | [weatherapi.com](https://www.weatherapi.com/) |
| MetalsAPI | قیمت طلا | 🔑 نیاز به API Key | [metals-api.com](https://metals-api.com/) |
| GitHub API | بررسی آپدیت | ✅ رایگان | [github.com](https://github.com/) |

## 🎨 شخصی‌سازی

### رمزارزهای قابل نمایش
```javascript
// در تنظیمات می‌توانید این رمزارزها را انتخاب کنید
## 📊 لیست رمز ارزهای پشتیبانی شده

- bitcoin
- ethereum
- tether
- tron
- dogecoin
- cardano
- polkadot
- binancecoin
- solana
- chainlink
- uniswap
- litecoin
- shiba
- avalanche
- polygon
- vechain
- monero
- stellar
- eos
- algorand
- filecoin
- aave
- pancake
- tezos
- cosmos
- zcash
- fantom
- elrond
- internetcomputer
- helium
- flow
- chiliz
- sandbox
- decentrand
- enjincoin
- gala
- render
- magic
- immutablex
- oneinch
- celsius
- curve
- rari
- raydium
- conflux
- dogelon
- floki
- volt
- safemoon
- trustwallet
- shibatoken
- babyshiba
- doge
- tetherusd
- usdcoin
- dai
- busd
- trueusd
- gemini
- paxos
- sushiswap
- yearnfinance
- makerdao
- compound
- uniswapv3
- synthetix
- loopring
- dydx
- op
- arbitrum
- optimism
- zkSync
- ethereumclassic
```

### تنظیمات پس‌زمینه
- 🖼️ تصویر پیش‌فرض
- 📤 آپلود عکس شخصی (تا 2MB)
- 🔗 لینک عکس خارجی
- 🎨 رنگ ساده

## 🔄 سیستم آپدیت

### نحوه کار
1. کاربر روی دکمه 🔄 کلیک می‌کند
2. سیستم نسخه فعلی را با آخرین نسخه در گیتهاب مقایسه می‌کند
3. در صورت موجود بودن نسخه جدید، نوتیفیکیشن نمایش داده می‌شود
4. کاربر به صفحه انتشارات گیتهاب هدایت می‌شود


## 🐛 عیب‌یابی

### مشکلات متداول
1. **قیمت‌ها نمایش داده نمی‌شوند**
   - اتصال اینترنت را بررسی کنید
   - API ممکن است موقتا down باشد

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

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است - برای جزئیات به فایل [LICENSE](LICENSE) مراجعه کنید.

## 👥 توسعه‌دهندگان

- **You** - توسعه اصلی - [GitHub](https://github.com/SitroTeam)

## 🙏 تشکر

- [CoinGecko](https://www.coingecko.com/) برای API رایگان رمزارزها
- [Bitpin](https://bitpin.ir/) برای قیمت‌های ریالی
- [WeatherAPI](https://www.weatherapi.com/) برای اطلاعات آب‌وهوا
- [Vazir Font](https://github.com/rastikerdar/vazir-font) برای فونت فارسی

## 📞 پشتیبانی

- 📧 Email: farazalihosseinzadeh2@gmail.com.com
- 🐛 [Issues](https://github.com/SitroTeam/market-newtab/issues)
- 💬 [Discussions](https://github.com/SitroTeam/market-newtab/discussions)

---

## 🔄 تاریخچه نسخه‌ها

### نسخه 1.1.0
- ✅ اضافه شدن سیستم آپدیت دستی از گیتهاب
- ✅ بهبود نمایش قیمت‌های ریالی از بیت‌پین
- ✅ اضافه شدن درصد تغییرات برای قیمت‌های IRR
- ✅ رفع خطاهای مربوط به آب‌وهوا
- ✅ بهبود مدیریت خطاها
- ✅ بهینه‌سازی عملکرد

### نسخه 1.0.0
- انتشار اولیه
- نمایش قیمت رمزارزها
- اطلاعات آب‌وهوا
- جستجوی گوگل
- رابط کاربری فارسی

---

**توجه**: قبل از استفاده، مطمئن شوید که با قوانین API های استفاده شده آشنا هستید.

<div align="center">

**از استفاده از این افزونه لذت ببرید! 🌟**

</div>
