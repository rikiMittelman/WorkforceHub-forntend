import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import WomanIcon from '@mui/icons-material/Woman';
import AddIcon from '@mui/icons-material/Add';
import ManIcon from '@mui/icons-material/Man';
import DeleteIcon from '@mui/icons-material/Delete';
import { observer } from 'mobx-react';

import {
    TextField,
    Select,
    Card,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    FormControlLabel,
    Switch,
    Typography
} from '@mui/material';

import GlobalStore from '../../../store/GlobalState';
import { Employee, EmployeeRole, Gender, Role } from '../../../types';

interface EmployeeFormProps {
    formErrors: Partial<Employee>;
}
const EmployeeForm: React.FC<EmployeeFormProps> = observer((props) => {
    const { formErrors } = props;
    const { setSelectedEmployee, selectedEmployee, isNewEmployee, rolesList } = GlobalStore;
    const [roleList, setRoleList] = useState<Role[]>(rolesList);
    const [availableRoles, setAvailableRoles] = useState<Role[][]>([[]]);
    const [filteredRoles, setFilteredRoles] = useState<Role[]>();

    useEffect(() => {
        if (isNewEmployee) {
            setSelectedEmployee({
                id: -1,
                firstName: '',
                lastName: '',
                identity: '',
                startWorkDate: null,
                dateOfBirth: null,
                gender: null,
                status: true,
                roles: []
            })
        }
    }, []);

    useEffect(() => {
        setAvailableRoles([rolesList]);
        setRoleList(rolesList);
        setFilteredRoles(rolesList)
    }, [rolesList]);

    useEffect(() => {
        setAvailableRoles(prevRoles => {
            const updatedRoles = [...prevRoles];
            const selectedRoleIds = selectedEmployee.roles.map((role: { role: { roleId: any; }; }) => role.role.roleId);
            var filterList = roleList.filter(role => !selectedRoleIds.includes(role.roleId));
            selectedEmployee.roles.forEach((roleObj: { role: any; }, roleObjIndex: string | number) => {
                updatedRoles[roleObjIndex] = [roleObj.role,
                ...filterList
                ];
            });
            updatedRoles[selectedRoleIds.length] = filterList;
            setFilteredRoles(filterList);
            return updatedRoles;
        });
    }, [selectedEmployee]);

    const handleStatusChange = (event: any) => {
        setSelectedEmployee({
            ...selectedEmployee,
            status: event.target.checked,
        });
    };
    const handleChange = (e: React.ChangeEvent<{ value: unknown, name: string }>) => {
        const { name, value } = e.target;
        // setemployee({ ...employee, [name]: value });
        setSelectedEmployee({ ...selectedEmployee, [name]: value });

    };
    const handleGender = (gender: Gender) => {
        setSelectedEmployee({ ...selectedEmployee, gender: gender });
    }

    const handleAddRole = () => {
        const selectedRoleIds = selectedEmployee.roles.map((role: { role: { roleId: any; }; }) => role.role.roleId);
        const filteredRoles = roleList.filter(role => !selectedRoleIds.includes(role.roleId));
        setFilteredRoles(filteredRoles.slice(1));
        const newRole: EmployeeRole = {
            role: filteredRoles[0], // Select the first available role initially
            managementStatus: false, // Default management status
            entryDate: new Date(), // Default entry date
        };

        setSelectedEmployee({
            ...selectedEmployee,
            roles: [...selectedEmployee.roles, newRole],
        });
    };

    const handleRoleChange = (index: number, roleId: number) => {
        setSelectedEmployee({
            ...selectedEmployee,
            roles: selectedEmployee.roles.map((role: any, i: number) => {
                if (i === index) {
                    return {
                        ...role,
                        role: availableRoles[index].find(role => role.roleId === roleId)!,
                    };
                }
                return role;
            }),
        });

        setAvailableRoles(prevRoles => {
            const updatedRoles = [...prevRoles];
            const selectedRoleIds = selectedEmployee.roles.map((role: { role: { roleId: any; }; }) => role.role.roleId);
            var filterList = roleList.filter(role => !selectedRoleIds.includes(role.roleId));
            selectedEmployee.roles.forEach((roleObj: { role: any; }, roleObjIndex: string | number) => {
                updatedRoles[roleObjIndex] = [roleObj.role, ...filterList];
            });
            return updatedRoles;
        });

    };
    return (
        <div>
            <form>
                <Card sx={{ padding: 2 }}>
                        <Typography variant='h6' pb={2}>Personal Information</Typography>
                        <Box sx={{ border: '1px solid #cdcdcd', padding: '16px' }}>

                        <Box display={'flex'} gap={2}>
                            <Box mb={'20px'}>
                                <Typography>First Name</Typography>
                                <TextField
                                    name="firstName"
                                    value={selectedEmployee.firstName}
                                    onChange={handleChange}
                                    error={!!formErrors.firstName}
                                    helperText={formErrors.firstName}
                                    fullWidth
                                />
                            </Box>
                            <Box mb={'20px'}>
                                <Typography>Last Name</Typography>
                                <TextField
                                    name="lastName"
                                    value={selectedEmployee.lastName}
                                    onChange={handleChange}
                                    error={!!formErrors.lastName}
                                    helperText={formErrors.lastName}
                                    fullWidth
                                />
                            </Box>
                        </Box>
                        <Box mb={'20px'}>
                            <Typography>Identity</Typography>
                            <TextField
                                name="identity"
                                value={selectedEmployee.identity}
                                onChange={handleChange}
                                error={!!formErrors.identity}
                                helperText={formErrors.identity}
                                fullWidth
                            />
                        </Box>
                        <Box mb={'20px'} display={'flex'} gap={2}>
                            <Box flex={1}>
                                <Typography>Start Working Date</Typography>
                                <TextField
                                    name="startWorkDate"
                                    type="date"
                                    value={selectedEmployee.startWorkDate ? new Date(selectedEmployee?.startWorkDate).toISOString().split('T')[0] : ''}

                                    onChange={handleChange}
                                    error={!!formErrors.startWorkDate}
                                    //@ts-ignore
                                    helperText={formErrors.startWorking}
                                    fullWidth
                                />
                            </Box>
                            <Box flex={1}>
                                <Typography>Date of Birth</Typography>
                                <TextField
                                    name="dateOfBirth"
                                    type="date"
                                    value={selectedEmployee.dateOfBirth ? new Date(selectedEmployee.dateOfBirth).toISOString().split('T')[0] : ''}
                                    onChange={handleChange}
                                    error={!!formErrors.dateOfBirth}
                                    // @ts-ignore
                                    helperText={formErrors.dateOfBirth}
                                    fullWidth
                                />
                            </Box>
                        </Box>
                        <Box mb={'20px'}>
                            <FormControl fullWidth error={!!formErrors.gender} >
                                <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={'center'}>
                                    <Typography>Gander</Typography>
                                    {/* <InputLabel>Gender</InputLabel> */}
                                    <div style={{ display: 'flex' }}>
                                        <Button
                                            variant={selectedEmployee.gender === Gender.Female ? "contained" : "outlined"}
                                            onClick={() => handleGender(Gender.Female)}
                                            startIcon={<WomanIcon />}
                                            sx={{ marginRight: '18px', width: '100px' }}
                                        >
                                            Female
                                        </Button>
                                        <Button
                                            variant={selectedEmployee.gender === Gender.Male ? "contained" : "outlined"}
                                            onClick={() => handleGender(Gender.Male)}
                                            startIcon={<ManIcon />}
                                        >
                                            Male
                                        </Button>
                                    </div>
                                </Box>
                            </FormControl>
                        </Box>
                        <div >
                            <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={'center'}>
                                <Typography>Status</Typography>
                                <FormControlLabel
                                    title='status'
                                    control={<Switch checked={selectedEmployee.status} onChange={handleStatusChange} />}
                                    label={selectedEmployee.status ? 'Active' : 'Inactive'}
                                />
                            </Box>

                        </div>
                    </Box>
                    <Typography variant='h6' py={2}>Rols Information</Typography>
                    <Box sx={{border: '1px solid #cdcdcd', padding: '16px'}}>
                    {selectedEmployee.roles.map((employeeRole: { role: { roleId: { toString: () => any; }; }; managementStatus: boolean | undefined; entryDate: string | number | Date; }, index: number) => (
                        <div key={index} style={{ display: 'flex', gap:8, padding: '8px', alignItems: 'center'}}>
                            <FormControl fullWidth style={{ display: 'flex' , flex: 1}}>
                                <Typography >Select Role</Typography>
                                <Select
                                    value={employeeRole.role.roleId.toString()} // Ensure roleId is converted to a string
                                    onChange={e => handleRoleChange(index, parseInt(e.target.value))}
                                    sx={{ marginRight: '18px', width: '100%' }}
                                >
                                    {availableRoles[index]?.map(role => (
                                        <MenuItem key={role.roleId} value={role.roleId.toString()}> {/* Convert roleId to a string */}
                                            {role.roleName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{ flex: 1}}>
                                <Typography>Start Working</Typography>
                                <TextField
                                    type="date"
                                    sx={{ marginRight: '18px', width: '100px' }}
                                    value={new Date(employeeRole.entryDate).toISOString().split('T')[0]}
                                    onChange={e => {
                                        const newRoles = [...selectedEmployee.roles];
                                        const entryDate = new Date(e.target.value);
                                        newRoles[index].entryDate = entryDate;
                                        setSelectedEmployee({
                                            ...selectedEmployee,
                                            roles: newRoles,
                                        });
                                    }}
                                />
                            </FormControl>
                            <FormControl style={{ display: 'flex', alignItems: 'center', flex: 4 }}>
                                <input
                                    type="checkbox"

                                    checked={employeeRole.managementStatus}
                                    onChange={e => {
                                        const newRoles = [...selectedEmployee.roles];
                                        newRoles[index].managementStatus = e.target.checked;
                                        setSelectedEmployee({
                                            ...selectedEmployee,
                                            roles: newRoles,
                                        });
                                    }}
                                    style={{
                                        // appearance: 'none',
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        border: '2px solid #ccc',
                                        cursor: 'pointer',
                                        marginRight: '8px', // יציבת מרווח בין ה-checkbox לטקסט
                                    }}


                                />
                                <label>Management Status</label>
                            </FormControl>
                            <FormControl>
                                <Button variant="text" onClick={() => {
                                    const newRoles = [...selectedEmployee.roles];
                                    newRoles.splice(index, 1);
                                    setSelectedEmployee({
                                        ...selectedEmployee,
                                        roles: newRoles,
                                    });
                                }}
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <DeleteIcon />
                                </Button>
                            </FormControl>
                        </div>
                    ))}
                    </Box>
                    <Button variant="outlined" onClick={handleAddRole} sx={{ marginRight: '18px', width: '400px' }} disabled={!filteredRoles || !filteredRoles.length}><AddIcon /> Add Role</Button>
                </Card>
            </form >
        </div>
    );
});

export default EmployeeForm;
