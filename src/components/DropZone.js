import React, { useState, useEffect, useRef } from "react";
import exifr from 'exifr'
import "./DropZone.css";

const DropZone = () => {
    const fileInputRef = useRef();
  const modalImageRef = useRef();
  const modalRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);


  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [selectedFiles]);

  const preventDefault = (e) => {
    e.preventDefault();
    // e.stopPropagation();
  };

  const dragOver = (e) => {
    preventDefault(e);
  };

  const dragEnter = (e) => {
    preventDefault(e);
  };

  const dragLeave = (e) => {
    preventDefault(e);
  };

  const fileDrop = (e) => {
    preventDefault(e);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        //add to an array so we can display the name of file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        // add a new property called invalid
        files[i]["invalid"] = true;
        // add to the same array so we can display the name of the file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        // set error message
        setErrorMessage("Filtype ikke gyldig");
        setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
      }
    }
  };

  //Med indexOf sjekker den om filtypen finnes i arrayen
  //Sjekk av filtype
  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
      "image/tif",
      "image/heic",
    ];
    if (validTypes.indexOf(file.type) == -1) {
      return false;
    }
    exifr.gps(file).then((test) => console.log(test))
    return true;
  };

  //Regner ut størrelsen til filen
  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const removeFile = (name) => {
    //find the index of the item
    //remove the item from array

    const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    //update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    //update selectedFiles array
    setSelectedFiles([...selectedFiles]);

    const unsupportedFileIndex = unsupportedFiles.findIndex(e => e.name === name);
    if (unsupportedFileIndex !== -1) {
        unsupportedFiles.splice(unsupportedFileIndex, 1);
        // update unsupportedFiles array
        setUnsupportedFiles([...unsupportedFiles]);
    }
  };

  //Muligheten til å se hvilke bilder som er lastet opp
  const openImageModal = (file) => {
    const reader = new FileReader();
    modalRef.current.style.display = "block";
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    };
  };

  const closeModal = () => {
    modalRef.current.style.display = "none";
    modalImageRef.current.style.backgroundImage = "none";
  };

  const fileInputClicked = () => {
      fileInputRef.current.click();
  }

  const filesSelected = () => {
      if(fileInputRef.current.files.length) {
          handleFiles(fileInputRef.current.files);
      }
  }

  const uploadFiles = () => {

  }

  return (
    <>
      <div className="container">
        {unsupportedFiles.length === 0 && validFiles.length ? (
          <button className="file-upload-btn" onClick={() => uploadFiles()}>
            Last opp
          </button>
        ) : (
          ""
        )}
        {unsupportedFiles.length ? (
          <p>Please remove all unsupported files.</p>
        ) : (
          ""
        )}
        <div
          className="drop-container"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onClick={fileInputClicked}
        >
          <div className="drop-message">
            <div className="upload-icon"></div>
            <br></br>
            Dra og slipp filene her eller klikk
          </div>
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={filesSelected}
          />
        </div>
        <div className="file-display-container">
          {validFiles.map((data, i) => (
            <div className="file-status-bar" key={i}>
              <div
                onClick={
                  !data.invalid
                    ? () => openImageModal(data)
                    : () => removeFile(data.name)
                }
              >
                <div className="file-type-logo"></div>
                <div className="file-type">{fileType(data.name)}</div>
                <span
                  className={`file-name ${data.invalid ? "file-error" : ""}`}
                >
                  {data.name}
                </span>
                <span className="file-size">({fileSize(data.size)})</span>{" "}
                {data.invalid && (
                  <span className="file-error-message">({errorMessage})</span>
                )}
              </div>
              <div
                className="file-remove"
                onClick={() => removeFile(data.name)}
              >
                X
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="modal" ref={modalRef}>
        <div className="overlay"></div>
        <span className="close" onClick={() => closeModal()}>
          X
        </span>
        <div className="modal-image" ref={modalImageRef}></div>
      </div>
    </>
  );
};

export default DropZone;
