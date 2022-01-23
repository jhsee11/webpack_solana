import React, { useState, useEffect } from 'react';
import TweetForm from '../components/TweetForm';
import TweetList from '../components/TweetList';
import { web3 } from '@project-serum/anchor';
import { fetchTweets } from '../api';
import { getProgram } from '../composables';

const Home = () => {
  const { program, wallet, connected } = getProgram();
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    let ignore = false;

    if (!ignore) initialize();
    return () => {
      ignore = true;
    };
  }, []);

  async function initialize() {
    try {
      /* interact with the program via rpc */
      const tweet = web3.Keypair.generate();
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
      <TweetForm initialize={initialize} />
      <TweetList tweets={tweets} loading={loading} initialize={initialize} />
    </div>
  );
};

export default Home;
