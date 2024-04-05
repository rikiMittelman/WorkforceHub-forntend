import React from 'react';
import { IconButton, Table as MuiTable } from '@mui/material';
import { observer } from 'mobx-react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TableContainer } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '../../public/components/button/button';
import GlobalState from '../../store/GlobalState';

interface TableProps {
  setOpenEditModal: (arg: boolean) => void;
  setOpenDeleteModal: (arg: boolean) => void;
  handleAddNewClick: () => void;
}

export const Table: React.FC<TableProps> = observer((props) => {
  const { setOpenEditModal, setOpenDeleteModal, handleAddNewClick } = props;

  return (
    <TableContainer component={Paper}>
      <Button
        text={"Add Employee"}
        handleClick={handleAddNewClick}
      />
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableCell> "First Name"</TableCell> 
            <TableCell> "Last Name"</TableCell>
            <TableCell> "Identity"</TableCell>
            <TableCell> "Start Working"</TableCell>
            <TableCell> "Edit"</TableCell>
            <TableCell> "Delete"</TableCell>
        </TableHead>
        <TableBody>
          {GlobalState.employees.map((employee, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell>{employee.firstName}</TableCell>
               <TableCell>{employee.lastName}</TableCell>
               <TableCell>{employee.identity}</TableCell>
               <TableCell>{employee.startWorkDate.toLocaleDateString}</TableCell>            
              <TableCell>
                <IconButton aria-label="edit" onClick={() => setOpenEditModal(true)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                {/* <button onClick={() => setOpenDeleteModal(true)}>delete</button> */}
                <IconButton aria-label="delete" onClick={() => setOpenDeleteModal(true)}>
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
});
