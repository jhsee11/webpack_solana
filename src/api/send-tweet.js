import { Tweet } from '../models';
import { web3 } from '@project-serum/anchor';

export const sendTweet = async (program, wallet, topic, content) => {
  console.log(`Going send le ${program} ${wallet} ${topic} ${content}`);
  const tweet = web3.Keypair.generate();
  console.log(
    `Content is ${wallet.publicKey} ${tweet.publicKey} ${web3.SystemProgram.programId}`
  );
  console.log(`init punya tweet ${tweet}`);

  try {
    await program.rpc.sendTweet(topic, content, {
      accounts: {
        author: program.provider.wallet.publicKey,
        tweet: tweet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [tweet],
    });
  } catch (e) {
    console.log(`ini punya error ${e}`);
  }
  console.log('RUn Till here le');

  const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
  /*
  const tweetAccount = await program.account.tweet.fetch([
    {
      memcmp: {
        offset: 8, // Discriminator.
        bytes: tweet.publicKey.toBase58(),
      },
    },
  ]);
  */
  return new Tweet(tweet.publicKey, tweetAccount);
};
