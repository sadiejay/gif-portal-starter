/*
 * We are going to be using the useEffect hook!
 */
import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

const TEST_GIFS = [
	'https://media.giphy.com/media/LmgHHxtKgDsYrVsEOw/giphy.gif',
//  1 ^
	'https://media.giphy.com/media/9vzM2O7lztv8I/giphy.gif',
  // 2 ^
	'https://media.giphy.com/media/Xf1lDlqOn3IPBIkEt6/giphy.gif',
  // 3 ^
	'https://media.giphy.com/media/3o6gEdCJ0CgzXCW5Jm/giphy.gif',
  // 4 ^
	'https://media.giphy.com/media/3o6gEdCJ0CgzXCW5Jm/giphy.gif',
  // 4 ^
	'https://media.giphy.com/media/UeHnshOcQMt6WufxXH/giphy.gif',
  // 5 ^
	'https://media.giphy.com/media/3ohhwmSDJmpHNCZi8M/giphy.gif',
  // 6 ^
	'https://media.giphy.com/media/rxqopnaoWnK13QysTs/giphy.gif',
  // 7 ^
	'https://media.giphy.com/media/bBCVc2YBqdE195F4mQ/giphy.gif',
  // 8 ^
	'https://media.giphy.com/media/l0CLSUN68nmpp0Sju/giphy.gif',
  // 9 ^
]

// Change this up to be your Twitter if you want.
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  /*
   * This function holds the logic for deciding if a Phantom Wallet is
   * connected or not
   */
  // State
const [walletAddress, setWalletAddress] = useState(null);
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          /*
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet!
         */
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );
        /*
           * Set the user's publicKey in state to be used later!
           */
        setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! This portal needs a Phantom wallet to run 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };
 /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
 const connectWallet = async () => {
  const { solana } = window;

  if (solana) {
    const response = await solana.connect();
    console.log('Connected with Public Key:', response.publicKey.toString());
    setWalletAddress(response.publicKey.toString());
  }
 };

 /*
  * We want to render this UI when the user hasn't connected
  * their wallet to our app yet.
  */
 const renderNotConnectedContainer = () => (
   <button
     className="cta-button connect-wallet-button"
     onClick={connectWallet}
   >
     Connect to Wallet
   </button>
 );

 // UseEffects
  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      {/* This was solely added for some styling fanciness */}
			<div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">Art Imitates Life: Black Cat Edition 🐈‍⬛</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {/* Add the condition to show this only if we don't have a wallet address */}
{!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;