import { Card, Table, Container, Pagination, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

const perPage = 10;

export default function Restaurants({ query }) {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  let history = useHistory();

  const parsed = queryString.parse(query);

  useEffect(() => {
    //change: async function
    let url = parsed.borough
      ? `https://morning-earth-89736.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${parsed.borough}`
      : `https://morning-earth-89736.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;

    fetch(url) //change: await fetch
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error loading restaurants (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setRestaurants(data);
      })
      .catch((err) => {
        //handle the error here
        console.log("This error was catched: " + err);
      });
  }, [parsed.borough, page]);

  function previousPage() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    setPage(page + 1);
  }

  return (
    <Container>
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <Card.Title>Restaurants</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Full list of Restaurants. Optionally sorted by borough.
          </Card.Subtitle>
        </Card.Body>
      </Card>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Borough</th>
            <th>Cuisine</th>
          </tr>
        </thead>
        <tbody>
          {!restaurants.length ? (
            <tr>
              <td colSpan="4">
                <Alert variant="danger">
                  <Alert.Heading>
                    Hey, we could not find restaurants in this borough!
                  </Alert.Heading>
                  <p>Please, try another one!</p>
                </Alert>
              </td>
            </tr>
          ) : null}

          {restaurants.map((restaurant) => (
            <tr
              key={restaurant._id}
              onClick={() => {
                history.push(`/restaurant/${restaurant._id}`);
              }}
            >
              <td>{restaurant.name}</td>
              <td>
                {restaurant.address.building + " " + restaurant.address.street}
              </td>
              <td>{restaurant.borough}</td>
              <td>{restaurant.cuisine}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={previousPage} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </Container>
  );
}
