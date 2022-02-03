import React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Sort from "./Sort";
import BookedData from "./BookedData";
import { useState } from "react";
import FetchByFilter from "./FetchByFilter";
import { PortraitSharp } from "@mui/icons-material";

//import "./BookedTable.css";
const BookedTable = (props: any) => {
  const [url, setUrl] = useState("https://bookly.azurewebsites.net/bookings");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [option, setOption] = useState("");
  const [username, setUsername] = useState(""); //username here is used for sorting, incase of filter, the username will be passed as props, same with booking type.
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const optionSetter = (optionName: string) => {
    setOption(optionName);
  };
  const usernameSetter = (Username: string) => {
    setUsername(Username);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getFilteringField = () => {
    if (props.usernameToFilter !== "") return props.usernameToFilter;
    else if (props.bookingTypeToFilter !== "") {
      const iten = props.bookingTypeToFilter;
      if (iten === "Car") return 0;
      if (iten === "Flat") return 1;
      if (iten === "Slot") return 2;
    } else return "";
  };
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <TableContainer
        component={Paper}
        className="tablecontainer"
        style={{ borderRadius: 0 }}
      >
        <Table size="small" className="table">
          <TableHead>
            <TableRow hover>
              <TableCell className="tablecellheader" style={{ color: "white" }}>
                OWNER ID
              </TableCell>
              <TableCell className="tablecellheader" style={{ color: "white" }}>
                USERNAME
              </TableCell>
              <TableCell className="tablecellheader" style={{ color: "white" }}>
                BOOKING ID
              </TableCell>
              <TableCell className="tablecellheader" style={{ color: "white" }}>
                BOOKING DATE
              </TableCell>
              <TableCell className="tablecellheader" style={{ color: "white" }}>
                BOOKING STATUS
              </TableCell>
              <TableCell className="tablecellheader" style={{ color: "white" }}>
                BOOKING TYPE
                {/* <Button
                  variant="text"
                  style={{
                    maxWidth: "1px",
                    height: "30px",
                    color: "white",
                  }}
                  onClick={handleClick}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  ▼
                </Button> */}
                <Sort
                  handleClick={handleClick}
                  handleClose={handleClose}
                  open={open}
                  anchorEl={anchorEl}
                  optionSetter={optionSetter}
                  usernameSetter={usernameSetter}
                ></Sort>
              </TableCell>
              {/* <TableCell>Actions</TableCell>*/}
            </TableRow>
          </TableHead>

          {props.method === "All" ? (
            <BookedData option={option} url={url}></BookedData>
          ) : (
            <div></div>
          )}
          {props.method === "filter" ? (
            <FetchByFilter type={getFilteringField()}></FetchByFilter>
          ) : (
            <div></div>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};
export default BookedTable;
