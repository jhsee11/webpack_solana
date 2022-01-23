import { Tweet } from '../models';
import { web3 } from '@project-serum/anchor';

export const updateTweet = async (program, wallet, tweet, topic, content) => {
  await program.rpc.updateTweet(topic, content, {
    accounts: {
      author: wallet.publicKey,
      tweet: tweet.publicKey,
    },
  });

  tweet.topic = topic;
  tweet.content = content;
};
