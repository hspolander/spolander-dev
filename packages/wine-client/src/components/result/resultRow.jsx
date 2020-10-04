import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { faWineGlassAlt } from "@fortawesome/free-solid-svg-icons";
import "./detailedResult.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
  root: {
    header: {
      background: "green",
    },
    flexGrow: 1,
    border: "1px solid lightgray",
    borderRadius: "5px",
    margin: "10px 0",
    padding: 10,
  },
  paper: {
    border: "1px solid #f7f8fa",
    boxShadow: "unset",
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  name: {
    fontWeight: "bold",
    paddingRight: 10,
  },
  color: {
    paddingRight: 10,
  },
  boughtfrom: {
    paddingRight: 10,
  },
}));

const ReviewResultDetailed = (props) => {
  const classes = useStyles();
  const { wine } = props;
  const {
    grapes,
    name,
    country,
    color,
    producer,
    year,
    reviews,
    boughtfrom,
    price,
  } = wine.wine;

  let reviewrows;

  if (reviews) {
    reviewrows = reviews.map((review) => (
      <div key={`review${review.id}`} className={classes.review}>
        <div className={classes.comment}>{review.comment}</div>
      </div>
    ));
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {name && (
          <Grid item xs={6} sm={6} md={6} lg={8} xl={9}>
            <Paper className={classes.paper}>
              {color && (
                <div className={classes.color}>
                  {color === "Rött" && (
                    <FontAwesomeIcon icon={faWineGlassAlt} className="red" />
                  )}
                  {color === "Vitt" && (
                    <FontAwesomeIcon icon={faWineGlassAlt} className="white" />
                  )}
                </div>
              )}
              <div className={classes.name}>{name}</div>
              {year && <div>{year}</div>}
              {country && <div>, {country}</div>}
            </Paper>
          </Grid>
        )}
        {reviews && (
          <Grid item xs={6} sm={6} md={6} lg={2} xl={2}>
            <Paper className={classes.paper}>
              <div className={classes.header}>
                <div className={classes.dateTime}>
                  {moment(reviews[0]?.added).format("YYYY-MM-DD HH:mm")}
                </div>
              </div>
            </Paper>
          </Grid>
        )}
        {reviews && reviews[0] && (
          <Grid item xs={6} sm={6} md={6} lg={2} xl={1}>
            <Paper className={classes.paper}>
              <div className="{classes.score}">{reviews[0].score} av 10</div>
            </Paper>
          </Grid>
        )}
        {grapes &&
          grapes.map((grape) => (
            <Grid
              item
              key={`grape${grape.id}`}
              className={classes.grape}
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={2}
            >
              <Paper className={classes.paper}>
                <div>{grape.grape}</div>
              </Paper>
            </Grid>
          ))}
        {producer && (
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <div>{producer}</div>
            </Paper>
          </Grid>
        )}
        {reviewrows && (
          <Grid item xs={6} sm={6} md={6} lg={6} xl={11}>
            <Paper className={classes.paper}>{reviewrows}</Paper>
          </Grid>
        )}
        <Grid item xs={6} sm={6} md={6} lg={6} xl={2}>
          <Paper className={classes.paper}>
            {boughtfrom && (
              <div className={classes.boughtfrom}>{boughtfrom}</div>
            )}
            {price && <div>{price}</div>}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReviewResultDetailed;
