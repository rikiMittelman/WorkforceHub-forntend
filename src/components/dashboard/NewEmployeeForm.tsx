import React, { useState } from 'react';
// import { addEmployee } from '../../Api';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
// import { SelectInputProps } from '@mui/material/Select/SelectInput';
import GlobalStore from '../../store/GlobalState';
// import { globalState } from 'mobx/dist/internal';
// import { addNewEmployee } from '../../Api';
interface FormData {
    firstName: string;
    lastName: string;
    identity: string;
    startWorking: Date | null;
    dateOfBirth: Date | null;
    gender: "Male" | "Female";
    status: "Active" | "Inactive";
    roles: string[];
    startEntry: Date | null;
    managementStatus: boolean;
}

const FormValidation: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [rolesCount, setRolesCount] = useState(0);
    const [collapsibleOpen, setCollapsibleOpen] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        identity: '',
        startWorking: null,
        dateOfBirth: null,
        gender: 'Male',
        status: 'Active',
        roles: [],
        startEntry: null,
        managementStatus: false
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});
    const handleAddRole = () => {
        setRolesCount(rolesCount + 1);
        setCollapsibleOpen(true); // Open the collapsible when adding a role
    };
    const handleChange = (e: React.ChangeEvent<{ value: unknown, name: string }>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length === 0) {
            try {
                // Add the employee using the API
                // await addEmployee({
                //     id: 1,
                //     firstName: formData.firstName,
                //     lastName: formData.lastName,
                //     startWorkDate: formData.startWorking || new Date(),
                //     dateOfBirth: formData.dateOfBirth || new Date(),
                //     gender: formData.gender,
                //     // roles: [{
                //     //     employeeId: number;
                //     //     role: string;
                //     //     managementStatus: boolean;
                //     //     entryDate: Date;
                //     // }],
                //     status: formData.status
                // })

                console.log('Employee added successfully:', formData);
            } catch (error) {
                console.error('Error adding employee:', error);
            }
        } else {
            setErrors(validationErrors);
        }
    }

    const validateFormData = (data: FormData) => {
        let errors: Partial<FormData> = {};
        if (!data.firstName) errors.firstName = 'First name is required';
        if (!data.lastName) errors.lastName = 'Last name is required';
        if (!data.identity) errors.identity = 'Identity is required';
        // @ts-ignore
        if (!data.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
        //@ts-ignore
        if (!data.gender) errors.gender = 'Gender is required';
        //@ts-ignore
        if (!data.status) errors.status = 'Status is required';
        if (data.roles.length === 0) errors.roles = ['At least one role is required'];
        // @ts-ignore
        if (!data.startEntry) errors.startEntry = 'Start entry is required';
        return errors;
    }

    const renderRolsInputs = () => {
        let inputs = [];
        for (let i = 0; i < rolesCount; i++) {

            formData.firstName = '',
                formData.lastName = '',
                formData.identity = '',
                formData.startWorking = null,
                formData.dateOfBirth = null,
                formData.gender = 'Male',
                formData.status = 'Active',
                formData.roles = [],
                formData.startEntry = null,
                formData.managementStatus = false

            inputs.push(
                <div key={i}>

                    <FormControl fullWidth error={!!errors.roles}>
                        <InputLabel>Roles</InputLabel>
                        <Select
                            multiple
                            name="roles"
                            value={formData.roles}
                            //@ts-ignore
                            onChange={handleChange}
                            renderValue={(selected) => (selected as string[]).join(', ')}
                        >
                            {GlobalStore.roles.map((role, index) => (
                                <MenuItem key={index} value={role.roleId}>{role.roleName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField

                        label="Start Entry"
                        name="startEntry"
                        type="date"
                        value={formData.startEntry}
                        onChange={handleChange}
                        error={!!errors.startEntry}
                        // @ts-ignore
                        helperText={errors.startEntry}
                        fullWidth
                    />
                    <TextField

                        label="management "
                        name="managementStatus"
                        type="boolean"
                        value={formData.managementStatus}
                        onChange={handleChange}
                        error={!!errors.managementStatus}
                        // @ts-ignore
                        helperText={errors.managementStatus}
                        fullWidth
                    />
                </div>
            );
        }
        return inputs;
    }
    return (
        <div>
            <h1>Employee Form</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    fullWidth
                />
                <TextField
                    label="Identity"
                    name="identity"
                    value={formData.identity}
                    onChange={handleChange}
                    error={!!errors.identity}
                    helperText={errors.identity}
                    fullWidth
                />

                <TextField
                    label="Start Working"
                    name="startWorking"
                    type="date"
                    value={formData.startWorking}
                    onChange={handleChange}
                    error={!!errors.startWorking}
                    //@ts-ignore
                    helperText={errors.startWorking}
                    fullWidth
                />
                <TextField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    error={!!errors.dateOfBirth}
                    // @ts-ignore
                    helperText={errors.dateOfBirth}
                    fullWidth
                />
                <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                        name="gender"
                        value={formData.gender}
                        //@ts-ignore
                        onChange={handleChange}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        //@ts-ignore
                        onChange={handleChange}
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
                {/* {renderRolsInputs()} */}
                <div>
                    <Button onClick={handleAddRole}>Add Another Role</Button>
                    {collapsibleOpen && (
                        <div>
                            {renderRolsInputs()}
                            {/* Example collapsible content */}
                            <div>This is the collapsible content</div>
                        </div>
                    )}
                </div>
                <Button type="submit" variant="contained" color="primary" >Submit</Button>
            </form>
        </div>
    );
};

export default FormValidation;
