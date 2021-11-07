import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Paper, GridList } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import SystembolagetProductCard from "./SystembolagetProductCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {},
}));

const SearchSysResult = ({ systemWineData, addWineClick }) => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [visibleWines, setVisibleWines] = useState([]);
  const [paginationCount, setPaginationCount] = useState(1);
  const winesPerPage = 8;
  const classes = useStyles();

  useEffect(() => {
    if (systemWineData.length > 0) {
      const startIndex = paginationPage * winesPerPage - winesPerPage;
      let endIndex = paginationPage * winesPerPage;
      endIndex =
        endIndex > systemWineData.length ? systemWineData.length : endIndex;
      setPaginationCount(Math.ceil(systemWineData.length / winesPerPage));
      setVisibleWines(systemWineData.slice(startIndex, endIndex));
    }
  }, [paginationPage, systemWineData]);

  return (
    <Paper className={classes.root}>
      {visibleWines.length > 0 ? (
        <>
          <GridList cellHeight={200} className={classes.gridList}>
            {visibleWines.map((wine) => (
              <SystembolagetProductCard
                key={wine.name1}
                wine={wine}
                addWineClick={addWineClick}
              />
            ))}
          </GridList>
          <Pagination
            count={paginationCount}
            page={paginationPage}
            siblingCount={2}
            onChange={(event, value) => setPaginationPage(value)}
          />
        </>
      ) : (
        <div>Inga träffar</div>
      )}
    </Paper>
  );
};
SearchSysResult.propTypes = {
  systemWineData: PropTypes.array,
  addWineClick: PropTypes.func,
};

export default SearchSysResult;
