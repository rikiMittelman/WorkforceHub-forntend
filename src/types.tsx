export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    identity: string;
    startWorkDate: Date | null;
    dateOfBirth: Date | null;
    gender: Gender | null;
    roles: EmployeeRole[];
    status: boolean;
  }

  export enum Gender{
    Male =1,
    Female =2
  }
  
export interface EmployeeRole {
    role: Role;
    managementStatus: boolean;
    entryDate: Date;
  }

export interface Role {
  roleId: number,
  roleName: string
}