/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import EnhancedTable from '../Global/Table';
import { Box, Button, alpha } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import AddNewAsset from './AddNewAsset';
import dayjs from 'dayjs';
import DeleteModal from '../Global/DeleteModal';
import jwtInterceoptor from '../../services/interceptors';
import { useSnackbar } from '../Global/WithSnackbar';

const headCells = [
  {
    id: 'equipment',
    label: 'Equipment',
  },
  {
    id: 'brand',
    label: 'Brand',
  },
  {
    id: 'model',
    label: 'Model',
  },
  {
    id: 'registration',
    label: 'Registration',
  },
  {
    id: 'status',
    label: 'Status',
  },
  {
    id: 'Action',
    label: 'Action',
  },
];

function createData(
  equipment: any,
  brand: any,
  model: any,
  registration: any,
  expiryDate: string | null | undefined,
  id: any,
  onEdit: any,
  onDelete: any
) {
  return {
    equipment,
    brand,
    model,
    registration,
    expiryDate,
    Action: (
      <CellAction onEdit={() => onEdit(id)} onDelete={() => onDelete(id)} />
    ),
  };
}

// function Status({ status }: any) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         gap: '5px',
//         alignItems: 'center',
//       }}
//     >
//       <Circle color={status === 'Active' ? 'success' : 'error'} />
//       <Typography className='smallBodyBold'>{status}</Typography>
//     </Box>
//   );
// }

function CellAction({ onEdit, onDelete }: any) {
  return (
    <Box className='action-icon-rounded'>
      <Button
        sx={{
          backgroundColor: alpha('#27AE60', 0.1),

          svg: {
            fill: '#27AE60',
          },
        }}
        onClick={onEdit}
      >
        <BorderColorIcon />
      </Button>
      <Button
        sx={{
          backgroundColor: alpha('#DF6F79', 0.1),

          svg: {
            fill: '#DF6F79',
          },
        }}
        onClick={onDelete}
      >
        <DeleteIcon />
      </Button>
      {/*<Button>
        <MoreVertIcon />
      </Button>*/}
    </Box>
  );
}

const Assets: React.FC = () => {
  //const [open, setOpen] = useState(false);
  const [open, setOpen] = useState<any>({
    open: false,
    id: null,
  });

  const [loading, setLoading] = useState<any>(false);
  const { showMessage }: any = useSnackbar();
  const [assetConfig, setAssetConfig] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<any>({
    open: false,
    id: null,
  });
  const getAssetConfig = async () => {
    setLoading(true);
    jwtInterceoptor
      .get('api/HrAsset/GetAllAssetConfigurationList')
      .then((res: any) => {
        setAssetConfig(res.data);
        setLoading(false);
      })
      .catch((err: any) => {
        showMessage(err.message, 'error');
      });
  };

  const updateAssetConfig = async (data: any) => {
    setLoading(true);

    jwtInterceoptor
      .post('api//HrAsset/UpdateAssetConfiguration', data)
      .then((res: any) => {
        showMessage('Asset configuration updated successfully', 'success');
        setLoading(false);
      })
      .catch((err: any) => {
        showMessage(err.message, 'error');
      });
  };

  const createNewAssetConfig = async (data: any) => {
    setLoading(true);
    jwtInterceoptor
      .post('api/HrAsset/CreateAssetConfiguration', data)
      .then((res: any) => {
        showMessage('Asset configuration created successfully', 'success');
        setLoading(false);
      })
      .catch((err: any) => {
        showMessage(err.message, 'error');
      });
  };

  const deleteLeaveConfig = async (id: any) => {
    setLoading(true);

    jwtInterceoptor
      .delete(`api/HrAsset/DeleteAssetConfiguration?AssetConfigurationId=${id}`)
      .then((res: any) => {
        showMessage('Asset configuration deleted successfully', 'success');
        setLoading(false);
      })
      .catch((err: any) => {
        showMessage(err.message, 'error');
      });
  };

  const onEdit = (id: any) => {
    setOpen({
      open: true,
      id: id,
    });
  };

  const onDelete = (id: any) => {
    setDeleteModal({
      open: true,
      id: id,
    });
  };
  const onDeleteConfirm = async () => {
    await deleteLeaveConfig(deleteModal.id);
    getAssetConfig();
    setDeleteModal({
      open: false,
      id: null,
    });
  };

  const onSave = async (data: any) => {
    if (data.assetConfigurationId) {
      await updateAssetConfig(data);
    } else {
      await createNewAssetConfig(data);
    }

    getAssetConfig();

    setOpen({
      open: false,
      id: null,
    });
  };

  React.useEffect(() => {
    getAssetConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={(theme) => ({
        border: `1px solid ${theme.palette.common.black}`,
        borderRadius: '20px',
      })}
    >
      <EnhancedTable
        head={headCells}
        rows={assetConfig.map((item: any) =>
          createData(
            item.equipment,
            item.brand,
            item.model,
            item.registration != null &&
              item.registration != '' &&
              item.registration != 'string'
              ? dayjs(item?.registration).format('DD/MM/YYYY')
              : '',
            dayjs(item?.expiryDate).format('DD/MM/YYYY'),
            item.assetConfigurationId,
            onEdit,
            onDelete
          )
        )}
        isAddable={true}
        onAddClick={() =>
          setOpen({
            open: true,
            id: null,
          })
        }
        title='Asset Configuration'
        loading={loading}
      />
      <AddNewAsset
        open={open.open}
        handleClose={() => {
          setOpen({
            open: false,
            id: null,
          });
        }}
        handleSave={onSave}
        asset={assetConfig.find(
          (item: any) => item.assetConfigurationId === open.id
        )}
      />

      <DeleteModal
        open={deleteModal.open}
        message={'Are you sure want to delete this Asset?'}
        title={'Delete Asset'}
        onCancel={() => {
          setDeleteModal({
            open: false,
            id: null,
          });
        }}
        onConfirm={onDeleteConfirm}
      />
    </Box>
  );
};

export default Assets;
