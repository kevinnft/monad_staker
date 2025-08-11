# Monad Testnet Staking Script

Script Node.js untuk **staking MON** kecil-kecil secara acak berulang di **Monad Testnet**.
Bukan bot AI; ini hanya automation untuk memanggil `deposit(amount, recipient)` ke kontrak staking.

## Fitur
- Jaringan: Monad Testnet (`chainId=10143`)
- RPC: `https://rpc.ankr.com/monad_testnet`
- Kontrak: `0xb2f82D0f38dc453D596Ad40A37799446Cc89274A`
- Amount acak: `0.0001–0.0002 MON`
- Delay acak: `3–7 detik`
- Stop otomatis jika saldo ≤ `1 MON`

## Persiapan
1. Node.js 18+
2. `npm i`
3. Buat file `.env` 
   ```env
   PRIVATE_KEYS1=0x... # hingga PRIVATE_KEYS8
