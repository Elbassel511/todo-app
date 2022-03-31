import classes from "./Modal.module.scss";
import React from 'react';
import ReactDOM from "react-dom";

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClick} />;
}

function ModalOverlay(props) {
  return <div onClick={props.onClick} className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>;
}

const portalEl = document.getElementById('overlays');

function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalEl)}
      {ReactDOM.createPortal(<ModalOverlay onClick={props.onClick}>{props.children}</ModalOverlay>, portalEl)}
    </React.Fragment>
  );
}

export default Modal;