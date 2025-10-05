const COINGECKO_SIMPLE_PRICE = 'https://api.coingecko.com/api/v3/simple/price';
const EXCHANGE_RATE = 'https://api.exchangerate.host/latest';
const PERIOD_MINUTES = 5;
// آدرس ریپازیتوری خود را اینجا قرار دهید
const GITHUB_API = 'https://api.github.com/repos/SitroTeam/SitroChromeTab/releases/latest';

// نگاشت رمزارزها به نماد بیت‌پین (ساده‌شده)
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
  polygon: "MATIC_IRT",
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
};

// ============================
//  کرون Alarms برای fetch
// ============================
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('bgFetch', { periodInMinutes: PERIOD_MINUTES });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'bgFetch') updateBackgroundData();
});

// ============================
//  Fetch & Update داده‌ها
// ============================
async function updateBackgroundData() {
  chrome.storage.local.get(['settings'], async ({ settings }) => {
    settings = settings || { cryptoList: ['bitcoin'], baseCurrency: 'USD' };

    try {
      // رمزارزها
      let crypto = {};
      if (settings.baseCurrency !== 'IRR') {
        const res = await fetch(`${COINGECKO_SIMPLE_PRICE}?ids=${settings.cryptoList.join(',')}&vs_currencies=${settings.baseCurrency.toLowerCase()}&include_24hr_change=true`);
        if (res.ok) crypto = await res.json();
      }

      // نرخ ارز یا ریال
      let fiat = { rates: {} };
      if (settings.baseCurrency === 'IRR') {
        fiat = await fetchBitpinTickerRates(settings.cryptoList);
      } else {
        const res = await fetch(`${EXCHANGE_RATE}?base=${settings.baseCurrency.toUpperCase()}`);
        if (res.ok) fiat = await res.json();
      }

      // ذخیره در کش
      chrome.storage.local.set({
        cachedData: { crypto, fiat, ts: Date.now() }
      });

    } catch (e) {
      console.error('bgFetch error', e);
    }
  });
}

// ============================
//  هندل پیام‌ها از newtab.js
// ============================
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // هندل درخواست fetchBitpinTicker
  if (msg.action === 'fetchBitpinTicker') {
    fetchBitpinTickerRates(msg.cryptoList)
      .then(data => {
        sendResponse({ data });
      })
      .catch(err => {
        sendResponse({ error: err.message });
      });
    return true;
  }

  // هندل درخواست checkForUpdates
  if (msg.action === 'checkForUpdates') {
    checkForUpdates()
      .then(updateInfo => {
        sendResponse({ updateInfo });
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });
    return true;
  }

  // هندل درخواست applyUpdate
  if (msg.action === 'applyUpdate') {
    applyUpdate(msg.downloadUrl)
      .then(result => {
        sendResponse({ result });
      })
      .catch(error => {
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
    console.log('Fetching from Bitpin API...');
    const resp = await fetch('https://api.bitpin.ir/api/v1/mkt/tickers/');
    
    if (!resp.ok) {
      throw new Error(`Bitpin API failed with status: ${resp.status}`);
    }
    
    const data = await resp.json();
    console.log('Bitpin API response:', data);
    
    const tickers = data.results || data || [];
    const rates = {};

    cryptoList.forEach(id => {
      const symbol = BITPIN_SYMBOLS[id.toLowerCase()];
      console.log(`Looking for ${id} with symbol: ${symbol}`);
      
      if (symbol) {
        const ticker = tickers.find(t => t.symbol === symbol);
        if (ticker) {
          console.log(`Found ticker for ${id}:`, ticker);
          
          const price = parseFloat(ticker.price) || 0;
          // استفاده از daily_change_price برای درصد تغییر
          const changePercent = parseFloat(ticker.daily_change_price) || 
                               parseFloat(ticker.change) || 
                               parseFloat(ticker.price_change_percent) || 0;
          
          rates[id.toLowerCase()] = {
            price: price,
            changePerc: changePercent
          };
          
          console.log(`Price: ${price}, Change: ${changePercent}%`);
        } else {
          console.log(`Ticker not found for ${id} with symbol ${symbol}`);
        }
      }
    });

    console.log('Final rates:', rates);
    return { base: 'IRR', rates, ts: Date.now() };
  } catch (error) {
    console.error('Bitpin fetch error:', error);
    // فال‌بک: استفاده از CoinGecko با نرخ تقریبی
    return await fetchIRRFromCoinGecko(cryptoList);
  }
}

// فال‌بک برای زمانی که Bitpin کار نمی‌کند
async function fetchIRRFromCoinGecko(cryptoList) {
  try {
    const res = await fetch(`${COINGECKO_SIMPLE_PRICE}?ids=${cryptoList.join(',')}&vs_currencies=usd&include_24hr_change=true`);
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
      }
    });

    return { base: 'IRR', rates, ts: Date.now() };
  } catch (error) {
    console.error('CoinGecko fallback also failed:', error);
    return { base: 'IRR', rates: {}, ts: Date.now() };
  }
}

// ============================
//  Manual Update from GitHub
// ============================

// تابع چک کردن آپدیت
async function checkForUpdates() {
  try {
    // غیرفعال کردن موقت سیستم آپدیت
    const currentVersion = chrome.runtime.getManifest().version;
    
    return {
      currentVersion,
      latestVersion: currentVersion,
      isUpdateAvailable: false,
      releaseNotes: 'سیستم آپدیت موقتاً غیرفعال است',
      downloadUrl: '',
      publishedAt: new Date().toISOString()
    };
    
    /* کد قدیمی - کامنت شده
    const response = await fetch(GITHUB_API, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Market-NewTab-Extension'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API failed with status: ${response.status}`);
    }
    
    const latestRelease = await response.json();
    const currentVersion = chrome.runtime.getManifest().version;
    const latestVersion = latestRelease.tag_name ? latestRelease.tag_name.replace('v', '') : currentVersion;
    
    const isUpdateAvailable = compareVersions(latestVersion, currentVersion) > 0;
    
    return {
      currentVersion,
      latestVersion,
      isUpdateAvailable,
      releaseNotes: latestRelease.body || 'No release notes available',
      downloadUrl: latestRelease.assets[0]?.browser_download_url || latestRelease.html_url,
      publishedAt: latestRelease.published_at || new Date().toISOString()
    };
    */
  } catch (error) {
    console.error('Update check failed:', error);
    // بازگشت به حالت عادی بدون خطا
    const currentVersion = chrome.runtime.getManifest().version;
    return {
      currentVersion,
      latestVersion: currentVersion,
      isUpdateAvailable: false,
      releaseNotes: 'بررسی آپدیت در حال حاضر در دسترس نیست',
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

// تابع اعمال آپدیت
async function applyUpdate(downloadUrl) {
  try {
    // برای گیتهاب، کاربر را به صفحه release هدایت می‌کنیم
    if (downloadUrl.includes('github.com')) {
      chrome.tabs.create({ url: downloadUrl });
      return { success: true, message: 'Redirected to GitHub releases' };
    }

    const downloadId = await chrome.downloads.download({
      url: downloadUrl,
      filename: 'market-newtab-update.zip'
    });
    
    return new Promise((resolve, reject) => {
      const cleanup = () => {
        chrome.downloads.onChanged.removeListener(onChanged);
      };

      function onChanged(delta) {
        if (delta.id === downloadId && delta.state && delta.state.current === 'complete') {
          cleanup();
          resolve({ success: true, downloadId });
        }
        
        if (delta.id === downloadId && delta.error && delta.error.current) {
          cleanup();
          reject(new Error(`Download failed: ${delta.error.current}`));
        }
      }

      chrome.downloads.onChanged.addListener(onChanged);
      
      // Timeout after 30 seconds
      setTimeout(() => {
        cleanup();
        reject(new Error('Download timeout'));
      }, 30000);
    });
  } catch (error) {
    console.error('Update application failed:', error);
    throw error;
  }
}