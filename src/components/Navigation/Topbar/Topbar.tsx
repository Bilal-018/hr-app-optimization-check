import React, { useContext, useState } from 'react';
import { TopbarRoot } from './Topbar.styles';
import { Box, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import Favorites from './Favorites/Favorites';
import ModeSwitch from './ModeSwitch';
import UserInfo from './UserInfo/UserInfo';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { themeContext } from '../../../theme';
import grey from '../../../assets/images/grey.png';
// import Bell from '../../../assets/images/bell.svg';
// import Bell_Active from '../../../assets/images/bell_active.svg';

interface RenderMenuProps {
  isMobile: boolean;
  children: React.ReactNode;
}

const RenderMenu: React.FC<RenderMenuProps> = ({ isMobile, children }) => {
  const [open, setOpen] = useState(false);
  return isMobile ? (
    <>
      <MenuIcon onClick={() => setOpen(true)} />
      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <Stack direction={'column'} sx={{ height: '100%', p: 2 }}>
          {children}
        </Stack>
      </Drawer>
    </>
  ) : (
    <>{children}</>
  );
};

interface TopbarProps {
  favs: any; // Adjust type as per your requirements
  refetchFavs: () => void;
}

function Topbar({ favs, refetchFavs }: TopbarProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const { pathname } = useLocation();
  const { myTheme } = useContext(themeContext) as any;
  // const [notification, setNotification] = useState<any>(false);

  return (
    <TopbarRoot
      sx={{
        justifyContent: pathname === '/' ? 'space-between' : 'flex-end',
        // ...(isTablet && {
        //   p: '25px',
        // }),
        width: '100%'
      }}
    >
      {pathname === '/' && (
        <img
          src={myTheme.logo}
          alt='logo'
          style={{
            width: '150px',
            height: 'auto',
            // mr: "auto",
          }}
        />
      )}

      {/* <RenderMenu isMobile={isTablet}> */}
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            // flexDirection: isTablet ? 'column' : 'row',
            alignItems: 'center',
            position: 'relative',
            gap: {xs:'12px !important', md: '24px !important'}
          }}
        >
          {/* <img
            src={grey}
            alt='img'
            style={{
              position: 'absolute',
              left: '200px',
              // zIndex: '100',
              top: '0px',
            }}
          /> */}

          <div
            style={{
              display: matches ? 'block' : 'none',
              position: 'absolute',
              top: 0,
              // right: '180px',
              left: '55%',
              borderRadius: '113px',
              background: 'rgba(9, 44, 76, 0.70)',
              filter: 'blur(75px)',
              height: '113px',
              width: '110px'
            }}></div>

          <LanguageSelector isTablet={isTablet} />
          <Favorites
            isTablet={isTablet}
            favs={favs}
            getFavsData={refetchFavs}
          />

          {/* <img
            onClick={() => {
              setNotification(!notification);
            }}
            src={notification ? Bell_Active : Bell}
            alt='Notification'
            style={{
              cursor: 'pointer',
            }}
          /> */}

          {/* <Notifications isTablet={isTablet} /> */}
          {/* <Badge color="error" overlap="circular" badgeContent="" variant="dot">
            <NotificationsIcon isTablet={isTablet} />
          </Badge> */}
          <ModeSwitch isTablet={isTablet} />
          <UserInfo />
        </Box>
      {/* </RenderMenu> */}
    </TopbarRoot>
  );
}

export default Topbar;
