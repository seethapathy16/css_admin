import { useEffect, useState } from 'react';
import { Form, Button, Card, Container, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Navbars from './Navbars';
import axios from 'axios'

function Enquiry() {
    const [formData, setFormData] = useState({
        studentName: '',
        phone: '',
        course: '',
        quotefee: '',
        date: '',
        visitingMode: 'google', // default
    });

    const [submit, setSubmit] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("Form submitted:", formData);

        setSubmit("Sending...");

        try {
            const response = await axios.post("http://localhost:4343/api/enquiry", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            //console.log("Success:", response.data);
            setSubmit("Enquiry submitted successfully!");

            setFormData({
                studentName: "",
                phone: "",
                course: "",
                quotefee: "",
                date: "",
                visitingMode: "google",
            });
        } catch (error) {
            console.error("Submission error:", error);
            setSubmit(
                error.response?.data?.message || "Something went wrong. Try again."
            );
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setSubmit("")
        }, 2000)
    }, [submit])

    return (
        <>
            <Navbars />
            <Container fluid className="bg-light min-vh-100 py-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8} xl={7}>
                        <Card className="shadow border-0">
                            {/* Header */}
                            <Card.Header className="bg-primary text-white py-4 text-center">
                                <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
                                    <h2 className="mb-0">Student Enquiry Form</h2>
                                </div>
                                <p className="mb-0 opacity-75">Please fill in the details below</p>
                            </Card.Header>

                            {/* Form body */}
                            <Card.Body className="p-4 p-md-5">
                                <Form autoComplete="off" onSubmit={handleSubmit}>
                                    {/* Student Name */}
                                    <Form.Group className="mb-4" controlId="studentName">
                                        <Form.Label>Student Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="studentName"
                                            value={formData.studentName}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                            required
                                        />
                                    </Form.Group>

                                    {/* Phone Number */}
                                    <Form.Group className="mb-4" controlId="phone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="10-digit mobile number"
                                            pattern="[0-9]{10}"
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            We'll never share your phone number with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    {/* Interested Course */}
                                    <Form.Group className="mb-4" controlId="course">
                                        <Form.Label>Interested Course</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="course"
                                            value={formData.course}
                                            onChange={handleChange}
                                            placeholder="e.g. Full Stack Development, Python, etc."
                                            required
                                        />
                                    </Form.Group>

                                    {/* Fees */}
                                    <Form.Group className="mb-4" controlId="course">
                                        <Form.Label>Enquiry Quote Fee</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="quotefee"
                                            value={formData.quotefee}
                                            onChange={handleChange}
                                            placeholder="e.g. 3000"
                                            required
                                        />
                                    </Form.Group>

                                    {/* Date */}
                                    <Form.Group className="mb-4" controlId="date">
                                        <Form.Label>Preferred / Enquiry Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    {/* Visiting Mode - Radio buttons with ButtonGroup */}
                                    <Form.Group className="mb-4">
                                        <Form.Label>How did you hear about us? / Visiting Mode</Form.Label>
                                        <ToggleButtonGroup
                                            type="radio"
                                            name="visitingMode"
                                            value={formData.visitingMode}
                                            onChange={(val) =>
                                                setFormData((prev) => ({ ...prev, visitingMode: val }))
                                            }
                                            className="w-100"
                                        >
                                            <ToggleButton
                                                id="radio-google"
                                                variant="outline-primary"
                                                value="google"
                                                className="flex-grow-1 py-3"
                                            >
                                                Google Search
                                            </ToggleButton>

                                            <ToggleButton
                                                id="radio-board"
                                                variant="outline-primary"
                                                value="board"
                                                className="flex-grow-1 py-3"
                                            >
                                                Board / Notice
                                            </ToggleButton>

                                            <ToggleButton
                                                id="radio-reference"
                                                variant="outline-primary"
                                                value="reference"
                                                className="flex-grow-1 py-3"
                                            >
                                                Reference / Friend
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </Form.Group>

                                    {/* Submit */}
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit" size="lg">
                                            Submit Enquiry
                                        </Button>
                                    </div>
                                </Form><br />
                                <br />
                                <p className='fw-bolder text-center text-success small py-3'>{submit}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Enquiry;