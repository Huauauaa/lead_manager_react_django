import { Button, Toolbar } from '@mui/material';
import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Header from './components/Header';
import LeadFormDialog from './components/LeadFormDialog';
import LeadTable from './components/LeadTable';
import { getLeads } from './api/lead.api';
import LoadingContext from './contexts/LoadingContext';
import MessageContext from './contexts/MessageContext';

function App() {
  const [leads, setLeads] = useState([]);
  const [leadForm, setLeadForm] = useState({ visible: false, current: {} });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();
      setLeads(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <div className="App">
          <Header />
          <Toolbar>
            <Button
              variant="contained"
              onClick={() => setLeadForm({ visible: true })}
            >
              Create Lead
            </Button>
          </Toolbar>
          <LeadTable
            leads={leads}
            afterCommit={fetchLeads}
            setLeadForm={setLeadForm}
          />
          <LeadFormDialog
            visible={!!leadForm.visible}
            onClose={() => setLeadForm({ visible: false })}
            afterCommit={fetchLeads}
            current={leadForm.current}
          />
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
  );
}

export default App;
