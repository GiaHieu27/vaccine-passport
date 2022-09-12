import React from 'react';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, FormControl, TextField } from '@mui/material';

import CustomDialog from '../CustomDialog';

function VaccineCreateModal({ show, onClose, onSuccess }) {
  const handleCreateVaccine = () => {
    onSuccess('new vaccine');
  };

  return (
    <CustomDialog
      open={show}
      title="Add vaccine"
      content={
        <FormControl>
          <TextField label="Vaccine name" />
        </FormControl>
      }
      actions={
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="text" onClick={() => onClose()}>
            Cancel
          </Button>

          <LoadingButton onClick={handleCreateVaccine}>Create</LoadingButton>
        </Box>
      }
    />
  );
}

VaccineCreateModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default VaccineCreateModal;
