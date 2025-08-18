# 🪙 Monad Testnet Staking Bot

Script ini adalah bot otomatis berbasis **Node.js + Ethers.js** untuk melakukan **staking MON token di Monad Testnet**.  
Bot akan menjalankan beberapa wallet secara paralel, mengirim transaksi deposit dengan jumlah acak, serta jeda acak di antara transaksi.

---

## ✨ Fitur
- 🔑 Mendukung **multi-wallet** (hingga 8 wallet, via `.env`)
- 🎲 **Jumlah staking acak** antara `0.0001 – 0.0002 MON`
- ⏳ **Delay acak** antar transaksi (3–7 detik)
- 📉 **Cek saldo minimal** → berhenti jika saldo ≤ 1 MON
- 🔄 **Perbaikan nonce otomatis** jika transaksi gagal
- ⚡ Eksekusi transaksi paralel untuk semua wallet
- 🌐 Terhubung langsung ke protokol [aPriori](https://stake.apr.io/) → hasil staking otomatis dikonversi menjadi **aprMON**

---

## 📦 Persiapan
### 1. Clone repo & install dependencies
```bash
git clone https://github.com/username/monad-staking-bot.git
cd monad-staking-bot
npm install ethers dotenv
```

### 2. Buat file `.env`
Isi dengan private key wallet (maks 8 wallet):

```ini
PRIVATE_KEYS1=0xabc123...
PRIVATE_KEYS2=0xdef456...
PRIVATE_KEYS3=
PRIVATE_KEYS4=
PRIVATE_KEYS5=
PRIVATE_KEYS6=
PRIVATE_KEYS7=
PRIVATE_KEYS8=
```

> Kosongkan jika tidak digunakan. Pastikan private key diawali `0x`.

---

## ⚙️ Konfigurasi
Script sudah menggunakan default RPC & kontrak Monad Testnet:

```js
const RPC_URL = "https://rpc.ankr.com/monad_testnet";
const CHAIN_ID = 10143;
const STAKING_CONTRACT = "0xb2f82D0f38dc453D596Ad40A37799446Cc89274A";
```

Jika ingin ganti RPC atau kontrak, ubah variabel di atas.

---

## 🚀 Cara Menjalankan
```bash
node bot.js
```

Contoh output:
```
🔁 Wallet #1 (0x123...) mulai staking...
[W1] [+] Staking 0.00012 MON (nonce: 45)
[W1] [✓] TX sent: 0xabc...
[W1] [⏳] Delay 5.23 detik...
```

---

## ⚠️ Catatan Penting
- Script ini hanya untuk **Monad Testnet**, bukan mainnet.
- Semua staking yang dilakukan diarahkan ke [stake.apr.io](https://stake.apr.io/) → otomatis mendapatkan **aprMON** (liquid staking token).
- Jangan gunakan private key wallet utama / real fund.
- Pastikan punya MON faucet balance sebelum menjalankan.
- Gunakan dengan bijak, jangan spam RPC.

---

## 💖 Support
Jika script ini membantu, bisa support lewat:
```
0x7C8c8eF20a48901372775618330B294ab937C934
```
