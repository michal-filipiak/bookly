import React from "react";
import { useState } from "react";
import { Button, ButtonGroup, MenuItem } from "@mui/material";
import ManageUsersTable from "./Components/ManageUsersTable";
import AddUserForm from "./Components/SortByUsername";
import Filter from "./Components/Filter";
import FilterListIcon from "@mui/icons-material/FilterList";
import { InputLabel, TextField } from "@mui/material";
import "./styles.css";
import BookedTable from "./Components/BookedTable";
function App() {
  const [Active, setActive] = useState("Booked"); //by default active the booked view
  const [open, setOpen] = React.useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [usernameToFilter, setUsername] = useState("");
  const [bookingTypeToFilter, setBookingType] = useState("");
  const [method, setMethod] = useState("All");
  const bookingType = [
    {
      value: "cars",
      label: "Car",
    },
    {
      value: "flats",
      label: "Flat",
    },
    {
      value: "parking_spots",
      label: "Parking Spot",
    },
  ];

  const methodSetter = (type: string) => {
    setMethod(type);
  };
  const resetFilter = () => {
    setFilterOpen(!filterOpen);
    setMethod("All");
  };

  const nameSetter = (name: string) => {
    setUsername(name);
  };
  const bookingTypeSetter = (type: string) => {
    setBookingType(type);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const setFilterOpenState = () => {
    setFilterOpen(!filterOpen);
  };
  return (
    <div>
      <div style={{ margin: "1%" }}>
        <Button
          variant="outlined"
          style={{
            marginLeft: "4%",
            borderRadius: 0,
            width: "20%",
            marginRight: "1%",
          }}
          color={Active === "Users" ? "secondary" : "primary"}
          onClick={() => {
            setActive("Users");
          }}
        >
          Manage Users
        </Button>
        <Button
          style={{ borderRadius: 0, width: "20%" }}
          variant="outlined"
          color={Active === "Booked" ? "secondary" : "primary"}
          onClick={() => {
            setActive("Booked");
          }}
        >
          Bookings
        </Button>
      </div>

      {Active === "Booked" ? (
        <div style={{ marginTop: "3%", marginBottom: "3%", marginLeft: "5%" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "black",
              color: "white",
              marginRight: "5%",
              marginBottom: "10px",
              float: "right",
              borderRadius: 0,
              width: "15%",
            }}
            onClick={resetFilter}
          >
            Filter
            <FilterListIcon style={{ marginLeft: "10px" }} />
          </Button>
        </div>
      ) : (
        <div></div>
      )}

      <Filter
        filterOpen={filterOpen}
        setFilterOpenState={setFilterOpenState}
        nameSetter={nameSetter}
        bookingTypeSetter={bookingTypeSetter}
        methodSetter={methodSetter}
      ></Filter>
      <AddUserForm open={open} handleClose={handleClose}></AddUserForm>
      {Active === "Booked" ? (
        <BookedTable
          usernameToFilter={usernameToFilter}
          bookingTypeToFilter={bookingTypeToFilter}
          methodSetter={methodSetter}
          method={method}
          resetFilter={resetFilter}
        ></BookedTable>
      ) : (
        <ManageUsersTable></ManageUsersTable>
      )}
    </div>
  );
}

export default App;
