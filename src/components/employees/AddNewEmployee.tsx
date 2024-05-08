import { useState } from 'React';
import { Employee } from "../../types";
import { Modal } from '../../public/components/modal/modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../../public/components/employeeForm/employeeForm';
import { handleSaveButtonClick } from '../../public/helpers/employeesHelper';
import { Typography } from '@mui/material';

export const AddNewEmployee: React.FC = () => {
    const [openSaveChangesModal, setOpenSaveChangesModal] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<Partial<Employee>>({});

    const navigate = useNavigate();

    const handleSaveChangesModalClose = () => {
        setOpenSaveChangesModal(false);
        setTimeout(() => {
            navigate('/')
        }, 500)
    }


    return (
        <>
            <Typography variant={'h4'} py={3}>
                New Employee
            </Typography>
            <EmployeeForm
                formErrors={formErrors}
            />
            <Button onClick={() => handleSaveButtonClick(setOpenSaveChangesModal, setFormErrors, true)}>Save</Button>
            <Modal
                open={openSaveChangesModal}
                handleClose={handleSaveChangesModalClose}
                firstButtonText={'ok'}
                title={""}
                content={"Changes saved successfully"}
                handleFirstButton={handleSaveChangesModalClose}
            />
        </>
    )
}