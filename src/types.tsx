export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    identity: number;
    startWorkDate: Date;
    dateOfBirth: Date;
    gender: 'Male' | 'Female';
    roles: Role[];
    status: 'Active' | 'Inactive';
  }
  
export interface EmployeeRole {
    employeeId: number;
    role: string;
    managementStatus: boolean;
    entryDate: Date;
  }
export interface Role {
  roleId: number,
  roleName: string
}