import React, { useRef, useState, useEffect } from 'react';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { Program, Provider } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { Link } from 'react-router-dom';
import idl from '..//solana_twitter.json';
import dayjs from 'dayjs';
import { updateTweet } from '../api';

const TweetFormUpdate = (props) => {
  const wallet = useAnchorWallet();
  const { connected } = useWallet();
  const [content, setContent] = useState('');
  const [contentLength, setContentLength] = useState(0);
  const [topic, setTopic] = useState('');
  const textareaRef = useRef();
  const canTweet = () => content && characterLimit > 0;
  const useCountCharacterLimit = (contentLength, limit) => {
    return limit - contentLength;
  };

  const characterLimit = useCountCharacterLimit(contentLength, 280);
  const update_tweet = props.tweet;

  function getProgram() {
    const network = 'http://127.0.0.1:8899';
    const opts = {
      preflightCommitment: 'processed',
    };
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(connection, wallet, opts.preflightCommitment);
    const programID = new PublicKey(idl.metadata.address);
    const program = new Program(idl, programID, provider);
    return program;
  }

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [content]);

  const characterLimitColour =
    280 - contentLength < 0
      ? 'text-red-500'
      : 280 - contentLength < 10
      ? 'text-yellow-500'
      : 'text-gray-500';

  const update = async (tweet) => {
    if (!canTweet) return;
    await updateTweet(getProgram(), wallet, tweet, topic, content);
    props.hideComponent();
    props.initialize();
  };

  const handleChange = (content, content_length) => {
    setContent(content);
    setContentLength(content_length);
  };

  return (
    <div>
      {connected && (
        <div>
          <div className="px-8 py-4 border-l-4 border-pink-500"></div>
          <div className="py-1">
            <h3 className="inline font-semibold" title="props.tweet.author">
              <Link to="/profile" className="hover:underline">
                {props.tweet.author_display}
              </Link>
            </h3>
            <span className="text-gray-500"> • </span>
            <time
              className="text-gray-500 text-sm"
              title="props.tweet.created_at"
            >
              <Link to="/tweet" className="hover:underline">
                {props.tweet.created_ago}
              </Link>
            </time>
          </div>

          <textarea
            ref={textareaRef}
            rows="1"
            className="text-xl w-full focus:outline-none resize-none mb-3"
            placeholder="What's happening?"
            value={content}
            onChange={(e) =>
              handleChange(e.target.value, e.target.value.length)
            }
          ></textarea>
          <div className="relative m-2 mr-4">
            <input
              type="text"
              placeholder="topic"
              className="text-pink-500 rounded-full pl-10 pr-4 py-2 bg-gray-100"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <div className="absolute left-0 inset-y-0 flex pl-3 pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 m-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-4 m-2 ml-auto">
            <div className={`${characterLimitColour}`}>
              {characterLimit} left
            </div>
            <button
              className="text-gray-500 px-4 py-2 rounded-full border bg-white hover:bg-gray-50"
              onClick={() => props.hideComponent()}
            >
              Cancel
            </button>

            <button
              className={`text-white px-4 py-2 rounded-full font-semibold
                        ${
                          canTweet
                            ? 'bg-pink-500'
                            : 'bg-pink-300 cursor-not-allowed'
                        } disabled=${!canTweet}`}
              onClick={() => update(update_tweet)}
            >
              Update
            </button>
          </div>
        </div>
      )}

      {!connected && (
        <div className="px-8 py-4 bg-gray-50 text-gray-500 text-center border-b">
          Connect your wallet to start tweeting hahhaha...
        </div>
      )}
    </div>
  );
};

export default TweetFormUpdate;
