/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, useReducer, useContext } from 'react';
import EnhancedTable from '../../Global/Table';
import { CircularChip, RoundedChip } from '../../Global/Chips';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  ToggleButton,
  Typography,
  alpha,
} from '@mui/material';
import { Link } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BaseModal from '../../Global/Modal';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DragAndDrop from '../../Global/DragAndDrop';
import DeleteModal from '../../Global/DeleteModal';
import SkillsService from '../../../services/skillsManagementServicet';
import { useNavigate } from 'react-router-dom';
import jwtInterceptor from '../../../services/interceptors';
import { useSnackbar } from '../../Global/WithSnackbar';
import { useTranslation } from 'react-i18next';
import Select from '../../Global/Select';
import Attachment from '../../../assets/images/Attachment';
import { themeContext } from '../../../theme';
import CalendarIcon from '../../Icon/CalenderIcon';
import FileIcon from '../../Icon/FileIcon';
import EditIcon from '../../Icon/EditIcon';
import BinIcon from '../../Icon/BinIcon';

const headCells = [
  {
    id: 'skills',
    label: 'Skills',
  },
  {
    id: 'expertise',
    label: 'Expertise',
  },
  {
    id: 'achieved',
    label: 'Achieved',
  },
  {
    id: 'required',
    label: 'Required',
  },
  {
    id: 'attachment',
    label: 'Attachment',
  },
  {
    id: 'modified',
    label: 'Modified',
  },
  {
    id: 'modifiedby',
    label: 'Modified By',
  },
  // {
  //   id: 'Renewal date',
  //   label: 'Renewal date',
  // },
  {
    id: 'Action',
    label: 'Action',
  },
];

function createData(
  skills: any,
  expertise: any,
  achieved: any,
  required: any,
  attachment: any,
  modified: any,
  modifiedBy: any,
  // renewal_date: any,
  Action: any
) {
  return {
    skills,
    expertise,
    achieved,
    required,
    attachment,
    modified,
    modifiedBy,
    // renewal_date,
    Action,
  };
}

function LayeredSkill({ skill, type, t }: any) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }}
    >
      <Typography className='smallBodyBold'>{t(skill)}</Typography>
      <Typography
        className='smallBody'
        sx={{
          color: '#B3B3BF',
          fontStyle: 'italic',
        }}
      >
        {t(type)}
      </Typography>
    </Box>
  );
}

function CellAction({ onEdit, onDelete }: any) {
  const { myTheme } = useContext(themeContext) as any;
  return (
    <Box className='action-icon-rounded'>
      <Box onClick={onEdit}>
        <EditIcon />
      </Box>

      <Box onClick={onDelete}>
        <BinIcon />
      </Box>
    </Box>
  );
}

function AddAttachment({ url }: any) {
  if (!url) return ' ';

  return (
    <Link
      to={url}
      // sx={{
      //   marginLeft: '9%',
      // }}

      style={{
        marginLeft: '9%',
      }}
    >
      <Attachment />
    </Link>
  );
}

const score = [
  'Unexperienced',
  'Novice',
  'Advanced beginner',
  'Competent',
  'Proficient',
  'Expert',
];

const initialState = {
  SkillConfigurationId: '',
  EmployeeDetailId: '',
  SkillAchievementId: '',
  SkillExpertiseId: '',
  RenewalDate: '',
  file: '',
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'skills':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'serviceData':
      return {
        ...state,
        ...action.value,
      };
    case 'error':
      return {
        ...state,
        error: action.value,
      };
    case 'reset':
      return {
        ...state,
        error: [],
      };
    default:
      return state;
  }
};
function EmployeeSkillsTable() {
  const service = new SkillsService();
  const [open, setOpen] = useState<any>(false);
  const [deleteModal, setDeleteModal] = useState<any>(false);
  const [Achievement, setAchievement] = useState<any>(0);
  const [btnType, setbtnTypeState] = useState<any>();
  const [id, setIdState] = useState<any>(0);
  const [skillsList, setallSkillsListDataState] = useState<any>([]);
  const [experts, setallExpertsListDataState] = useState<any>([]);
  const [skills, dispatch] = useReducer(reducer, initialState);
  const [file, setFile] = useState<any>(null);
  const initialized = useRef(false);
  const { showMessage }: any = useSnackbar();

  const tblRows: any = [];
  const [skillsData, setSkillsDataState] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const bearerToken = sessionStorage.getItem('token_key');
  const empId: any = sessionStorage.getItem('empId_key');

  const navigate = useNavigate();

  const GetSkillsConfigurationListData = async () => {
    setLoading(true);

    jwtInterceptor
      .get('api/SkillConfiguration/GetSkillConfigurationList')
      .then((response: any) => {
        let allSkills = [];
        for (var x of response.data) {
          let item = {
            skillConfigurationId: x.skillConfigurationId,
            skill: x.skill,
          };
          allSkills.push(item);
        }

        setallSkillsListDataState(allSkills);
      })
      .catch((err: any) => {
        showMessage(err.message, 'error');
      })
      .finally(() => setLoading(false));
  };

  const GetSkillsExpertsConfigurationListData = async () => {
    setLoading(true);

    jwtInterceptor
      .get('api/SkillConfiguration/GetSkillExpertiseList')
      .then((response: any) => {
        let allExperties = [];
        for (var x of response.data) {
          let item = {
            skillExpertiseId: x.skillExpertiseId,
            expertise: x.expertise,
          };
          allExperties.push(item);
        }

        setallExpertsListDataState(allExperties);
      })
      .catch((err: any) => {
        showMessage(err.message, 'error');
      })
      .finally(() => setLoading(false));
  };

  const GetSkillsListData = async () => {
    setLoading(true);

    jwtInterceptor
      .get(
        'api/EmployeeSkill/GetSkillDashboardByEmployeeDetailId?EmployeeDetailId=' +
        empId
      )
      .then((response: any) => {
        for (var x of response.data) {
          let eId = x.employeeSkillId;
          let item = x;
          tblRows.push(
            createData(
              LayeredSkill({ skill: x.skill, type: x.skillType, t }),
              <RoundedChip
                employee={true}
                status={x.expertise}
                color='#27AE60'
              />,
              <CircularChip value={x.skillAchievementId} color='#18A0FB' />,
              <CircularChip value={x.requiredScore} color='#18A0FB' />,
              <AddAttachment url={x.blobFilePath} />,
              <Box>{x?.modifiedDate?.split('T')[0]}</Box>,
              <Box>{x?.modifiedBy}</Box>,
              // x.renewalDate
              //   ? new Date(x.renewalDate).toLocaleDateString('en-GB')
              //   : '',
              <CellAction
                id={x.employeeSkillId}
                onEdit={() => {
                  onEdit('Edit', item);
                }}
                onDelete={() => onDelete(eId)}
              />
            )
          );
        }
        setSkillsDataState(tblRows);
        setLoading(false);
      })
      .catch((err: any) => {
        showMessage(err.message, 'error');
      })
      .finally(() => setLoading(false));
  };

  const deleteSkillset = async () => {
    //const response = await service.deleteSkillRequest(id);
    let url = 'api/EmployeeSkill/DeleteEmployeeSkills?EmployeeSkillId=' + id;
    jwtInterceptor
      .delete(url)
      .then((response: any) => {
        showMessage(response.data, 'success');
        GetSkillsListData();
      })
      .catch((err: any) => {
        showMessage(err.message, 'error');
      });
  };

  function onEdit(from: any, item: any) {
    setOpen((pre: any) => !pre);
    setbtnTypeState(from);
    setIdState(item.employeeSkillId);
  }
  function onDelete(eId: any) {
    setDeleteModal((pre: any) => !pre);
    setIdState(eId);
  }
  function onConfirmationDelete() {
    setDeleteModal((pre: any) => !pre);
    deleteSkillset();
  }
  const inputChange = (e: any) => {
    const val = e.target.value;
    const name = e.target.name;
    dispatch({
      type: 'skills',
      field: name,
      value: val,
    });
  };
  const inputDateChange = (e: any) => {
    const val = e.$d.toISOString();
    const name = 'RenewalDate';
    dispatch({
      type: 'skills',
      field: name,
      value: val,
    });
  };

  const setFileInformation = (file: any) => {
    setFile(file);
  };
  const onSkillSave = async () => {
    const formData = new FormData();
    console.log(skills);
    formData.append('file', file);
    // formData.append("name", name); filename is not required at any of the place
    formData.append('SkillConfigurationId', skills.SkillConfigurationId);
    formData.append('EmployeeDetailId', empId);
    formData.append('SkillAchievementId', Achievement);
    formData.append('SkillExpertiseId', skills.SkillExpertiseId);
    formData.append('RenewalDate', skills.RenewalDate);

    if (skills.SkillConfigurationId != '' && Achievement) {
      let url = 'EmployeeSkill/CreateEmployeeSkills';
      let response = await service.createNewSkillRequest(
        url,
        formData,
        bearerToken
      );
      if (response.status === 200) {
        showMessage(response.data, 'success');
        GetSkillsListData();
      } else {
        showMessage(response.data, 'error');
      }

      /* jwtInterceptor
        .post(url, formData)
        .then((response) => {
          showMessage(response.data, "success");
          GetSkillsListData();
        })
        .catch((err) => {
          showMessage(err.message, "error");
        });*/

      setOpen((pre: any) => !pre);
    } else {
      showMessage('Select Skill and Achievement values', 'error');
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      if (bearerToken) {
        initialized.current = true;
        GetSkillsListData();
        GetSkillsConfigurationListData();
        GetSkillsExpertsConfigurationListData();
      } else {
        window.location.href =
          'https://kind-rock-0f8a1f603.5.azurestaticapps.net/login';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t, i18n } = useTranslation();

  const [filesName, setFilesName] = useState<any>(null)

  return (
    <>
      <EnhancedTable
        head={headCells}
        rows={skillsData}
        isAddable={true}
        onAddClick={() => setOpen((pre: any) => !pre)}
        loading={loading}
        title={t('Employee Skills')}
        btnTitle="+ New Skill"
      />

      <BaseModal
        open={open}
        handleClose={() => { setFilesName(null); setOpen((pre: any) => !pre) }}
        onSave={() => {
          setFilesName(null);
          onSkillSave();
        }}
        title='Skill Management - New Skill'
      >
        <Grid
          container
          spacing='20px'
          sx={{
            overflowX: 'hidden',
          }}
        >
          <Grid item xs={12} sm={6}>
            <Typography className='SmallBody' fontWeight={500}>
              {t('Skill')}
            </Typography>

            <Select
              variant='outlined'
              placeholder={t('Select Skill')}
              name='SkillConfigurationId'
              value={`${skillsList?.find((item: any) => {
                return (
                  item?.skillConfigurationId === skills?.SkillConfigurationId
                );
              })?.skill || ''
                }`}
              onChange={(e: any) => {
                inputChange(e);
              }}
              sx={{
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': {
                  border: 0,
                },
                borderRadius: '10px'
              }}
            >
              <MenuItem disabled value=''>
                <em>{t('Expertise')}</em>
              </MenuItem>

              {skillsList.map((item: any, i: any) => (
                <MenuItem value={item.skillConfigurationId} key={i}>
                  {t(item.skill)}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography className='SmallBody' fontWeight={500}>
              {t('Expertise')}
            </Typography>

            <Select
              variant='outlined'
              style={{
                background: 'transparent',
                outline: 'none',
              }}
              value={`${experts?.find((item: any) => {
                return item?.skillExpertiseId === skills?.SkillExpertiseId;
              })?.expertise || ''
                }`}
              placeholder={t('Select Expertise')}
              name='SkillExpertiseId'
              onChange={(e: any) => {
                inputChange(e);
              }}
              sx={{
                borderRadius: '10px'
              }}
            >
              <MenuItem disabled value=''>
                <em>{t('Expertise')}</em>
              </MenuItem>
              {experts.map((item: any, i: any) => (
                <MenuItem value={item.skillExpertiseId} key={i}>
                  {t(item.expertise)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className='SmallBody' fontWeight={500}>
              {t('Achievement Score')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '8px',
                mt: '10px',
              }}
            >
              {[...Array(6)].map((_, num) => (
                <ToggleButton
                  value={''}
                  selected={num === Achievement}
                  style={{
                    color: 'black',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    backgroundColor:
                      num === Achievement ? '#D3ECFF' : 'transparent',
                  }}
                  onClick={() => setAchievement(num)}
                >
                  {num}
                </ToggleButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography className='SmallBody' fontWeight={500}>
              {t('Renewel Date')}
            </Typography>

            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={i18n.language}
            >
              <DatePicker
                slots={{
                  openPickerIcon: CalendarIcon
                }}
                sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 0,
                  },
                  borderRadius: '10px'
                }}
                onChange={inputDateChange} format='DD/MM/YYYY' />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className='SmallBody' fontWeight={500}>
              {t('Score')}
            </Typography>
            <Box
              sx={{
                mt: '10px',
              }}
            >
              {[...Array(6)].map((_, num) => (
                <span
                  key={num}
                  style={{ display: 'block', textTransform: 'capitalize' }}
                >
                  {num} {t(score[num])}
                </span>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className='SmallBody' fontWeight={500}>
              {t('Attachments')}
            </Typography>
            <br />

            <DragAndDrop
              edit={true}
              onChangeFile={(e: any) => setFileInformation(e.target.files[0])}
              setFilesName={setFilesName}
              sx={{
                minHeight: '170px',
                maxWidth: '234px',
                mx: 'auto'
              }}
            />
          </Grid>
          {filesName && (
            <Grid item sx={{ display: 'flex', columnGap: '16px' }}>
              <FileIcon />
              <Typography variant="body1">
                {filesName}
              </Typography>
            </Grid>
          )}
        </Grid>
      </BaseModal>

      <DeleteModal
        open={deleteModal}
        onCancel={() => setDeleteModal((pre: any) => !pre)}
        title=''
        description='Do you want to delete the registered skill ?'
        onConfirm={() => onConfirmationDelete()}
      />
    </>
  );
}

export default EmployeeSkillsTable;
