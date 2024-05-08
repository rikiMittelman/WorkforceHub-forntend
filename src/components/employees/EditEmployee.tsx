import { useState } from 'React';
import { Employee } from "../../types";
import GlobalStore from '../../store/GlobalState';
import { Modal } from '../../public/components/modal/modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../../public/components/employeeForm/employeeForm';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import { handleSaveButtonClick } from '../../public/helpers/employeesHelper';

interface EditEmployeeProps {
    displayEditEmployee: boolean,
    closeEditEmployee: () => void,
}
export const EditEmployee: React.FC<EditEmployeeProps> = (props) => {
    
    const [openSaveChangesModal, setOpenSaveChangesModal] = useState<boolean>(false);
    const { displayEditEmployee, closeEditEmployee } = props;
    const [formErrors, setFormErrors] = useState<Partial<Employee>>({});

    const handleCloseEditModal = () => {
        closeEditEmployee();
        setFormErrors({})
    }
    const handelOpenSaveChangesModal = (openSaveModal: boolean) => {
        handleCloseEditModal();
        setOpenSaveChangesModal(openSaveModal);
    }

    return (
        <>
            <Modal
                open={displayEditEmployee}
                handleClose={handleCloseEditModal}
                firstButtonText={'Cancel'}
                secondButtonText={"Edit"}
                title={"Edit Employee"}
                content={<EmployeeForm formErrors={formErrors} />}
                handleFirstButton={handleCloseEditModal}
                handleSecondButton={() => handleSaveButtonClick(handelOpenSaveChangesModal, setFormErrors, false)}
                addIcon={<PersonAddIcon />}
                editIcon={<EditIcon />}
            />
            <Modal
                open={openSaveChangesModal}
                handleClose={() => setOpenSaveChangesModal(false)}
                firstButtonText={'ok'}
                title={""}
                content={"Changes saved successfully"}
                handleFirstButton={() => setOpenSaveChangesModal(false)}
            />
        </>
    )
}