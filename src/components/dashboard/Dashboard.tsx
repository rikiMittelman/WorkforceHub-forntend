import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Modal } from '../../public/components/modal/modal';
import GlobalStore from '../../store/GlobalState';
import { EditEmployee } from '../employees/EditEmployee';
import { Table } from './Table';
import './style.css'
import {Typography} from '@mui/material';

const Dashboard: React.FC = observer(() => {

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleEditModalClick = (isNew: boolean) => {
    GlobalStore.setIsNewEmployee(isNew);
    setOpenEditModal(true);
  }
  const handleCloseEditClick = () => {
    setOpenEditModal(false);
  }

  const deleteEmployee = () => {
    GlobalStore.deleteEmployee();
    setOpenDeleteModal(false);
    // setSaveChangesModal(true);
  }



  return (
    <>
     <Typography variant={'h4'} py={3}>
          Employees
        </Typography>
      <Table
        setOpenDeleteModal={setOpenDeleteModal}
        handleEditModalClick={handleEditModalClick}
      />
      <Modal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        firstButtonText={'Cancel'}
        secondButtonText={"Delete"}
        title={"Delete Employee"}
        content={"Are you sure you want to delete this employee?"}
        handleFirstButton={handleCloseDeleteModal}
        handleSecondButton={deleteEmployee}

      />
      <EditEmployee
        displayEditEmployee={openEditModal}
        closeEditEmployee={handleCloseEditClick}
      />
    </>
  );
});
export default Dashboard;
