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

// Solana Wallet Connection
connectWalletButton.addEventListener('click', async () => {
  try {
    // Check if Phantom Wallet is installed
    if (!window.solana || !window.solana.isPhantom) {
      alert('Please install Phantom Wallet!');
      return;
    }

    // Connect to the wallet
    const provider = window.solana;
    await provider.connect(); // Request user permission to connect
    const publicKey = provider.publicKey.toString();

    // Update UI
    connectWalletButton.textContent = `Connected: ${publicKey.slice(0, 6)}...`;
    connectWalletButton.disabled = true;

    // Check if the wallet holds $VAULT tokens
    checkWallet(publicKey);
  } catch (error) {
    console.error('Error connecting wallet:', error);
    alert('Failed to connect wallet.');
  }
});

// Check if the wallet holds $VAULT tokens
async function checkWallet(publicKey) {
  try {
    // Replace with your $VAULT token mint address
    const VAULT_TOKEN_MINT = new solanaWeb3.PublicKey("YourVaultTokenMintAddress");

    // Create a connection to the Solana cluster
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta')); // Use 'devnet' for testing

    // Get the token accounts for the user's wallet
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      mint: VAULT_TOKEN_MINT,
    });

    const resultElement = document.getElementById('wallet-result');

    if (tokenAccounts.value.length > 0) {
      resultElement.textContent = "✅ You hold $VAULT tokens!";
    } else {
      resultElement.textContent = "❌ You do not hold $VAULT tokens.";
    }
  } catch (error) {
    console.error('Error checking wallet:', error);
    document.getElementById('wallet-result').textContent =
      "No token found, try again you jeeter";
  }
}

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
