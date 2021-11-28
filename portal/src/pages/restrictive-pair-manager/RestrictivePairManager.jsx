class RestrictivePairManager extends Component {
  state = {};
  render() {
    return (
      <div>
        <h3>
          Restrictive Pair Manager - <small>PwCTRAADNOCUidEN </small>
        </h3>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="1">Annual Paid Time Off</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="2">PTO Eligibility Waiting Period </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="3">Paid Time Off Exchange </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="4">Paid Family or Medical Leave</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="5">Emergency Child/Elder Care</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="6">Financial Education and Support</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="7">401k Eligibility Period</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="8">401k Match</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="9">Base Pay</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="10">Alternative Pay</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="1">
                  <h4>Restrictions - Annual Paid Time Off </h4>
                  <Form.Row>
                    <Col>
                      <Form.Check disabled type="switch" id="custom-switch-1a" label="Annual Paid Time Off" />
                      <Form.Check type="switch" id="custom-switch-2a" label="PTO Eligibility Waiting Period" />
                      <Form.Check type="switch" id="custom-switch-3a" label="Paid Time Off Exchange" />
                      <Form.Check type="switch" id="custom-switch-4a" label="Paid Family or Medical Leave" />
                      <Form.Check type="switch" id="custom-switch-5a" label="Alternative Pay" />
                    </Col>
                    <Col>
                      <Form.Check type="switch" id="custom-switch-6a" label="Financial Education and Support" />

                      <Form.Check type="switch" id="custom-switch-7a" label="401k Eligibility Period" />
                      <Form.Check type="switch" id="custom-switch-8a" label="401k Match" />
                      <Form.Check type="switch" id="custom-switch-9a" label="Base Pay" />
                      <Form.Check type="switch" id="custom-switch-10a" label="Paid Family or Medical Leave" />
                    </Col>
                  </Form.Row>
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <h4>Restrictions - PTO Eligibility Waiting Period</h4>
                  <Form.Row>
                    <Col>
                      <Form.Check type="switch" id="custom-switch-1b" label="Annual Paid Time Off" />
                      <Form.Check disabled type="switch" id="custom-switch-2b" label="PTO Eligibility Waiting Period" />
                      <Form.Check type="switch" id="custom-switch-3b" label="Paid Time Off Exchange" />
                      <Form.Check type="switch" id="custom-switch-4b" label="Paid Family or Medical Leave" />
                      <Form.Check type="switch" id="custom-switch-4b" label="Alternative Pay" />
                    </Col>
                    <Col>
                      <Form.Check type="switch" id="custom-switch-6b" label="Financial Education and Support" />

                      <Form.Check type="switch" id="custom-switch-7b" label="401k Eligibility Period" />
                      <Form.Check type="switch" id="custom-switch-8b" label="401k Match" />
                      <Form.Check type="switch" id="custom-switch-9b" label="Base Pay" />
                      <Form.Check type="switch" id="custom-switch-10b" label="Paid Family or Medical Leave" />
                    </Col>
                  </Form.Row>
                </Tab.Pane>
                <Tab.Pane eventKey="3">
                  <h4>Restrictions - Paid Time Off Exchange</h4>
                  <Form.Row>
                    <Col>
                      <Form.Check type="switch" id="custom-switch-1c" label="Annual Paid Time Off" />
                      <Form.Check type="switch" id="custom-switch-2c" label="PTO Eligibility Waiting Period" />
                      <Form.Check disabled type="switch" id="custom-switch-3c" label="Paid Time Off Exchange" />
                      <Form.Check type="switch" id="custom-switch-4c" label="Paid Family or Medical Leave" />
                      <Form.Check type="switch" id="custom-switch-5c" label="Alternative Pay" />
                    </Col>
                    <Col>
                      <Form.Check type="switch" id="custom-switch-6c" label="Financial Education and Support" />

                      <Form.Check type="switch" id="custom-switch-7c" label="401k Eligibility Period" />
                      <Form.Check type="switch" id="custom-switch-8c" label="401k Match" />
                      <Form.Check type="switch" id="custom-switch-9c" label="Base Pay" />
                      <Form.Check type="switch" id="custom-switch-10c" label="Paid Family or Medical Leave" />
                    </Col>
                  </Form.Row>
                </Tab.Pane>
                <Tab.Pane eventKey="4">
                  <h4>Restrictions - Paid Family or Medical Leave</h4>
                  <Form.Row>
                    <Col>
                      <Form.Check type="switch" id="custom-switch-1d" label="Annual Paid Time Off" />
                      <Form.Check type="switch" id="custom-switch-2d" label="PTO Eligibility Waiting Period" />
                      <Form.Check type="switch" id="custom-switch-3d" label="Paid Time Off Exchange" />
                      <Form.Check disabled type="switch" id="custom-switch-4d" label="Paid Family or Medical Leave" />
                      <Form.Check type="switch" id="custom-switch-5d" label="Alternative Pay" />
                    </Col>
                    <Col>
                      <Form.Check type="switch" id="custom-switch-6d" label="Financial Education and Support" />

                      <Form.Check type="switch" id="custom-switch-7d" label="401k Eligibility Period" />
                      <Form.Check type="switch" id="custom-switch-8d" label="401k Match" />
                      <Form.Check type="switch" id="custom-switch-9d" label="Base Pay" />
                      <Form.Check type="switch" id="custom-switch-10d" label="Paid Family or Medical Leave" />
                    </Col>
                  </Form.Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" variant="pills">
          <Tab eventKey="home" title="Annual Paid Time Off">
            <hr />

            <Form.Row>
              <Col>
                <Form.Check disabled type="switch" id="custom-switch-1c" label="Annual Paid Time Off" />
                <Form.Check type="switch" id="custom-switch-2c" label="PTO Eligibility Waiting Period" />
                <Form.Check type="switch" id="custom-switch-3c" label="Paid Time Off Exchange" />
                <Form.Check type="switch" id="custom-switch-4c" label="Paid Family or Medical Leave" />
                <Form.Check type="switch" id="custom-switch-5c" label="Alternative Pay" />
              </Col>
              <Col>
                <Form.Check type="switch" id="custom-switch-6c" label="Financial Education and Support" />
                <Form.Check type="switch" id="custom-switch-7c" label="401k Eligibility Period" />
                <Form.Check type="switch" id="custom-switch-8c" label="401k Match" />
                <Form.Check type="switch" id="custom-switch-9c" label="Base Pay" />
                <Form.Check type="switch" id="custom-switch-10c" label="Health Insurance Offerings" />
              </Col>
              <Col>
                <Form.Check type="switch" id="custom-switch-11c" label="Other Supplemental Benefits" />
                <Form.Check type="switch" id="custom-switch-12c" label="Voluntary Benefits" />
                <Form.Check type="switch" id="custom-switch-13c" label="Education Archways to Opportunity" />
                <Form.Check type="switch" id="custom-switch-14c" label="Hidden Price" />
                <Form.Check type="switch" id="custom-switch-15c" label="Awards and Recognition" />
              </Col>
            </Form.Row>
          </Tab>
          <Tab eventKey="profile" title="PTO Eligibility Waiting Period">
            <hr />
            <Form.Row>
              <Col>
                <Button variant="success" block size="sm">
                  Annual Paid Time Off
                </Button>
                <Button disabled variant="secondary" block size="sm">
                  PTO Eligibility Waiting Period
                </Button>
                <Button variant="success" block size="sm">
                  Paid Time Off Exchange
                </Button>
                <Button variant="success" block size="sm">
                  Paid Family or Medical Leave
                </Button>
                <Button variant="success" block size="sm">
                  Alternative Pay
                </Button>
              </Col>
              <Col>
                <Button variant="success" block size="sm">
                  Financial Education and Support
                </Button>
                <Button variant="success" block size="sm">
                  401k Eligibility Period
                </Button>
                <Button variant="success" block size="sm">
                  401k Match
                </Button>
                <Button variant="success" block size="sm">
                  Base Pay
                </Button>
                <Button variant="success" block size="sm">
                  Health Insurance Offerings
                </Button>
              </Col>
              <Col>
                <Button variant="success" block size="sm">
                  Other Supplemental Benefits
                </Button>
                <Button variant="success" block size="sm">
                  Voluntary Benefits
                </Button>
                <Button variant="success" block size="sm">
                  Education Archways to Opportunity
                </Button>
                <Button variant="success" block size="sm">
                  Hidden Price
                </Button>
                <Button variant="success" block size="sm">
                  Awards and Recognition
                </Button>
              </Col>
            </Form.Row>
          </Tab>
          <Tab eventKey="contact" title="Paid Time Off Exchange">
            <Form.Row>
              <Col>
                <Button disabled variant="secondary" block size="sm">
                  Annual Paid Time Off
                </Button>
                <Button variant="success" block size="sm">
                  PTO Eligibility Waiting Period
                </Button>
                <Button variant="success" block size="sm">
                  Paid Time Off Exchange
                </Button>
                <Button variant="success" block size="sm">
                  Paid Family or Medical Leave
                </Button>
                <Button variant="success" block size="sm">
                  Alternative Pay
                </Button>
              </Col>
              <Col>
                <Button variant="secondary" block size="sm">
                  Financial Education and Support
                </Button>
                <Button variant="success" block size="sm">
                  401k Eligibility Period
                </Button>
                <Button variant="success" block size="sm">
                  401k Match
                </Button>
                <Button variant="success" block size="sm">
                  Base Pay
                </Button>
                <Button variant="success" block size="sm">
                  Paid Family or Medical Leave
                </Button>
              </Col>
            </Form.Row>
          </Tab>

          <Tab eventKey="contact1" title="Paid Family or Medical Leave">
            <Form.Row>
              <Col>
                <Button disabled variant="secondary" block size="sm">
                  Annual Paid Time Off
                </Button>
                <Button variant="success" block size="sm">
                  PTO Eligibility Waiting Period
                </Button>
                <Button variant="success" block size="sm">
                  Paid Time Off Exchange
                </Button>
                <Button variant="success" block size="sm">
                  Paid Family or Medical Leave
                </Button>
                <Button variant="success" block size="sm">
                  Alternative Pay
                </Button>
              </Col>
              <Col>
                <Button variant="secondary" block size="sm">
                  Financial Education and Support
                </Button>
                <Button variant="success" block size="sm">
                  401k Eligibility Period
                </Button>
                <Button variant="success" block size="sm">
                  401k Match
                </Button>
                <Button variant="success" block size="sm">
                  Base Pay
                </Button>
                <Button variant="success" block size="sm">
                  Paid Family or Medical Leave
                </Button>
              </Col>
            </Form.Row>
          </Tab>

          <Tab eventKey="contact2" title="Paid Family or Medical Leave"></Tab>
          <Tab eventKey="contact3" title="Alternative Pay"></Tab>
          <Tab eventKey="contact4" title="Financial Education and Support"></Tab>
          <Tab eventKey="contact5" title="401k Eligibility Period"></Tab>
          <Tab eventKey="contact6" title="Base Pay"></Tab>
          <Tab eventKey="contact7" title="Health Insurance Offerings"></Tab>
          <Tab eventKey="contact8" title="Other Supplemental Benefits"></Tab>
          <Tab eventKey="contact9" title="Voluntary Benefits"></Tab>
          <Tab eventKey="contact19" title="Education Archways to Opportunity"></Tab>
          <Tab eventKey="contact29" title="Hidden Price"></Tab>
          <Tab eventKey="contact39" title="Awards and Recognition"></Tab>
        </Tabs>
      </div>
    );
  }
}

export default RestrictivePairManager;
