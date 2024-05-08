import { Employee } from "../../types";
import GlobalStore from '../../store/GlobalState';

const validateFormData = () => {
    let errors: Partial<Employee> = {};
    const { selectedEmployee } = GlobalStore;
    const nameRegex = /^[A-Za-z]+$/;
    const digitsRegex = /^\d+$/;
    if (!selectedEmployee.firstName) { errors.firstName = 'First name is required'; }
    else if (!nameRegex.test(selectedEmployee.firstName)) { errors.firstName = 'First name should contain only letters'; }

    if (!selectedEmployee.lastName) errors.lastName = 'Last name is required';
    else if (!nameRegex.test(selectedEmployee.lastName)) { errors.lastName = 'Last name should contain only letters'; }

    if (!selectedEmployee.identity) { errors.identity = 'Identity is required'; }
    else if (!digitsRegex.test(selectedEmployee.identity)) { errors.identity = 'Identity should contain only digits'; }
    else if (selectedEmployee.identity.length !== 9) { errors.identity = 'Identity should be exactly 9 digits long'; }

    // if (!selectedEmployee.startWorkDate) errors.startWorkDate = 'Start working date is required';

    // if (!selectedEmployee.dateOfBirth) { errors.dateOfBirth = 'Date of birth is required'; }
    // else {
    //   const currentDate = new Date();
    //   const dob = new Date(selectedEmployee.dateOfBirth);
    //   const minAgeDate = new Date(currentDate.getFullYear() - 15, currentDate.getMonth(), currentDate.getDate()); // 15 years ago from today

    //   if (dob > minAgeDate) {
    //     errors.dateOfBirth = 'Date of birth must be at least 15 years ago';
    //   }
    // }

    // if (!selectedEmployee.gender) errors.gender = 'Gender is required';
    // if (!selectedEmployee.status) errors.status = 'Status is required';
    // if (selectedEmployee.roles.length === 0) errors.roles = ['At least one role is required'];
    // if (!selectedEmployee.startEntry) errors.startEntry = 'Start entry is required';
    return errors;
};

const handleSubmit = (isNewEmployee: boolean, setOpenSaveChangesModal: (arg: boolean) => void) => {
    // Logic to submit the form data
    isNewEmployee ? GlobalStore.addEmployee() : GlobalStore.updateEmployee();
    setOpenSaveChangesModal(true);
};
export const handleSaveButtonClick = (setOpenSaveChangesModal: (arg: boolean) => void, setFormErrors: (arg: Partial<Employee>) => void, isNewEmployee = false) => {
    // Manually trigger form validation before submitting
    const validationErrors = validateFormData();
    if (Object.keys(validationErrors).length === 0) {
        // Form data is valid, you can submit the form
        console.log('Form data is valid');
        handleSubmit(isNewEmployee, setOpenSaveChangesModal);
    } else {
        // Form data is invalid, set the errors state
        console.log('Form data is invalid:', validationErrors);
        setFormErrors(validationErrors);
    }
};
