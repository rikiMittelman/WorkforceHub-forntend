import React, { useState } from 'react';
import GlobalStore from '../../store/GlobalState'
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
// import { SelectInputProps } from '@mui/material/Select/SelectInput';

interface FormData {
    firstName: string;
    lastName: string;
    identity: string;
    startWorking: string;
    dateOfBirth: string;
    gender: string;
    status: string;
    roles: string[];
    startEntry: string;
}

const FormValidationEdit: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        identity: '',
        startWorking: '',
        dateOfBirth: '',
        gender: '',
        status: '',
        roles: [],
        startEntry: ''
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: React.ChangeEvent<{ value: unknown, name: string }>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Form data is valid, you can submit the form
            console.log('Form submitted:', formData);
        } else {
            // Form data is invalid, set the errors state
            setErrors(validationErrors);
        }
    };

    const validateFormData = (data: FormData) => {
        let errors: Partial<FormData> = {};
        if (!data.firstName) errors.firstName = 'First name is required';
        if (!data.lastName) errors.lastName = 'Last name is required';
        if (!data.identity) errors.identity = 'Identity is required';
        if (!data.startWorking) errors.startWorking = 'Start working date is required';
        if (!data.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
        if (!data.gender) errors.gender = 'Gender is required';
        if (!data.status) errors.status = 'Status is required';
        if (data.roles.length === 0) errors.roles = ['At least one role is required'];
        if (!data.startEntry) errors.startEntry = 'Start entry is required';
        return errors;
    };

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
                        <MenuItem value="active">meneger</MenuItem>
                        <MenuItem value="inactive">non-meneger</MenuItem>
                    </Select>
                </FormControl>
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
                    value={formData.startEntry}
                    onChange={handleChange}
                    error={!!errors.startEntry}
                    helperText={errors.startEntry}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </div>
    );
};

export default FormValidationEdit;
