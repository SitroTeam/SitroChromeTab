const COINGECKO_SIMPLE_PRICE = 'https://api.coingecko.com/api/v3/simple/price';
const EXCHANGE_RATE = 'https://api.exchangerate.host/latest';
const PERIOD_MINUTES = 5;
// آدرس ریپازیتوری خود را اینجا قرار دهید
const GITHUB_API = 'https://api.github.com/repos/SitroTeam/SitroChromeTab/releases/latest';

// نگاشت رمزارزها به نماد بیت‌پین
const BITPIN_SYMBOLS = {
  bitcoin: "BTC_IRT",
  ethereum: "ETH_IRT",
  tether: "USDT_IRT",
  tron: "TRX_IRT",
  dogecoin: "DOGE_IRT",
  cardano: "ADA_IRT",
  polkadot: "DOT_IRT",
  binancecoin: "BNB_IRT",
  solana: "SOL_IRT",
  chainlink: "LINK_IRT",
  uniswap: "UNI_IRT",
  litecoin: "LTC_IRT",
  shiba: "SHIB_IRT",
  avalanche: "AVAX_IRT",
  polygon: "POL_IRT",
  vechain: "VET_IRT",
  monero: "XMR_IRT",
  stellar: "XLM_IRT",
  eos: "EOS_IRT",
  algorand: "ALGO_IRT",
  filecoin: "FIL_IRT",
  aave: "AAVE_IRT",
  pancake: "CAKE_IRT",
  tezos: "XTZ_IRT",
  cosmos: "ATOM_IRT",
  zcash: "ZEC_IRT",
  fantom: "FTM_IRT",
  elrond: "EGLD_IRT",
  internetcomputer: "ICP_IRT",
  helium: "HNT_IRT",
  flow: "FLOW_IRT",
  chiliz: "CHZ_IRT",
  sandbox: "SAND_IRT",
  decentrand: "MANA_IRT",
  enjincoin: "ENJ_IRT",
  gala: "GALA_IRT",
  render: "RNDR_IRT",
  magic: "MAGIC_IRT",
  immutablex: "IMX_IRT",
  oneinch: "1INCH_IRT",
  celsius: "CEL_IRT",
  curve: "CRV_IRT",
  rari: "RARI_IRT",
  raydium: "RAY_IRT",
  conflux: "CFX_IRT",
  dogelon: "ELON_IRT",
  floki: "FLOKI_IRT",
  volt: "VOLT_IRT",
  safemoon: "SAFEMOON_IRT",
  trustwallet: "TWT_IRT",
  shibatoken: "SHIB_IRT",
  babyshiba: "BABYSHIBA_IRT",
  doge: "DOGE_IRT",
  tetherusd: "USDT_IRT",
  usdcoin: "USDC_IRT",
  dai: "DAI_IRT",
  busd: "BUSD_IRT",
  trueusd: "TUSD_IRT",
  gemini: "GUSD_IRT",
  paxos: "PAX_IRT",
  sushiswap: "SUSHI_IRT",
  yearnfinance: "YFI_IRT",
  makerdao: "MKR_IRT",
  compound: "COMP_IRT",
  uniswapv3: "UNI-V3_IRT",
  synthetix: "SNX_IRT",
  loopring: "LRC_IRT",
  oneinch: "1INCH_IRT",
  dydx: "DYDX_IRT",
  op: "OP_IRT",
  arbitrum: "ARB_IRT",
  optimism: "OP_IRT",
  zkSync: "ZKS_IRT",
  shiba: "SHIB_IRT",
  dogecoin: "DOGE_IRT",
  ethereumclassic: "ETC_IRT",
  tezos: "XTZ_IRT",
  eos: "EOS_IRT",
  algorand: "ALGO_IRT",
  filecoin: "FIL_IRT",
  aave: "AAVE_IRT",
  pancake: "CAKE_IRT",
  tezos: "XTZ_IRT",
  cosmos: "ATOM_IRT",
  zcash: "ZEC_IRT",
  fantom: "FTM_IRT",
  elrond: "EGLD_IRT",
  internetcomputer: "ICP_IRT",
  helium: "HNT_IRT",
  flow: "FLOW_IRT",
  chiliz: "CHZ_IRT",
  sandbox: "SAND_IRT",
  decentrand: "MANA_IRT",
  enjincoin: "ENJ_IRT",
  gala: "GALA_IRT",
  render: "RNDR_IRT",
  magic: "MAGIC_IRT",
  immutablex: "IMX_IRT",
  oneinch: "1INCH_IRT",
  celsius: "CEL_IRT",
  curve: "CRV_IRT",
  rari: "RARI_IRT",
  raydium: "RAY_IRT",
  conflux: "CFX_IRT",
  dogelon: "ELON_IRT",
  floki: "FLOKI_IRT",
  volt: "VOLT_IRT",
  safemoon: "SAFEMOON_IRT",
  trustwallet: "TWT_IRT",
  shibatoken: "SHIB_IRT",
  babyshiba: "BABYSHIBA_IRT",
  doge: "DOGE_IRT",
  tetherusd: "USDT_IRT",
  usdcoin: "USDC_IRT",
  dai: "DAI_IRT",
  busd: "BUSD_IRT",
  trueusd: "TUSD_IRT",
  gemini: "GUSD_IRT",
  paxos: "PAX_IRT",
  sushiswap: "SUSHI_IRT",
  yearnfinance: "YFI_IRT",
  makerdao: "MKR_IRT",
  compound: "COMP_IRT",
  uniswapv3: "UNI-V3_IRT",
  synthetix: "SNX_IRT",
  loopring: "LRC_IRT",
  dydx: "DYDX_IRT",
  op: "OP_IRT",
  arbitrum: "ARB_IRT",
  optimism: "OP_IRT",
  zkSync: "ZKS_IRT",
  notcoin: "NOT_IRT",
};

// ============================
//  کرون Alarms برای fetch
// ============================
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('bgFetch', { periodInMinutes: PERIOD_MINUTES });
  console.log('Service Worker installed and alarms created');
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'bgFetch') {
    console.log('Background fetch alarm triggered');
    updateBackgroundData();
  }
});

// ============================
//  Fetch & Update داده‌ها
// ============================
async function updateBackgroundData() {
  chrome.storage.local.get(['settings'], async ({ settings }) => {
    settings = settings || { cryptoList: ['bitcoin'], baseCurrency: 'USD' };
    console.log('Updating background data for:', settings.cryptoList, 'in', settings.baseCurrency);

    try {
      // رمزارزها
      let crypto = {};
      if (settings.baseCurrency !== 'IRR') {
        const res = await fetch(`${COINGECKO_SIMPLE_PRICE}?ids=${settings.cryptoList.join(',')}&vs_currencies=${settings.baseCurrency.toLowerCase()}&include_24hr_change=true`);
        if (res.ok) {
          crypto = await res.json();
          console.log('Crypto data fetched:', crypto);
        }
      }

      // نرخ ارز یا ریال
      let fiat = { rates: {} };
      if (settings.baseCurrency === 'IRR') {
        fiat = await fetchBitpinTickerRates(settings.cryptoList);
      } else {
        const res = await fetch(`${EXCHANGE_RATE}?base=${settings.baseCurrency.toUpperCase()}`);
        if (res.ok) {
          fiat = await res.json();
          console.log('Fiat data fetched:', fiat);
        }
      }

      // ذخیره در کش
      chrome.storage.local.set({
        cachedData: { crypto, fiat, ts: Date.now() }
      });
      console.log('Data cached successfully');

    } catch (e) {
      console.error('bgFetch error', e);
    }
  });
}

// ============================
//  هندل پیام‌ها از newtab.js
// ============================
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('Message received in service worker:', msg.action);

  // هندل درخواست fetchBitpinTicker
  if (msg.action === 'fetchBitpinTicker') {
    fetchBitpinTickerRates(msg.cryptoList)
      .then(data => {
        console.log('Bitpin data fetched successfully');
        sendResponse({ data });
      })
      .catch(err => {
        console.error('Bitpin fetch error:', err);
        sendResponse({ error: err.message });
      });
    return true;
  }

  // هندل درخواست checkForUpdates
  if (msg.action === 'checkForUpdates') {
    checkForUpdates()
      .then(updateInfo => {
        console.log('Update check completed:', updateInfo);
        sendResponse({ updateInfo });
      })
      .catch(error => {
        console.error('Update check error:', error);
        sendResponse({ error: error.message });
      });
    return true;
  }

  // هندل درخواست applyUpdate
  if (msg.action === 'applyUpdate') {
    applyUpdate(msg.downloadUrl)
      .then(result => {
        console.log('Update applied successfully:', result);
        sendResponse({ result });
      })
      .catch(error => {
        console.error('Update application error:', error);
        sendResponse({ error: error.message });
      });
    return true;
  }
});

// ============================
//  Fetch از Bitpin برای IRR
// ============================
async function fetchBitpinTickerRates(cryptoList = []) {
  try {
    console.log('Fetching Bitpin data for:', cryptoList);
    const resp = await fetch('https://api.bitpin.ir/api/v1/mkt/tickers/');
    
    if (!resp.ok) {
      throw new Error(`Bitpin API failed with status: ${resp.status}`);
    }
    
    const data = await resp.json();
    console.log('Bitpin API raw response:', data);
    
    const tickers = data.results || data || [];
    const rates = {};

    cryptoList.forEach(id => {
      const symbol = BITPIN_SYMBOLS[id.toLowerCase()];
      console.log(`Searching for ${id} with symbol: ${symbol}`);
      
      if (symbol) {
        const ticker = tickers.find(t => t.symbol === symbol);
        if (ticker) {
          console.log(`Found ticker for ${id}:`, ticker);
          
          const price = parseFloat(ticker.price) || 0;
          const changePercent = parseFloat(ticker.daily_change_price) || 0;
          
          rates[id.toLowerCase()] = {
            price: price,
            changePerc: changePercent
          };
          
          console.log(`Processed ${id}: ${price} IRR, ${changePercent}% change`);
        } else {
          console.log(`Ticker not found for ${id} with symbol ${symbol}`);
          // استفاده از فال‌بک فوری
          rates[id.toLowerCase()] = {
            price: 0,
            changePerc: 0
          };
        }
      } else {
        console.log(`No symbol mapping for ${id}`);
        rates[id.toLowerCase()] = {
          price: 0,
          changePerc: 0
        };
      }
    });

    console.log('Final IRR rates:', rates);
    return { base: 'IRR', rates, ts: Date.now() };
  } catch (error) {
    console.error('Bitpin fetch error:', error);
    return await fetchIRRFromCoinGecko(cryptoList);
  }
}

// فال‌بک برای زمانی که Bitpin کار نمی‌کند
async function fetchIRRFromCoinGecko(cryptoList) {
  try {
    console.log('Using CoinGecko fallback for IRR');
    const res = await fetch(`${COINGECKO_API}?ids=${cryptoList.join(',')}&vs_currencies=usd&include_24hr_change=true`);
    if (!res.ok) throw new Error('CoinGecko failed');
    
    const cryptoData = await res.json();
    const rates = {};
    const usdToIrr = 50000; // نرخ تقریبی دلار به ریال

    cryptoList.forEach(id => {
      const usdPrice = cryptoData[id]?.usd;
      if (usdPrice) {
        rates[id.toLowerCase()] = {
          price: Math.round(usdPrice * usdToIrr),
          changePerc: cryptoData[id]?.usd_24h_change || 0
        };
      } else {
        rates[id.toLowerCase()] = {
          price: 0,
          changePerc: 0
        };
      }
    });

    console.log('CoinGecko fallback rates:', rates);
    return { base: 'IRR', rates, ts: Date.now() };
  } catch (error) {
    console.error('CoinGecko fallback also failed:', error);
    // ایجاد داده‌های نمونه برای جلوگیری از خطا
    const sampleRates = {};
    cryptoList.forEach(id => {
      sampleRates[id.toLowerCase()] = {
        price: 0,
        changePerc: 0
      };
    });
    return { base: 'IRR', rates: sampleRates, ts: Date.now() };
  }
}

// ============================
//  Manual Update from GitHub
// ============================

// تابع چک کردن آپدیت
async function checkForUpdates() {
  try {
    console.log('Checking for updates...');
    
    // اگر آدرس گیتهاب تنظیم نشده، غیرفعال باش
    if (!GITHUB_API || GITHUB_API.includes('YOUR_USERNAME')) {
      console.log('GitHub API not configured');
      const currentVersion = chrome.runtime.getManifest().version;
      return {
        currentVersion,
        latestVersion: currentVersion,
        isUpdateAvailable: false,
        releaseNotes: 'لطفاً آدرس ریپازیتوری را در تنظیمات تنظیم کنید',
        downloadUrl: '',
        publishedAt: new Date().toISOString()
      };
    }

    const response = await fetch(GITHUB_API, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Market-NewTab-Extension'
      }
    });
    
    if (response.status === 404) {
      throw new Error('ریپازیتوری پیدا نشد. لطفاً آدرس ریپازیتوری را بررسی کنید.');
    }
    
    if (!response.ok) {
      throw new Error(`خطا در ارتباط با گیتهاب: ${response.status}`);
    }
    
    const latestRelease = await response.json();
    const currentVersion = chrome.runtime.getManifest().version;
    const latestVersion = latestRelease.tag_name ? latestRelease.tag_name.replace('v', '') : currentVersion;
    
    const isUpdateAvailable = compareVersions(latestVersion, currentVersion) > 0;
    
    // پیدا کردن لینک دانلود
    let downloadUrl = '';
    if (latestRelease.assets && latestRelease.assets.length > 0) {
      // پیدا کردن فایل zip
      const zipAsset = latestRelease.assets.find(asset => 
        asset.name.includes('.zip') || asset.name.includes('market-newtab')
      );
      downloadUrl = zipAsset ? zipAsset.browser_download_url : latestRelease.assets[0].browser_download_url;
    } else {
      // اگر فایل آپلود شده نیست، از source code استفاده کن
      downloadUrl = latestRelease.zipball_url;
    }
    
    console.log('Update check result:', {
      currentVersion,
      latestVersion,
      isUpdateAvailable,
      downloadUrl
    });
    
    return {
      currentVersion,
      latestVersion,
      isUpdateAvailable,
      releaseNotes: latestRelease.body || 'بهبود عملکرد و رفع باگ',
      downloadUrl: downloadUrl,
      publishedAt: latestRelease.published_at || new Date().toISOString()
    };
  } catch (error) {
    console.error('Update check failed:', error);
    
    // بازگشت به حالت عادی بدون خطا
    const currentVersion = chrome.runtime.getManifest().version;
    return {
      currentVersion,
      latestVersion: currentVersion,
      isUpdateAvailable: false,
      releaseNotes: 'بررسی آپدیت موقتاً در دسترس نیست: ' + error.message,
      downloadUrl: '',
      publishedAt: new Date().toISOString()
    };
  }
}

// تابع مقایسه نسخه‌ها
function compareVersions(versionA, versionB) {
  try {
    const partsA = versionA.split('.').map(Number);
    const partsB = versionB.split('.').map(Number);
    
    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
      const partA = partsA[i] || 0;
      const partB = partsB[i] || 0;
      
      if (partA > partB) return 1;
      if (partA < partB) return -1;
    }
    
    return 0;
  } catch (error) {
    console.error('Version comparison error:', error);
    return 0;
  }
}

// تابع اعمال آپدیت واقعی
async function applyUpdate(downloadUrl) {
  try {
    if (!downloadUrl) {
      throw new Error('لینک دانلود موجود نیست');
    }

    console.log('Applying update with URL:', downloadUrl);

    // ریدایرکت مستقیم به صفحه releases
    let releaseUrl = '';
    
    if (downloadUrl.includes('api.github.com/repos')) {
      // تبدیل لینک API به لینک معمولی گیتهاب
      releaseUrl = downloadUrl
        .replace('api.github.com/repos', 'github.com')
        .replace('/releases/latest', '/releases/')
        .replace('/zipball/', '/releases/')
        .replace('/tarball/', '/releases/');
    } else if (downloadUrl.includes('github.com')) {
      // اگر لینک مستقیم گیتهاب است
      releaseUrl = downloadUrl;
    } else {
      // برای لینک‌های مستقیم دانلود
      releaseUrl = downloadUrl;
    }

    // حذف پارامترهای اضافی
    releaseUrl = releaseUrl.split('?')[0];
    
    console.log('Redirecting to:', releaseUrl);
    
    // باز کردن تب جدید
    chrome.tabs.create({ url: releaseUrl });
    
    return { 
      success: true, 
      message: 'به صفحه انتشار هدایت شدید. لطفاً آخرین نسخه را دانلود و نصب کنید.',
      releaseUrl: releaseUrl
    };
    
  } catch (error) {
    console.error('Update application failed:', error);
    throw error;
  }
}

// تابع برای تست API (اختیاری)
async function testBitpinAPI() {
  try {
    console.log('Testing Bitpin API...');
    const resp = await fetch('https://api.bitpin.ir/api/v1/mkt/tickers/');
    const data = await resp.json();
    
    if (data.results && data.results.length > 0) {
      console.log('Bitpin API Test - First Ticker:', data.results[0]);
      console.log('Available symbols:', data.results.slice(0, 5).map(t => t.symbol));
    } else {
      console.log('Bitpin API Test - No results found');
    }
  } catch (error) {
    console.error('Bitpin API Test Failed:', error);
  }
}

// تابع برای تست آپدیت (اختیاری)
async function testUpdateSystem() {
  try {
    console.log('Testing update system...');
    const updateInfo = await checkForUpdates();
    console.log('Update test result:', updateInfo);
  } catch (error) {
    console.error('Update test failed:', error);
  }
}

// اجرای تست هنگام لود (اختیاری)
// testBitpinAPI();
// testUpdateSystem();

// هندل نصب و آپدیت
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Extension installed for the first time');
    // مقداردهی اولیه
    chrome.storage.local.set({
      settings: {
        baseCurrency: 'USD',
        cryptoList: ['bitcoin', 'ethereum', 'tether'],
        goldApiKey: '',
        weatherApiKey: '',
        cities: ['Tehran'],
        background: {
          type: 'default',
          data: null
        }
      }
    });
  } else if (details.reason === 'update') {
    console.log('Extension updated from', details.previousVersion, 'to', chrome.runtime.getManifest().version);
  }
});