import React, { useState } from 'react';
import TweetFormUpdate from './TweetFormUpdate';
import { Link } from 'react-router-dom';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

const TweetCard = (props) => {
  const wallet = useAnchorWallet();

  const [isMyTweet, setIsMyTweet] = useState();
  // wallet.value &&
  //wallet.publicKey.toBase58() === props.tweet.author.toBase58()

  const [editing, setEditing] = useState(false);

  const gotTopic = props.tweet.topic;

  const EditButton = (props) => {
    //console.log(wallet.value);
    //console.log(wallet.publicKey);
    if (!props.isMyTweet) {
      return null;
    }
    return (
      <div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 m-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 m-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div>
      <div>{editing && <TweetFormUpdate />}</div>

      <div className="px-8 py-4">
        <div className="flex justify-between">
          <div className="py-1">
            <h3 className="inline font-semibold">
              <Link to="/" className="hover:underline">
                <h1>{props.tweet.author_display} </h1>
              </Link>
            </h3>
            <span className="text-gray-500"> • </span>
            <time className="text-gray-500 text-sm">
              <Link to="/" className="hover:underline">
                <h1> {props.tweet.timestamp}</h1>
              </Link>
            </time>
          </div>
          <div className="flex">
            <EditButton isMyTweet={isMyTweet} />
          </div>
        </div>
        <p className="whitespace-pre-wrap break-all">{props.tweet.content}</p>
        <Link
          to="/"
          className="inline-block mt-2 text-pink-500 hover:underline"
        >
          {gotTopic && <h1>{props.tweet.topic}</h1>}
        </Link>
      </div>
    </div>
  );
};

export default TweetCard;
