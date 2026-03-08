// Billing.jsx
import { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    InputGroup,
    Modal
} from 'react-bootstrap';
import Navbars from './Navbars'
import axios from 'axios'

function Billing() {
    const today = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        date: today,
        enrollNo: '',
        studentName: '',
        courseName: '',
    });

    const [projectformData, setProjectFormData] = useState({
        paydate: "",
        enrollno: "",
        studentname: "",
        projectamount: "",
    });

    const [selectedFees, setSelectedFees] = useState({
        registration: false,
        tuitionLab: false,      // ← combined
        exam: false,
        book: false,
    });

    const [amounts, setAmounts] = useState({
        registration: '',
        tuitionLab: '',
        exam: '',
        book: '',
    });

    const [totalAmount, setTotalAmount] = useState(0);
    const [submit, setSubmit] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const feeTypes = [
        { id: 'registration', label: 'Registration Fees' },
        { id: 'tuitionLab', label: 'Tuition + Lab Fees' },
        { id: 'exam', label: 'Exam Fees' },
        { id: 'book', label: 'Book Fees' }
    ];


    useEffect(() => {
        const calculated = feeTypes.reduce((sum, fee) => {
            const isSelected = selectedFees[fee.id];
            const rawAmount = amounts[fee.id];
            const amount = isSelected && rawAmount !== '' ? Number(rawAmount) : 0;
            return sum + amount;
        }, 0);
        setTotalAmount(calculated);
    }, [selectedFees, amounts]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "enrollNo") {
            //console.log(value)
            const collectdata = async () => {
                try {
                    const response = await axios.get('http://localhost:4343/api/rollno', {
                        params: {
                            rollno: value
                        }
                    });
                    const data = response.data.value;

                    if (data?.length > 0) {
                        const record = data[0]; // assuming rollNo is unique
                        setFormData((prev) => ({
                            ...prev,
                            studentName: record.studentname || '',
                            courseName: record.coursename || '',
                        }));
                    } else {
                        setFormData((prev) => ({
                            ...prev,
                            studentName: '',
                            courseName: '',
                        }));
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
            collectdata()
        }
    };


    const handleCheckboxChange = (id) => {
        setSelectedFees((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleAmountChange = (id, value) => {
        // Only allow positive whole numbers
        if (value === '' || (/^\d+$/.test(value) && Number(value) >= 0)) {
            setAmounts((prev) => ({
                ...prev,
                [id]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Always include ALL fee types in the submission
        const feeItems = feeTypes.map((fee) => {
            const isSelected = selectedFees[fee.id];
            const rawAmount = amounts[fee.id];
            const amount = isSelected && rawAmount !== '' ? Number(rawAmount) : 0;
            return {
                type: fee.label,
                amount: amount,
                selected: isSelected,
            };
        });
        const submission = {
            ...formData,
            fees: feeItems,
            totalAmount: totalAmount,
        };
        //console.log('Billing Data to Submit:', submission);
        try {
            const response = axios.post("http://localhost:4343/api/billing", submission, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setSubmit("Successfully done")
            handleClear()
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

    const handleClear = () => {
        setFormData({
            date: today,
            enrollNo: '',
            studentName: '',
            courseName: '',
        });
        setSelectedFees({
            registration: false,
            tuitionLab: false,
            exam: false,
            book: false
        });
        setAmounts({
            registration: '',
            tuitionLab: '',
            exam: '',
            book: ''
        });
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const projecthandleSubmit = (e) => {
        e.preventDefault();

        const newRecord = {
            paydate: projectformData.paydate,
            enrollno: Number(projectformData.enrollno),
            studentname: projectformData.studentname.trim(),
            projectamount: Number(projectformData.projectamount),
        };
        //console.log(newRecord);
        try {
            const response = axios.post("http://localhost:4343/api/projectbilling", newRecord, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setSubmit("Project payment done")
        } catch (error) {
            console.error("Submission error:", error);
            setSubmit(
                error.response?.data?.message || "Something went wrong. Try again."
            );
        }

        // Reset form
        setProjectFormData({
            paydate: "",
            enrollno: "",
            studentname: "",
            projectamount: "",
        });
    };

    useEffect(() => {
        const fetchenroll = async () => {
            try {
                const response = await axios.get("http://localhost:4343/api/maxprojectrollno");
                //console.log(response.data)
                const nextrollno = response.data.nextAvailable;
                //console.log(nextrollno)
                setProjectFormData((prev) => ({
                    ...prev,
                    enrollno: nextrollno,
                }));
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchenroll();
    }, [show])

    const hasAnyFeeSelected = Object.values(selectedFees).some(Boolean);

    return (
        <>
            <Navbars />
            <Container className="py-5">
                <Card className="shadow">
                    <Card.Header className="bg-primary text-white text-center">
                        <h3 className="mb-0">Student Fee Billing</h3>
                    </Card.Header>

                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            {/* Basic Information */}
                            <Row className="mb-4">
                                <Col md={4}>
                                    <Form.Group controlId="date">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={4}>
                                    <Form.Group controlId="enrollNo">
                                        <Form.Label>Enrollment No</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="enrollNo"
                                            placeholder="e.g. 2001"
                                            value={formData.enrollNo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={4}>
                                    <Form.Group controlId="courseName">
                                        <Form.Label>Course Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="courseName"
                                            placeholder="BCA / MCA / Full Stack ..."
                                            value={formData.courseName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                <Col>
                                    <Form.Group controlId="studentName">
                                        <Form.Label>Student Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="studentName"
                                            placeholder="Full name of student"
                                            value={formData.studentName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Fee Types Selection */}
                            <Card className="mb-4">
                                <Card.Header>Select Fee Types</Card.Header>
                                <Card.Body>
                                    <Row>
                                        {feeTypes.map((fee) => (
                                            <Col md={6} lg={4} key={fee.id} className="mb-2">
                                                <Form.Check
                                                    type="checkbox"
                                                    id={fee.id}
                                                    label={fee.label}
                                                    checked={selectedFees[fee.id]}
                                                    onChange={() => handleCheckboxChange(fee.id)}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Amount Fields */}
                            {hasAnyFeeSelected && (
                                <>
                                    <Card className="mb-4">
                                        <Card.Header>Enter Amounts (₹)</Card.Header>
                                        <Card.Body>
                                            {feeTypes.map(
                                                (fee) =>
                                                    selectedFees[fee.id] && (
                                                        <InputGroup className="mb-3" key={fee.id}>
                                                            <InputGroup.Text>{fee.label}</InputGroup.Text>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="0"
                                                                value={amounts[fee.id]}
                                                                onChange={(e) =>
                                                                    handleAmountChange(fee.id, e.target.value)
                                                                }
                                                                required={selectedFees[fee.id]}
                                                            />
                                                            <InputGroup.Text>₹</InputGroup.Text>
                                                        </InputGroup>
                                                    )
                                            )}
                                        </Card.Body>
                                    </Card>

                                    {/* Running total */}
                                    <div className="text-end mb-4">
                                        <h5>
                                            Total Amount:{' '}
                                            <strong>₹ {totalAmount.toLocaleString('en-IN')}</strong>
                                        </h5>
                                    </div>
                                </>
                            )}

                            <div>
                                <small className='fw-bold text-danger'>If paying project fee, please tick this !</small>
                                <br />
                                <Form.Check
                                    type="checkbox"
                                    id="project"
                                    label="Project Fee"
                                    checked={show}
                                    onChange={() => setShow(true)}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="d-flex justify-content-center gap-4 mt-5">
                                <Button variant="success" type="submit" size="lg">
                                    Submit Billing
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    size="lg"
                                    onClick={handleClear}
                                >
                                    Clear Form
                                </Button>
                            </div>
                        </Form>
                        <br />
                        <p className='fw-bolder text-center text-success small py-3'>{submit}</p>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Project Fee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className="mb-5 shadow-sm">
                        <Card.Body>
                            <Form onSubmit={projecthandleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="paydate">
                                            <Form.Label>Payment Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="paydate"
                                                value={projectformData.paydate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="enrollno">
                                            <Form.Label>Enrollment No</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="enrollno"
                                                placeholder="1001"
                                                value={projectformData.enrollno}
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="studentname">
                                            <Form.Label>Student Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="studentname"
                                                placeholder="Enter full name"
                                                value={projectformData.studentname}
                                                onChange={handleChange}
                                                maxLength={20}
                                                required
                                            />
                                            <Form.Text className="text-muted">
                                                Max 20 characters
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="projectamount">
                                            <Form.Label>Project Amount (₹)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="projectamount"
                                                placeholder="45000"
                                                value={projectformData.projectamount}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-grid">
                                    <Button variant="success" type="submit" size="lg">
                                        Save Payment Record
                                    </Button>
                                </div>
                            </Form>
                            <p className='fw-bolder text-center text-success small py-3'>{submit}</p>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Billing;