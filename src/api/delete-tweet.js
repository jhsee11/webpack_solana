export const deleteTweet = async (program, wallet, tweet) => {
  await program.rpc.deleteTweet({
    accounts: {
      author: wallet.publicKey,
      tweet: tweet.publicKey,
    },
  });
};
