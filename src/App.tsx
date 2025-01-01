import React from 'react';
import { Toaster } from 'react-hot-toast';
import Editor from './components/Editor';
import { DevSignature } from './components/DevSignature';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Editor />
      <DevSignature />
    </>
  );
}

export default App;