/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import EditAndSave from '../../../Global/EditAndSave';
import DragAndDrop from '../../../Global/DragAndDrop';
import { validateBankDetails } from '../../../../utils/validation';
import jwtInterceptor from '../../../../services/interceptors';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from '../../../Global/WithSnackbar';

const intialBankDetails = {
  EmployeeDetailId: 0,
  bankName: null,
  location: null,
  bankCodeType: null,
  bankCodeCategory: null,
  bankCode: null,
  accountNumber: null,
  confirmAccountNumber: null,
  file: null,
};
const bankreducer = (state: any, action: any) => {
  switch (action.type) {
    case 'bank':
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

function BankAccount() {
  const [preState, setPreState] = useState<any>([]);
  //const [mybankDetails, setbankDetailsSate] = useState(intialBankDetails);
  const [mybankDetails, bankdispatch] = useReducer(
    bankreducer,
    intialBankDetails
  );
  const { showMessage }: any = useSnackbar();
  const [errors, setErrors] = useState<any>([]);
  const [edit, setEdit] = useState<any>(false);
  const [file, setFile] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState<any>(null);
  const [name, setName] = useState<any>('');
  const initialized = useRef(false);

  const bearerToken = sessionStorage.getItem('token_key');
  const empId: any = sessionStorage.getItem('empId_key');
  //
  const getBanAccountData = async () => {
    jwtInterceptor
      .get('api/EmployeeBankDetail/GetBankDetails?EmployeeDetailId=' + empId)
      .then((response: any) => {
        bankdispatch({
          type: 'serviceData',
          field: '',
          value: response.data,
        });
      });
  };
  //

  const updateBanAccountData = async () => {
    const formData = new FormData();
    console.log(mybankDetails);
    formData.append('file', file);
    // formData.append("name", name); filename is not required at any of the place
    formData.append('BankName', mybankDetails.bankName);
    formData.append('Location', mybankDetails.location);
    formData.append('BankCode', mybankDetails.bankCode);
    formData.append('AccountNumber', mybankDetails.accountNumber);
    formData.append('ConfirmAccountNumber', mybankDetails.confirmAccountNumber);
    formData.append('EmployeeDetailId', empId);

    if (file) {
      let url = 'api/EmployeeBankDetail/AddUpdateBankDetails';
      /*let response = await profileService.uploadBankDocumentRequest(
        url,
        formData,
        bearerToken
      );*/

      jwtInterceptor.post(url, formData).then((response: any) => {
        showMessage(response.data, 'success');
      });
    }
  };

  const uploadBankDocument = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    if (file) {
      let url =
        'api/EmployeeBankDetail/UploadBankAttachment?EmployeeDetailId=' + empId;
      /* let response = await profileService.uploadBankDocumentRequest(
        url,
        formData,
        bearerToken
      );*/

      jwtInterceptor.post(url, formData).then((response: any) => {
        showMessage(response.data, 'success');
      });
    }
  };

  const btn_update_click = () => {
    const errorsFound = validateBankDetails({
      bankName: mybankDetails.bankName,
      location: mybankDetails.location,
      bankCode: mybankDetails.bankCode,
      accountNumber: mybankDetails.accountNumber,
      // confirmAccountNumber: mybankDetails.confirmAccountNumber,
    });

    if (file === null) {
      errorsFound.push('file');
    }

    if (errorsFound.length > 0) {
      setErrors(errorsFound);
      return;
    }

    setEdit(false);

    updateBanAccountData();
  };

  const inputChange = (e: any) => {
    const val = e.target.value;
    const name = e.target.name;
    bankdispatch({
      type: 'bank',
      field: name,
      value: val,
    });
  };

  const setFileInformation = (file: any) => {
    setFile(file);
    setName(file.name);

    const fileObjectUrl = URL.createObjectURL(file);
    setFileUrl(fileObjectUrl);
  };

  useEffect(() => {
    if (!initialized.current) {
      if (bearerToken) {
        initialized.current = true;
        getBanAccountData();
      } else {
        window.location.href =
          'https://kind-rock-0f8a1f603.5.azurestaticapps.net/login';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasError = (field: any) => {
    return errors.includes(field);
  };

  const { t } = useTranslation();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* <Typography
          className='LargeBody'
          sx={{
            minWidth: '120px',
          }}
        >
          {t('Bank details')}
        </Typography> */}
        <EditAndSave
          edit={edit}
          setEdit={setEdit}
          onUpdate={() => {
            btn_update_click();
          }}
          onCancel={() => {
            bankdispatch({
              type: 'reset',
              field: '',
              value: '',
            });
            setErrors([]);
            setFile(null)
            setFileUrl(null)
          }}
          onSave={() => {
            setPreState(mybankDetails);
            setFile(null)
            setFileUrl(null)
          }}
        />
      </Box>

      <Grid
        item
        className='section-border'>

        <Typography
          className='LargeBody'
          sx={{
            fontWeight: 'bold',
            fontSize: '20px',
          }}
        >
          {t('Bank details')}
        </Typography>
        <Grid container>
          <Grid container sm={12} md={5.9} lg={5.8}>
            <Grid container mt='21px' gap='20px'>
              <Grid item xs={12} sm={5.75}>
                <Typography className='SmallBody'>{t('Bank Name')}</Typography>
                <TextField
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      backgroundColor: 'gray',
                      border: '0',
                      outline: 0,
                      '& fieldset': {
                        border: '0',
                      },
                      '&:hover fieldset': {
                        border: '0',
                      },
                      '&.Mui-focused fieldset': {
                        border: '0',
                      },
                    },
                  }}
                  variant='outlined'
                  placeholder={`${t('Enter Bank Name')}`}
                  name='bankName'
                  onChange={inputChange}
                  value={mybankDetails.bankName}
                  error={hasError('bankName')}
                  disabled={!edit}
                  helperText={
                    hasError('bankName') ? t('Please enter bank name') : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={5.75}>
                <Typography className='SmallBody'>{t('Location')}</Typography>
                <TextField
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      backgroundColor: 'gray',
                      border: '0',
                      outline: 0,
                      '& fieldset': {
                        border: '0',
                      },
                      '&:hover fieldset': {
                        border: '0',
                      },
                      '&.Mui-focused fieldset': {
                        border: '0',
                      },
                    },
                  }}
                  variant='outlined'
                  placeholder={`${t('Enter Location')}`}
                  name='location'
                  onChange={inputChange}
                  value={mybankDetails.location}
                  error={hasError('Location')}
                  disabled={!edit}
                  helperText={
                    hasError('location') ? t('Please enter location') : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={5.75}>
                <Typography className='SmallBody'>{t('Bank Code')}</Typography>
                <TextField
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      backgroundColor: 'gray',
                      border: '0',
                      outline: 0,
                      '& fieldset': {
                        border: '0',
                      },
                      '&:hover fieldset': {
                        border: '0',
                      },
                      '&.Mui-focused fieldset': {
                        border: '0',
                      },
                    },
                  }}
                  variant='outlined'
                  placeholder={`${t('Bank Code')}`}
                  name='bankCode'
                  onChange={inputChange}
                  value={mybankDetails.bankCode}
                  error={hasError('bankCode')}
                  disabled={!edit}
                  helperText={
                    hasError('bankCode') ? t('Please enter bank code') : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={5.75}>
                <Typography className='SmallBody'>
                  {t('Account Number')}
                </Typography>
                <TextField
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      backgroundColor: 'gray',
                      border: '0',
                      outline: 0,
                      '& fieldset': {
                        border: '0',
                      },
                      '&:hover fieldset': {
                        border: '0',
                      },
                      '&.Mui-focused fieldset': {
                        border: '0',
                      },
                    },
                  }}
                  variant='outlined'
                  placeholder={`${t('Enter Account Number')}`}
                  name='accountNumber'
                  onChange={inputChange}
                  value={mybankDetails.accountNumber}
                  type='number'
                  disabled={!edit}
                  error={hasError('accountNumber')}
                  helperText={
                    hasError('accountNumber')
                      ? t('Please enter account number')
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={5.75}>
                <Typography className='SmallBody'>
                  {t('Guichet Number (if applicable)')}
                </Typography>
                <TextField
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      backgroundColor: 'gray',
                      border: '0',
                      outline: 0,
                      '& fieldset': {
                        border: '0',
                      },
                      '&:hover fieldset': {
                        border: '0',
                      },
                      '&.Mui-focused fieldset': {
                        border: '0',
                      },
                    },
                  }}
                  variant='outlined'
                  placeholder={`${t('Guichet Number')}`}
                  name='confirmAccountNumber'
                  onChange={inputChange}
                  type='number'
                  value={mybankDetails.confirmAccountNumber}
                  error={hasError('confirmAccountNumber')}
                  disabled={!edit}
                  helperText={
                    hasError('confirmAccountNumber')
                      ? t('Please enter confirm account number')
                      : null
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {edit && (
            <Grid
              container
              sm={12}
              md={5.9}
              lg={5.8}
              flexDirection='column'
              alignContent='flex-end'
            >
              <Typography className='SmallBody'>{t('Attachment')}</Typography>
              <DragAndDrop
                edit={edit}
                onChangeFile={(e: any) => setFileInformation(e.target.files[0])}
                error={edit && hasError('file')}
                defaultFileName={mybankDetails.attachmentFileName}
              />
            </Grid>
          )}
        </Grid>
      </Grid>

    </Box>
  );
}

export default BankAccount;
