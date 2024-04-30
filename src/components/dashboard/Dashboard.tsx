import { Table } from './table';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Modal } from '../../public/components/modal/modal';
import FormValidation from './NewEmployeeForm';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import './style.css'
import GlobalStore from '../../store/GlobalState';
import { Employee, Gender } from '../../types';
// import { Header } from './header';
// import FormValidation from './FormValidation';
import {Table2} from './table2';
import {AddNewEmployee} from './AddEmployee';
const Dashboard: React.FC = observer(() => {

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddNewModal, setOpenAddNewModal] = useState<boolean>(false);
  const [saveChangesModal, setSaveChangesModal] = useState<boolean>(false);
  // const [handleAddEmployee, setShandleAddEmployee] = useState<boolean>(false);

  const [isNewEmployee, setIsNewEmployee] = useState<boolean>(false);

  const [employee, setEmployee] = useState<Employee>({
    id: -1,
    firstName: '',
    lastName: '',
    identity: '',
    startWorkDate: new Date(),
    dateOfBirth: new Date(),
    gender: Gender.Male,
    status: true,
    roles: []
  });

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleCloseSaveChangeModal = () => {
    setSaveChangesModal(false);
  };
  const handleEditModalClick = (isNew: boolean) => {
    setIsNewEmployee(isNew);
    setOpenAddNewModal(true);
  }
  const handleCloseAddNewClick = () => {
    setOpenAddNewModal(false);
  };
  const handleCloseEditClick = () => {
    setOpenEditModal(false);
  }
  const [searchTerm, setSearchTerm] = useState<string>("");
 
  const saveChanges = () => { }
  const deleteEmployee = () => {
    GlobalStore.deleteEmployee();
    setOpenDeleteModal(false);
    setSaveChangesModal(true);
  }
  const handleAddEmployee = () => {
    setOpenAddNewModal(true);
  };
  const addEmployee = () => {
    if (isNewEmployee) {
      GlobalStore.addEmployee();
      setOpenAddNewModal(false);
      setSaveChangesModal(true);
      

    }
    else {
      GlobalStore.updateEmployee();
      setOpenAddNewModal(false);
      setSaveChangesModal(true);

    }
  }

  return (
    <>

     {/* <Header 
     handleEditModalClick={handleEditModalClick}
     setEmployee={setEmployee}
     setSearchTerm={setSearchTerm} // Pass setSearchTerm here
     /> */}
      {/* <Table
        setOpenDeleteModal={setOpenDeleteModal}
        handleEditModalClick={handleEditModalClick}
        setEmployee={setEmployee}
      /> */}
  
      <Table2 
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

      <Modal
        open={saveChangesModal}
        handleClose={handleCloseDeleteModal}
        firstButtonText={'ok'}
        title={""}
        content={"Changes saved successfully"}
        handleFirstButton={handleCloseSaveChangeModal}
      />
      
      <Modal
        open={openAddNewModal}
        handleClose={handleCloseEditClick}
        firstButtonText={'Cancel'}
        secondButtonText={isNewEmployee ? "Add" : "update"}
        title={isNewEmployee ? "  New Employee" : "update"}
        content={<FormValidation
          submit={addEmployee}
          isNew={isNewEmployee}
        />}
        handleFirstButton= {()=> setOpenAddNewModal(false)}
        handleSecondButton={addEmployee}
        addIcon={<PersonAddIcon />}
        editIcon={<EditIcon />}
        isNewEmployee={isNewEmployee}
      /> 
    </>
  );
});
export default Dashboard;
