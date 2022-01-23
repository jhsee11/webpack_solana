import React, { useState, useEffect, useMemo } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Navbar from './components/Navbar';
import Topic from './pages/topic';
import User from './pages/user';
import { Program } from '@project-serum/anchor';
//solate wallet integration
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  return (
    <div className="w-full max-w-3xl lg:max-w-4xl mx-auto">
      <Router>
        <Navbar className="py-4 md:py-8 md:pl-4 md:pr-8 fixed w-20 md:w-64" />
        <main className="flex-1 border-r border-l ml-20 md:ml-64 min-h-screen">
          <Routes className="flex space-x-6 items-center justify-between px-8 py-4 border-b">
            <Route path="/home" exact element={<Home />} />
            <Route path="/topic" exact element={<Topic />} />
            <Route path="/user" exact element={<User />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

const Wallet = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  //const network = 'http://127.0.0.1:8899';
  // You can also provide a custom RPC endpoint.
  //const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = useMemo(() => 'http://127.0.0.1:8899', [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Wallet;
