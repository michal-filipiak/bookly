import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TableFooter } from "@mui/material";
import TablePaginationActions from "./TablePagination";
import { TablePagination } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TableView.css";
export default class FetchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  deleteUser = (id) => {
    axios.delete("https://bookly.azurewebsites.net/users/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer cf6kmRcRsLTe989qM1W-EdBqVCNpBw6i",
      },
    });
  };

  buttonHandler = (e) => {
    //this.props.userDeletion();
    this.props.setIDToDelete(e.target.tabIndex);
    this.props.userDeletion();
    this.deleteUser(e.target.tabIndex);
  };

  async componentDidMount() {
    axios
      .get("https://bookly.azurewebsites.net/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer cf6kmRcRsLTe989qM1W-EdBqVCNpBw6i",
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios
      .get("https://bookly.azurewebsites.net/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer cf6kmRcRsLTe989qM1W-EdBqVCNpBw6i",
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { data } = this.state;

    const handleChangePage = (event, newPage) => {
      this.setState({ page: newPage });
    };

    const handleChangeRowsPerPage = (event) => {
      this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
    };

    return (
      <>
        <TableBody>
          {(this.state.rowsPerPage > 0
            ? data.slice(
                this.state.page * this.state.rowsPerPage,
                this.state.page * this.state.rowsPerPage +
                  this.state.rowsPerPage
              )
            : data
          ).map((d) => (
            <TableRow hover>
              <TableCell className="tablecell"> {d.id} </TableCell>
              <TableCell className="tablecell">{d.firstName}</TableCell>
              <TableCell className="tablecell">{d.lastName}</TableCell>
              <TableCell className="tablecell"> {d.login} </TableCell>
              <TableCell className="tablecell" style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "darkred",
                    color: "white",
                    borderRadius: 0,
                    width: "50%",
                  }}
                  onClick={this.buttonHandler}
                  tabIndex={d.id}
                >
                  Delete
                  <DeleteIcon style={{ marginLeft: "10px" }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={data.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </>
    );
  }
}
