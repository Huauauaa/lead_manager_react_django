import React, { useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { deleteLead } from '../api/lead.api';
import LoadingContext from '../contexts/LoadingContext';
import MessageContext from '../contexts/MessageContext';

function Leads({ leads, afterCommit, setLeadForm }) {
  const { setLoading } = useContext(LoadingContext);
  const { setMessage } = useContext(MessageContext);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [current, setCurrent] = useState(-1);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Message</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.message}</TableCell>
                <TableCell align="right">{row.created_at}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        setLeadForm({ visible: true, current: row });
                      }}
                    >
                      <EditIcon color="action" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => {
                        setCurrent(row);
                        setConfirmVisible(true);
                      }}
                    >
                      <DeleteIcon color="warning" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Are you sure to delete this?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmVisible(false)}>No</Button>
          <Button
            onClick={async () => {
              setConfirmVisible(false);

              try {
                setLoading(true);
                await deleteLead(current.id);
                setMessage({ content: 'Delete Successful' });
                afterCommit();
              } finally {
                setLoading(false);
              }
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Leads;
