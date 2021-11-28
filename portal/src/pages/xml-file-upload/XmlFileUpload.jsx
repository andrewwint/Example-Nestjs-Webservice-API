import React, { useState, useCallback } from 'react';
import { Col, Button, Form, Row, Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ServerShortnameDropdown from './server-shortname-dropdown/ServerShortnameDropdown';
import XmlFilesControl from './xml-files-control/XmlFilesControl';
import XmlFileUploadToast from './xml-file-upload-toast/XmlFileUploadToast';
import XmlFileUploadResponse from './utils/xml-file-upload-response.class';
import './XmlFileUpload.scss';

/**
 * A namespace.
 * @namespace XmlFileUpload
 */
const developmentUrl = 'http://localhost:3000';
/**
 * @global
 * @constant {string} */
let URL = null;

/**
 * @description this block handles url switching depending on
 * the enviorment leveraging builtin React and Node enviormental
 * vars
 */
switch (process.env.NODE_ENV) {
  case 'production':
    URL = 'https://webservices.truechoice.io';
    break;
  case 'test':
    URL = 'http://localhost:3000';
    break;
  default:
    URL = developmentUrl;
    break;
}

function XmlFileUpload() {
  const submitButtonCopy = {
    inactive: 'Submit',
    active: 'Uploading..',
  };

  const [xmlUploads, setXmlUploads] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback(
      (acceptedFiles) => {
        const newXmlUploads = createXmlUploadObject(acceptedFiles);
        setXmlUploads([...xmlUploads, ...newXmlUploads]);
      },
      [xmlUploads]
    ),
    accept: '.xml',
  });
  const [serverShortname, setServerShortname] = useState('dev-test');
  const [submitButtonText, setSubmitButtonText] = useState(
    submitButtonCopy.inactive
  );
  const [validated, setValidated] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    success: true,
    messages: [],
  });

  /**
   * @description Function used for wrapping the accepted files
   * with an XML upload object, which simply means an object
   * used for containing the state of an XML file upload (i.e.
   * the progress bar, flag for delete XML, and finally, the
   * file itself)
   * @param {Array} files - list of accepted files from on drop event
   * @returns {Array}
   */
  function createXmlUploadObject(files) {
    const xmlUploads = [];

    for (const file of files) {
      let xmlUpload = {
        deleteXml: 'game',
        deleteXmlSwitch: true,
        progressBarPercentage: 0,
        progressBarVariant: 'info',
        file,
      };
      xmlUploads.push(xmlUpload);
    }

    return xmlUploads;
  }

  /**
   * @description Handler for uploading an XML file
   * @TODO Refactor function, mainly loop -- too much going on
   */
  async function handleSubmit() {
    if (validated === false) {
      setValidated(true);
    }

    if (xmlUploads.length > 0) {
      const uploadMessages = [];
      let wereUploadsSuccessful = true;
      setSubmitButtonText(submitButtonCopy.active);
      for (const xml of xmlUploads) {
        try {
          const response = new XmlFileUploadResponse(await uploadXmlFile(xml));
          uploadMessages.push(response.message);
          /*
           * Handle failed upload here; given that a success code (201)
           * is still returned even though a failed upload, it will not
           * propagate to the catch block
           */
          if (!response.wasSuccess) {
            wereUploadsSuccessful = false;
            break;
          }
          updateProgressBar(xml, 100, 'success');
        } catch (error) {
          /*
           * Used for client side execution errors,
           * like 'TypeError'
           */
          uploadMessages.push(error.message);
          wereUploadsSuccessful = false;
          break;
        }
      }
      setToast({
        show: true,
        success: wereUploadsSuccessful,
        messages: uploadMessages,
      });
      resetLoadingStateProperties();
    }
  }

  /**
   * @description Function used for removing a specific file
   * from the list of files within the "Files" section
   * @param {Object} xmlUpload
   */
  function removeXml(xmlToBeRemoved) {
    const updatedCopyOfXmlUploads = [...xmlUploads];

    for (let i = 0; i < updatedCopyOfXmlUploads.length; i++) {
      let xmlUpload = updatedCopyOfXmlUploads[i];

      if (xmlUpload.file === xmlToBeRemoved) {
        updatedCopyOfXmlUploads.splice(i, 1);
        break;
      }
    }

    setXmlUploads(updatedCopyOfXmlUploads);
  }

  /**
   * @description Function used to reset all progress bars, which is done
   * after all of the files have successfully uploaded
   */
  function resetAllProgressBars() {
    const updatedCopyOfXmlUploads = [...xmlUploads];

    for (const xmlUpload of updatedCopyOfXmlUploads) {
      xmlUpload.progressBarPercentage = 0;
      xmlUpload.progressBarVariant = 'info';
    }

    setXmlUploads(updatedCopyOfXmlUploads);
  }

  /**
   * @description Function used to reset the state properties
   * associated to the loading state
   */
  function resetLoadingStateProperties() {
    setSubmitButtonText(submitButtonCopy.inactive);
    setValidated(false);
    resetAllProgressBars();
  }

  /**
   * @description Function in charge of updating the progress bar
   * for a specific file
   */
  function updateProgressBar(xmlFile, percentCompleted, variant = 'info') {
    const updatedCopyOfXmlUploads = [...xmlUploads];

    for (const xmlUpload of updatedCopyOfXmlUploads) {
      if (xmlUpload.file === xmlFile.file) {
        xmlUpload.progressBarPercentage = percentCompleted;
        xmlUpload.progressBarVariant = variant;
        break;
      }
    }

    setXmlUploads(updatedCopyOfXmlUploads);
  }

  /**
   * @description Function used to update the value of a switch that is tied
   * to a specific file
   * @param {Object} fileBeingUpdated
   */
  function updateSwitch(fileBeingUpdated) {
    const updatedCopyOfXmlUploads = [...xmlUploads];

    for (const xmlUpload of updatedCopyOfXmlUploads) {
      if (xmlUpload.file === fileBeingUpdated.file) {
        xmlUpload.deleteXmlSwitch = !xmlUpload.deleteXmlSwitch;
        if (xmlUpload.deleteXmlSwitch === false) {
          xmlUpload.deleteXml = '';
        } else {
          xmlUpload.deleteXml = 'game';
        }
        break;
      }
    }
    setXmlUploads(updatedCopyOfXmlUploads);
  }

  /**
   * @description Function used to update the of the delete XML
   * @param {Object} fileBeingUpdated - the xml file that is being updated
   * @param {Object} deleteXml -  options for the deleteXml. e.g. client, game or subgame
   */
  function updateDeleteXml(fileBeingUpdated, deleteXml) {
    const updatedCopyOfXmlUploads = [...xmlUploads];

    for (const xmlUpload of updatedCopyOfXmlUploads) {
      if (xmlUpload.file === fileBeingUpdated.file) {
        xmlUpload.deleteXml = deleteXml;
        break;
      }
    }
    setXmlUploads(updatedCopyOfXmlUploads);
  }

  /**
   * @description Method responsible for actually sending the file
   * to the XML file upload endpoint
   * @returns {Object}
   */
  function uploadXmlFile(xmlFile) {
    const file = xmlFile.file;
    const url = `${URL}/xml-loader/upload/${serverShortname}`;
    const formData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: function (progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        updateProgressBar(xmlFile, percentCompleted);
      },
    };

    formData.append('xmlFile', file, file.name);
    formData.append('deleteXml', xmlFile.deleteXml);

    return axios.post(url, formData, config);
  }

  return (
    <Row>
      <Col>
        <Jumbotron className='XmlUpload'>
          <Form noValidate validated={validated}>
            <Form.Row className='justify-content-center'>
              <Col xs='auto' lg='3'>
                <h2 className='text-uppercase'>
                  Application <br />
                  XML Import
                </h2>
              </Col>
              <Col xs='auto' lg='3'>
                <small>
                  Drag `n` drop xml files or click to below to select files.
                  Then select the server you would like to have the files loaded
                  into from the dropdown of <strong>Servers</strong> then click{' '}
                  <strong>Submit</strong>.
                  <br />
                </small>
              </Col>
              <Col
                xs='auto'
                lg='3'
                className='text-center d-none d-lg-block d-xl-block'
              >
                <img
                  src='/assets/icons/cloud-upload.svg'
                  width='30%'
                  alt='import-xml-ready'
                />
              </Col>
            </Form.Row>
            <Form.Row className='justify-content-center'>
              <Col xs='auto' lg='9'>
                <Form.Group>
                  <XmlFilesControl
                    xmls={xmlUploads}
                    getInputProps={getInputProps}
                    getRootProps={getRootProps}
                    removeAll={() => setXmlUploads([])}
                    removeXml={removeXml}
                    updateSwitch={updateSwitch}
                    updateDeleteXml={updateDeleteXml}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className='justify-content-center'>
              <ServerShortnameDropdown
                col={9}
                onChange={(event) => setServerShortname(event.target.value)}
                value={serverShortname}
              />
            </Form.Row>
            <Form.Row className='justify-content-center'>
              <Col xs='auto' lg='6'>
                <Button
                  size='lg'
                  variant='primary'
                  block
                  onClick={handleSubmit}
                >
                  {submitButtonText}
                </Button>
                <Form.Text className='text-muted'>
                  Please ensure that application name in `&lt;client
                  name="application_name" &gt;` contains only numbers and
                  letters; no spaces or special characters
                </Form.Text>
              </Col>
              <Col xs='auto' lg='3'>
                <Button size='lg' variant='secondary' block href='/xml-import'>
                  Reset
                </Button>
              </Col>
            </Form.Row>

            <XmlFileUploadToast
              show={toast.show}
              messages={toast.messages}
              success={toast.success}
              onClose={() =>
                setToast({
                  show: false,
                  messages: toast.messages,
                  success: toast.success,
                })
              }
            />
          </Form>
        </Jumbotron>
      </Col>
    </Row>
  );
}

export default XmlFileUpload;
