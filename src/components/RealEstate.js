import * as React from "react";
import { useState  } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row({ realestate }) {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon sx={{color: 'Purple'}}/> : <KeyboardArrowDownIcon />}
            REAL ESTATE {<span>({realestate.length})</span>}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name Of the Holding</TableCell>
                    <TableCell>Ticker </TableCell>
                    <TableCell>Average Price</TableCell>
                    <TableCell>Market Price</TableCell>
                    <TableCell>Lastest Change </TableCell>
                    <TableCell>Market value in base copy</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {realestate.map((realestate, index) => (
                    <TableRow key={index}>
                      <TableCell>{realestate.name}</TableCell>
                      <TableCell>{realestate.ticker}</TableCell>
                      <TableCell>{realestate.avg_price}</TableCell>
                      <TableCell>{realestate.market_price}</TableCell>
                      <TableCell>{realestate.latest_chg_pct}</TableCell>
                      <TableCell>{realestate.market_value_ccy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    avg_price: PropTypes.number.isRequired,
    market_price: PropTypes.number.isRequired,
    market_value_ccy: PropTypes.number.isRequired,
    latest_chg_pct: PropTypes.number.isRequired,
  }).isRequired,
};

export default function RealEstate({ arrayofrealestate }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          <Row realestate={arrayofrealestate} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}