import React from "react";
import PropTypes from "prop-types";
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


const SystembolagetProductCard = ({ wine, addWineClick }) => {
  const classes = useStyles();
  const { productNumber, name, country, volumeText, vintage, image } = wine;

  return (
    <GridListTile className={classes.tile} key={productNumber}>
      <Paper>
        <img className={classes.image} src={image !== "" ? `${image}_400.png` : "https://cdn.systembolaget.se/490dd4/contentassets/ef797556881d4e20b334529d96b975a2/placeholder-wine-bottle.png"} alt="Vin bild"/>
        <GridListTileBar
          title={`${name}, ${vintage}`}
          subtitle={<span>{`${country} ${volumeText}`}</span>}
          actionIcon={
            <IconButton
              aria-label={`Add ${name}`}
              className={classes.icon}
              onClick={() => addWineClick(wine)}
            >
              <ControlPointIcon />
            </IconButton>
          }
        />
      </Paper>
    </GridListTile>
  );
};
SystembolagetProductCard.propTypes = {
  wine: PropTypes.object.isRequired,
};

export default SystembolagetProductCard;
