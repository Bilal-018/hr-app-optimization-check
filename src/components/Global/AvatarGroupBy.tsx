import { Avatar, AvatarGroup } from '@mui/material';
import React from 'react';

function AvatarGroupBy({ images, onClick = () => {} }: any) {
  console.log('Images', images);
  return (
    <AvatarGroup
      max={5}
      sx={{
        justifyContent: 'flex-end',
        alignItems: 'center',

        '.MuiAvatar-colorDefault': {
          fontSize: '14px',
          borderRadius: '19px',
          height: 'fit-content',
          width: 'fit-content',
          padding: '5px 10px',
          backgroundColor: '#18A0FB',
          color: '#fff',
        },
      }}
    >
      {images.map((image: any, i: any) => (
        <Avatar
          alt='Remy Sharp'
          src={image}
          key={i}
          onClick={() => onClick(i)}
          sx={{
            minHeight: '30px',
            minWidth: '20px',
            borderRadius: '100px',
          }}
        />
      ))}
    </AvatarGroup>
  );
}

export default AvatarGroupBy;
