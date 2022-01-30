import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SortByUsername from "./SortByUsername";
import { useState } from "react";
export default function Sort(props: any) {
  const [usernameSort, setUsernameSort] = useState(false);
  const carOption = () => {
    props.optionSetter("Car");
    props.usernameSetter("");
    props.handleClose();
  };
  const flatOption = () => {
    props.optionSetter("Flat");
    props.usernameSetter("");
    props.handleClose();
  };
  const parkingOption = () => {
    props.optionSetter("Parking");
    props.usernameSetter("");
    props.handleClose();
  };
  const openUsernameSort = () => {
    props.optionSetter("");
    setUsernameSort(true);
  };
  const showUsernameSort = (value: boolean) => {
    setUsernameSort(value);
  };
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={carOption}>Car</MenuItem>
        <MenuItem onClick={flatOption}>Flat</MenuItem>
        <MenuItem onClick={parkingOption}>Parking spot</MenuItem>
        <MenuItem onClick={openUsernameSort}>Username</MenuItem>
      </Menu>
      {usernameSort ? (
        <SortByUsername
          open={usernameSort}
          showUsernameSort={showUsernameSort}
          usernameSetter={props.usernameSetter}
        ></SortByUsername>
      ) : (
        <div></div>
      )}
    </div>
  );
}
