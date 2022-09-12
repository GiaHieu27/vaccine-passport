import LoadingButton from '@mui/lab/LoadingButton';
import { Grid } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import vaccineApi from '../../api/vaccineApi';
import PageHeader from '../../components/PageHeader';

function VaccineDetail() {
  const { id } = useParams();

  const [vaccine, setVaccine] = React.useState();
  // const [dialogOpen, setDialogOpen] = React.useState(false);
  // const [dialogType, setDialogType] = React.useState('');
  // const [dialogText, setDialogText] = React.useState('');

  React.useEffect(() => {
    const getVaccine = async () => {
      try {
        const res = await vaccineApi.getOneVaccine(id);
        console.log(res);
        setVaccine(res);
      } catch (error) {
        console.log(error);
      }
    };
    getVaccine();
  }, []);

  return (
    <>
      <PageHeader
        title={'Vaccine detail'}
        rightContent={
          <LoadingButton variant="text" color="error">
            Delete
          </LoadingButton>
        }
      />

      <Grid container>
        <Grid item></Grid>
      </Grid>
    </>
  );
}

export default VaccineDetail;
