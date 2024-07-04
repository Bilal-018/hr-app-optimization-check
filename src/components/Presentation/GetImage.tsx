import { Stack, Typography } from '@mui/material';
import React from 'react';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import SlideshowIcon from '@mui/icons-material/Slideshow';

const FileTypeIcons = {
  pdf: {
    icon: <PictureAsPdfIcon color='info' />,
    title: 'PDF',
  },
  doc: {
    icon: <ArticleIcon color='info' />,
    title: 'DOC',
  },
  docx: {
    icon: <ArticleIcon color='info' />,
    title: 'DOCX',
  },
  ppt: {
    icon: <SlideshowIcon color='info' />,
    title: 'PPT',
  },
  pptx: {
    icon: <SlideshowIcon color='info' />,
    title: 'PPTX',
  },
  pptm: {
    icon: <ArticleIcon color='info' />,
    title: 'PPTM',
  },
  exe: {
    icon: <ArticleIcon color='info' />,
    title: 'EXE',
  },
};

function GetImage({ presentation, styles = {} }: any) {
  const fileType = presentation.name.split('.')[1];

  // const content = FileTypeIcons[fileType.toLowerCase()] || {};
  const content =
    FileTypeIcons[fileType.toLowerCase() as keyof typeof FileTypeIcons] || {};

  return (
    <>
      {content?.icon ? (
        <Stack
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          spacing={2}
          height={'100%'}
        >
          {content?.icon}
          <Typography variant='h5'>{content?.title}</Typography>
        </Stack>
      ) : (
        <img src={presentation.url} alt={presentation.name} style={styles} />
      )}
    </>
  );
}

export default GetImage;
