import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ManageUsersTable from "./Components/ManageUsersTable";
import AddUserForm from "./Components/SortByUsername";
import Filter from "./Components/Filter";
import "./styles.css";
import BookedTable from "./Components/BookedTable";
function App() {
  const [Active, setActive] = useState("Booked"); //by default active the booked view
  const [open, setOpen] = React.useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [usernameToFilter, setUsername] = useState("");
  const [bookingTypeToFilter, setBookingType] = useState("");
  const [method, setMethod] = useState("All");

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
    <div className="Bar">
      <ButtonGroup
        style={{
          marginTop: "5%",
          marginLeft: "0.5%",
        }}
      >
        <Button
          variant="contained"
          color={Active === "Users" ? "secondary" : "primary"}
          onClick={() => {
            setActive("Users");
          }}
        >
          Manage Users
        </Button>
        <Button
          variant="contained"
          color={Active === "Booked" ? "secondary" : "primary"}
          onClick={() => {
            setActive("Booked");
          }}
        >
          Bookings
        </Button>
      </ButtonGroup>

      {Active === "Booked" ? (
        <ButtonGroup style={{ float: "right", marginTop: "5rem" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "black",
              color: "white",
              marginRight: "2rem",
            }}
            onClick={resetFilter}
          >
            Filter
          </Button>
        </ButtonGroup>
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
