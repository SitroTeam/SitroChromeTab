/* ======================== */
/*      تنظیمات پیش‌فرض      */
/* ======================== */
const DEFAULT_SETTINGS = {
  baseCurrency: 'USD',
  cryptoList: ['bitcoin', 'ethereum', 'tether'],
  goldApiKey: '',
  weatherApiKey: '',
  cities: ['Tehran'],
  background: {
    type: 'default', // 'default', 'upload', 'url', 'color'
    data: null
  }
};

const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price';
const METALS_API = 'https://api.metals-api.com/v1/latest';
const EXCHANGE_API = 'https://api.exchangerate.host/latest';
const WEATHER_API = 'https://api.weatherapi.com/v1/current.json';
const LOGO_PLACEHOLDER = 'icons/icon128.png';
let lastFetchTime = 0;
const FETCH_INTERVAL = 30 * 1000;

/* ======================== */
/*      Utility Functions    */
/* ======================== */
async function loadSettings() {
  return new Promise(resolve => {
    chrome.storage.local.get(['settings'], res => {
      if (res.settings) {
        resolve({ ...DEFAULT_SETTINGS, ...res.settings });
      } else {
        resolve(DEFAULT_SETTINGS);
      }
    });
  });
}

async function saveSettings(settings) {
  return new Promise(resolve => {
    chrome.storage.local.set({ settings }, resolve);
  });
}

/* ======================== */
/*      Background Functions */
/* ======================== */
function applyBackground(settings) {
  const bgOverlay = document.querySelector('.bg-overlay');
  if (!bgOverlay) {
    console.error('bg-overlay element not found!');
    return;
  }

  // ابتدا تمام استایل‌ها رو پاک می‌کنیم
  bgOverlay.style.backgroundImage = 'none';
  bgOverlay.style.backgroundColor = 'transparent';
  bgOverlay.style.filter = 'blur(8px)';

  const bgConfig = settings.background || { type: 'default', data: null };

  switch (bgConfig.type) {
    case 'upload':
      if (bgConfig.data) {
        bgOverlay.style.backgroundImage = `url("${bgConfig.data}")`;
      }
      break;

    case 'url':
      if (bgConfig.data) {
        bgOverlay.style.backgroundImage = `url("${bgConfig.data}")`;
      }
      break;

    case 'color':
      if (bgConfig.data) {
        bgOverlay.style.backgroundColor = bgConfig.data;
        bgOverlay.style.filter = 'blur(0px)';
      }
      break;

    case 'default':
    default:
      bgOverlay.style.backgroundImage = 'url("./images/bg.jpg")';
  }

  // اطمینان از تنظیمات نمایش
  bgOverlay.style.backgroundSize = 'cover';
  bgOverlay.style.backgroundPosition = 'center';
  bgOverlay.style.backgroundRepeat = 'no-repeat';
}

function setupBackgroundUI() {
  const backgroundType = document.getElementById('backgroundType');
  const uploadSection = document.getElementById('uploadSection');
  const urlSection = document.getElementById('urlSection');
  const colorSection = document.getElementById('colorSection');
  const backgroundUpload = document.getElementById('backgroundUpload');
  const backgroundUrl = document.getElementById('backgroundUrl');
  const backgroundColor = document.getElementById('backgroundColor');
  const testBackgroundUrl = document.getElementById('testBackgroundUrl');

  // مدیریت تغییر نوع پس‌زمینه
  backgroundType.addEventListener('change', function() {
    uploadSection.classList.add('hidden');
    urlSection.classList.add('hidden');
    colorSection.classList.add('hidden');

    switch (this.value) {
      case 'upload':
        uploadSection.classList.remove('hidden');
        break;
      case 'url':
        urlSection.classList.remove('hidden');
        break;
      case 'color':
        colorSection.classList.remove('hidden');
        break;
    }
  });

  // مدیریت آپلود عکس
  backgroundUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('لطفاً یک فایل تصویری انتخاب کنید');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('حجم فایل باید کمتر از 2MB باشد');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const base64 = e.target.result;
      
      // نمایش پیش‌نمایش
      const previewImg = document.querySelector('#uploadPreview .preview-image');
      previewImg.src = base64;
      document.getElementById('uploadPreview').classList.remove('hidden');
      
      // تست فوری
      testBackgroundImmediately('upload', base64);
    };
    reader.readAsDataURL(file);
  });

  // تست لینک عکس
  testBackgroundUrl.addEventListener('click', function() {
    const url = backgroundUrl.value.trim();
    if (!url) {
      alert('لطفاً لینک عکس را وارد کنید');
      return;
    }

    // تست فوری
    testBackgroundImmediately('url', url);
    
    // نمایش پیش‌نمایش
    const previewImg = document.querySelector('#urlPreview .preview-image');
    previewImg.onload = () => {
      document.getElementById('urlPreview').classList.remove('hidden');
    };
    previewImg.onerror = () => {
      alert('خطا در بارگذاری عکس! لینک معتبر نیست.');
    };
    previewImg.src = url;
  });

  // پیش‌نمایش رنگ
  backgroundColor.addEventListener('input', function() {
    const color = this.value;
    document.querySelector('#colorPreview .color-preview-box').style.background = color;
    testBackgroundImmediately('color', color);
  });
}

// تابع برای تست فوری پس‌زمینه
function testBackgroundImmediately(type, data) {
  const bgOverlay = document.querySelector('.bg-overlay');
  if (!bgOverlay) return;

  // پاک کردن استایل‌ها
  bgOverlay.style.backgroundImage = 'none';
  bgOverlay.style.backgroundColor = 'transparent';
  bgOverlay.style.filter = 'blur(8px)';

  switch (type) {
    case 'upload':
    case 'url':
      bgOverlay.style.backgroundImage = `url("${data}")`;
      break;
    case 'color':
      bgOverlay.style.backgroundColor = data;
      bgOverlay.style.filter = 'blur(0px)';
      break;
  }

  bgOverlay.style.backgroundSize = 'cover';
  bgOverlay.style.backgroundPosition = 'center';
  bgOverlay.style.backgroundRepeat = 'no-repeat';
}

function getBackgroundDataFromUI() {
  const backgroundType = document.getElementById('backgroundType').value;

  return new Promise((resolve) => {
    switch (backgroundType) {
      case 'upload':
        const uploadFile = document.getElementById('backgroundUpload').files[0];
        if (uploadFile) {
          const reader = new FileReader();
          reader.onload = e => {
            resolve({
              type: 'upload',
              data: e.target.result
            });
          };
          reader.readAsDataURL(uploadFile);
        } else {
          resolve({ type: 'default', data: null });
        }
        break;

      case 'url':
        const url = document.getElementById('backgroundUrl').value.trim();
        if (url) {
          resolve({
            type: 'url',
            data: url
          });
        } else {
          resolve({ type: 'default', data: null });
        }
        break;

      case 'color':
        const color = document.getElementById('backgroundColor').value;
        resolve({
          type: 'color',
          data: color
        });
        break;

      default:
        resolve({ type: 'default', data: null });
    }
  });
}

/* ======================== */
/*      Fetch Functions      */
/* ======================== */
async function fetchCrypto(ids, vs_currency) {
  if (!ids.length) return {};
  try {
    const res = await fetch(`${COINGECKO_API}?ids=${ids.join(',')}&vs_currencies=${vs_currency.toLowerCase()}&include_24hr_change=true`);
    if (!res.ok) throw new Error('Failed to fetch crypto data');
    return await res.json();
  } catch (error) {
    console.error('Error fetching crypto:', error);
    return {};
  }
}

async function fetchCryptoLogos(ids) {
  return new Promise(resolve => {
    chrome.storage.local.get(['cryptoLogos'], async ({ cryptoLogos }) => {
      cryptoLogos = cryptoLogos || {};
      const logos = { ...cryptoLogos };
      const idsToFetch = ids.filter(id => !logos[id]);
      
      if (idsToFetch.length > 0) {
        try {
          await Promise.all(idsToFetch.map(async id => {
            try {
              const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
              if (!res.ok) throw new Error();
              const data = await res.json();
              logos[id] = data.image?.small || LOGO_PLACEHOLDER;
            } catch {
              logos[id] = LOGO_PLACEHOLDER;
            }
          }));
          chrome.storage.local.set({ cryptoLogos: logos });
        } catch (error) {
          console.error('Error fetching logos:', error);
        }
      }
      resolve(logos);
    });
  });
}

async function fetchFiatRates(base, cryptoList = []) {
  if (base === 'IRR') {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        console.log('Timeout reached for Bitpin API');
        // فال‌بک مستقیم
        fetchIRRFallback(cryptoList).then(resolve);
      }, 10000);

      try {
        chrome.runtime.sendMessage({ action: 'fetchBitpinTicker', cryptoList }, (response) => {
          clearTimeout(timeout);
          
          if (chrome.runtime.lastError) {
            console.error('Chrome runtime error:', chrome.runtime.lastError.message);
            fetchIRRFallback(cryptoList).then(resolve);
            return;
          }
          
          if (response && response.data) {
            resolve(response.data);
          } else {
            console.error('Invalid response from Bitpin API');
            fetchIRRFallback(cryptoList).then(resolve);
          }
        });
      } catch (error) {
        clearTimeout(timeout);
        console.error('Error in fetchFiatRates:', error);
        fetchIRRFallback(cryptoList).then(resolve);
      }
    });
  } else {
    try {
      const res = await fetch(`${EXCHANGE_API}?base=${base.toUpperCase()}`);
      if (!res.ok) throw new Error('Failed to fetch fiat rates');
      return await res.json();
    } catch (error) {
      console.error('Error fetching fiat rates:', error);
      return { rates: {} };
    }
  }
}

// فال‌بک برای IRR
async function fetchIRRFallback(cryptoList) {
  try {
    const res = await fetch(`${COINGECKO_API}?ids=${cryptoList.join(',')}&vs_currencies=usd&include_24hr_change=true`);
    if (!res.ok) throw new Error('CoinGecko failed');
    
    const cryptoData = await res.json();
    const rates = {};
    const usdToIrr = 50000; // نرخ تقریبی

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

    return { base: 'IRR', rates, ts: Date.now() };
  } catch (error) {
    console.error('IRR fallback also failed:', error);
    // ایجاد داده‌های نمونه
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

async function fetchGoldPriceUSD(apiKey) {
  if (!apiKey) return null;
  try {
    const res = await fetch(`${METALS_API}?access_key=${apiKey}&symbols=XAU&base=USD`);
    if (!res.ok) throw new Error('Failed to fetch gold price');
    return await res.json();
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return null;
  }
}

async function fetchWeatherData(city, apiKey) {
  if (!apiKey || !city) return null;
  try {
    const res = await fetch(`${WEATHER_API}?key=${apiKey}&q=${encodeURIComponent(city)}&lang=fa`);
    if (!res.ok) throw new Error('Failed to fetch weather data');
    return await res.json();
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

/* ======================== */
/*      Render Functions     */
/* ======================== */
async function renderCryptoCards(cryptoData, fiatData, goldData, settings, ts) {
  const cards = document.getElementById('crypto-cards');
  
  // نمایش اسکلتون در حین لود
  cards.innerHTML = '';
  for (let i = 0; i < settings.cryptoList.length; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton';
    cards.appendChild(skeleton);
  }

  try {
    const logos = await fetchCryptoLogos(settings.cryptoList);
    const unit = settings.baseCurrency.toUpperCase();

    cards.innerHTML = '';
    
    settings.cryptoList.forEach(id => {
      const card = document.createElement('div');
      card.className = 'card';

      const logoHtml = `<img src="${logos[id] || LOGO_PLACEHOLDER}" alt="${id}" class="crypto-logo" onerror="this.src='${LOGO_PLACEHOLDER}'">`;

      let currentPrice = null;
      let changePerc = '';
      let positive = null;

      if (unit === 'IRR') {
        const item = fiatData?.rates?.[id];
        if (item && item.price > 0) {
          currentPrice = item.price;
          changePerc = item.changePerc.toFixed(2) + '%';
          positive = item.changePerc >= 0;
        } else {
          currentPrice = null;
          changePerc = '—';
          positive = null;
        }
      } else {
        currentPrice = cryptoData?.[id]?.[unit.toLowerCase()] ?? null;
        const cgChange = cryptoData?.[id]?.[unit.toLowerCase() + '_24h_change'];
        changePerc = cgChange != null ? cgChange.toFixed(2) + '%' : '—';
        positive = cgChange != null ? cgChange >= 0 : null;
      }

      const nameHtml = `<h2>${id.toUpperCase()} 
                          <span class="price-change-inline ${positive === null ? '' : positive ? 'positive' : 'negative'}">
                            ${changePerc}
                          </span>
                        </h2>`;
      const priceHtml = `<p>${unit} : ${currentPrice != null ? currentPrice.toLocaleString() : '—'}</p>`;

      card.innerHTML = `${logoHtml}<div>${nameHtml}${priceHtml}</div>`;
      cards.appendChild(card);
    });

    document.getElementById('last-updated').textContent =
      'آخرین بروزرسانی: ' + new Date(ts).toLocaleString('fa-IR');
  } catch (error) {
    console.error('Error rendering crypto cards:', error);
    cards.innerHTML = '<div class="card"><p>خطا در بارگذاری داده‌ها</p></div>';
    document.getElementById('last-updated').textContent = 'خطا در بروزرسانی';
  }
}

async function renderWeatherCards(settings) {
  const cards = document.getElementById('weather-cards');
  cards.innerHTML = '';
  if (!settings.weatherApiKey || !settings.cities.length) return;

  for (const city of settings.cities) {
    const data = await fetchWeatherData(city, settings.weatherApiKey);
    const card = document.createElement('div');
    card.className = 'weather-card';
    if (data) {
      card.innerHTML = `
        <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
        <h2>${data.location.name}</h2>
        <p>${data.current.temp_c}°C</p>
      `;
    } else {
      card.innerHTML = `<h2>${city}</h2><p>—</p>`;
    }
    cards.appendChild(card);
  }
}

/* ======================== */
/*      Load & Render        */
/* ======================== */
async function loadAndRender() {
  const settings = await loadSettings();
  const now = Date.now();
  const useCache = (now - lastFetchTime) < FETCH_INTERVAL;

  // اعمال پس‌زمینه
  applyBackground(settings);

  try {
    chrome.storage.local.get(['cachedData'], async ({ cachedData }) => {
      if (useCache && cachedData) {
        console.log('Using cached data');
        renderCryptoCards(cachedData.crypto, cachedData.fiat, cachedData.gold, settings, cachedData.ts);
      } else {
        console.log('Fetching fresh data');
        try {
          const [crypto, fiat, gold] = await Promise.all([
            settings.baseCurrency !== 'IRR' ? fetchCrypto(settings.cryptoList, settings.baseCurrency) : Promise.resolve({}),
            fetchFiatRates(settings.baseCurrency, settings.cryptoList),
            fetchGoldPriceUSD(settings.goldApiKey)
          ]);

          const newCachedData = { 
            crypto: crypto || {}, 
            fiat: fiat || { rates: {} }, 
            gold: gold || {}, 
            ts: Date.now() 
          };
          
          chrome.storage.local.set({ cachedData: newCachedData });
          lastFetchTime = Date.now();
          renderCryptoCards(crypto || {}, fiat || { rates: {} }, gold || {}, settings, Date.now());
        } catch (error) {
          console.error('Error in loadAndRender:', error);
          renderCryptoCards({}, { rates: {} }, {}, settings, Date.now());
        }
      }
      renderWeatherCards(settings);
    });
  } catch (error) {
    console.error('Error loading data:', error);
    renderCryptoCards({}, { rates: {} }, {}, settings, Date.now());
    renderWeatherCards(settings);
  }
}

/* ======================== */
/*      Google Search        */
/* ======================== */
function setupGoogleSearch() {
  const form = document.getElementById('googleSearchForm');
  const input = document.getElementById('googleSearchInput');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    if (q.startsWith('http://') || q.startsWith('https://')) {
      window.location.href = q;
    } else {
      window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(q);
    }
  });
}

/* ======================== */
/*      Settings Modal       */
/* ======================== */
function setupSettingsUI() {
  const modal = document.getElementById('settingsModal');
  document.getElementById('settingsBtn').addEventListener('click', async () => {
    const settings = await loadSettings();
    
    // پر کردن فرم تنظیمات
    document.getElementById('baseCurrency').value = settings.baseCurrency;
    document.getElementById('cryptoList').value = settings.cryptoList.join(',');
    document.getElementById('goldApiKey').value = settings.goldApiKey;
    document.getElementById('weatherApiKey').value = settings.weatherApiKey;
    document.getElementById('cities').value = settings.cities.join(',');
    
    // پر کردن بخش پس‌زمینه
    document.getElementById('backgroundType').value = settings.background?.type || 'default';
    
    // فعال کردن بخش مربوطه
    document.getElementById('backgroundType').dispatchEvent(new Event('change'));
    
    // پر کردن داده‌های پس‌زمینه اگر وجود دارد
    if (settings.background) {
      switch (settings.background.type) {
        case 'upload':
          if (settings.background.data) {
            const previewImg = document.querySelector('#uploadPreview .preview-image');
            previewImg.src = settings.background.data;
            document.getElementById('uploadPreview').classList.remove('hidden');
          }
          break;
        case 'url':
          document.getElementById('backgroundUrl').value = settings.background.data || '';
          if (settings.background.data) {
            const previewImg = document.querySelector('#urlPreview .preview-image');
            previewImg.src = settings.background.data;
            document.getElementById('urlPreview').classList.remove('hidden');
          }
          break;
        case 'color':
          document.getElementById('backgroundColor').value = settings.background.data || '#0e1623';
          document.querySelector('#colorPreview .color-preview-box').style.background = settings.background.data || '#0e1623';
          break;
      }
    }
    
    modal.classList.remove('hidden');
  });

  document.getElementById('closeSettings').addEventListener('click', () => modal.classList.add('hidden'));

  document.getElementById('saveSettings').addEventListener('click', async () => {
    const backgroundData = await getBackgroundDataFromUI();
    
    const newSettings = {
      baseCurrency: document.getElementById('baseCurrency').value,
      cryptoList: document.getElementById('cryptoList').value.split(',').map(x => x.trim()).filter(Boolean),
      goldApiKey: document.getElementById('goldApiKey').value.trim(),
      weatherApiKey: document.getElementById('weatherApiKey').value.trim(),
      cities: document.getElementById('cities').value.split(',').map(x => x.trim()).filter(Boolean),
      background: backgroundData
    };
    
    await saveSettings(newSettings);
    
    // اعمال فوری پس‌زمینه جدید
    applyBackground(newSettings);
    
    modal.classList.add('hidden');
    chrome.storage.local.remove(['cachedData'], loadAndRender);
  });
}

/* ======================== */
/*      Refresh Button       */
/* ======================== */
function setupRefresh() {
  document.getElementById('refreshBtn').addEventListener('click', loadAndRender);
}

/* ======================== */
/*      Manual Update       */
/* ======================== */
function setupUpdateUI() {
  const updateBtn = document.getElementById('updateBtn');
  
  // همیشه دکمه رو نشون بده
  updateBtn.classList.remove('hidden');
  
  updateBtn.addEventListener('click', async () => {
    await checkAndShowUpdate();
  });
}

// تابع چک کردن آپدیت
async function checkForUpdates(silent = false) {
  try {
    showUpdateModal('🔍 در حال بررسی آپدیت...', 'info');
    
    const response = await new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action: 'checkForUpdates' }, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        resolve(response);
      });
    });
    
    if (response.error) {
      showUpdateError(response.error);
      return;
    }
    
    const { updateInfo } = response;
    
    if (updateInfo.isUpdateAvailable) {
      showUpdateAvailable(updateInfo);
    } else {
      showUpdateModal('✅ شما از آخرین نسخه استفاده می‌کنید.', 'success');
    }
    
  } catch (error) {
    console.error('Update check error:', error);
    showUpdateError('خطا در بررسی آپدیت: ' + error.message);
  }
}

// نمایش موجود بودن آپدیت
function showUpdateAvailable(updateInfo) {
  const updateBtn = document.getElementById('updateBtn');
  updateBtn.classList.add('update-available');
  updateBtn.title = `آپدیت جدید ${updateInfo.latestVersion} موجود است`;
  
  showUpdateNotification(updateInfo);
}

// نوتیفیکیشن آپدیت
function showUpdateNotification(updateInfo) {
  const notification = document.createElement('div');
  notification.className = 'update-notification';
  notification.innerHTML = `
    <div class="update-notification-content">
      <h4>🔄 آپدیت جدید موجود است!</h4>
      <p>نسخه ${updateInfo.latestVersion} منتشر شده است.</p>
      <p class="update-notes">${updateInfo.releaseNotes || 'بهبود عملکرد و رفع باگ'}</p>
      <div class="update-actions">
        <button id="installUpdate" class="btn-primary">نصب آپدیت</button>
        <button id="dismissUpdate" class="btn-secondary">بعداً</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  document.getElementById('installUpdate').addEventListener('click', () => {
    installUpdate(updateInfo.downloadUrl);
    notification.remove();
  });
  
  document.getElementById('dismissUpdate').addEventListener('click', () => {
    notification.remove();
  });
  
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.remove();
    }
  }, 30000);
}

// نصب آپدیت
async function installUpdate(downloadUrl) {
  try {
    showUpdateModal('📥 در حال دانلود آپدیت...', 'info');
    
    const response = await new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ 
        action: 'applyUpdate', 
        downloadUrl 
      }, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        resolve(response);
      });
    });
    
    if (response.error) {
      showUpdateError(response.error);
    } else {
      showUpdateModal(
        '✅ آپدیت با موفقیت دانلود شد. لطفاً افزونه را ری‌لود کنید.',
        'success'
      );
    }
  } catch (error) {
    console.error('Install update error:', error);
    showUpdateError('خطا در نصب آپدیت: ' + error.message);
  }
}

// مدال آپدیت
function showUpdateModal(message, type = 'info') {
  const modal = document.createElement('div');
  modal.className = `update-modal update-${type}`;
  modal.innerHTML = `
    <div class="update-modal-content">
      <p>${message}</p>
      <button class="close-update-modal">باشه</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  modal.querySelector('.close-update-modal').addEventListener('click', () => {
    modal.remove();
  });
  
  setTimeout(() => {
    if (document.body.contains(modal)) {
      modal.remove();
    }
  }, 5000);
}

function showUpdateError(message) {
  showUpdateModal(`❌ ${message}`, 'error');
}

// چک و نمایش آپدیت
async function checkAndShowUpdate() {
  await checkForUpdates(false);
}

/* ======================== */
/*      Initialization       */
/* ======================== */
document.addEventListener('DOMContentLoaded', () => {
  setupGoogleSearch();
  setupSettingsUI();
  setupBackgroundUI();
  setupRefresh();
  setupUpdateUI();
  loadAndRender();
});