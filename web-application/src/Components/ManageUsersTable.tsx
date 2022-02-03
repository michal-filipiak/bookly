import React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import FetchUsers from "./FetchUsers";
import Register from "./RegisterView";
import "./TableView.css";

const ManageUsersTable = () => {
  const [deleteUser, setDeleteUser] = useState(false);
  const [userIdToDelete, setUserID] = useState(-1);
  const [addUser, setAddUser] = useState(false);
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
    <Box style={{ width: "90%", margin: "auto" }}>
      <Button
        variant="contained"
        style={{
          backgroundColor: "black",
          color: "white",
          float: "right",
          marginBottom: "10px",
          borderRadius: 0,
          width: "15%",
        }}
        onClick={() => {
          setAddUser(true);
        }}
      >
        Add User
        <PersonIcon style={{ marginLeft: "10px" }} />
      </Button>

      <TableContainer
        component={Paper}
        className="tablecontainer"
        style={{ borderRadius: 0 }}
      >
        <Table size="small" className="table">
          <TableHead>
            <TableRow>
              <TableCell className="tablecellheader" style={{ color: "white" }}>
                USER ID
              </TableCell>
              <TableCell className="tablecellheader" style={{ color: "white" }}>
                FIRST NAME
              </TableCell>
              <TableCell className="tablecellheader" style={{ color: "white" }}>
                LAST NAME
              </TableCell>
              <TableCell className="tablecellheader" style={{ color: "white" }}>
                USERNAME
              </TableCell>
              <TableCell
                className="tablecellheader"
                style={{ textAlign: "center", color: "white" }}
              >
                ACTIONS
              </TableCell>
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
      {addUser && <Register setAddUser={setAddUser}></Register>}
    </Box>
  );
};
export default ManageUsersTable;
