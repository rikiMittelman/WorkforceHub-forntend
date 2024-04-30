import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import WomanIcon from '@mui/icons-material/Woman';
import AddIcon from '@mui/icons-material/Add';
import ManIcon from '@mui/icons-material/Man';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import { observer } from 'mobx-react';

// import { addEmployee } from '../../Api';
import {
  TextField,
  // Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel, ToggleButton, ToggleButtonGroup, FormControlLabel, Switch
} from '@mui/material';

// import { SelectInputProps } from '@mui/material/Select/SelectInput';
import GlobalStore from '../../store/GlobalState';
import { Employee, EmployeeRole, Gender, Role } from '../../types';
// import Dashboard from './Dashboard';
// import { globalState } from 'mobx/dist/internal';
// import { addNewEmployee } from '../../Api';
// interface employee {
//     firstName: string;
//     lastName: string;
//     identity: string;
//     startWorking: Date | null;
//     dateOfBirth: Date | null;
//     gender: "Male" | "Female";
//     status: "Active" | "Inactive";
//     roles: EmployeeRole[];

// }
interface FormValidationProps {
  submit: (arg: Employee) => void,
  isNew: boolean
}
const FormValidation: React.FC<FormValidationProps> = observer((props) => {
  const {submit, isNew } = props;
 
  const handleStatusChange = (event:any) => {
    GlobalStore.setSelectedEmployee({
      ...GlobalStore.selectedEmployee,
      status: event.target.checked,
    });
  };
  // const [inputValue, setInputValue] = useState('');
  // const [rolesList, setRolesList] = useState<Role[] | null>(null);
  // const [rolesCount, setRolesCount] = useState(0);

  // const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  useEffect(() => {
    // setAvailableRoles(GlobalStore.rolesList);
    // setRolesList(GlobalStore.rolesList);
    setAvailableRoles([GlobalStore.rolesList]);
    setRolesList(GlobalStore.rolesList);
  }, []);

  //const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [rolesList, setRolesList] = useState<Role[]>(GlobalStore.rolesList);
  const [availableRoles, setAvailableRoles] = useState<Role[][]>([[]]); // Array of available roles for each section

  // const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([1]); // Initially, only first role is selected

  const availableRolesForSection = (index: number): Role[] => {
    const selectedRoleIds = GlobalStore.selectedEmployee?.roles.map(role => role.role.roleId);
    return availableRoles[index].filter(role => !selectedRoleIds?.includes(role.roleId));
  };

  // const availableRolesForEachSection = (index: number): Role[][] => {
  //   const selectedRoleIds = employee.roles.map(role => role.role.roleId);
  //   return availableRoles[index].filter(role => !selectedRoleIds.includes(role.roleId));
  // };

  //   const [employee, setEmployee] = useState<Employee>({
  //     firstName: '',
  //     lastName: '',
  //     identity: '',
  //     startWorkDate: new Date(),
  //     dateOfBirth: new Date(),
  //     gender: Gender.Male,
  //     status: true,
  //     roles: []
  // });

  const [roles, setEmployeeRoles] = useState<EmployeeRole[]>([
    {
      role: { roleId: -1, roleName: '' },
      managementStatus: false,
      entryDate: new Date()

    }
  ]);

  const [errors, setErrors] = useState<Partial<Employee>>({});
  // const handleAddRole = () => {
  //     setRolesCount(rolesCount + 1);
  //     setCollapsibleOpen(true); // Open the collapsible when adding a role
  // };
  const handleChange = (e: React.ChangeEvent<{ value: unknown, name: string }>) => {
    const { name, value } = e.target;
    // setemployee({ ...employee, [name]: value });
    GlobalStore.setSelectedEmployee({ ... GlobalStore.selectedEmployee, [name]: value });

  };
  const handleGender = (gender: Gender) => {
    GlobalStore.setSelectedEmployee({ ... GlobalStore.selectedEmployee, gender: gender });
  }

  // const handleRoleChange = (event: any) => {
  //     const selectedIndex = event.target.value;
  //     setSelectedRole(roleList[selectedIndex]);
  // };


  // const [items, setItems]  = useState<Role[]>(
  //     [{roleId: -1, roleName :''}]
  // );

  // const rolesList: Role[] = [
  //     { roleId: -1, roleName: '' }
  // ];

  // const [selectedRole, setSelectedRole] = useState<number | null>(null);
  // 
  // const handleRoleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const roleId = parseInt(event.target.value);
  //   const selectedRole = rolesList?.find(role => role.roleId === roleId);
  //   if (selectedRole)
  //     setSelectedRole(roleId);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateemployee(GlobalStore.selectedEmployee);
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Add the employee using the API
        submit(GlobalStore.selectedEmployee);

        console.log('Employee added successfully:',  GlobalStore.selectedEmployee);
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  }

  const validateemployee = (data: Employee) => {
    let errors: Partial<Employee> = {};
    if (!data.firstName) errors.firstName = 'First name is required';
    if (!data.lastName) errors.lastName = 'Last name is required';
    if (!data.identity) errors.identity = 'Identity is required';
    // @ts-ignore
    if (!data.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    //@ts-ignore
    if (!data.gender) errors.gender = 'Gender is required';
    //@ts-ignore
    if (!data.status) errors.status = 'Status is required';
    // if (data.roles.length === 0) errors.roles = ['At least one role is required'];
    // @ts-ignore
    if (!data.startEntry) errors.startEntry = 'Start entry is required';
    return errors;
  }



  const addItem = () => {




    const newItem = {
      managementStatus: false,
      entryDate: new Date(),
      role: { roleId: -1, roleName: '' },
    };
    setEmployeeRoles(prevItems => [...prevItems, newItem]);
  };


  // const [employee, setEmployee] = useState<Employee>({ roles: [] });


  // const handleAddRole = () => {
  //   const newRole: EmployeeRole = {
  //     role: availableRoles[0], // Select the first available role initially
  //     managementStatus: false, // Default management status
  //     entryDate: new Date(), // Default entry date
  //   };

  // const handleRoleChange = (index: number, roleId: number) => {
  //   setEmployee((prevState: Employee) => ({
  //     ...prevState,
  //     roles: prevState.roles.map((role, i) => {
  //       if (i === index) {
  //         return {
  //           ...role,
  //           role: availableRoles.find(role => role.roleId === roleId)!,
  //         };
  //       }
  //       return role;
  //     }),

  //   }));
  //updateAvailableRoles();

  // setSelectedRoleIds(prevState => {
  //   const newState = [...prevState];
  //   newState[index] = roleId;
  //   return newState;
  // });
  //};
  // const updateAvailableRoles = () => {
  //   const selectedRoleIds = employee.roles.map(role => role.role.roleId);
  //   const filteredRoles = rolesList.filter(role => !selectedRoleIds.includes(role.roleId));
  //   setAvailableRoles(filteredRoles);

  // };

  //   const handleAddRole = () => {
  //     const newRole: EmployeeRole = {
  //       role: availableRoles[0][0], // Select the first available role initially
  //       managementStatus: false, // Default management status
  //       entryDate: new Date(), // Default entry date
  //     };

  //     setEmployee((prevState: { roles: any; }) => ({
  //       ...prevState,
  //       roles: [...prevState.roles, newRole],
  //     }));
  // //updateAvailableRoles();
  // setAvailableRoles(prevRoles => [...prevRoles, availableRolesForSection(0)]);


  //     //setSelectedRoleIds(prevState => [...prevState, availableRoles[0].roleId]);
  //   };
  //   setEmployee(prevState => ({
  //     ...prevState,
  //     roles: [...prevState.roles, newRole],
  //   }));

  //   // Remove the selected role from available roles

  //   //setAvailableRoles(prevRoles => prevRoles.filter(role => role.roleId !== employee.roles[0].role.roleId));
  // };

  // const handleRoleChange = (index: number, roleId: number) => {
  //   const newRoles = [...employee.roles];
  //   newRoles[index].role = availableRoles.find(role => role.roleId === roleId)!;

  //   setEmployee(prevState => ({
  //     ...prevState,
  //     roles: newRoles,
  //   }));
  // };


  // const handleRoleChange = (index: number, roleId: number) => {
  //     setEmployee(prevState => ({
  //       ...prevState,
  //       roles: prevState.roles.map((role, i) => {
  //         if (i === index) {
  //           return {
  //             ...role,
  //             role: availableRoles.find(role => role.roleId === roleId)!
  //           };
  //         }
  //         return role;
  //       })
  //     }));

  //     // Filter available roles to exclude the currently selected role
  //     setAvailableRoles(prevRoles => prevRoles.filter(role => role.roleId !== roleId));
  //   };

  // const renderRolsInputs = () => {
  //   let inputs = [];
  // setEmployeeRoles(prevState => [...prevState, {
  //     managementStatus: false,
  //     entryDate: new Date(),
  //     role: { roleId: -1, roleName: '' }
  // }]);
  // for (let i = 0; i < rolesCount; i++) {

  // employee.firstName = '',
  //     employee.lastName = '',
  //     employee.identity = '',
  //     employee.startWorking = null,
  //     employee.dateOfBirth = null,
  //     employee.gender = 'Male',
  //     employee.status = 'Active',
  //     employee.roles = [],
  //     employee.startEntry = null,
  //     employee.managementStatus = false

  // this.setState(previousState => ({
  //     myArray: [...previousState.myArray, 'new value']
  // }));

  // inputs.push(
  //   <div key={i}>{i}
  //     <FormControl fullWidth error={!!errors.roles}>
  //       <InputLabel>Roles</InputLabel>
  //       <Select
  //         multiple
  //         name="roles"
  //         value={employee.roles[i].role}
  //         //@ts-ignore
  //         onChange={handleChange}
  // renderValue={(selected) => (selected as Role)}
  // >
  {/* {GlobalStore.roles.map((role, index) => (
                                <MenuItem key={index} value={role.roleId}>{role.roleName}</MenuItem>
                            ))} */}
  //     </Select>
  //   </FormControl>
  //   <TextField

  //     label="Start Entry"
  //     name="startEntry"
  //     type="date"
  //     value={employee.roles[i].entryDate}
  //     onChange={handleChange}
  //     error={!!errors.roles}
  //     // @ts-ignore
  //     helperText={errors.startEntry}
  //     fullWidth
  //   />
  //   <TextField

  //     label="management "
  //     name="managementStatus"
  //     type="boolean"
  //     value={employee.roles[i].managementStatus}
  //     onChange={handleChange}
  //     error={!!errors.roles}
  //     // @ts-ignore
  //     helperText={errors.managementStatus}
  //     fullWidth
  //   />
  //   <div>This is the collapsible content</div>
  // </div>


  //     );
  //   }
  //   return inputs;
  // }
  const handleAddRole = () => {
    const selectedRoleIds =  GlobalStore.selectedEmployee.roles.map(role => role.role.roleId);
    const filteredRoles = rolesList.filter(role => !selectedRoleIds.includes(role.roleId));

    if (filteredRoles.length === 0) {
      // Optionally handle case where there are no available roles
      return;
    }

    const newRole: EmployeeRole = {
      role: filteredRoles[0], // Select the first available role initially
      managementStatus: false, // Default management status
      entryDate: new Date(), // Default entry date
    };

    GlobalStore.setSelectedEmployee({
      ...GlobalStore.selectedEmployee,
      roles: [...GlobalStore.selectedEmployee.roles, newRole],
    });

    // setAvailableRoles(prevRoles => {
    //   const updatedRoles = [...prevRoles];
    //   updatedRoles[selectedRoleIds.length] = filteredRoles;
    //   // Update available roles at the end
    //   return updatedRoles;
    // });
    setAvailableRoles(prevRoles => {
      const updatedRoles = [...prevRoles];
      const selectedRoleIds = GlobalStore.selectedEmployee.roles.map(role => role.role.roleId);
      var filterList = rolesList.filter(role => !selectedRoleIds.includes(role.roleId));
       GlobalStore.selectedEmployee.roles.forEach((e, j) => {
        updatedRoles[j] = [e.role,
        ...filterList.slice(1)];
      });
      updatedRoles[selectedRoleIds.length] = filterList;
      return updatedRoles;
    });
  };

  const handleRoleChange = (index: number, roleId: number) => {
    const selectedRoleIds =  GlobalStore.selectedEmployee.roles.map(role => role.role.roleId);
    const filteredRoles = rolesList.filter(role => !selectedRoleIds.includes(role.roleId));


    GlobalStore.setSelectedEmployee({
      ...GlobalStore.selectedEmployee,
      roles: GlobalStore.selectedEmployee.roles.map((role: any, i: number) => {
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
      const selectedRoleIds =  GlobalStore.selectedEmployee.roles.map(role => role.role.roleId);
      var filterList = rolesList.filter(role => !selectedRoleIds.includes(role.roleId));
      GlobalStore.selectedEmployee.roles.forEach((e, j) => {
        updatedRoles[j] = [e.role, ...filterList];
      });
      return updatedRoles;
    });

  };

  return (
    <div>
      <form style={{ width: '500px' }}>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="First Name"
            name="firstName"
            value={ GlobalStore.selectedEmployee.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Last Name"
            name="lastName"
            value={ GlobalStore.selectedEmployee.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Identity"
            name="identity"
            value={GlobalStore.selectedEmployee.identity}
            onChange={handleChange}
            error={!!errors.identity}
            helperText={errors.identity}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Start Working"
            name="startWorkDate"
            type="date"
            value={new Date(GlobalStore.selectedEmployee.startWorkDate).toISOString().split('T')[0]}

            onChange={handleChange}
            error={!!errors.startWorkDate}
            //@ts-ignore
            helperText={errors.startWorking}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={new Date(GlobalStore.selectedEmployee.dateOfBirth).toISOString().split('T')[0]}
            onChange={handleChange}
            error={!!errors.dateOfBirth}
            // @ts-ignore
            helperText={errors.dateOfBirth}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <FormControl fullWidth error={!!errors.gender}>
            <div>
              {/* <InputLabel>Gender</InputLabel> */}
              <div style={{ display: 'flex',marginLeft:'25%' }}>
                <Button
                  variant={GlobalStore.selectedEmployee.gender === Gender.Female ? "contained" : "outlined"}
                  onClick={() => handleGender(Gender.Female)}
                  startIcon={<WomanIcon />}
                  sx={{ marginRight: '18px',width:'100px' }}
                >
                  Female
                </Button>
                <Button
                  variant={GlobalStore.selectedEmployee.gender === Gender.Male ? "contained" : "outlined"}
                  onClick={() => handleGender(Gender.Male)}
                  startIcon={<ManIcon />}
                >
                  Male
                </Button>
              </div>
            </div>
          </FormControl>
        </div>
        <div >
        {/* <p>Status</p> */}
          <FormControlLabel
          title='status'
            control={<Switch checked={GlobalStore.selectedEmployee.status} onChange={handleStatusChange} />}
            label={GlobalStore.selectedEmployee.status ? 'Active' : 'Inactive'}
          />
        </div>
  <div>

    {/* <div id="addRole"></div> */}
   
    {/* <FormControl sx={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '8px', marginBottom: '20px' }}> */}
    
    
    
    
    
    
    
    
    {GlobalStore.selectedEmployee.roles.map((employeeRole, index) => (
      <div key={index}  style={{ display: 'flex'}}>
        <FormControl fullWidth style={{ display: 'flex'}}>
          <InputLabel >Select Role</InputLabel>
          <Select
            value={employeeRole.role.roleId.toString()} // Ensure roleId is converted to a string
            onChange={e => handleRoleChange(index, parseInt(e.target.value))}
            sx={{ marginRight: '18px',width:'100px' }}
          >
            {availableRoles[index]?.map(role => (
              <MenuItem key={role.roleId} value={role.roleId.toString()}> {/* Convert roleId to a string */}
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            
            checked={employeeRole.managementStatus}
            onChange={e => {
              const newRoles = [...GlobalStore.selectedEmployee.roles];
              newRoles[index].managementStatus = e.target.checked;
              GlobalStore.setSelectedEmployee({
                ...GlobalStore.selectedEmployee,
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

        <FormControl fullWidth>
          <TextField
            type="date"
            sx={{ marginRight: '18px',width:'100px' }}
            value={new Date(employeeRole.entryDate).toISOString().split('T')[0]}
            onChange={e => {
              const newRoles = [...GlobalStore.selectedEmployee.roles];
              const entryDate = new Date(e.target.value);
              newRoles[index].entryDate = entryDate;
              GlobalStore.setSelectedEmployee({
                ...GlobalStore.selectedEmployee,
                roles: newRoles,
              });
            }}
          />
        </FormControl>

        <FormControl>
          <Button variant="outlined" onClick={() => {
            const newRoles = [...GlobalStore.selectedEmployee.roles];
            newRoles.splice(index, 1);
            GlobalStore.setSelectedEmployee({
              ...GlobalStore.selectedEmployee,
              roles: newRoles,
            });
            setAvailableRoles(prevRoles => {
              const updatedRoles = [...prevRoles];
              const selectedRoleIds = GlobalStore.selectedEmployee.roles.map(role => role.role.roleId);
              var filterList = rolesList.filter(role => !selectedRoleIds.includes(role.roleId));
              filterList.push(employeeRole.role)
              GlobalStore.selectedEmployee.roles.forEach((e, j) => {
                updatedRoles[j] = [e.role, ...filterList];
              });
              return updatedRoles;
            });
          }}>
            <DeleteIcon />Remove Role
          </Button>
        </FormControl>
      </div>
    ))}
    {/* </FormControl> */}
    <Button variant="outlined" onClick={handleAddRole} sx={{ marginRight: '18px',width:'400px' }}><AddIcon /> Add Role</Button>

  </div>
      </form >
    </div >
  );
});

export default FormValidation;
