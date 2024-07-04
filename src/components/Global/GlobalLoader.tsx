import { LinearProgress } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';
import BaseModal from './Modal';
import { useTranslation } from 'react-i18next';

const LoaderContext: any = createContext('');

export const useLoader = () => {
  return useContext(LoaderContext);
};

export const ProgressLoader = ({ loading }: any) => {
  const { t } = useTranslation();

  return (
    <BaseModal
      open={loading}
      handleClose={() => {}}
      title={t('Please wait...')}
      showSaveButton={false}
      isCloseIcon={false}
    >
      <LinearProgress />
    </BaseModal>
  );
};

function GlobalLoader({ children }: any) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <ProgressLoader loading={loading} />}
    </LoaderContext.Provider>
  );
}

export default GlobalLoader;
