import { useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from '..//solana_twitter.json';

// Importing combination
import React, { Component } from 'react';

export const getProgram = () => {
  const wallet = useAnchorWallet();
  const { connected } = useWallet();

  const network = 'http://127.0.0.1:8899';
  const opts = {
    preflightCommitment: 'processed',
  };
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(connection, wallet, opts.preflightCommitment);
  const programID = new PublicKey(idl.metadata.address);
  const program = new Program(idl, programID, provider);

  const workSpace = { program, wallet, connected };

  return workSpace;
};
