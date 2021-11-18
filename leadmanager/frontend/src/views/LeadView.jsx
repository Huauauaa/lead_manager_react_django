import React, { useState, useEffect, useContext } from 'react';
import { Button, Toolbar } from '@mui/material';
import { getLeads } from '../api/lead.api';
import LeadFormDialog from '../components/LeadFormDialog';
import LeadTable from '../components/LeadTable';
import LoadingContext from '../contexts/LoadingContext';

function LeadView() {
  const { setLoading } = useContext(LoadingContext);
  const [leads, setLeads] = useState([]);
  const [leadForm, setLeadForm] = useState({ visible: false, current: {} });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();
      setLeads(data || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
    </>
  );
}

export default LeadView;
