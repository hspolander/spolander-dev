import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  tile: {
    maxHeight: 350,
    width: 400,
    padding: 10,
  },
  image: {
    height: 350,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const WineResultCard = ({ wine }) => {
  const classes = useStyles();
  console.log(wine)
  const { link, image, name1, country, volume, year } = wine;
  return (
    <GridListTile className={classes.tile} key={link}>
      <Paper>
        <img className={classes.image} src={image} alt={name1} />
        <GridListTileBar
          title={`${name1}, ${year}`}
          subtitle={<span>{`${country} ${volume}`}</span>}
          actionIcon={
            <IconButton
              aria-label={`Add ${name1}`}
            >
              <ControlPointIcon />
            </IconButton>
          }
        />
      </Paper>
    </GridListTile>
  );
};

export default WineResultCard;
