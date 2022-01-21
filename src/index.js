import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const Index = () => {
  return (
    <div className="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
      <div className="sm:flex sm:items-center px-6 py-4">
        <img
          className="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0"
          src="https://avatars2.githubusercontent.com/u/4323180?s=400&u=4962a4441fae9fba5f0f86456c6c506a21ffca4f&v=4"
          alt=""
        />
        <div className="text-center sm:text-left sm:flex-grow">
          <div className="mb-4">
            <p className="text-xl leading-tight">Adam Wathan</p>
            <p className="text-sm leading-tight text-grey-dark">
              Developer at NothingWorks Inc.
            </p>
          </div>
          <div>
            <button className="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
