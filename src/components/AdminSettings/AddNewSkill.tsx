import React, { useEffect, useState } from 'react';
import BaseModal from '../Global/Modal';
import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { errorHelperText } from '../../utils/validation';
import { useTranslation } from 'react-i18next';
import Select from '../Global/Select';

const initialState = {
  skill: '',
  skillType: '',
  achievementScore: 0,
};

let initialErrors = {
  skill: false,
  skillType: false,
  achievementScore: false,
};
const validate = (values: any) => {
  let errors = { ...initialErrors };

  if (!values.skill || values.skill.trim() === '') {
    errors.skill = true;
  }
  if (!values.skillType || values.skillType.trim() === '') {
    errors.skillType = true;
  }

  if (!values.achievementScore || values.achievementScore === 0) {
    errors.achievementScore = true;
  }

  console.log('TEST errors', errors, values);

  return errors;
};

const AddNewSkill = ({
  open,
  handleClose,
  handleSave,
  skillAchievementList,
  skill,
  skillTypes,
}: any) => {
  const [skillDetails, setSkillDetails] = useState<any>(initialState);
  const [erros, setErros] = useState<any>(initialErrors);

  const onSave = () => {
    const errors = validate(skillDetails);

    if (errors.skill || errors.skillType || errors.achievementScore) {
      setErros(errors);
      return;
    }

    setSkillDetails(initialState);
    setErros(initialErrors);

    handleSave(skillDetails);
  };

  useEffect(() => {
    if (skill) {
      setSkillDetails(skill);
    }
  }, [skill]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSkillDetails((prev: any) => ({ ...prev, [name]: value }));
  };

  const { t } = useTranslation();

  return (
    <BaseModal
      title={'Admin - New skill'}
      handleClose={handleClose}
      onSave={onSave}
      open={open}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5.75}>
          <Typography className='SmallBody'>{t('Skill')}</Typography>
          <TextField
            variant='outlined'
            name='skill'
            placeholder={`${t('Enter skill')}`}
            value={skillDetails.skill}
            onChange={handleChange}
            error={erros.skill}
            helperText={erros.skill && t('Please enter a valid skill')}
          />
        </Grid>
        <Grid item xs={12} sm={5.75}>
          <Typography className='SmallBody'>{t('Skill type')}</Typography>
          <Box mt={1}>
            <Select
              placeholder={t('Select skill type')}
              value={`${skillTypes.find((item: any) => {
                return item?.skillType?.toLowerCase() === skillDetails?.skillType?.toLowerCase();
              })?.skillType || ''
                }`}
              onChange={handleChange}
              name='skillType'
              variant='outlined'
              fullWidth
              error={erros.skillType}
            >
              {skillTypes.map((item: any) => (
                <MenuItem value={item.skillType}>{item.skillType}</MenuItem>
              ))}
            </Select>
            {erros.skillType &&
              errorHelperText(t('Please select a skill type'))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={5.75}>
          <Typography className='SmallBody'>{t('Level Required')}</Typography>
          <Box mt={1}>
            <Select
              value={`${skillAchievementList.find((item: any) => {
                return item.skillAchievementId === skillDetails.achievementScore;
              })?.description || ''}${skillAchievementList.find((item: any) => item.skillAchievementId === skillDetails.achievementScore)?.score ? ` - ${skillAchievementList.find((item: any) => item.skillAchievementId === skillDetails.achievementScore)?.score}` : ''}`}
              onChange={handleChange}
              name='achievementScore'
              variant='outlined'
              fullWidth
              error={erros.achievementScore}
              placeholder={t('Select level required')}
            >
              {skillAchievementList.map((item: any) => (
                <MenuItem
                  value={item.skillAchievementId}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography className='SmallBody'>
                    {t(item.description)}
                  </Typography>{' '}
                  <Typography className='SmallBody'>{item.score}</Typography>
                </MenuItem>
              ))}
            </Select>
            {erros.achievementScore &&
              errorHelperText(t(t('Please select a score')))}
          </Box>
        </Grid>
      </Grid>
    </BaseModal>
  );
};

export default AddNewSkill;
