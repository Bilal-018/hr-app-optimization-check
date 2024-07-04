import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';

interface LanguageSelectorProps {
  isTablet: boolean;
}

const languages: string[] = ['English', 'French'];

export default function LanguageSelector({
  isTablet,
}: LanguageSelectorProps): JSX.Element {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language === 'en' ? 'English' : 'French'
  );

  const theme = useTheme();

  const handleChange = (event: any, value: any) => {
    setSelectedLanguage(event.target.value as string);
  };

  const changeLanguage = (language: string) => {
    const lng =
      language === 'English' ? 'en' : language === 'Spanish' ? 'es' : 'fr';
    localStorage.setItem('lng', lng);
    i18n.changeLanguage(lng);
    // set language in local storage
  };

  return (
    <FormControl
      sx={{
        minWidth:{xs: 116, md:120},
        // ...(isTablet && {
        //   width: '100%',
        // }),
      }}
      size='small'
    >
      <Select
        value={selectedLanguage}
        onChange={handleChange}
        sx={(theme) => ({
          background: theme.palette.background.default,
          padding: '8px',
          margin: 0,
          '.Mui-focused': {
            borderBottom: 'none',
          },
          fieldset: {
            border: 'none',
          },
        })}
        MenuProps={{
          sx: (theme) => ({
            '.MuiPaper-root': {
              borderTop: 'none',
              borderRadius: '10px',
              border: '1px solid white !important',
              boxShadow: '1px 1px 40px 0px #e7e9ed',
            },
          }),
        }}
      >
        {languages.map((language) => (
          <MenuItem
            sx={{
              backgroundColor:
                language === selectedLanguage && theme.palette.mode === 'light'
                  ? '#e7e9ed !Important'
                  : language === selectedLanguage &&
                    theme.palette.mode !== 'light'
                  ? '#575866 !important'
                  : theme.palette.mode === 'light'
                  ? 'white !important'
                  : '#2b2d3e !important',
              borderRadius: '5px',
            }}
            value={language}
            selected={language === selectedLanguage}
            key={language}
            onClick={() => changeLanguage(language)}
          >
            {t(language)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
