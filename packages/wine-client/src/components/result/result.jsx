import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import './result.scss';
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faCartPlus, faWineGlassAlt, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SearchResult = ({
  wine,
  loadValuesAddWine,
  removeFromCellar,
  loadValuesReview,
}) => {
  console.log(wine);
  const rows = wine.data.map(singleWine => (
    <Row
      key={`singleWine${singleWine.wine.id}`}
      wine={singleWine}
      loadValuesAddWine={loadValuesAddWine}
      removeFromCellar={removeFromCellar}
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
  removeFromCellar: PropTypes.func.isRequired,
  loadValuesAddWine: PropTypes.func.isRequired,
};

export const SearchResultDetailed = ({
  wine,
  loadValuesAddWine,
  removeFromCellar,
  loadValuesReview,
  isSmallScreen,
}) => {
  let rows;
  if (isSmallScreen) {
    rows = wine.data.map(singleWine => (
      <RowMobile
        key={`wine${singleWine.wine.id}`}
        wine={singleWine}
        loadValuesAddWine={loadValuesAddWine}
        removeFromCellar={removeFromCellar}
        loadValuesReview={loadValuesReview}
      />
    ));
  } else {
    rows = wine.data.map(singleWine => (
      <RowDetailed
        key={`wine${singleWine.wine.id}`}
        wine={singleWine}
        loadValuesAddWine={loadValuesAddWine}
        removeFromCellar={removeFromCellar}
        loadValuesReview={loadValuesReview}
      />
    ));
  }

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
  removeFromCellar: PropTypes.func,
  loadValuesAddWine: PropTypes.func.isRequired,
};

const Row = ({
  wine,
  loadValuesReview,
  loadValuesAddWine,
  removeFromCellar,
}) => {
  const { grapes, name, country, color, producer, year, sizeml } = wine.wine;
  const graperows = grapes.map(grape => (
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
          {color.indexOf('bubbel') > -1 ? color : `${color} vin`}
          {color === 'Rött' && (
            <FontAwesomeIcon icon={faWineGlassAlt} className="red" />
          )}
          {color === 'Rosé' && (
            <FontAwesomeIcon icon={faWineGlassAlt} className="rosa" />
          )}
          {color === 'Vitt' && (
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
        <FontAwesomeIcon
          icon={faCartPlus}
          onClick={() => loadValuesAddWine(wine)}
        />
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => removeFromCellar(wine.id)}
        />
      </td>
    </tr>
  );
};
Row.propTypes = {
  wine: PropTypes.object,
  loadValuesReview: PropTypes.func.isRequired,
  loadValuesAddWine: PropTypes.func.isRequired,
  removeFromCellar: PropTypes.func.isRequired,
};

const RowDetailed = ({
  wine,
  loadValuesReview,
  loadValuesAddWine,
  removeFromCellar,
}) => {
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
    glass,
  } = wine.wine;
  let reviewrows;

  if (reviews) {
    reviewrows = reviews.map(review => (
      <div key={`review${review.id}`} className="review">
        <div className="result-header">Recension:</div>
        <div className="comment">{review.comment}</div>
      </div>
    ));
  }

  const graperows = grapes.map(grape => (
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
            {moment(reviews[0].added).format('YYYY-MM-DD HH:mm')}
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
                {color}
                {color === 'Rött' && (
                  <FontAwesomeIcon icon={faWineGlassAlt} className="red" />
                )}
                {color === 'Vitt' && (
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
                <FontAwesomeIcon icon={faComment} />{' '}
                Recensera
              </div>
            </td>
            <td>
              <div
                className="add-new-button"
                onClick={() => loadValuesAddWine(wine)}
              >
                <FontAwesomeIcon icon={faCartPlus} /> Lägg till i
                förråd
              </div>
            </td>
            <td>
              <div
                className="add-new-button"
                onClick={() => removeFromCellar(wine.id)}
              >
                <FontAwesomeIcon icon={faTimes} /> Ta bort från
                vinkällare
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
  loadValuesAddWine: PropTypes.func.isRequired,
  removeFromCellar: PropTypes.func.isRequired,
};

const RowMobile = ({ wine, loadValuesAddWine, loadValuesReview }) => {
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
    glass,
  } = wine.wine;
  let reviewrows;

  if (reviews) {
    reviewrows = reviews.map(review => (
      <div key={`review${review.id}`} className="review">
        <div className="result-header">Recension:</div>
        <div className="comment">{review.comment}</div>
      </div>
    ));
  }
  const graperows = grapes.map(grape => (
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
            {moment(reviews[0].added).format('YYYY-MM-DD HH:mm')}
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
              <div>{color}</div>
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
                  <FontAwesomeIcon icon={faComment} />{' '}
                  Recensera
                </div>
              </td>
              <td>
                <div
                  className="add-new-button"
                  onClick={() => loadValuesAddWine(wine)}
                >
                  <FontAwesomeIcon icon={faCartPlus} /> Lägg till
                  i förråd
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
  loadValuesAddWine: PropTypes.func.isRequired,
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
