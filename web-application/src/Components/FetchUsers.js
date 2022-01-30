import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Button from "@mui/material/Button";
export default class FetchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    if (this.props.deleteUser) {
      axios.delete("https://fakestoreapi.com/products/9");
      this.props.resetUserDeletion();
    }
    axios
      .get("https://fakestoreapi.com/products/category/electronics")
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

    return (
      <TableBody>
        {data.map((d) => (
          <TableRow hover>
            <TableCell style={{ textAlign: "center" }}>{d.id}</TableCell>
            <TableCell style={{ textAlign: "center" }}>{d.title}</TableCell>
            <TableCell style={{ textAlign: "center" }}>{d.price}</TableCell>
            <TableCell style={{ textAlign: "center" }}>{d.image}</TableCell>
            <TableCell style={{ textAlign: "center" }}>
              {" "}
              <Button
                variant="contained"
                color="success"
                onClick={this.props.userDeletion}
              >
                {this.props.deleteUser
                  ? this.props.setIDToDelete(d.id)
                  : this.props.setIDToDelete(-1)}
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
}
