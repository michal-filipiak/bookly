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
  const [url, setUrl] = useState("https://fakestoreapi.com/products");
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
    else if (props.bookingTypeToFilter !== "") return props.bookingTypeToFilter;
    else return "";
  };
  return (
    <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow hover>
            <TableCell style={{ textAlign: "center" }}>Owner ID</TableCell>
            <TableCell style={{ textAlign: "center" }}>Username</TableCell>
            <TableCell style={{ textAlign: "center" }}>Booking ID</TableCell>
            <TableCell style={{ textAlign: "center" }}>Booking Date</TableCell>
            <TableCell style={{ textAlign: "center" }}>
              Booking status
            </TableCell>
            <TableCell>
              Booking type
              <Button
                variant="text"
                style={{
                  maxWidth: "1px",
                  height: "30px",
                }}
                onClick={handleClick}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                ▼
              </Button>
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
  );
};
export default BookedTable;
