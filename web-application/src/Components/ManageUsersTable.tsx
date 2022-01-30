import React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FetchUsers from "./FetchUsers";
const ManageUsersTable = () => {
  const [deleteUser, setDeleteUser] = useState(false);
  const [userIdToDelete, setUserID] = useState(-1);
  const userDeletion = () => {
    setDeleteUser(true);
  };
  const resetUserDeletion = () => {
    setDeleteUser(false);
  };
  const setIDToDelete = (ID: number) => {
    setUserID(ID);
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: "center" }}>User ID</TableCell>
            <TableCell style={{ textAlign: "center" }}>First Name</TableCell>
            <TableCell style={{ textAlign: "center" }}>Last Name</TableCell>
            <TableCell style={{ textAlign: "center" }}>Username</TableCell>
            <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <FetchUsers
          userDeletion={userDeletion}
          deleteUser={deleteUser}
          userIdToDelete={userIdToDelete}
          setIDToDelete={setIDToDelete}
          resetUserDeletion={resetUserDeletion}
        ></FetchUsers>
      </Table>
    </TableContainer>
  );
};
export default ManageUsersTable;
