import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Dialog from "@spolander/shared-components/src/components/Dialog";
import ButtonRegular from "@spolander/shared-components/src/components/ButtonRegular";
import Backdrop from "@material-ui/core/Backdrop";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AddReviewForm from "./AddReviewForm";
import SearchSysForm from "./SearchSysForm";
import SearchSysResult from "./SearchSysResult";
import setScreenSize from "../global/actions";
import { authUser } from "../login/actions";
import {
  loadSystembolagetWineData,
  loadAddReview,
  clearSnackbar,
} from "./actions";

import "./add.scss";

const AddReview = ({
  systemWineData,
  singleSysWineData,
  fetching,
  snackbar,
  addedWine,
}) => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const resultNode = useRef();
  const [addReviewFormData, setAddReviewFormData] = useState({
    name: "",
    producer: "",
    type: "",
    subType: "",
    year: "",
    country: "",
    boughtFrom: "",
    price: "",
    container: "",
    nr: "",
    review: "",
    volume: "",
    grapes: [],
    comment: "",
    score: 0,
  });

  useEffect(() => {
    if (singleSysWineData) {
      const { product } = singleSysWineData;
      const {
        alcoholPercentage,
        categoryLevel2,
        categoryLevel3,
        country,
        grapes,
        priceInclVat,
        productNumber,
        producerName,
        productNameBold,
        productNameThin,
        vintage,
        volume,
      } = product;
      const name1 = productNameBold && productNameBold.trim();
      const name2 = productNameThin ? `, ${productNameThin}` : "";
      setAddReviewFormData({
        name: name1 + name2,
        country,
        grapes: grapes && grapes.split(";"),
        price: priceInclVat,
        type: categoryLevel2 && categoryLevel2,
        subType: categoryLevel3 && categoryLevel3,
        producer: producerName,
        nr: productNumber,
        year: vintage,
        boughtFrom: "Systembolaget",
        score: 0,
        volume: `${volume} ml`,
        comment: alcoholPercentage ? `\r\nAlk.: ${alcoholPercentage}%` : "",
      });
    }
  }, [singleSysWineData]);

  useEffect(() => {
    setIsReviewDialogOpen(false);
  }, [addedWine]);

  useEffect(() => {
    authUser();
    if (window.innerWidth <= 1024) {
      setScreenSize(true);
    } else {
      setScreenSize(false);
    }
  }, []);

  const validateInputs = async () => {
    const requiredFields = ["name", "type", "score", "comment"];
    const areRequiredInputsFilled = requiredFields.every((requiredField) => addReviewFormData[requiredField])
    if (areRequiredInputsFilled) {
      await loadAddReview(addReviewFormData)
    } else {
      alert("Du måste fylla i fälten Namn, Färg, Betyg samt Recension.")
    }
  };

  const onAddSystembolagetWineClick = async (url) => {
    await loadSystembolagetWineData(url);
    setIsReviewDialogOpen(true);
  };

  return (
    <div className="content">
      <Snackbar
        autoHideDuration={10000}
        open={snackbar?.message}
        onClose={() => clearSnackbar()}
      >
        <Alert onClose={() => clearSnackbar()} severity={snackbar?.messageType}>
          {snackbar?.message}
        </Alert>
      </Snackbar>
      <Backdrop open={fetching} />
      <div className="add-wine">
        <div className="formtitle">
          <span>Lägg till från systembolagets sortiment</span>
        </div>
        <SearchSysForm />
        {systemWineData && (
          <div ref={resultNode}>
            {systemWineData.length > 0 ? (
              <SearchSysResult
                systemWineData={systemWineData}
                addWineClick={onAddSystembolagetWineClick}
              />
            ) : (
              <p>Inget resultat på din sökning</p>
            )}
          </div>
        )}
        <Dialog
          title="Lägg till recension"
          scroll="body"
          isOpen={isReviewDialogOpen}
          onClose={() => setIsReviewDialogOpen(false)}
          disableBackdropClick
          maxWidth="lg"
          isFullScreen={false}
          actions={
            <>
              <ButtonRegular
                onClick={() => setIsReviewDialogOpen(false)}
                title="Stäng"
                variant="outlined"
                color="secondary"
              >
                Stäng
              </ButtonRegular>
              <ButtonRegular
                onClick={() => validateInputs()}
                variant="contained"
                color="primary"
              >
                Lägg till
              </ButtonRegular>
            </>
          }
        ><AddReviewForm
              formdata={addReviewFormData}
              setFormData={setAddReviewFormData}
            /></Dialog>
      </div>
    </div>
  );
};
AddReview.propTypes = {
  systemWineData: PropTypes.array,
};

const mapStateToProps = (state) => ({
  data: state.addReducer.data,
  error: state.addReducer.error,
  fetching: state.addReducer.fetching,
  fetchIsBlocking: state.addReducer.fetchIsBlocking,
  addReviewValues: state.addReducer.addReviewValues,
  systemWineData: state.addReducer.systemWineData,
  isSmallScreen: state.globalReducer.isSmallScreen,
  singleSysWineData: state.addReducer.singleSysWineData,
  snackbar: state.addReducer.snackbar,
  addedWine: state.addReducer.addedWine,
});

export default connect(mapStateToProps, null)(AddReview);
