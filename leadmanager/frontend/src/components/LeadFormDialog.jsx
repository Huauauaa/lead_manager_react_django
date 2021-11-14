import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { createLead, updateLead } from '../api/lead.api';
import MessageContext from '../contexts/MessageContext';

const defaultModel = {
  name: '',
  email: '',
  message: '',
};

function LeadFormDialog({ visible, onClose, afterCommit, current }) {
  const { setMessage } = useContext(MessageContext);
  const [model, setModel] = useState(defaultModel);
  const [validateError, setValidateError] = useState({});

  useEffect(() => {
    setModel(current || defaultModel);
  }, [current]);

  const onSubmit = async () => {
    try {
      if (current) {
        await updateLead(current.id, model);
        setMessage({ content: 'Updated!' });
      } else {
        await createLead(model);
        setMessage({ content: 'Created!' });
      }

      onClose();
      afterCommit();
    } catch (error) {
      setValidateError(
        Object.keys(error).reduce((result, field) => {
          result[field] = error[field][0];
          return result;
        }, {}),
      );
    }
  };
  return (
    <Dialog open={visible} onClose={onClose}>
      <DialogTitle>Create Lead</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          variant="standard"
          required
          label="Name"
          error={!!validateError.name}
          helperText={validateError.name}
          value={model.name}
          onChange={(e) => setModel({ ...model, name: e.target.value })}
        />
        <TextField
          required
          fullWidth
          margin="dense"
          variant="standard"
          label="Email"
          value={model.email}
          error={!!validateError.email}
          helperText={validateError.email}
          onChange={(e) => setModel({ ...model, email: e.target.value })}
        />
        <TextField
          multiline
          fullWidth
          margin="dense"
          variant="standard"
          label="Message"
          value={model.message}
          onChange={(e) => setModel({ ...model, message: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LeadFormDialog;
