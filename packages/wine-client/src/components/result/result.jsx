import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import "./result.scss";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faWineGlassAlt,
  faTimes,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import NewRow from "./resultRow";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchResult = ({ wine, loadValuesReview }) => {
  const rows = wine.data.map((singleWine) => (
    <Row
      key={`singleWine${singleWine.wine.id}`}
      wine={singleWine}
      loadValuesReview={loadValuesReview}
    />
  ));
  return (
    <div className="search-result">
      {wine && (
        <div className="wine-result">
          <div className="wine-result-div">
            <table className="single-table">
              <thead>
                <tr className="single-result">
                  <td>Namn</td>
                  <td>Land</td>
                  <td>Färg</td>
                  <td>Producent</td>
                  <td>År</td>
                  <td>Druvor</td>
                  <td>Volym</td>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
SearchResult.propTypes = {
  wine: PropTypes.object,
  loadValuesReview: PropTypes.func.isRequired,
};

export const SearchResultDetailed = ({ wine, loadValuesReview }) => {
  let rows;
  rows = wine.data.map((singleWine) => (
    <NewRow
      key={`wine${singleWine.wine.id}`}
      wine={singleWine}
      loadValuesReview={loadValuesReview}
    />
  ));

  return (
    <div className="search-result-detailed">
      {wine && (
        <div className="wine-result">
          <div className="wine-result-div">{rows}</div>
        </div>
      )}
    </div>
  );
};
SearchResultDetailed.propTypes = {
  wine: PropTypes.object,
  isSmallScreen: PropTypes.bool.isRequired,
  loadValuesReview: PropTypes.func.isRequired,
};

const Row = ({ wine, loadValuesReview }) => {
  const { grapes, name, country, type, producer, year, sizeml } = wine.wine;
  const graperows = grapes.map((grape) => (
    <div key={`grape${grape.id}`} className="grape">
      {grape.grape}
    </div>
  ));
  return (
    <tr className="single-result">
      <td>
        <div>{name}</div>
      </td>
      <td>
        <div>{country}</div>
      </td>
      <td>
        <div>
          {type && type.indexOf("bubbel") > -1 ? type : `${type}`}
          {type === "Rött vin" && (
            <FontAwesomeIcon icon={faWineGlassAlt} className="red" />
          )}
          {type === "Rosévin" && (
            <FontAwesomeIcon icon={faWineGlassAlt} className="rosa" />
          )}
          {type === "Vitt vin" && (
            <FontAwesomeIcon icon={faWineGlassAlt} className="white" />
          )}
        </div>
      </td>
      <td>{producer ? <div> {producer}</div> : <div />}</td>
      <td>
        <div>{year}</div>
      </td>
      {graperows && (
        <td>
          <div>{graperows}</div>
        </td>
      )}
      {sizeml ? (
        <td>
          <div> {sizeml}</div>
        </td>
      ) : (
        <td />
      )}
      <td>
        <FontAwesomeIcon
          icon={faComment}
          onClick={() => loadValuesReview(wine)}
        />
      </td>
    </tr>
  );
};
Row.propTypes = {
  wine: PropTypes.object,
  loadValuesReview: PropTypes.func.isRequired,
};

const RowDetailed = ({ wine, loadValuesReview }) => {
  const {
    grapes,
    name,
    country,
    type,
    producer,
    year,
    reviews,
    boughtfrom,
    price,
    glass,
  } = wine.wine;
  let reviewrows;

  if (reviews) {
    reviewrows = reviews.map((review) => (
      <div key={`review${review.id}`} className="review">
        <div className="result-header">Recension:</div>
        <div className="comment">{review.comment}</div>
      </div>
    ));
  }

  const graperows = grapes.map((grape) => (
    <div key={`grape${grape.id}`} className="grape">
      {grape.grape}
    </div>
  ));

  return (
    <div className="single-result-detailed">
      {reviews && reviews[0] && reviews[0].added && (
        <div className="header">
          <div className="reviewer">{reviews[0].reviewer}</div>
          <div className="date-time">
            {moment(reviews[0].added).format("YYYY-MM-DD HH:mm")}
          </div>
          <div className="score">{reviews[0].score} av 10</div>
        </div>
      )}
      <table className="single-table-detailed">
        <tbody>
          <tr>
            <td>
              <div className="result-header">Namn:</div>
              <div>{name}</div>
            </td>
            <td>
              <div className="result-header">Land:</div>
              <div>{country}</div>
            </td>
            <td>
              <div className="result-header">Producent:</div>
              <div>{producer}</div>
            </td>
            <td>
              <div className="result-header">Färg:</div>
              <div>
                {type}
                {type === "Rött vin" && (
                  <FontAwesomeIcon icon={faWineGlassAlt} className="red" />
                )}
                {type === "Vitt vin" && (
                  <FontAwesomeIcon icon={faWineGlassAlt} className="white" />
                )}
              </div>
            </td>
            <td>
              <div className="result-header">År:</div>
              <div>{year}</div>
            </td>
          </tr>
          {graperows && (
            <tr>
              <td colSpan="5">
                <div className="result-header">Druvor:</div>
                <div className="graperows">{graperows}</div>
              </td>
            </tr>
          )}
          {reviewrows && (
            <tr>
              <td colSpan="5">
                <div className="reviewrows">{reviewrows}</div>
              </td>
            </tr>
          )}
          {boughtfrom || price ? (
            <tr>
              <td colSpan="2">
                {boughtfrom && (
                  <div>
                    <div className="result-header">Inköpsplats:</div>
                    <div>{boughtfrom}</div>
                  </div>
                )}
              </td>
              <td colSpan="3">
                {price && (
                  <div>
                    <div className="result-header">Pris: </div>
                    <div>{price} per </div>
                    {glass ? <div>Glas</div> : <div>Flaska</div>}
                  </div>
                )}
              </td>
            </tr>
          ) : (
            <tr />
          )}
          <tr>
            <td />
            <td />
            <td>
              <div
                className="add-new-button"
                onClick={() => loadValuesReview(wine)}
              >
                <FontAwesomeIcon icon={faComment} /> Recensera
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
RowDetailed.propTypes = {
  wine: PropTypes.object,
  loadValuesReview: PropTypes.func.isRequired,
};

const RowMobile = ({ wine, loadValuesReview }) => {
  const {
    grapes,
    name,
    country,
    type,
    producer,
    year,
    reviews,
    boughtfrom,
    price,
    glass,
  } = wine.wine;
  let reviewrows;

  if (reviews) {
    reviewrows = reviews.map((review) => (
      <div key={`review${review.id}`} className="review">
        <div className="result-header">Recension:</div>
        <div className="comment">{review.comment}</div>
      </div>
    ));
  }
  const graperows = grapes.map((grape) => (
    <div key={`grape${grape.id}`} className="grape">
      {grape.grape}
    </div>
  ));
  return (
    <div className="single-result-detailed">
      {reviews && reviews[0] && reviews[0].added && (
        <div className="header">
          <div className="wine-name">{wine.name}</div>
          <div className="date-time">
            {moment(reviews[0].added).format("YYYY-MM-DD HH:mm")}
          </div>
          <div className="score">{reviews[0].score} av 10</div>
        </div>
      )}
      <div className="header">
        <div className="wine-name">{name}</div>
      </div>
      <table className="single-table-detailed">
        <tbody>
          <tr>
            <td>
              <div className="result-header">Land:</div>
              <div>{country}</div>
            </td>
            <td>
              <div className="result-header">Producent:</div>
              <div>{producer}</div>
            </td>
            <td>
              <div className="result-header">Färg:</div>
              <div>{type}</div>
            </td>
            <td>
              <div className="result-header">År:</div>
              <div>{year}</div>
            </td>
          </tr>
          {graperows && (
            <tr>
              <td colSpan="3">
                <div className="result-header">Druvor:</div>
                <div className="graperows">{graperows}</div>
              </td>
            </tr>
          )}
          {reviewrows && (
            <tr>
              <td colSpan="3">
                <div className="reviewrows">{reviewrows}</div>
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="2">
              {boughtfrom && (
                <div>
                  <div className="result-header">Inköpsplats:</div>
                  <div>{boughtfrom}</div>
                </div>
              )}
            </td>
            <td colSpan="2">
              {price && (
                <div>
                  <div className="result-header">Pris: </div>
                  <div>{price} per </div>
                  {glass ? <div>Glas</div> : <div>Flaska</div>}
                </div>
              )}
            </td>
          </tr>
          {
            <tr>
              <td />
              <td>
                <div
                  className="add-new-button"
                  onClick={() => loadValuesReview(wine)}
                >
                  <FontAwesomeIcon icon={faComment} /> Recensera
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
};
RowMobile.propTypes = {
  wine: PropTypes.object,
  loadValuesReview: PropTypes.func.isRequired,
};

export const Loader = () => (
  <div className="loader">
    <div>
      <FontAwesomeIcon icon={faSpinner} spin size="3x" aria-hidden="true" />
      <span>Laddar...</span>
    </div>
  </div>
);

export const Noresult = () => (
  <div className="loader">
    <div>
      <span>Vi hittade tyvärr inga recensioner...</span>
    </div>
  </div>
);
