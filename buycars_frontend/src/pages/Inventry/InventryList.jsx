import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../Context/MinContext";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";

const headCells = [
  {
    id: "name",
    disablePadding: true,
    label: "Model Name",
  },
  {
    id: "price",

    disablePadding: false,
    label: "Price",
  },
  {
    id: "view",
    disablePadding: false,
    label: "View",
  },
  {
    id: "Update",

    disablePadding: false,
    label: "Update",
  },
  {
    id: "delete",

    disablePadding: false,
    label: "Delete",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const [selected, setSelected] = useState([]);

  const { getInventry, inventry, setSavedforCurd, deleteInventry } =
    useContext(MainContext);
  const navigate = useNavigate();
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const handelCURD = (elem, reqType) => {
    setSavedforCurd(elem);
    if (reqType === "view") {
      navigate(`/inventry/${elem._id}`);
    } else if (reqType === "edit") {
      navigate(`/inventry/update/${elem._id}`);
    } else if (reqType === "delete") {
      deleteInventry({ ids: [elem._id] });
    }
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  useEffect(() => {
    getInventry();
  }, []);
  return (
    <Box sx={{ width: "90%", margin: "auto" }}>

      <Typography m={2} variant="h4" fontWeight={"bold"}>
  Inventry List

    </Typography>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead />
            <TableBody>
              {inventry &&
                inventry.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row._id}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        <Checkbox
                          onClick={(event) => handleClick(event, row._id)}
                          color="primary"
                          checked={isItemSelected}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.modelName}
                      </TableCell>
                      <TableCell>{row.price} Rs.</TableCell>
                      <TableCell onClick={() => handelCURD(row, "view")}>
                        <RemoveRedEyeIcon />
                      </TableCell>
                      <TableCell onClick={() => handelCURD(row, "edit")}>
                        <EditIcon />
                      </TableCell>
                      <TableCell onClick={() => handelCURD(row, "delete")}>
                        <DeleteIcon />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
