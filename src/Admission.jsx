import { useState, useEffect } from 'react';
import Navbars from './Navbars';
//import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    InputGroup,
} from 'react-bootstrap';

function Admission() {
    const [formData, setFormData] = useState({
        studentName: '',
        courseName: '',
        fatherName: '',
        fatherOccupation: '',
        dob: '',
        age: '',
        gender: '',
        educationQualification: '',
        occupation: 'student', // default
        studentAddress: '',
        studentPhone: '',
        email: '',
        totalFees: '',
        joiningDate: '',
    });

    const [submit, setSubmit] = useState("")
    const [maxenroll, setMaxenroll] = useState()
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setMaxenroll()
    };

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

        try {
            const response = await axios.post("http://localhost:4343/api/admission", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            //console.log("Success:", response.data);
            if (response.data) {
                setShow(true)
            }
            setSubmit("Admission submitted successfully!");

            setFormData({
                studentName: '',
                courseName: '',
                fatherName: '',
                fatherOccupation: '',
                dob: '',
                age: '',
                gender: '',
                educationQualification: '',
                occupation: 'student', // default
                studentAddress: '',
                studentPhone: '',
                email: '',
                totalFees: '',
                joiningDate: '',
            })
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


    useEffect(() => {
        const fetchenroll = async () => {
            try {
                const response = await axios.get("http://localhost:4343/api/maxrollno");
                //console.log(response.data.nextAvailable)
                setMaxenroll(response.data.currentMax)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchenroll();
    }, [submit])

    return (
        <>
            <Navbars />
            <Container fluid className="bg-light min-vh-100 py-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={9} xl={8}>
                        <Card className="shadow border-0">
                            <Card.Header className="bg-primary text-white py-4 text-center">
                                <h2 className="mb-1">Admission Form</h2>
                                <p className="mb-0">Academic Year 2025-2026</p>
                            </Card.Header>

                            <Card.Body className="p-4 p-md-5">
                                <Form autoComplete="off" onSubmit={handleSubmit}>
                                    <h4 className="mb-4 pb-2 border-bottom">Student Information</h4>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="studentName">
                                                <Form.Label>Student Name *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="studentName"
                                                    value={formData.studentName}
                                                    onChange={handleChange}
                                                    placeholder="Full name as per marksheet"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="courseName">
                                                <Form.Label>Course Name *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="courseName"
                                                    value={formData.courseName}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Full Stack Development, BCA"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="fatherName">
                                                <Form.Label>Father's Name *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fatherName"
                                                    value={formData.fatherName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="fatherOccupation">
                                                <Form.Label>Father's Occupation</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fatherOccupation"
                                                    value={formData.fatherOccupation}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Business, Service, Farmer"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3" controlId="dob">
                                                <Form.Label>Date of Birth *</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="dob"
                                                    value={formData.dob}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={4}>
                                            <Form.Group className="mb-3" controlId="age">
                                                <Form.Label>Age (in number) *</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="age"
                                                    value={formData.age}
                                                    onChange={handleChange}
                                                    min="10"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Gender *</Form.Label>
                                                <div>
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="gender-male"
                                                        label="Male"
                                                        name="gender"
                                                        value="male"
                                                        checked={formData.gender === 'male'}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="gender-female"
                                                        label="Female"
                                                        name="gender"
                                                        value="female"
                                                        checked={formData.gender === 'female'}
                                                        onChange={handleChange}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="gender-other"
                                                        label="Other"
                                                        name="gender"
                                                        value="other"
                                                        checked={formData.gender === 'other'}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="educationQualification">
                                                <Form.Label>Education Qualification</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="educationQualification"
                                                    value={formData.educationQualification}
                                                    onChange={handleChange}
                                                    placeholder="e.g. 12th Pass, Graduate, Diploma"
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="occupation">
                                                <Form.Label>Occupation *</Form.Label>
                                                <Form.Select
                                                    name="occupation"
                                                    value={formData.occupation}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="student">Student</option>
                                                    <option value="housewife">House Wife</option>
                                                    <option value="employed">Employed</option>
                                                    <option value="un-employed">Un-employed</option>
                                                    <option value="business">Business</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="studentAddress">
                                        <Form.Label>Student Address *</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            name="studentAddress"
                                            value={formData.studentAddress}
                                            onChange={handleChange}
                                            placeholder="Full residential address"
                                            required
                                        />
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="studentPhone">
                                                <Form.Label>Student Phone Number *</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    name="studentPhone"
                                                    value={formData.studentPhone}
                                                    onChange={handleChange}
                                                    placeholder="10-digit mobile number"
                                                    pattern="[0-9]{10}"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="email">
                                                <Form.Label>Email ID</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="example@email.com"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <h4 className="mt-5 mb-4 pb-2 border-bottom text-danger">
                                        Office Use Only
                                    </h4>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="totalFees">
                                                <Form.Label>Total Fees</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text>₹</InputGroup.Text>
                                                    <Form.Control
                                                        type="number"
                                                        name="totalFees"
                                                        value={formData.totalFees}
                                                        onChange={handleChange}
                                                        placeholder="e.g. 45000"
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="joiningDate">
                                                <Form.Label>Joining Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="joiningDate"
                                                    value={formData.joiningDate}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    {/* Submit */}
                                    <div className="d-grid mt-5">
                                        <Button variant="success" type="submit" size="lg">
                                            Submit Admission Form
                                        </Button>
                                    </div>
                                </Form><br />
                                <p className='fw-bolder text-center text-success small py-3'>{submit}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>New Student Enroll number : {maxenroll}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Admission;