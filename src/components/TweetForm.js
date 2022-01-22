import React, { useState, useEffect, useRef } from 'react';
import { sendTweet } from '../api';
import { useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from '..//solana_twitter.json';

const TweetForm = (props) => {
  const wallet = useAnchorWallet();

  function getProgram() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */

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

  const [forcedTopic, setforcedTopic] = useState('');
  // Permissions.
  const { connected } = useWallet();
  //const [content, setContent] = useState('');
  const [content, setContent] = useState();
  const [contentLength, setContentLength] = useState(0);

  // const canTweet = ()=> content.value && characterLimit.value > 0);
  const canTweet = () => content && characterLimit > 0;
  const textareaRef = useRef(null);

  const handleChange = (content, content_length) => {
    setContent(content);
    setContentLength(content_length);
  };

  const useCountCharacterLimit = (contentLength, limit) => {
    //const characterLimit = ref(0)
    //watchEffect(() => characterLimit.value = limit - text.value?.length)

    return limit - contentLength;
  };

  const characterLimit = useCountCharacterLimit(contentLength, 280);

  /*
  const characterLimitColour = () => {
    if (280 - contentLength < 0) return 'text-red-500';
    if (280 - contentLength <= 10) return 'text-yellow-500';
    return 'text-gray-400';
  };
  */

  const send = async () => {
    if (!canTweet) return;
    console.log(`Going to send tweet ${forcedTopic} ${content}`);
    const tweet = await sendTweet(getProgram(), wallet, forcedTopic, content);

    setContent('');
    setforcedTopic('');
  };

  /*
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [content]);
*/
  const characterLimitColour =
    280 - contentLength < 0
      ? 'text-red-500'
      : 280 - contentLength < 10
      ? 'text-yellow-500'
      : 'text-gray-500';

  return (
    <div>
      {connected && (
        <div className="px-8 py-4 border-b">
          <textarea
            ref={textareaRef}
            className="text-xl w-full focus:outline-none resize-none mb-3"
            placeholder="What's happening?"
            onChange={(e) =>
              handleChange(e.target.value, e.target.value.length)
            }
            value={content}
          ></textarea>

          <div className="flex flex-wrap items-center justify-between -m-2">
            <div className="relative m-2 mr-4">
              <input
                type="text"
                placeholder="topic"
                className="text-pink-500 rounded-full pl-10 pr-4 py-2 bg-gray-100"
                value={forcedTopic}
                onChange={(e) => setforcedTopic(e.target.value)}
                key="random2"
              />

              <div className="absolute left-0 inset-y-0 flex pl-3 pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 m-auto ${
                    forcedTopic ? 'text-pink-500' : 'text-gray-400'
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-6 m-2 ml-auto">
              <div className={`${characterLimitColour}`}>
                {' '}
                {characterLimit} left
              </div>

              <button
                className={`text-white px-4 py-2 rounded-full font-semibold ${
                  canTweet ? 'bg-pink-500' : 'bg-pink-300 cursor-not-allowed'
                }`}
                onClick={send}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}

      {!connected && (
        <div className="px-8 py-4 bg-gray-50 text-gray-500 text-center border-b">
          Connect your wallet to start tweeting niama...
        </div>
      )}
    </div>
  );
};

export default TweetForm;
