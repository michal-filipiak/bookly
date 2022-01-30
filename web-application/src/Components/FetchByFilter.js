import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
export default class FetchByFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    axios
      .get("https://fakestoreapi.com/products/category/" + this.props.type)
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
            <TableCell style={{ textAlign: "center" }}>{d.title}</TableCell>
            <TableCell style={{ textAlign: "center" }}>{d.image}</TableCell>
            <TableCell style={{ textAlign: "center" }}>{d.category}</TableCell>
            <TableCell style={{ textAlign: "center" }}>{d.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
}
