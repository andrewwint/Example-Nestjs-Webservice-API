import React from 'react';
import { Button, Col, Form, ProgressBar, Row } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { IconContext } from 'react-icons';

import './XmlFilesControl.scss';

export default function XmlFilesControl(props) {
  /**
   * @description Function used to create the markup associated to
   * the "Files" section
   * @return {Object}
   */

  function createMarkUpForFilesSection() {
    return props.xmls.map((xml) => (
      <Row key={xml.file.path} className='xml-upload-field align-items-center'>
        <Col xs={2}>
          <IconContext.Provider
            value={{
              color: 'red',
              className: 'remove-xml-file-button d-sm-none',
            }}
          >
            <IoIosClose
              onClick={() => props.removeXml(xml.file)}
              className='align-middle'
            />
          </IconContext.Provider>
          <Button
            onClick={() => props.removeXml(xml.file)}
            size='sm'
            variant='outline-danger'
            className='remove-xml-file-button d-none d-sm-inline-block align-middle'
          >
            Remove
          </Button>
        </Col>
        <Col xs={3} className='text-truncate'>
          {xml.file.path}
        </Col>
        <Col xs={5}>
          <ProgressBar
            animated
            now={xml.progressBarPercentage}
            variant={xml.progressBarVariant}
          />
        </Col>
        <Col xs={2}>
          <Form.Switch
            defaultChecked
            id={'deleteXml' + xml.file.name}
            label={'Delete'}
            onClick={() => props.updateSwitch(xml)}
            name={'deleteXml' + xml.file.name}
            value={xml.deleteXmlSwitch}
          />
        </Col>
        {xml.deleteXmlSwitch && (
          <Col xs={{ size: 'auto', offset: 10 }}>
            <Form.Check
              custom
              type='radio'
              name={`deleteXml${xml.file.name}`}
              onClick={() => props.updateDeleteXml(xml, 'client')}
              id={`deleteXmlClient${xml.file.name}`}
              label='client'
            />
            <Form.Check
              custom
              type='radio'
              name={`deleteXml${xml.file.name}`}
              defaultChecked={true}
              onClick={() => props.updateDeleteXml(xml, 'game')}
              id={`deleteXmlGame${xml.file.name}`}
              label='game'
            />
            <Form.Check
              custom
              type='radio'
              name={`deleteXml${xml.file.name}`}
              onClick={() => props.updateDeleteXml(xml, 'subgame')}
              id={`deleteXmlSubgame${xml.file.name}`}
              label='subgame'
            />{' '}
          </Col>
        )}
      </Row>
    ));
  }

  return (
    <Row>
      <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
        <div {...props.getRootProps({ className: 'dropzone' })}>
          <input {...props.getInputProps()} />
          <p style={{ marginTop: '26px' }}>
            Drag 'n' drop xml files here, or click to select your xml files
          </p>
        </div>
        <Form.Control.Feedback type='invalid'>
          Please include a file
        </Form.Control.Feedback>

        {createMarkUpForFilesSection()}
        {props.xmls.length > 0 ? (
          <Button
            onClick={props.removeAll}
            variant='danger'
            className='remove-all-button'
            size='sm'
          >
            Remove All
          </Button>
        ) : (
          ''
        )}
      </Col>
    </Row>
  );
}
