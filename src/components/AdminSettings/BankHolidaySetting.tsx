/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import EnhancedTable from '../Global/Table';
import jwtInterceoptor from '../../services/interceptors';
import { Box, Grid, alpha } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { errorHelperText } from '../../utils/validation';
import BaseModal from '../Global/Modal';
import CountrySelect from '../Global/CountryDropdown';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from '../Global/WithSnackbar';
import DeleteModal from '../Global/DeleteModal';
import EditIcon from '../Icon/EditIcon';
import BinIcon from '../Icon/BinIcon';

const initialState = {
  country: '',
  date: new Date(),
  holidayName: '',
  errors: [],
};

const BankHolidaySetting: React.FC = (bankHoliday: any) => {
  const [open, setOpen] = useState<any>({
    open: false,
    id: null,
  });

  const [errors, setErrors] = useState<any>({
    date: false,
    country: false,
    holidayName: false,
  });

  const { showMessage }: any = useSnackbar();

  const [bankHolidayInfo, setBankHolidayInfo] = useState<any>(initialState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBankHolidayInfo((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { t, i18n } = useTranslation();

  const onSave = async () => {
    try {
      const { date, country, holidayName } = bankHolidayInfo;

      const errors = validate(bankHolidayInfo);
      if (Object.values(errors)?.some((item) => item === true)) {
        setErrors(errors);
        return;
      }

      setErrors({
        date: false,
        country: false,
        holidayName: false,
      });

      if (open.isEditMode && open.id) {
        await addOrUpdateBankHoliday(date, holidayName, country, open.id);
      } else {
        await addOrUpdateBankHoliday(date, holidayName, country);
      }
      setBankHolidayInfo(initialState);
      setOpen({ open: false, id: null, isEditMode: false });
    } catch (error) {
      console.error('Error creating bank holiday:', error);
    }
  };

  const validate = (values: any) => {
    let errors = {
      date: false,
      country: false,
      holidayName: false,
    };
    if (!values.holidayName || values.holidayName.trim() === '') {
      errors.holidayName = true;
    }
    if (!values.country || values.country === '') {
      errors.country = true;
    }

    if (!values.date) {
      errors.date = true;
    }
    return errors;
  };

  const headCells = [
    {
      id: 'date',
      label: 'Date',
    },
    {
      id: 'holidayName',
      label: 'Description',
    },
    {
      id: 'country',
      label: 'Country',
    },
    {
      id: 'Action',
      label: 'Action',
    },
  ];

  const [loading, setLoading] = useState<any>(false);
  const [holidayConfig, setBankHolidayConfig] = useState<any>([]);

  useEffect(() => {
    getBankHolidayConfig();
  }, []);

  const getBankHolidayConfig = async () => {
    setLoading(true);
    jwtInterceoptor
      .get('api/PublicHoliday/GetAllPublicHolidays')
      .then((res: any) => {
        console.log(res.data);
        setBankHolidayConfig(res.data);
        setLoading(false);
      })
      .catch((err: any) => { });
  };

  const addOrUpdateBankHoliday: any = async (
    date: any,
    holidayName: any,
    country: any,
    publicHolidayId: any
  ) => {
    setLoading(true);
    try {
      if (publicHolidayId) {
        await jwtInterceoptor
          .post('api/PublicHoliday/UpdatePublicHoliday', {
            publicHolidayId,
            date,
            holidayName,
            country,
          })
          .then((res: any) => {
            if (
              res.data.StatusCode != undefined &&
              res.data.StatusCode !== '200'
            ) {
              showMessage(res.data.Message, 'error');
            } else {
              showMessage('Bank Holiday updated successfully.', 'success');
            }
          });
      } else {
        await jwtInterceoptor
          .post('api/PublicHoliday/CreatePublicHoliday', {
            date,
            holidayName,
            country,
          })
          .then((res: any) => {
            if (
              res.data.StatusCode != undefined &&
              res.data.StatusCode !== '200'
            ) {
              showMessage(res.data.Message, 'error');
            } else {
              showMessage('Bank Holiday added successfully.', 'success');
            }
          });
      }

      await getBankHolidayConfig();
    } catch (error) {
      console.error('Error saving bank holiday:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await jwtInterceoptor
        .delete(
          `api/PublicHoliday/DeletePublicHoliday?PublicHolidayId=${deleteModal.id}`
        )
        .then((res: any) => {
          if (
            res.data.StatusCode != undefined &&
            res.data.StatusCode !== '200'
          ) {
            showMessage(res.data.Message, 'error');
          } else {
            showMessage('Bank Holiday deleted successfully.', 'success');
          }
        });
      getBankHolidayConfig();
      setDeleteModal({
        open: false,
        id: null,
      });
    } catch (error) {
      console.error('Error deleting bank holiday:', error);
    } finally {
      setLoading(false);
    }
  };

  function createData(
    Date: any,
    Description: any,
    Country: any,
    id: any,
    onEdit: any,
    onDelete: any,
    rowData: any
  ) {

    // Combine all text for searchable text
    const searchableText = [
      Date,
      Description,
      Country,
    ].join(' ');

    return {
      Date,
      Description,
      Country,
      Action: (
        <CellAction
          onEdit={() => onEdit(rowData)}
          onDelete={() => onDelete(id)}
        />
      ),
      searchableText,
    };
  }
  function CellAction({ onEdit, id, onDelete }: any) {
    return (
      <Box className='action-icon-rounded'>
        <Button
          onClick={() => onEdit(id)}
        >
          <EditIcon />
        </Button>
        <Button
          onClick={() => onDelete(id)}
        >
          <BinIcon />
        </Button>
      </Box>
    );
  }


  const onEdit = (rowData: any) => {
    setOpen({
      open: true,
      id: rowData.publicHolidayId,
      isEditMode: true,
    });
    setBankHolidayInfo({
      country: rowData.country,
      date: rowData.date,
      holidayName: rowData.holidayName,
    });
  };

  const onDelete = (id: any) => {
    setDeleteModal({
      open: true,
      id: id,
    });
  };

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
  });

  return (
    <Grid
      sx={(theme) => ({
        border: `0px solid ${theme.palette.common.black}`,
        padding: '10px',
        borderRadius: '10px',
      })}
    >
      <EnhancedTable
        head={headCells}
        rows={holidayConfig.map((item: any) =>
          createData(
            new Date(item.date).toLocaleDateString('en-GB'),
            item.holidayName,
            item.country,
            item.publicHolidayId,
            onEdit,
            onDelete,
            item
          )
        )}
        isAddable={true}
        onAddClick={() =>
          setOpen({
            open: true,
            id: null,
          })
        }
        title='Bank holiday setting'
        loading={loading}
        btnTitle='Edit'
      />
      <BaseModal
        title={
          open.isEditMode
            ? 'Admin - Update Bank Holiday'
            : 'Admin - New Bank Holiday'
        }
        handleClose={() => {
          setOpen({
            open: false,
            id: null,
            isEditMode: false,
          });
          setBankHolidayInfo(initialState);
          setErrors({
            date: false,
            country: false,
            holidayName: false,
          });
        }}
        onSave={onSave}
        open={open.open}
        bankHoliday={holidayConfig.find(
          (item: any) => item.publicHolidayId === open.id
        )}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography className='SmallBody'>{t('Date')}</Typography>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={i18n.language}
            >
              <DatePicker
                defaultValue={dayjs(bankHolidayInfo.date)}
                format='DD/MM/YYYY'
                onChange={(e: any) => {
                  handleChange({
                    target: {
                      name: 'date',
                      value:
                        e.$y +
                        '-' +
                        ('0' + (e.$M + 1)).slice(-2) +
                        '-' +
                        ('0' + e.$D).slice(-2),
                    },
                  });
                }}
              />
            </LocalizationProvider>
            {errorHelperText(
              errors.date ? t('Please Select a holiday date') : null
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className='SmallBody'>{t('Country')}</Typography>
            <CountrySelect
              value={bankHolidayInfo.country}
              helperText={errors.country && t('Country is required')}
              error={errors.country}
              customFun={(e: any) => {
                handleChange({ target: { name: 'country', value: e } });
              }}
            />
            {errorHelperText(errors.country ? t('Country is required') : null)}
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: '10px' }}>
              <Typography className='SmallBody'>Description</Typography>
            </Box>
            <Box>
              <TextField
                name='holidayName'
                placeholder={`${t('Enter the holiday description')}`}
                value={bankHolidayInfo.holidayName}
                onChange={handleChange}
                sx={{ width: '100%', mb: '10px' }}
                error={errors.holidayName}
                helperText={errors.holidayName && 'Bank holiday is required'}
              />
            </Box>
          </Grid>
        </Grid>
      </BaseModal>
      <DeleteModal
        open={deleteModal.open}
        message={'Are you sure you want to delete this bank holiday?'}
        title={'Delete bank holiday'}
        onCancel={() => {
          setDeleteModal({
            open: false,
            id: null,
          });
        }}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
};

export default BankHolidaySetting;
