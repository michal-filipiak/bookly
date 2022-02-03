import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { TableFooter } from "@mui/material";
import TablePaginationActions from "./TablePagination";
import { TablePagination } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
export default class UserData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 5,
    };
  }
  //"https://bookly.azurewebsites.net/bookings?"
  async componentDidMount() {
    const apiUrl =
      "https://bookly.azurewebsites.net/bookings?order=ASC&pageNum=0&pageSize=100";
    /* this.state.page +*/
    /*"&pageSize=" +*/
    /* this.state.rowsPerPage;*/
    axios
      .get(apiUrl, {
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
    const emptyRows = () => {
      return this.state.page > 0
        ? Math.max(
            0,
            (1 + this.state.page) * this.state.rowsPerPage - data.length
          )
        : 0;
    };

    const handleChangePage = (event, newPage) => {
      this.setState({ page: newPage });
    };

    const handleChangeRowsPerPage = (event) => {
      this.setState({
        page: 0,
        rowsPerPage: parseInt(event.target.value, 10),
      });
    };

    return data.content !== undefined ? (
      <>
        <TableBody>
          {
            /* {(this.state.rowsPerPage > 0
            ? data.slice(
                this.state.page * this.state.rowsPerPage,
                this.state.page * this.state.rowsPerPage +
                  this.state.rowsPerPage
              )
            : data
          )*/
            data.content.map((d) => (
              <TableRow hover key={d.id}>
                <TableCell className="tablecell">{d.owner.id}</TableCell>
                <TableCell className="tablecell">{d.owner.login}</TableCell>
                <TableCell className="tablecell">{d.id}</TableCell>
                <TableCell className="tablecell">{d.startDateTime}</TableCell>
                <TableCell className="tablecell">
                  {d.active ? "Active" : "In active"}
                </TableCell>
                <TableCell className="tablecell">{d.itemType}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={data.content.length}
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
    ) : (
      <div></div>
    );
  }
}
