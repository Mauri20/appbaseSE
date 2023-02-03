// importing bootstrap components
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";

export const QuestionCRUD = () => {
  // creating the states
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  // creating a handle submit function
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitting");
    if (question === "") {
      alert("Please write a question");
    } else {
      const url = "http://localhost:5000/api/getanswer";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      console.log(data);

      setAnswer(data[Math.floor(Math.random() * data.length)].Respuesta);

      setQuestion("");
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="m-5">
            <Card.Body>
              <Card.Title>Write the question to get your Answer!</Card.Title>
              <Card.Text className="text-center">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="m-4" controlId="formBasicEmail">
                    <Form.Control
                      className="m-2"
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="ex. Que edad tienes?"
                    />
                  </Form.Group>

                  <Button className="m-2" variant="primary" type="submit">
                    Get Answer
                  </Button>
                  <Form.Group
                    className="m-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      as="textarea"
                      rows={3}
                      disabled
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
