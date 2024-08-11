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

interface LeaveTypeState {
  leaveType: string;
  daysEntitled: number;
  genderRestriction: string;
}

const initialState: LeaveTypeState = {
  leaveType: '',
  daysEntitled: 0,
  genderRestriction: '',
};

interface ValidationErrors {
  leaveType: boolean;
  daysEntitled: boolean;
  genderRestriction: boolean;
}

const validate = (values: LeaveTypeState) => {
  let errors: ValidationErrors = {
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

interface AddNewLeaveProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (leaveInfo: any) => void;
  leave: LeaveTypeState;
}

interface Gender {
  genderId: number;
  gender: string;
}

const AddNewLeave = ({ open, handleClose, handleSave, leave }: AddNewLeaveProps) => {
  const [genders, setGenders] = useState<Gender[]>([]);
  const [leaveInfo, setLeaveInfo] = useState<LeaveTypeState>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({
    leaveType: false,
    daysEntitled: false,
    genderRestriction: false,
  });

  useEffect(() => {
    if (leave !== undefined) {
      setLeaveInfo(leave);
    } else {
      setLeaveInfo(initialState);
    }
  }, [leave]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: string; value: string | number };
    setLeaveInfo((pre: LeaveTypeState) => {
      if (typeof value === 'string' || typeof value === 'number') {
        return { ...pre, [name]: value };
      } else {
        console.error('Invalid value type for %s:', name, value);
        return pre;
      }
    });
  };

  const onSave = () => {
    const errors: ValidationErrors = validate(leaveInfo);
    if (Object.values(errors).some((item: any) => item)) {
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
      title={leave !== undefined ? 'Admin - Update leave' : 'Admin - New leave'}
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
            placeholder={t('Annual leave').toString()}
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
            placeholder={t('Enter days entitled').toString()}
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
            {genders.map((gender: Gender) => (
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
