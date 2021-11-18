import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Header from './components/Header';
import LoadingContext from './contexts/LoadingContext';
import MessageContext from './contexts/MessageContext';
import UserContext from './contexts/UserContext';
import LeadView from './views/LeadView';
import SignIn from './views/SignIn';
import { getCurrentUser } from './api/account.api';

function App() {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      setUserInfo(response);
    } catch (error) {
      navigator('sign-in');
    }
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <MessageContext.Provider value={{ message, setMessage }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<LeadView />} />
              <Route path="sign-in" element={<SignIn />} />
            </Routes>
          </div>
          <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Snackbar
            open={!!message.content}
            autoHideDuration={message.duration || 2e3}
            onClose={() => setMessage({})}
          >
            <Alert onClose={message.onClose} severity={message.type}>
              {message.content}
            </Alert>
          </Snackbar>
        </LoadingContext.Provider>
      </MessageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
