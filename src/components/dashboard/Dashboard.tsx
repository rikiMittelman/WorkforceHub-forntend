import { Table } from './table';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Modal } from '../../public/components/modal/modal';
import FormValidation from './NewEmployeeForm';
import FormValidationEdit from './EditEmployeeForm';
import GlobalStore from '../../store/GlobalState';
import { addNewEmployee } from '../../Api';
// import FormValidation from './FormValidation';

const Dashboard: React.FC = observer(() => {

  useEffect(() => {
     GlobalStore.getEmployees();
     GlobalStore.getAllRoles();
  }, []);

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddNewModal, setOpenAddNewModal] = useState<boolean>(false);


  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleAddNewClick = () => {
    setOpenAddNewModal(true);
  }
  const handleCloseAddNewClick = () => {
    setOpenAddNewModal(false);
  };
  const handleCloseEditClick = () => {
    setOpenEditModal(false);
  }

  const saveChanges = () => { }
  const deleteEmployee = () => { }
  const addEmployee = () => {
    addNewEmployee()
   }

  return (
    <>
      <Table
        setOpenEditModal={setOpenEditModal}
        setOpenDeleteModal={setOpenDeleteModal}
        handleAddNewClick={handleAddNewClick}
      />
      <Modal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        firstButtonText={"Cancel"}
        secondButtonText={'Edit'}
        title={"Edit Details"}
        content={<FormValidationEdit />}
        handleFirstButton={handleCloseEditModal}
        handleSecondButton={saveChanges}

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
      <Modal
        open={openAddNewModal}
        handleClose={handleCloseEditClick}
        firstButtonText={'Cancel'}
        secondButtonText={"Add"}
        title={"Add New Employee"}
        content={<FormValidation />}
        handleFirstButton={handleCloseAddNewClick}
        handleSecondButton={addEmployee}
      />


    </>
  );
});
export default Dashboard;
