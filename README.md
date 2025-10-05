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

| رمز ارز | آیکون | نماد |
|---------|-------|------|
| Bitcoin | ![Bitcoin](https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png) | BTC_IRT |
| Ethereum | ![Ethereum](https://coin-images.coingecko.com/coins/images/279/small/ethereum.png) | ETH_IRT |
| Tether | ![Tether](https://coin-images.coingecko.com/coins/images/325/small/Tether.png) | USDT_IRT |
| Tron | ![Tron](https://coin-images.coingecko.com/coins/images/1094/small/tron-logo.png) | TRX_IRT |
| Dogecoin | ![Dogecoin](https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png) | DOGE_IRT |
| Cardano | ![Cardano](https://coin-images.coingecko.com/coins/images/975/small/cardano.png) | ADA_IRT |
| Polkadot | ![Polkadot](https://coin-images.coingecko.com/coins/images/12171/small/polkadot.png) | DOT_IRT |
| Binance Coin | ![BNB](https://coin-images.coingecko.com/coins/images/825/small/bnb-icon2.png) | BNB_IRT |
| Solana | ![Solana](https://coin-images.coingecko.com/coins/images/4128/small/solana.png) | SOL_IRT |
| Chainlink | ![Chainlink](https://coin-images.coingecko.com/coins/images/877/small/chainlink-new-logo.png) | LINK_IRT |
| Uniswap | ![Uniswap](https://coin-images.coingecko.com/coins/images/12504/small/uniswap.png) | UNI_IRT |
| Litecoin | ![Litecoin](https://coin-images.coingecko.com/coins/images/2/small/litecoin.png) | LTC_IRT |
| Shiba Inu | ![Shiba Inu](https://coin-images.coingecko.com/coins/images/11939/small/shiba.png) | SHIB_IRT |
| Avalanche | ![Avalanche](https://coin-images.coingecko.com/coins/images/12559/small/avax.png) | AVAX_IRT |
| Polygon | ![Polygon](https://coin-images.coingecko.com/coins/images/4713/small/matic-token-icon.png) | MATIC_IRT |
| VeChain | ![VeChain](https://coin-images.coingecko.com/coins/images/1167/small/VeChain-Logo-768x725.png) | VET_IRT |
| Monero | ![Monero](https://coin-images.coingecko.com/coins/images/69/small/monero_logo.png) | XMR_IRT |
| Stellar | ![Stellar](https://coin-images.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png) | XLM_IRT |
| EOS | ![EOS](https://coin-images.coingecko.com/coins/images/738/small/eos-eos-logo.png) | EOS_IRT |
| Algorand | ![Algorand](https://coin-images.coingecko.com/coins/images/4380/small/download.png) | ALGO_IRT |
| Filecoin | ![Filecoin](https://coin-images.coingecko.com/coins/images/12817/small/filecoin.png) | FIL_IRT |
| Aave | ![Aave](https://coin-images.coingecko.com/coins/images/12645/small/AAVE.png) | AAVE_IRT |
| PancakeSwap | ![PancakeSwap](https://coin-images.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo_%281%29.png) | CAKE_IRT |
| Tezos | ![Tezos](https://coin-images.coingecko.com/coins/images/976/small/Tezos-logo.png) | XTZ_IRT |
| Cosmos | ![Cosmos](https://coin-images.coingecko.com/coins/images/1481/small/cosmos_hub.png) | ATOM_IRT |
| Zcash | ![Zcash](https://coin-images.coingecko.com/coins/images/486/small/zcash.png) | ZEC_IRT |
| Fantom | ![Fantom](https://coin-images.coingecko.com/coins/images/4001/small/Fantom.png) | FTM_IRT |
| Elrond | ![Elrond](https://coin-images.coingecko.com/coins/images/12335/small/elrond3_360.png) | EGLD_IRT |
| Internet Computer | ![ICP](https://coin-images.coingecko.com/coins/images/14495/small/Internet_Computer_logo.png) | ICP_IRT |
| Helium | ![Helium](https://coin-images.coingecko.com/coins/images/4284/small/Helium_HNT.png) | HNT_IRT |
| Flow | ![Flow](https://coin-images.coingecko.com/coins/images/13446/small/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png) | FLOW_IRT |
| Chiliz | ![Chiliz](https://coin-images.coingecko.com/coins/images/8834/small/CHZ_Token_updated.png) | CHZ_IRT |
| The Sandbox | ![Sandbox](https://coin-images.coingecko.com/coins/images/12129/small/sandbox_logo.jpg) | SAND_IRT |
| Decentraland | ![Decentraland](https://coin-images.coingecko.com/coins/images/878/small/decentraland-mana.png) | MANA_IRT |
| Enjin Coin | ![Enjin](https://coin-images.coingecko.com/coins/images/1102/small/enjin-coin-logo.png) | ENJ_IRT |
| Gala | ![Gala](https://coin-images.coingecko.com/coins/images/12493/small/GALA-COINGECKO.png) | GALA_IRT |
| Render Token | ![Render](https://coin-images.coingecko.com/coins/images/11636/small/rndr.png) | RNDR_IRT |
| Magic | ![Magic](https://coin-images.coingecko.com/coins/images/18623/small/magic.png) | MAGIC_IRT |
| Immutable X | ![IMX](https://coin-images.coingecko.com/coins/images/17233/small/immutableX-symbol-BLK-RGB.png) | IMX_IRT |
| 1inch | ![1inch](https://coin-images.coingecko.com/coins/images/13469/small/1inch-token.png) | 1INCH_IRT |
| Celsius | ![Celsius](https://coin-images.coingecko.com/coins/images/3263/small/CEL_logo.png) | CEL_IRT |
| Curve DAO | ![Curve](https://coin-images.coingecko.com/coins/images/12124/small/Curve.png) | CRV_IRT |
| Rarible | ![Rarible](https://coin-images.coingecko.com/coins/images/12245/small/Rari.png) | RARI_IRT |
| Raydium | ![Raydium](https://coin-images.coingecko.com/coins/images/13970/small/PSigc4ie_400x400.jpg) | RAY_IRT |
| Conflux | ![Conflux](https://coin-images.coingecko.com/coins/images/13079/small/3vuYMbjN.png) | CFX_IRT |
| Dogelon Mars | ![Dogelon](https://coin-images.coingecko.com/coins/images/14962/small/6GxcPRo3_400x400.jpg) | ELON_IRT |
| Floki Inu | ![Floki](https://coin-images.coingecko.com/coins/images/16746/small/PNG_logo.png) | FLOKI_IRT |
| SafeMoon | ![SafeMoon](https://coin-images.coingecko.com/coins/images/14362/small/safemoon.jpg) | SAFEMOON_IRT |
| Trust Wallet | ![Trust Wallet](https://coin-images.coingecko.com/coins/images/11085/small/Trust.png) | TWT_IRT |
| USD Coin | ![USD Coin](https://coin-images.coingecko.com/coins/images/6319/small/USD_Coin_icon.png) | USDC_IRT |
| Dai | ![Dai](https://coin-images.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png) | DAI_IRT |
| Binance USD | ![BUSD](https://coin-images.coingecko.com/coins/images/9576/small/BUSD.png) | BUSD_IRT |
| TrueUSD | ![TrueUSD](https://coin-images.coingecko.com/coins/images/3449/small/tusd.png) | TUSD_IRT |
| Gemini Dollar | ![Gemini](https://coin-images.coingecko.com/coins/images/5992/small/gemini-dollar-gusd.png) | GUSD_IRT |
| Pax Dollar | ![Paxos](https://coin-images.coingecko.com/coins/images/6013/small/Pax_Dollar.png) | PAX_IRT |
| SushiSwap | ![SushiSwap](https://coin-images.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png) | SUSHI_IRT |
| yearn.finance | ![yearn.finance](https://coin-images.coingecko.com/coins/images/11849/small/yfi-192x192.png) | YFI_IRT |
| Maker | ![Maker](https://coin-images.coingecko.com/coins/images/1364/small/Mark_Maker.png) | MKR_IRT |
| Compound | ![Compound](https://coin-images.coingecko.com/coins/images/10775/small/COMP.png) | COMP_IRT |
| Synthetix | ![Synthetix](https://coin-images.coingecko.com/coins/images/3406/small/SNX.png) | SNX_IRT |
| Loopring | ![Loopring](https://coin-images.coingecko.com/coins/images/913/small/LRC.png) | LRC_IRT |
| dYdX | ![dYdX](https://coin-images.coingecko.com/coins/images/17500/small/dydx.png) | DYDX_IRT |
| Optimism | ![Optimism](https://coin-images.coingecko.com/coins/images/25244/small/Optimism.png) | OP_IRT |
| Arbitrum | ![Arbitrum](https://coin-images.coingecko.com/coins/images/16547/small/arbitrum_logo.jpeg) | ARB_IRT |
| zkSync | ![zkSync](https://coin-images.coingecko.com/coins/images/24242/small/zksync.jpg) | ZKS_IRT |
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
