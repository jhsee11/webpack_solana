import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';

const Navbar = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: Keypair.generate().publicKey,
        lamports: 1,
      })
    );

    console.log(publicKey);
    console.log(Keypair.generate().publicKey);
    console.log(connection);

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, 'processed');
  }, [publicKey, sendTransaction, connection]);

  return (
    <aside className="flex flex-col items-center md:items-stretch space-y-2 md:space-y-4 py-4 md:py-8 md:pl-4 md:pr-8 fixed w-20 md:w-64">
      <Link
        className="inline-block rounded-full hover:bg-gray-100 p-3 md:self-start"
        to="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 md:h-10 w-8 md:w-10 text-pink-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      </Link>
      <div className="flex flex-col items-center md:items-stretch space-y-2">
        <Link
          to="/home"
          className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <div className="text-xl hidden md:block">Home</div>
        </Link>
        <Link
          to="/topic"
          className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
          <div className="text-xl hidden md:block">Topics</div>
        </Link>
        <Link
          to="/user"
          className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <div className="text-xl hidden md:block">Users</div>
        </Link>
        <Link
          to="/profile"
          className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <div className="text-xl hidden md:block">Profile</div>
        </Link>
      </div>
      <div className="fixed bottom-8 right-8 md:static w-48 md:w-full">
        <WalletMultiButton />
      </div>
      <div className="fixed bottom-8 right-8 md:static w-48 md:w-full">
        <WalletDisconnectButton />
      </div>
      <button
        className="fixed bottom-8 right-8 md:static w-48 md:w-full"
        onClick={onClick}
        disabled={!publicKey}
      >
        Send 1 lamport to a random address!
      </button>
    </aside>
  );
};

export default Navbar;
