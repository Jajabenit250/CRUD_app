import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Grid,
} from "@material-ui/core";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  usePagination,
  useColumnOrder,
} from "react-table";
import { getAlbums } from '../redux/action'
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from "@material-ui/icons";
import GlobalFilter from "./GlobalFilter";
import Controls from "./controls/Controls";
import Popup from "./Popup";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import { connect } from 'react-redux';
let ItemList = (props) => {
  /** Global constant */
  const [items, setItems] = useState([]);
  const [rowIndex, setRowIndex] = useState();
  const itemsRef = useRef();
  itemsRef.current = items;
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);

  /** End of Global constant */

  /** use effect */
  useEffect((props) => {
    openItem();
    // setItems(props.getAlbums);
  }, []);
  const openItem = () => {
    console.log('inside');
    getAlbums();
    console.log('outside');
  };
  const editItem = (e) => {
    e.preventDefault();
    props.history.push("/edit/" + rowIndex);
    setEditPopup(true);
  };
  const deleteItem = () => {};
  const columns = useMemo(
    () => [
      {
        Header: "userId",
        accessor: "userId",
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "TITLE",
        accessor: "title",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          setRowIndex(props.row.id);
          return (
            <div>
              <Grid container>
                <Grid item>
                  <Button
                    type="button"
                    className={classes.buttonEdit}
                    onClick={editItem}
                  >
                    Edit
                  </Button>
                  <Button className={classes.buttonDelete}>Delete</Button>
                </Grid>
              </Grid>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data: items,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useColumnOrder
  );
  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={true} />
        <Grid item>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </Grid>
      </Grid>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table
          size="small"
          className={classes.table}
          stickyHeader
          aria-label="a dense table"
          {...getTableProps()}
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow
                hover
                role="checkbox"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowUpwardOutlined />
                        ) : (
                          <ArrowDownwardOutlined />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow hover role="checkbox" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        component="th"
                        scope="row"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <span className="m-auto">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span className="m-2">
          || Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "100px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 25, 50, 75, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {" "}
              Show{pageSize}
            </option>
          ))}
        </select>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button
          className="m-3"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </Button>
      </div>

      <Grid container alignItems="center" className={classes.btnContainer}>
        <Grid item>
          <Button className={classes.btnScv} variant="contained">
            Download SCV
          </Button>
        </Grid>
        <Grid item>
          <Controls.Button
            text="Add New"
            className={classes.btnAdd}
            variant="contained"
            onClick={() => setOpenPopup(true)}
          ></Controls.Button>
        </Grid>
      </Grid>
      <Popup title="new" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddItem />
      </Popup>

      <Popup title="Edit" openPopup={editPopup} setOpenPopup={setEditPopup}>
        <EditItem />
      </Popup>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  buttonEdit: {
    backgroundColor: "#dce62c",
    marginRight: theme.spacing(2),
  },
  buttonDelete: {
    backgroundColor: "#d44633",
  },
  table: {
    minWidth: 650,
  },
  tableContainer: {
    marginTop: "1em",
  },
  btnContainer: {
    margin: "1em",
  },
  btnScv: {
    backgroundColor: "#4779ed",
    marginRight: "1rem",
  },
  btnAdd: {
    backgroundColor: "#40c25c",
  },
}));

const mapStateToProps = (state) => {
  console.log(state);
  return {
    albums: state,
  };
};

export default connect(mapStateToProps, {
  getAlbums
})(ItemList);