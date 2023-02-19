// importing bootstrap components
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Swl from "sweetalert2";
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
      if (data.length === 0) {
        setAnswer("");
        Swl.fire({
          title: "Sorry!",
          text: "We don't have an answer for that question",
          icon: "error",
          confirmButtonText: "Do you want to add an answer?",
        }).then((result) => {
          if (result.isConfirmed) {
            //adding a form to add a new answer
            Swl.fire({
              title: "Write your answer",
              input: "textarea",
              inputAttributes: {
                autocapitalize: "off",
              },
              showCancelButton: true,
              confirmButtonText: "Submit",
              showLoaderOnConfirm: true,
              preConfirm: async (answer) => {
                // creating a new answer
                const url = "http://localhost:5000/api/newanswer";
                const response = await fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ question, answer }),
                });
                return response;
              },
            }).then((result) => {
              if (result.isConfirmed) {
                Swl.fire("Answer Added!", "", "success");
                setAnswer("");
              } else if (result.isDismissed) {
                Swl.fire("Answer not added!", "", "error");
                setAnswer("");
              }
            });
          }
        });
      } else {
        setAnswer(data[Math.floor(Math.random() * data.length)].Respuesta);
      }
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
