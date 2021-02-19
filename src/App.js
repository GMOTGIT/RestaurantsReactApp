import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { useState, useEffect } from "react";

import Restaurants from "./Restaurants";
import Restaurant from "./Restaurant";
import About from "./About";
import NotFound from "./NotFound";

function App() {
  const [searchString, setSearchString] = useState("");

  let history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();

    history.push(`/restaurants?borough=${searchString}`);
    setSearchString("");
  }

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline>
            <FormControl
              type="text"
              placeholder="Borough"
              className="mr-sm-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <Row>
        <Col>
          <Switch>
            <Route exact path="/">
              <Redirect to="/restaurants" />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route
              path="/restaurants/"
              render={(props) => <Restaurants query={props.location.search} />} //Cant useParams here.
            />
            <Route path="/restaurant/:id">
              <Restaurant />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
