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
const [inputValue, setInputValue] = useState('');
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

// check input for gif link
const sendGif = async () => {
  if (inputValue.length > 0) {
    console.log('Gif link:', inputValue);
  } else {
    console.log('Empty input. Try again.');
  }
};

 const onInputChange = (event) => {
  const { value } = event.target;
  setInputValue(value);
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
// Renders after wallet is connected
 const renderConnectedContainer = () => (
  <div className="connected-container">
    {/* Go ahead and add this input and button to start */}
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendGif();
      }}
    >
       <input type="text" placeholder="Enter gif link" value={inputValue}
         onChange={onInputChange} />
      <button type="submit" className="cta-button submit-gif-button">Submit</button>
    </form>
    <div className="gif-grid">
      {TEST_GIFS.map((gif) => (
        <div className="gif-item" key={gif}>
          <img src={gif} alt={gif} />
        </div>
      ))}
    </div>
  </div>
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
          {/* We just need to add the inverse here! */}
          {walletAddress && renderConnectedContainer()}
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