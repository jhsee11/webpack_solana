import React, { useState, useEffect } from 'react';
import TweetCard from './TweetCard';

const TweetList = (props) => {
  const isLoading = props.loading;
  //const [rerender, setRerender] = useState(false);

  if (isLoading) {
    return <div className="p-8 text-gray-500 text-center">Loading...</div>;
  }
  /*
  useEffect(() => {
    setRerender(!rerender);
  }, []);
  */

  let tweetList = props.tweets
    .slice()
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((item, index) => {
      return (
        <TweetCard
          key={index}
          tweet={item}
          initialize={props.initialize}
        ></TweetCard>
      );
    });

  return <div className="divide-y">{tweetList}</div>;
};

export default TweetList;
