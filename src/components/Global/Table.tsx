/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Add } from '@mui/icons-material';
import { Button, CircularProgress, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReactDOMServer from 'react-dom/server';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '../../assets/images/Search.svg';
import EmployeeInfoModal from '../Global/EmployeeInfoModal';
import DragAndDrop from './DragAndDrop';

function descendingComparator(a: any, b: any, orderBy: any) {
  let aValue = a[orderBy];
  let bValue = b[orderBy];

  try {
    if (typeof aValue !== 'string' && typeof aValue !== 'number') {
      const aString = ReactDOMServer.renderToString(aValue);
      aValue = extractValueFromRenderedString(aString); // extractValue is your method to get value from string
    }

    if (typeof bValue !== 'string' && typeof bValue !== 'number') {
      const bString = ReactDOMServer.renderToString(bValue);
      bValue = extractValueFromRenderedString(bString);
    }
    if (bValue < aValue) return -1;
    if (bValue > aValue) return 1;
    return 0;
  } catch (error) {
    return 0;
  }
}

function extractValueFromRenderedString(renderedString: any) {
  const regex = />([^<]+)</;
  const match = renderedString.match(regex);
  const retVal = match ? match[1].trim() : null;

  return retVal;
}

function getComparator(order: any, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array: any, comparator: any) {
  const stabilizedThis = array?.map((el: any, index: any) => [el, index]);
  stabilizedThis?.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el: any) => el[0]);
}

function EnhancedTableHead(props: any) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        {headCells?.map((headCell: any) => (
          <TableCell
            key={headCell?.id}
            align={
              headCell?.label === 'Action' || headCell?.label === 'Actions' || headCell?.label === 'No. of Days'
                ? 'center'
                : 'left'
            }
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: 'gray',
            }}
            sortDirection={orderBy === headCell?.id ? order : false}
          >
            {headCell?.label === 'Action' || headCell?.label === 'Actions' ? (
              t(headCell?.label) // Directly display the label if it's "Action"
            ) : (
              <TableSortLabel
                active={orderBy === headCell?.id}
                direction={orderBy === headCell?.id ? order : 'asc'}
                onClick={createSortHandler(headCell?.id)}
              >
                {t(headCell?.label)}
                {orderBy === headCell?.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc'
                      ? t('sorted descending')
                      : t('sorted ascending')}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// EnhancedTableHead?.propTypes = {
//   numSelected: PropTypes?.number?.isRequired,
//   onRequestSort: PropTypes?.func?.isRequired,
//   onSelectAllClick: PropTypes?.func?.isRequired,
//   order: PropTypes?.oneOf(['asc', 'desc'])?.isRequired,
//   orderBy: PropTypes?.string?.isRequired,
//   rowCount: PropTypes?.number?.isRequired,
//   title: PropTypes?.string,
// };

// Updated proptypes
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes?.number?.isRequired,
  title: PropTypes?.string, // Added this line to define the 'title' prop
  isAddable: PropTypes?.any?.isRequired,
  onAddClick: PropTypes?.any?.isRequired,
  btnTitle: PropTypes?.string?.isRequired,
};

function EnhancedTableToolbar(props: any) {
  const { numSelected, isAddable, onAddClick, title, btnTitle }: any = props;
  const { t } = useTranslation();
  const [search, setSearch] = React.useState<any>('');

  return (
    <Toolbar
      sx={{
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
        rowGap: '12px',
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme?.palette?.primary?.main,
              theme?.palette?.action?.activatedOpacity
            ),
        }),
      }}
    >
      {title &&
        (numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color='inherit'
            variant='subtitle1'
            component='div'
          >
            {numSelected} {t('selected')}
          </Typography>
        ) : (
          <Typography
            // variant='h6'
            id='tableTitle'
            component='div'
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { sm: 'center' },
              rowGap: '12px',
              width: '100%',
              fontSize: { xs: '16px', sm: '20px' },
              fontWeight: { xs: '400', sm: '500' },
              lineHeight: { sm: '22px' }
            }}
          >
            {t(props?.title)}

            <Box
              sx={{
                display: 'flex',
                gap: '5px',
                borderBottom: '1px solid #476179',
                marginRight: { sm: '40px' },
                padding: '10px 0',
              }}
            >
              <img src={SearchIcon} alt='Search Icon' />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type='text'
                placeholder='Search'
                style={{
                  color: '#888888',
                  fontSize: '16px',
                  border: 'none',
                  outline: 'none',
                }}
              />
            </Box>
          </Typography>
        ))}

      {numSelected > 0 && (
        <Tooltip title={t('Delete')}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {isAddable && (
        <Box
          sx={{
            ml: { sm: 'auto' },
            minWidth: '150px',
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          <Button
            variant='outlined'
            sx={{
              paddingX: '4',
              paddingY: '10px',
              minWidth: '100px',
              '@media (max-width: 600px)': {
                minWidth: 'auto',
              },
            }}
            onClick={onAddClick}
          >
            {btnTitle == 'Upload' ? (
              <>
                <CloudUploadIcon />
                {btnTitle}
              </>
            ) : btnTitle == 'Add New' || btnTitle == 'Manual Entry' ? (
              <>
                <Add />
                {btnTitle}
              </>
            ) : (
              btnTitle
            )}
          </Button>
        </Box>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes?.number?.isRequired,
};

export default function EnhancedTable({
  title,
  navTabs,
  head,
  rows,
  isAddable = false,
  onAddClick,
  sx = {},
  hidePagination = false,
  loading,
  btnTitle,
  modal = false,
  setFileInformation,
  showPreview = false,
  setShowPreview = () => { }
}: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = useTheme();
  const [order, setOrder] = React.useState<any>('asc');
  const [orderBy, setOrderBy] = React.useState<any>(
    (head && head?.find((item: any) => item?.isDefaultSort)?.id) ||
    (head && head[0]?.id)
  );
  const [selected, setSelected] = React.useState<any>([]);
  const [page, setPage] = React.useState<any>(0);
  const [dense, setDense] = React.useState<any>(false);
  const [rowsPerPage, setRowsPerPage] = React.useState<any>(5);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null); // To store data for the modal
  const [dataAction, setDataAction] = React.useState(null);

  const { t } = useTranslation();

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event: any) => {
  //   if (event.target.checked) {
  //     const newSelected = rows.map((n: any, index: any) => {
  //       console.log(n, "adil xxx");
  //     });
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const openModal = (data: any) => {
    setModalData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    setShowPreview(false);
    setDataAction(null);
  };

  const isSelected: any = (name: any) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rows, rowsPerPage]
  );

  React.useEffect(() => {
    if (showPreview) {
      openModal(dataAction);
    }
  }, [showPreview])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        sx={{
          width: '100%',
          mb: 2,
          boxShadow: 'none',
          background: 'transparent',
          border: 'none',
        }}
      >
        {(isAddable || title) && (
          <EnhancedTableToolbar
            numSelected={selected.length}
            title={t(title)}
            isAddable={isAddable}
            onAddClick={onAddClick}
            btnTitle={btnTitle ? btnTitle : ''}
          />
        )}
        {typeof navTabs === 'function' ? navTabs() : null}
        <TableContainer>
          <Grid container gap={10}>
            <Grid item xs={12} md={modal ? 8 : 12}>
              <Table
                sx={{ minWidth: 620, ...sx }}
                aria-labelledby='tableTitle'
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  rowCount={rows.length}
                  headCells={head}
                  order={order}
                  orderBy={orderBy}
                  // onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {visibleRows.length > 0 ? (
                    visibleRows.map((row: any, index: any) => {
                      const isItemSelected = isSelected(row.name);
                      return (
                        <TableRow
                          hover
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={`${row.name}-${index}`}
                          selected={isItemSelected}
                          sx={{ cursor: 'pointer' }}
                        >
                          {Object.keys(row).map((key, index) => {
                            return (
                              <TableCell
                                key={index}
                                onClick={() => {
                                  if (key === 'fullName') {
                                    openModal(row); // Open modal when 'status' field is clicked
                                  } else if (key === 'Action') {
                                    setDataAction(row);
                                  }
                                }}
                                sx={{
                                  fontWeight: '500',
                                  fontSize: 12,
                                  wordWrap: 'break-word',
                                  whiteSpace: 'normal',
                                  maxWidth: 200, // Adjust this value as needed
                                }}
                                align={key === 'action' ? 'center' : 'left'}
                              >
                                {row[key]}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={head?.length} align='center'>
                        {loading ? <CircularProgress /> : t('No data found')}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Grid>

            {modal && <Grid item xs={12} md={3}>
              <Typography className='SmallBody'>{t('Attachment')}</Typography>

              <DragAndDrop
                edit={true}
                allowMultiple
                onChangeFile={(e: any) => setFileInformation(e.target.files)}
              />
            </Grid>}
          </Grid>
        </TableContainer>
        {!hidePagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
      <EmployeeInfoModal
        open={modalOpen}
        onClose={closeModal}
        employeeData={modalData}
      />
    </Box>
  );
}
