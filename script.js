// DOM Elements
const connectWalletButton = document.getElementById('connect-wallet');
const countdownElement = document.getElementById('countdown');
const totalVaultsElement = document.getElementById('total-vaults');
const rafflePercentElement = document.getElementById('raffle-percent');
const vaultDoorElement = document.getElementById('vault-door');
const treasureChestElement = document.getElementById('treasure-chest');
const winnerAnimationElement = document.getElementById('winner-animation');

// State Variables
let countdownInterval;
let vaultsOpened = 0;
let rafflePercent = 5; // Starting raffle percentage
const vaultDuration = 10 * 60; // 10 minutes in seconds

// Wallet Connection
connectWalletButton.addEventListener('click', async () => {
  try {
    // Simulate wallet connection (replace with actual Solana wallet integration)
    alert('Wallet connected successfully!');
    connectWalletButton.textContent = 'Connected';
    connectWalletButton.disabled = true;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    alert('Failed to connect wallet.');
  }
});

// Countdown Timer
function startCountdown() {
  let timeLeft = vaultDuration;
  countdownInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      openVault();
    }
    timeLeft--;
  }, 1000);
}

// Vault Opening Logic
function openVault() {
  // Increment vaults opened
  vaultsOpened++;
  totalVaultsElement.textContent = vaultsOpened;

  // Increase raffle percentage
  rafflePercent += 5; // Increase by 5% each vault
  rafflePercentElement.textContent = `${rafflePercent}%`;

  // Trigger vault door animation
  vaultDoorElement.style.animation = 'vault-open 1s forwards';

  // Simulate airdrop to a lucky holder
  setTimeout(() => {
    announceWinner();
  }, 2000); // Wait 2 seconds before announcing winner

  // Reset countdown
  setTimeout(() => {
    vaultDoorElement.style.animation = '';
    startCountdown();
  }, 10000); // Wait 10 seconds before resetting
}

// Winner Announcement
function announceWinner() {
  // Display winner animation
  winnerAnimationElement.style.display = 'block';

  // Simulate winner selection
  setTimeout(() => {
    winnerAnimationElement.innerHTML = `
      <img src="confetti.png" alt="Confetti" class="confetti">
      <div class="winner-text">Congratulations, Wallet XYZ!</div>
    `;
  }, 500);

  // Hide winner animation after 5 seconds
  setTimeout(() => {
    winnerAnimationElement.style.display = 'none';
  }, 5000);
}

// Treasure Chest Interaction
treasureChestElement.addEventListener('click', () => {
  alert('You clicked the treasure chest! Lucky you!');
});

// Initialize
startCountdown();

<script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"></script>

  // Replace with your $VAULT token contract address
  const VAULT_TOKEN_ADDRESS = "0xYourVaultTokenContractAddress";

  // Replace with the ABI of your $VAULT token contract
  const VAULT_TOKEN_ABI = [
    // Minimal ABI to check balance
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
  ];

  async function checkWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    const vaultTokenContract = new ethers.Contract(
      VAULT_TOKEN_ADDRESS,
      VAULT_TOKEN_ABI,
      signer
    );

    try {
      const balance = await vaultTokenContract.balanceOf(userAddress);
      const resultElement = document.getElementById("wallet-result");

      if (balance.gt(0)) {
        resultElement.textContent = "✅ You hold $VAULT tokens!";
      } else {
        resultElement.textContent = "❌ You do not hold $VAULT tokens.";
      }
    } catch (error) {
      console.error("Error checking wallet:", error);
      document.getElementById("wallet-result").textContent =
        "⚠️ An error occurred. Please try again.";
    }
  }

  document
    .getElementById("check-wallet")
    .addEventListener("click", async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          checkWallet();
        } catch (error) {
          console.error("User denied wallet access:", error);
        }
      } else {
        alert("Please install a Web3 wallet like MetaMask.");
      }
    });
