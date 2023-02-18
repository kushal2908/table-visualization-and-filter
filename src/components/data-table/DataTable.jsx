import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { Checkbox, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

export default function Datatable({ columns, data, ...props }) {
  const sortIcon = <ChevronDownIcon />;

  return (
    <>
      <DataTableExtensions data={data} columns={columns} export={false} print={false} filterPlaceholder="Search Table">
        <DataTable
          pagination
          // selectableRowsComponent={Checkbox}
          sortIcon={sortIcon}
          persistTableHead
          {...props}
        />
      </DataTableExtensions>
    </>
  );
}
