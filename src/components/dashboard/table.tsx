import React, { useState } from 'react';
import { Button, IconButton, Table as MuiTable } from '@mui/material';
import { observer } from 'mobx-react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TextField,TableContainer } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
// import Button from '../../public/components/button/button';
import SearchIcon from '@mui/icons-material/Search';
import GlobalState from '../../store/GlobalState';
import { Gender } from '../../types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
interface TableProps {
  // setOpenEditModal: (arg: boolean) => void;
  setOpenDeleteModal: (arg: boolean) => void;
  handleEditModalClick: (arg: boolean) => void;
  setEmployee: (arg: any) => void,
}
//כן
export const Table: React.FC<TableProps> = observer((props) => {
  const { setOpenDeleteModal, handleEditModalClick, setEmployee } = props;
//כן
  const handleAddButtonClick = () => {
    setEmployee({
      firstName: '',
      lastName: '',
      identity: '',
      startWorkDate: new Date(),
      dateOfBirth: new Date(),
      gender: Gender.Male,
      status: true,
      roles: []
    });
    handleEditModalClick(true); // Or pass the appropriate boolean value
  };
  //לא
  const [searchTerm, setSearchTerm] = useState("");
  // const [employeesList, setEmployeesList] = useState("");

  const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
//חיפוש
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  //מיון לפי 
  const handleSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };



  const renderSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };
//הצגת עובדים לפי החיפוש
  const filteredEmployees = GlobalState.employees.filter((employee) => {
    // Check if the search term is found in any of the employee fields
    const startWorkDateString = new Date(employee.startWorkDate).toLocaleDateString();
    return (
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.identity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startWorkDateString.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }).slice()
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const key: keyof typeof a = sortConfig.key as keyof typeof a;
      if (a[key] < b[key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    })
    ;

   
  return (

    <div className="table-wrapper">
      <TableContainer component={Paper} sx={{ border: '1px solid black' }}>

        {/* <Button
          variant="outlined" startIcon={<PersonAddIcon />}
          handleClick={handleAddButtonClick}
        >Add Employee
        </Button> */}
        
        {/* כן */}
        <Button variant="contained" startIcon={<PersonAddIcon />} onClick={handleAddButtonClick}>
        Add Employee
        </Button>
        <div>
          {/* <input
            type="text"
            
            placeholder="Search employees"
            value={searchTerm}
            onChange={handleSearchChange}
          /> */}
          {/* //חיפוש */}
          <TextField
      variant="outlined"
      placeholder="Search"
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
          {/* <ul>
          {filteredEmployees.map((employee) => (
            <li key={employee.id}>
              {employee.firstName} - {employee.lastName}
            </li>
          ))}
        </ul> */}
        </div>
        <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableCell sx={{ width: '20%', fontWeight: 'bold',textAlign: 'center',backgroundColor:'#fafafa' }} onClick={() => handleSort('firstName')}>
              First Name {renderSortIcon('firstName')}</TableCell>
            <TableCell sx={{ width: '20%', fontWeight: 'bold' ,textAlign: 'center',backgroundColor:'#f5f5f5'}} onClick={() => handleSort('lastName')}>
              Last Name  {renderSortIcon('lastName')}</TableCell>
            <TableCell sx={{ width: '20%', fontWeight: 'bold' ,textAlign: 'center'}}> Identity</TableCell>
            <TableCell sx={{ width: '20%', fontWeight: 'bold' ,textAlign: 'center'}} onClick={() => handleSort('startWorkDate')}>
              Start Working  {renderSortIcon('startWorkDate')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold' ,textAlign: 'center'}}> Edit</TableCell>
            <TableCell sx={{ fontWeight: 'bold',textAlign: 'center' }}> Delete</TableCell>
          </TableHead>
          <TableBody>
            {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:nth-child(odd)': { backgroundColor: '#f5f5f5' }, // Apply light blue background to odd rows
                  '&:nth-child(even)': { backgroundColor: 'white' }, // Apply white background to even rows
                }}
              >
                <TableCell sx={{ textAlign: 'center' }}>{employee.firstName}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{employee.lastName}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{employee.identity}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{new Date(employee.startWorkDate).toLocaleDateString()}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton  aria-label="edit" onClick={() => {
                    setEmployee(employee);
                    handleEditModalClick(false)
                  }
                  }>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {/* <button onClick={() => setOpenDeleteModal(true)}>delete</button> */}
                  <IconButton aria-label="delete" onClick={() => {
                    setEmployee(employee);
                    setOpenDeleteModal(true)
                  }}>
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
          <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
});