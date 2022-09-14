import React from 'react';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';

import CustomDialog from '../CustomDialog';
import vaccineApi from '../../api/vaccineApi';

function VaccineCreateModal({
  showCreateMadal,
  setShowCreateMadal,
  onSuccess,
}) {
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState(false);
  const [nameErr, setNameErr] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleCreateVaccine = async () => {
    if (loading) return;
    if (!name || name.trim().length === 0) {
      setNameErr(true);
      return;
    }
    setNameErr(false);
    setLoading(true);
    try {
      const res = await vaccineApi.createVaccine({ name });
      setName('');
      onSuccess(res);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomDialog
      open={showCreateMadal}
      handleClose={() => setShowCreateMadal(false)}
      title="Add vaccine"
      content={
        <Box padding={'5px 0'}>
          <FormControl fullWidth>
            <TextField
              label="Vaccine name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameErr}
            />
            {error && (
              <Typography
                variant="body1"
                color={'red'}
                textAlign="center"
                paddingTop={'10px'}
              >
                {error}
              </Typography>
            )}
          </FormControl>
        </Box>
      }
      actions={
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button onClick={() => setShowCreateMadal(false)}>Cancel</Button>
          <LoadingButton
            onClick={() => handleCreateVaccine()}
            loading={loading}
          >
            Create
          </LoadingButton>
        </Box>
      }
    />
  );
}

VaccineCreateModal.propTypes = {
  showCreateMadal: PropTypes.bool,
  setShowCreateMadal: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default VaccineCreateModal;
