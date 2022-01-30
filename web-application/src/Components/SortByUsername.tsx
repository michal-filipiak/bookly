import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function SortByUsername(props: any) {
  let username: any = React.createRef();
  const closeDialoge = () => {
    //console.log(username.current.value);
    props.usernameSetter(username.current.value);
    props.showUsernameSort(false);
  };
  return (
    <div>
      <Dialog open={props.open} onClose={closeDialoge}>
        <DialogTitle>Sort by username</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            inputRef={username}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialoge} variant="contained">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
