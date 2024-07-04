import React, { useEffect, useState, useRef } from 'react';
import EnhancedTable from '../../../Global/Table';
import jwtInterceptor from '../../../../services/interceptors';
import { Stack, Typography, Checkbox } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const headCells = [
  {
    id: 'Equipment',
    label: 'Equipment',
  },
  {
    id: 'Brand',
    label: 'Brand',
  },
  {
    id: 'Model',
    label: 'Model',
  },
  {
    id: 'Registration',
    label: 'Registration',
  },
  {
    id: 'Status',
    label: 'Status',
  },
  {
    id: 'Comment',
    label: 'Comment',
  },
];

function createData(
  Equipment: any,
  Brand: any,
  Model: any,
  Registration: any,
  Status: any,
  Comment: any
) {
  return {
    Equipment,
    Brand,
    Model,
    Registration,
    Status,
    Comment,
  };
}

function Assets({ modal = false }) {
  //const [open, setOpen] = useState(false);
  const bearerToken = sessionStorage.getItem('token_key');
  const empId = sessionStorage.getItem('empId_key');

  const [assets, setAssetState] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const initialized = useRef(false);
  const tblRows: any = [];

  useEffect(() => {
    if (!initialized.current) {
      if (bearerToken) {
        initialized.current = true;
        GetAssetsListData();
      } else {
        window.location.href =
          'https://kind-rock-0f8a1f603.5.azurestaticapps.net/login';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetAssetsListData = async () => {
    setLoading(true);

    jwtInterceptor
      .get('api/Employee/GetAssetList?EmployeeDetailId=' + empId)
      .then((response: any) => {
        for (var x of response.data) {
          let status = x.isAssetAssigned ? 'Assigned' : 'Not Assigned';
          console.log('123', response.data);
          tblRows.push(
            createData(
              x.equipment,
              x.brand,
              x.model,
              x.registration,
              modal ? (
                <Stack direction="row" alignItems="center" gap={2}>
                  <Checkbox checked={status === 'Assigned'} color='success' sx={{
                    '&.MuiCheckbox-root': {
                      p: 0
                    },
                    "& .MuiSvgIcon-root": {
                      fill: (theme) => theme.palette.success.main,
                    },
                  }} />
                  <Checkbox checked={status === 'Not Assigned'} color='error' sx={{
                    '&.MuiCheckbox-root': {
                      p: 0
                    },
                    "& .MuiSvgIcon-root": {
                      fill: (theme) => theme.palette.error.main,
                    },
                  }} />
                  <Checkbox color='warning' checked={status !== 'Assigned' && status !== 'Not Assigned'} sx={{
                    '&.MuiCheckbox-root': {
                      p: 0
                    },
                    "& .MuiSvgIcon-root": {
                      fill: (theme) => theme.palette.warning.main,
                    },
                  }} />
                </Stack>) :
                (
                  <Stack direction="row" alignItems="center" gap={1} fontSize={12}>
                    <CircleIcon color={status === 'Assigned' ? "success" : "error"} fontSize="inherit" />
                    <Typography sx={{ fontSize: 12 }}>{status === 'Assigned' ? "Granted" : "N/A"}</Typography>
                  </Stack >
                ),
              x.comment
            )
          );
        }
        setAssetState(tblRows);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <EnhancedTable
        title={modal ? 'Asset information' : 'Assets'}
        head={headCells}
        rows={assets}
        loading={loading}
      />
    </>
  );
}

export default Assets;
