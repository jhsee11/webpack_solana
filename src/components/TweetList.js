import React from 'react';
import TweetCard from './TweetCard';

const TweetList = (props) => {
  const isLoading = props.loading;

  if (isLoading) {
    return <div className="p-8 text-gray-500 text-center">Loading...</div>;
  }

  let tweetList = props.tweets
    .slice()
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((item, index) => {
      return <TweetCard key={index} tweet={item}></TweetCard>;
    });

  return <div className="divide-y">{tweetList}</div>;
};

export default TweetList;