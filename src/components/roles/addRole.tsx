import {useState} from 'react';
import { Typography, TextField, Button } from "@mui/material";
interface AddRoleForm {
    role: string
}
export const AddNewRole = () => {
    const [formData, setFormData] = useState<AddRoleForm>({role: ''});
    const [errors, setErrors] = useState<AddRoleForm>({role: ''});
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
          console.log('Form submitted with data:', formData);
          // Add your form submission logic here
        } else {
          console.log('Form has validation errors');
        }
      };
      
    const validateForm = () => {
        let valid = true;
        const newErrors = {
          role: '',
        };
    
        if (!formData.role) {
          newErrors.role = 'Role is required';
          valid = false;
        }
    
        setErrors(newErrors);
        return valid;
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
    return (
        <>
            <Typography component={'h4'}>Add New Role</Typography>

            <form onSubmit={handleSubmit}>
          
                    <TextField
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        error={!!errors.role}
                        helperText={errors.role}
                        fullWidth
                    />
                <Button type="submit">Add Role</Button>
            </form>
        </>
    );
}

