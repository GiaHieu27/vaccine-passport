import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function CustomDialog(props) {
  return (
    <Dialog open={props.open} PaperProps={{ style: { padding: '15px' } }}>
      <DialogTitle>
        {props.title}
        {props.showIcon && (
          <Box textAlign={'center'}>
            {props.type === 'success' && (
              <CheckCircleOutlinedIcon
                color="success"
                sx={{ fontSize: '3.5rem' }}
              />
            )}
            {props.type === 'error' && (
              <ErrorOutlineOutlinedIcon
                color="error"
                sx={{ fontSize: '3.5rem' }}
              />
            )}
          </Box>
        )}
      </DialogTitle>
      <DialogContent>{props.content}</DialogContent>
      <DialogActions>{props.actions}</DialogActions>
    </Dialog>
  );
}

CustomDialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
  showIcon: PropTypes.bool,
  type: PropTypes.string,
  actions: PropTypes.func,
  open: PropTypes.bool,
};

export default CustomDialog;
