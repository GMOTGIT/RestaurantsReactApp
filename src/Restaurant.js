import { Card, Container, Spinner, CardDeck } from "react-bootstrap";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Restaurant() {
  //debugger;
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    // Run after first render
    console.log("useEffect called"); // this is called just once
    fetch(`https://morning-earth-89736.herokuapp.com/api/restaurants/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error loading restaurant page (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data); //Render the page again with new value -  set data first - second render
          setLoading(false); //Render page Again - set loading second - third render
        }
      })
      .catch((err) => {
        console.log("This error was catched: " + err);
      });
  }, []);

  console.log(loading);

  return loading ? (
    <Container>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  ) : (
    <Container>
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {restaurant.address.building + " " + restaurant.address.street}
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <MapContainer
        style={{ height: "400px" }}
        center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[restaurant.address.coord[1], restaurant.address.coord[0]]}
        ></Marker>
      </MapContainer>
      <br />
      <CardDeck>
        {restaurant.grades.map((grade, i) => (
          <Card key={i}>
            <Card.Body>
              <Card.Title>Grade: {grade.grade} </Card.Title>
              <Card.Text>Score: {grade.score}</Card.Text>
              <Card.Text>Date:</Card.Text>
              <Moment date={grade.date} format="YYYY/MM/DD"></Moment>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </Container>
  );
}
