import React from "react"
import MUIDataTable, {MUIDataTableColumn, MUIDataTableData} from "mui-datatables";
import GlobalState from "../../store/GlobalState";
import { IconButton, FormControlLabel, TextField } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { observer } from 'mobx-react';

import EditIcon from '@mui/icons-material/Edit';
import * as XLSX from 'xlsx';
interface TableProps {
    setOpenDeleteModal: (arg: boolean) => void;
    handleEditModalClick: (arg: boolean) => void;
}
export const Table: React.FC<TableProps> = observer((props) => {

    const { setOpenDeleteModal, handleEditModalClick } = props;
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
                sort: false,
                customBodyRender: (value: any, tableMeta: any) => {
                    const selectedEmp = GlobalState.employees.find((emp) => emp.identity == tableMeta.rowData[2])
                    return (
                        <IconButton aria-label="edit" onClick={() => {
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
                sort: false,
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


    const downloadXlsx = (
        columns: MUIDataTableColumn[],
        data: MUIDataTableData[]
    ) => {
        const dataFormatted = data.map(row => {
            const rowData: { [key: string]: any } = {};
            row.data.forEach((val: any, idx: any) => {
                const key = columns[idx].label || columns[idx].name; // Use label or name
                rowData[key] = val;
            });
            return rowData;
        });

        // Create a new workbook and add a worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(dataFormatted);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate the XLSX file
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Create a Blob and download link
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'employees_table.xlsx'; // Set the download filename
        link.click();

        return false; // Returning false prevents the default CSV download
    };

    const options = {
        filterType: 'select',
        selectableRowsHeader: false,
        selectableRows: false,
        download: true,
        onDownload: (buildHead: any, buildBody: any, columns: any, data: any) => {
            downloadXlsx(columns, data);
            return false; // Prevent the default CSV download
        },
    };

    return <MUIDataTable
        title={"Employee List"}
        data={GlobalState.employees}
        columns={columns}
        options={options}
    />
});