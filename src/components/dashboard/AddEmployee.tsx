import {useState} from 'React';
import { Employee } from "../../types";
import FormValidation from './NewEmployeeForm';
import GlobalStore from '../../store/GlobalState';
import { Modal } from '../../public/components/modal/modal';
import { Button } from 'react-bootstrap';
export const AddNewEmployee: React.FC = () => {
    const [saveChangesModal, setSaveChangesModal] = useState<boolean>(false);

    const addEmployee = () => {
        GlobalStore.addEmployee();
        setSaveChangesModal(true);
    }
    return (
        <>
            <FormValidation
                submit={addEmployee}
                isNew={true}
            />
            <Modal
                open={saveChangesModal}
                handleClose={() => setSaveChangesModal(false)}
                firstButtonText={'ok'}
                title={""}
                content={"Changes saved successfully"}
                handleFirstButton={() => setSaveChangesModal(false)}
            />
            <Button onClick={addEmployee}>Save</Button>
        </>
    )
}