import React, { useEffect, useState } from 'react';
import BaseModal from '../Global/Modal';
import { Grid, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useTranslation } from 'react-i18next';

interface AddNewAssetProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (asset: any) => void;
  asset?: any;
}

const initialState = {
  assetConfigurationId: 0,
  equipment: '',
  brand: '',
  model: '',
  registration: '',
  expiryDate: '',
};
const validate = (values: any) => {
  let errors = {
    equipment: false,
    brand: false,
    model: false,
    registration: false,
    expiryDate: false,
  };
  if (!values.equipment || values.equipment.trim() === '') {
    errors.equipment = true;
  }
  if (!values.brand || values.brand === 0) {
    errors.brand = true;
  }

  if (!values.model || values.model.trim() === '') {
    errors.model = true;
  }
  if (!values.registration || values.registration.trim() === '') {
    errors.registration = true;
  }
  if (!values.expiryDate || values.expiryDate === '') {
    errors.expiryDate = true;
  }
  return errors;
};

const AddNewAsset: React.FC<AddNewAssetProps> = ({
  open,
  handleClose,
  handleSave,
  asset,
}) => {

  interface AssetInfo {
    assetConfigurationId: number;
    equipment: string;
    brand: string;
    model: string;
    registration: string;
    expiryDate: string;
    isActive?: boolean;
  }
  const [assetInfo, setAssetInfo] = useState<AssetInfo>(initialState);
  const [errors, setErrors] = useState<any>({
    equipment: false,
    brand: false,
    model: false,
    registration: false,
    expiryDate: false,
  });

  useEffect(() => {
    if (asset) {
      setAssetInfo(asset);
    }
  }, [asset]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAssetInfo((pre: any) => ({ ...pre, [name]: value }));
  };

  const onSave = () => {
    const errors = validate(assetInfo);
    if (Object.values(errors)?.some((item: any) => item === true)) {
      setErrors(errors);
      return;
    }

    setErrors({
      equipment: false,
      brand: false,
      model: false,
      registration: false,
      expiryDate: false,
    });

    setAssetInfo(initialState);

    handleSave(assetInfo);
  };

  const { t, i18n } = useTranslation();

  return (
    <BaseModal
      title='Add new asset'
      handleClose={handleClose}
      onSave={onSave}
      open={open}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5.75}>
          <Typography className='SmallBody'>{t('Equipment')}</Typography>

          <TextField
            variant='outlined'
            name='equipment'
            placeholder={`${t('Enter Equipment name')}`}
            onChange={handleChange}
            value={assetInfo.equipment}
            error={errors.equipment}
            helperText={errors.equipment && t('Equipment is required')}
          />
        </Grid>
        <Grid item xs={12} sm={5.75}>
          <Typography className='SmallBody'>{t('Brand')}</Typography>
          <TextField
            variant='outlined'
            name='brand'
            placeholder={`${t('Enter Brand')}`}
            onChange={handleChange}
            value={assetInfo.brand}
            error={errors.brand}
            helperText={errors.brand && t('Brand is required')}
          />
        </Grid>
        <Grid item xs={12} sm={5.75}>
          <Typography className='SmallBody'>{t('Model')}</Typography>
          <TextField
            variant='outlined'
            name='model'
            placeholder={`${t('Enter Model')}`}
            onChange={handleChange}
            value={assetInfo.model}
            error={errors.model}
            helperText={errors.model && t('Model is required')}
          />
        </Grid>
        <Grid item xs={12} sm={5.75}>
          <Typography className='SmallBody'>{t('Registration')}</Typography>
          <TextField
            variant='outlined'
            name='registration'
            placeholder={`${t('Enter registration or serial number')}`}
            onChange={handleChange}
            value={assetInfo.registration}
            error={errors.registration}
            helperText={errors.registration && t('Registration is required')}
          />
        </Grid>
        <Grid item xs={12} sm={5.75}>
          <Typography className='SmallBody'>{t('Expiry Date')}</Typography>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={i18n.language}
          >
            <DatePicker
              name='expiryDate'
              defaultValue={assetInfo.expiryDate}
              value={dayjs(assetInfo?.expiryDate)}
              format='DD/MM/YYYY'
              onChange={(newValue: any) => {
                setAssetInfo((pre: any) => ({
                  ...pre,
                  expiryDate: newValue.toDate(),
                }));
              }}
              onError={errors.expiryDate}
            // helperText={`${errors.expiryDate && t('ExpiryDate is required')}`}
            />
          </LocalizationProvider>
        </Grid>{' '}
        {/*<Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Switch />
            <Typography variant="extraSmallBody">Active</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="SmallBody">Comments</Typography>
          <TextField
            variant="outlined"
            name="firstName"
            placeholder="Enter notes here"
            multiline
            rows={4}
          />
        </Grid>*/}
      </Grid>
    </BaseModal>
  );
};

export default AddNewAsset;
