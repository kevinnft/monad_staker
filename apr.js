require("dotenv").config();
const { ethers } = require("ethers");

const RPC_URL = "https://rpc.ankr.com/monad_testnet";
const CHAIN_ID = 10143;
const STAKING_CONTRACT = "0xb2f82D0f38dc453D596Ad40A37799446Cc89274A";
const provider = new ethers.providers.JsonRpcProvider(RPC_URL, { chainId: CHAIN_ID });

const aprMONAbi = [
  "function deposit(uint256 amount, address recipient) external payable"
];

function getRandomAmount() {
  const min = ethers.utils.parseUnits("0.0001", 18);
  const max = ethers.utils.parseUnits("0.0002", 18);
  return min.add(
    ethers.BigNumber.from(ethers.utils.randomBytes(8)).mod(max.sub(min))
  );
}

function getRandomDelay() {
  return Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000; // 3–7 detik
}

async function stakeRandomAmount(signer, aprMON, index, nonceRef) {
  try {
    const balance = await provider.getBalance(signer.address);
    const minBalance = ethers.utils.parseUnits("1", 18);

    if (balance.lte(minBalance)) {
      console.log(`[W${index + 1}] 🛑 Saldo MON ≤ 1, berhenti staking. Sisa: ${ethers.utils.formatUnits(balance, 18)} MON`);
      return false; // stop loop
    }

    const amount = getRandomAmount();
    const formatted = ethers.utils.formatUnits(amount, 18);

    console.log(`[W${index + 1}] [+] Staking ${formatted} MON (nonce: ${nonceRef.current})`);

    const tx = await aprMON.deposit(amount, signer.address, {
      value: amount,
      gasLimit: 150_000,
      nonce: nonceRef.current
    });

    console.log(`[W${index + 1}] [✓] TX sent: ${tx.hash}`);
    nonceRef.current++;

  } catch (err) {
    console.error(`[W${index + 1}] [X] TX failed: ${err.message}`);
    try {
      nonceRef.current = await provider.getTransactionCount(signer.address, "latest");
    } catch (e) {
      console.error(`[W${index + 1}] [!] Gagal sync nonce: ${e.message}`);
    }
  }

  return true;
}

async function runWalletBot(privateKey, index) {
  const signer = new ethers.Wallet(privateKey, provider);
  const aprMON = new ethers.Contract(STAKING_CONTRACT, aprMONAbi, signer);
  const address = await signer.getAddress();
  const nonceRef = { current: await provider.getTransactionCount(address, "latest") };

  console.log(`🔁 Wallet #${index + 1} (${address}) mulai staking...`);

  while (true) {
    const continueStaking = await stakeRandomAmount(signer, aprMON, index, nonceRef);
    if (!continueStaking) break;

    const delay = getRandomDelay();
    console.log(`[W${index + 1}] [⏳] Delay ${(delay / 1000).toFixed(2)} detik...\n`);
    await new Promise(res => setTimeout(res, delay));
  }

  console.log(`[W${index + 1}] ✅ Selesai. Wallet tidak lagi staking.`);
}

async function main() {
  const keys = [];

  for (let i = 1; i <= 8; i++) {
    const key = process.env[`PRIVATE_KEYS${i}`];
    if (key && key.startsWith("0x")) {
      keys.push(key.trim());
    } else {
      console.warn(`[!] PRIVATE_KEYS${i} tidak valid atau kosong`);
    }
  }

  if (keys.length === 0) {
    console.error("❌ Tidak ada private key ditemukan di .env");
    process.exit(1);
  }

  for (let i = 0; i < keys.length; i++) {
    runWalletBot(keys[i], i); // jalan paralel
  }
}

main();
