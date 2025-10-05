const COINGECKO_SIMPLE_PRICE = 'https://api.coingecko.com/api/v3/simple/price';
const EXCHANGE_RATE = 'https://api.exchangerate.host/latest';
const PERIOD_MINUTES = 5;
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
  dydx: "DYDX_IRT",
  op: "OP_IRT",
  arbitrum: "ARB_IRT",
  optimism: "OP_IRT",
  zkSync: "ZKS_IRT",
  ethereumclassic: "ETC_IRT"
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
  if (msg.action === 'fetchBitpinTicker') {
    fetchBitpinTickerRates(msg.cryptoList)
      .then(data => sendResponse({ data }))
      .catch(err => sendResponse({ error: err.message }));
    return true; // async response
  }

  if (msg.action === 'checkForUpdates') {
    checkForUpdates()
      .then(updateInfo => sendResponse({ updateInfo }))
      .catch(error => sendResponse({ error: error.message }));
    return true;
  }

  if (msg.action === 'applyUpdate') {
    applyUpdate(msg.downloadUrl)
      .then(result => sendResponse({ result }))
      .catch(error => sendResponse({ error: error.message }));
    return true;
  }
});

// ============================
//  Fetch از Bitpin برای IRR
// ============================
async function fetchBitpinTickerRates(cryptoList = []) {
  try {
    const resp = await fetch('https://api.bitpin.ir/api/v1/mkt/tickers/');
    const arr = await resp.json();
    const rates = {};

    cryptoList.forEach(id => {
      const symbol = BITPIN_SYMBOLS[id.toLowerCase()];
      const ticker = arr.find(t => t.symbol === symbol);
      if (ticker) {
        rates[id.toLowerCase()] = {
          price: parseFloat(ticker.price),
          changePerc: parseFloat(ticker.daily_change_price)
        };
      }
    });

    return { base: 'IRR', rates, ts: Date.now() };
  } catch {
    return { base: 'IRR', rates: {}, ts: Date.now() };
  }
}

// ============================
//  Auto Update from GitHub
// ============================

// چک کردن آپدیت در هنگام نصب
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.local.set({ currentVersion: chrome.runtime.getManifest().version });
  } else if (details.reason === 'update') {
    checkForUpdates();
  }
});

// تابع چک کردن آپدیت
async function checkForUpdates() {
  try {
    const response = await fetch(GITHUB_API);
    if (!response.ok) throw new Error('Failed to fetch release info');
    
    const latestRelease = await response.json();
    const currentVersion = chrome.runtime.getManifest().version;
    const latestVersion = latestRelease.tag_name.replace('v', '');
    
    const isUpdateAvailable = compareVersions(latestVersion, currentVersion) > 0;
    
    return {
      currentVersion,
      latestVersion,
      isUpdateAvailable,
      releaseNotes: latestRelease.body,
      downloadUrl: latestRelease.assets[0]?.browser_download_url || latestRelease.zipball_url,
      publishedAt: latestRelease.published_at
    };
  } catch (error) {
    console.error('Update check failed:', error);
    throw error;
  }
}

// تابع مقایسه نسخه‌ها
function compareVersions(versionA, versionB) {
  const partsA = versionA.split('.').map(Number);
  const partsB = versionB.split('.').map(Number);
  
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const partA = partsA[i] || 0;
    const partB = partsB[i] || 0;
    
    if (partA > partB) return 1;
    if (partA < partB) return -1;
  }
  
  return 0;
}

// تابع اعمال آپدیت
async function applyUpdate(downloadUrl) {
  try {
    const downloadId = await chrome.downloads.download({
      url: downloadUrl,
      filename: 'market-newtab-update.zip'
    });
    
    return new Promise((resolve, reject) => {
      chrome.downloads.onChanged.addListener(function onChanged(delta) {
        if (delta.id === downloadId && delta.state && delta.state.current === 'complete') {
          chrome.downloads.onChanged.removeListener(onChanged);
          resolve({ success: true, downloadId });
        }
        
        if (delta.id === downloadId && delta.error && delta.error.current) {
          chrome.downloads.onChanged.removeListener(onChanged);
          reject(new Error(`Download failed: ${delta.error.current}`));
        }
      });
    });
  } catch (error) {
    console.error('Update application failed:', error);
    throw error;
  }
}