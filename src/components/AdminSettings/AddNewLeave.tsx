import React, { useEffect, useState } from 'react';
import BaseModal from '../Global/Modal';
import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { errorHelperText } from '../../utils/validation';
import { useTranslation } from 'react-i18next';
import jwtInterceoptor from '../../services/interceptors';
import { useSnackbar } from '../Global/WithSnackbar';

const initialState: any = {
  leaveType: '',
  daysEntitled: 0,
  genderRestriction: '',
};

const validate = (values: any) => {
  let errors: any = {
    leaveType: false,
    daysEntitled: false,
    genderRestriction: false,
  };
  if (!values.leaveType || values.leaveType.trim() === '') {
    errors.leaveType = true;
  }
  if (!values.daysEntitled || values.daysEntitled === 0) {
    errors.daysEntitled = true;
  }

  if (!values.genderRestriction || values.genderRestriction.trim() === '') {
    errors.genderRestriction = true;
  }
  return errors;
};

const AddNewLeave = ({ open, handleClose, handleSave, leave }: any) => {
  const [genders, setGenders] = useState<any>([]);
  const [leaveInfo, setLeaveInfo] = useState<any>(initialState);
  const [errors, setErrors] = useState<any>({
    leaveType: false,
    daysEntitled: false,
    genderRestriction: false,
  });

  useEffect(() => {
    if (leave) {
      setLeaveInfo(leave);
    } else {
      setLeaveInfo(initialState);
    }
  }, [leave]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLeaveInfo((pre: any) => ({ ...pre, [name]: value }));
  };

  const onSave = () => {
    const errors = validate(leaveInfo);
    if (Object.values(errors)?.some((item: any) => item === true)) {
      setErrors(errors);
      return;
    }

    setErrors({
      leaveType: false,
      daysEntitled: false,
      genderRestriction: false,
    });

    setLeaveInfo(initialState);

    handleSave(leaveInfo);
  };

  const { showMessage }: any = useSnackbar();

  const { t } = useTranslation();

  const getGender = () => {

    jwtInterceoptor
      .get('api/GenderMaster/GetAllGenderMasters')
      .then((res: any) => {
        setGenders(res.data);
      })
      .catch((err: any) => {
        showMessage(err.response.data.Message, 'error');
      });
  };

  useEffect(() => {
    getGender();
  }, [])

  return (
    <BaseModal
      title={leave ? 'Admin - Update leave' : 'Admin - New leave'}
      handleClose={() => { handleClose(); setLeaveInfo(initialState); setErrors({ leaveType: false, daysEntitled: false, genderRestriction: false, }); }}
      onSave={onSave}
      open={open}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5.75}>
          <Typography className='SmallBody'>{t('Leave')}</Typography>
          <TextField
            variant='outlined'
            name='leaveType'
            placeholder={`${t('Annual leave')}`}
            onChange={handleChange}
            value={leaveInfo.leaveType}
            error={errors.leaveType}
            helperText={errors.leaveType && t('Leave type is required')}
          />
        </Grid>
        <Grid item xs={12} sm={5.75}>
          <Typography className='SmallBody'>{t('Days entitled')}</Typography>
          <TextField
            variant='outlined'
            name='daysEntitled'
            placeholder={`${t('Enter days entitled')}`}
            onChange={handleChange}
            value={leaveInfo.daysEntitled}
            error={errors.daysEntitled}
            helperText={errors.daysEntitled && t('Days entitled is required and should be greater than 0')}
          />
        </Grid>
        <Grid item xs={12} sm={5.75}>
          <Typography className='SmallBody'>
            {t('Gender restriction')}
          </Typography>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='Other'
            name='genderRestriction'
            onChange={handleChange}
            value={leaveInfo.genderRestriction}
            row
          >
            {genders.map((gender: any) => (
              <FormControlLabel
                key={gender.genderId}
                value={gender.gender}
                control={<Radio />}
                label={gender.gender}
              />
            ))}
          </RadioGroup>

          {errors.genderRestriction &&
            errorHelperText(t('Gender restriction is required'))}
        </Grid>
      </Grid>
    </BaseModal>
  );
};

export default AddNewLeave;
