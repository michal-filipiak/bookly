import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const Filter = (props: any) => {
  const [activeFilterMethod, setActiveFilterMethod] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  let nameToFilter: any = React.createRef();
  const carOption = () => {
    props.bookingTypeSetter("Car");
    props.methodSetter("filter");
    setAnchorEl(null);
  };
  const flatOption = () => {
    props.bookingTypeSetter("Flat");
    props.methodSetter("filter");
    setAnchorEl(null);
  };
  const parkingOption = () => {
    props.bookingTypeSetter("Parking");
    props.methodSetter("filter");
    setAnchorEl(null);
  };
  const userMethod = () => {
    setActiveFilterMethod("User");
    props.bookingTypeSetter("");
  };
  const bookingMethod = () => {
    setActiveFilterMethod("Booking");
    props.nameSetter("");
  };
  const ButtonWork = () => {
    setActiveFilterMethod("");
    props.nameSetter(nameToFilter.current.value);
    if (nameToFilter.current.value !== "") {
      props.methodSetter("filter");
      //props.urlSetter(nameToFilter.current.value, 1);
    }
    props.setFilterOpenState();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Dialog open={props.filterOpen} onClose={ButtonWork}>
        <DialogTitle style={{ background: "black", color: "antiquewhite" }}>
          Filter bookings
        </DialogTitle>
        <DialogContent style={{ background: "antiquewhite" }}>
          <DialogContentText></DialogContentText>
          <TextField
            disabled={activeFilterMethod === "User" ? false : true}
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            inputRef={nameToFilter}
            //onChange={setCurrentFilterMethod}
          />
          <Button
            onClick={handleClick}
            variant="contained"
            style={{ background: "black", color: "antiquewhite  " }}
            disabled={activeFilterMethod === "Booking" ? false : true}
          >
            Booking type
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={carOption}>Car</MenuItem>
            <MenuItem onClick={flatOption}>Flat</MenuItem>
            <MenuItem onClick={parkingOption}>Parking spot</MenuItem>
          </Menu>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Username"
              onChange={userMethod}
              disabled={activeFilterMethod !== "" ? true : false}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Booking type"
              onChange={bookingMethod}
              disabled={activeFilterMethod !== "" ? true : false}
            />
          </FormGroup>
        </DialogContent>

        <DialogActions style={{ background: "black" }}>
          <Button
            onClick={ButtonWork}
            style={{ background: "antiquewhite", color: "black" }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Filter;
