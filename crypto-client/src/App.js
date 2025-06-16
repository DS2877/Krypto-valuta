import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import Protected from './components/Protected';

function App() {
  const [userToken, setUserToken] = useState(null);

  return (
    <div className="App">
      <h1>Välkommen till min Krypto Valuta</h1>
      {!userToken ? (
        <AuthForm setUser={setUserToken} />
      ) : (
        <Protected token={userToken} />
      )}
    </div>
  );
}

export default App;