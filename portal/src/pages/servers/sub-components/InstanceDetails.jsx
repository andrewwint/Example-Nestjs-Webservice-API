import React, { Fragment } from 'react';
import moment from 'moment';

const InstanceDetails = ({ server = {} }) => {
  return (
    <Fragment>
      <samp>{server.name}</samp>
      <br />
      <small>
        Instance: <samp>{server.instance_id}</samp>
        <br />
        Short Name: <samp>{server.shortname}</samp>
        <br />
        Alias: <samp>{server.alias_shortname}</samp>
        <br />
        Public IP: <samp>{server.ip}</samp>
        <br />
        Private IP: <samp>{server.private_ip}</samp>
        <br />
        Stacktype: <samp>{server.stacktype}</samp>
        <br />
        Status: <samp>{server.status}</samp>
        <br />
        Last Updated: {moment(server.modifieddate, 'YYYYMMDD').fromNow()}
        <br />
      </small>
    </Fragment>
  );
};

export default InstanceDetails;
