import { Card } from "react-bootstrap";

export default function About() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        />
        <Card.Title>Gustavo Tavares</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">WEB422NCC</Card.Subtitle>
        <Card.Text>CPA</Card.Text>
        <Card.Text>ID: 167583186</Card.Text>
        <Card.Text>
          Brazilian that loves to code, focus on WEB because he believes that he
          can change people lives with it, or at least makes someone days
          better. First major is advertising and propaganda.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
