import React, { useState, useEffect } from 'react';
import TweetForm from '../components/TweetForm';
import TweetList from '../components/TweetList';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from '..//solana_twitter.json';
import { Program, Provider, web3 } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import * as bs58 from 'bs58';
import { fetchTweets } from '../api';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  const wallet = useAnchorWallet();
  const programID = new PublicKey(idl.metadata.address);
  const opts = {
    preflightCommitment: 'processed',
  };

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = 'http://127.0.0.1:8899';
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(connection, wallet, opts.preflightCommitment);
    return provider;
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore) initialize();
    return () => {
      ignore = true;
    };
  }, []);

  async function initialize() {
    const provider = await getProvider();
    /* create the program interface combining the idl, program ID, and provider */
    const program = new Program(idl, programID, provider);
    try {
      /* interact with the program via rpc */
      const tweet = anchor.web3.Keypair.generate();

      fetchTweets(program)
        .then((fetchedTweets) => setTweets(fetchedTweets))
        .finally(() => setLoading(false));

      for (let i = 0; i < tweets.length; i++) {
        console.log(tweets[i]);
        console.log(tweets[i].content);
      }
      /*
      await program.rpc.sendTweet('Shishikan', 'Testing 123', {
        accounts: {
          tweet: tweet.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [tweet],
      });

      const tweetAccounts = await program.account.tweet.all([
        {
          memcmp: {
            offset:
              8 + // Discriminator.
              32 + // Author public key.
              8 + // Timestamp.
              4, // Topic string prefix.
            bytes: bs58.encode(Buffer.from('Shishikan')),
          },
        },
      ]);

      for (let i = 0; i < tweetAccounts.length; i++) {
        console.log(`${tweetAccounts}`);
      } */
    } catch (err) {
      console.log('Transaction error: ', err);
    }
  }

  return (
    <div>
      <TweetForm />
      <TweetList tweets={tweets} loading={loading} />
    </div>
  );
};

export default Home;
