import React from "react"
import MUIDataTable from "mui-datatables";
import GlobalState from "../../store/GlobalState";
import { IconButton, FormControlLabel, TextField } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { observer } from 'mobx-react';

import EditIcon from '@mui/icons-material/Edit';
interface TableProps {
    setOpenDeleteModal: (arg: boolean) => void;
    handleEditModalClick: (arg: boolean) => void;
}
export const Table2: React.FC<TableProps> = observer((props) => {

    const { setOpenDeleteModal, handleEditModalClick} = props;
    const columns = [
        {
            name: "firstName",
            label: "First Name",
        },
        {
            name: "lastName",
            label: "Last Name"
        },
        {
            name: "identity",
            label: "Identity"
        },
        {
            name: "startWorkDate",
            label: "Start Working"
        },
        {
            name: "edit",
            label: "Edit",
            options: {
                customBodyRender: (value: any, tableMeta: any) => {
                    const selectedEmp = GlobalState.employees.find((emp) => emp.identity == tableMeta.rowData[2])
                    return (
                        <IconButton  aria-label="edit" onClick={() => {
                            GlobalState.setSelectedEmployee(selectedEmp);
                            handleEditModalClick(false)
                          }
                          }>
                            <EditIcon />
                          </IconButton>
                    )
                }
            }
        },
        {
            name: '',
            label: 'Delete',
            options: {
                customBodyRender: (value: any, tableMeta: any) => {
                    const selectedEmp = GlobalState.employees.find((emp) => emp.identity == tableMeta.rowData[2]);
                    return (
                        <IconButton aria-label="delete" onClick={() => {
                            GlobalState.setSelectedEmployee(selectedEmp);
                            setOpenDeleteModal(true)
                        }}>
                            <DeleteForeverIcon />
                        </IconButton>
                    )
                }
            }
        }
    ];

    const data = [
        { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
        { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
        { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
        { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
    ];

    const options = {
        filterType: 'select',
        isRowSelectable: false
    };

    return <MUIDataTable
        title={"Employee List"}
        data={GlobalState.employees}
        columns={columns}
        options={options}
    />
});