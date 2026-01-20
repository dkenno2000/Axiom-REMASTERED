const el = {
  toggleMarketcap: document.getElementById('toggle-marketcap'),
  toggleTwitterPreview: document.getElementById('toggle-twitterpreview'),
  toggleBigTwitterLinks: document.getElementById('toggle-bigTwitterLinks'),
  togglePulseMenu: document.getElementById('toggle-pulsemenu'),
  radioAll: document.getElementById('radio-charts-all'),
  radioMigrated: document.getElementById('radio-charts-migrated'),
};

function setToggleUI(toggleEl, on) {
  if (!toggleEl) return;
  if (on) {
    toggleEl.classList.add('on');
    toggleEl.setAttribute('aria-checked', 'true');
  } else {
    toggleEl.classList.remove('on');
    toggleEl.setAttribute('aria-checked', 'false');
  }
}

function setRadioUI(allSelected) {
  if (!el.radioAll || !el.radioMigrated) return;
  if (allSelected) {
    el.radioAll.classList.add('active');
    el.radioMigrated.classList.remove('active');
  } else {
    el.radioAll.classList.remove('active');
    el.radioMigrated.classList.add('active');
  }
}

function loadSettings() {
  chrome.storage.local.get(['marketCapColors', 'chartsForAll', 'twitterPreview', 'bigTwitterLinks', 'pulseCloneMenu'], (res) => {
    const market = (typeof res.marketCapColors === 'boolean') ? res.marketCapColors : true;
    const chartsAll = (typeof res.chartsForAll === 'boolean') ? res.chartsForAll : true;
    const twitter = (typeof res.twitterPreview === 'boolean') ? res.twitterPreview : true;
    const bigTwitter = (typeof res.bigTwitterLinks === 'boolean') ? res.bigTwitterLinks : true;
    const pulse = (typeof res.pulseCloneMenu === 'boolean') ? res.pulseCloneMenu : true;

    setToggleUI(el.toggleMarketcap, market);
    setToggleUI(el.toggleTwitterPreview, twitter);
    setToggleUI(el.toggleBigTwitterLinks, bigTwitter);
    setToggleUI(el.togglePulseMenu, pulse);
    setRadioUI(!!chartsAll);
  });
}

function saveSetting(key, value, { reloadAxiom = false } = {}) {
  const payload = {};
  payload[key] = value;

  chrome.storage.local.set(payload, () => {
    if (reloadAxiom && (
      key === 'marketCapColors' ||
      key === 'chartsForAll' ||
      key === 'twitterPreview' ||
      key === 'bigTwitterLinks' ||
      key === 'pulseCloneMenu'
      )) {
      reloadAxiomTabs();
    }
  });
}

function reloadAxiomTabs() {
  try {
    chrome.tabs.query({}, (tabs) => {
      if (!tabs || !tabs.length) return;
      for (const t of tabs) {
        try {
          const url = t.url || '';
          let hostname = '';
          try { hostname = (new URL(url)).hostname || ''; } catch (e) { hostname = ''; }
          if (hostname === 'axiom.trade' || hostname.endsWith('.axiom.trade')) {
            try { chrome.tabs.reload(t.id); } catch (e) {}
          }
        } catch (e) {}
      }
    });
  } catch (e) { console.debug('error', e); }
}

if (el.toggleMarketcap) {
  el.toggleMarketcap.addEventListener('click', () => {
    const isOn = el.toggleMarketcap.classList.contains('on');
    const newVal = !isOn;
    setToggleUI(el.toggleMarketcap, newVal);
    saveSetting('marketCapColors', !!newVal, { reloadAxiom: true });
  });

  el.toggleMarketcap.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.toggleMarketcap.click(); }
  });
}

if (el.toggleTwitterPreview) {
  el.toggleTwitterPreview.addEventListener('click', () => {
    const isOn = el.toggleTwitterPreview.classList.contains('on');
    const newVal = !isOn;
    setToggleUI(el.toggleTwitterPreview, newVal);
    saveSetting('twitterPreview', !!newVal, { reloadAxiom: true });
  });

  el.toggleTwitterPreview.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.toggleTwitterPreview.click(); }
  });
}

if (el.toggleBigTwitterLinks) {
  el.toggleBigTwitterLinks.addEventListener('click', () => {
    const isOn = el.toggleBigTwitterLinks.classList.contains('on');
    const newVal = !isOn;
    setToggleUI(el.toggleBigTwitterLinks, newVal);
    saveSetting('bigTwitterLinks', !!newVal, { reloadAxiom: true });
  });

  el.toggleBigTwitterLinks.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.toggleBigTwitterLinks.click(); }
  });
}

if (el.togglePulseMenu) {
  el.togglePulseMenu.addEventListener('click', () => {
    const isOn = el.togglePulseMenu.classList.contains('on');
    const newVal = !isOn;
    setToggleUI(el.togglePulseMenu, newVal);
    saveSetting('pulseCloneMenu', !!newVal, { reloadAxiom: true });
  });

  el.togglePulseMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.togglePulseMenu.click(); }
  });
}

if (el.radioAll) {
  el.radioAll.addEventListener('click', () => {
    setRadioUI(true);
    saveSetting('chartsForAll', true, { reloadAxiom: true });
  });
}

if (el.radioMigrated) {
  el.radioMigrated.addEventListener('click', () => {
    setRadioUI(false);
    saveSetting('chartsForAll', false, { reloadAxiom: true });
  });
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;

  let shouldReloadAxiom = false;

  if (changes.marketCapColors) {
    setToggleUI(el.toggleMarketcap, !!changes.marketCapColors.newValue);
    shouldReloadAxiom = true;
  }
  if (changes.chartsForAll) {
    setRadioUI(!!changes.chartsForAll.newValue);
    shouldReloadAxiom = true;
  }
  if (changes.twitterPreview) {
    setToggleUI(el.toggleTwitterPreview, !!changes.twitterPreview.newValue);
    shouldReloadAxiom = true;
  }
  if (changes.bigTwitterLinks) {
    setToggleUI(el.toggleBigTwitterLinks, !!changes.bigTwitterLinks.newValue);
    shouldReloadAxiom = true;
  }
  if (changes.pulseCloneMenu) {
    setToggleUI(el.togglePulseMenu, !!changes.pulseCloneMenu.newValue);
    shouldReloadAxiom = true;
  }

  if (shouldReloadAxiom) {
    reloadAxiomTabs();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
});
