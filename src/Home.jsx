import { Container, Row, Col, Image, Form, InputGroup, FormControl, Button, Card, Accordion, Modal, Badge, Table } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import logo from "./assets/csslogo.png";
import Navbars from "./Navbars";
import { FaSearch, FaCreditCard, FaFileAlt } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa6';
import axios from 'axios'
import { useState } from 'react';


function Home() {
    const [search, setSearch] = useState('')
    const [off, setOff] = useState("1")
    const [data, setDate] = useState([])
    const [nodata, setNodata] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [studentData, setStudentData] = useState({})

    const handleClose = () => setShowModal(false);

    const handlechange = (e) => {
        const val = e.target.value;
        setSearch(val)
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        const newval = parseInt(search)
        if (/^\d+$/.test(newval)) {
            //console.log(typeof (newval))
        }
        else {
            //console.log(typeof (search))
        }

        const fetchdata = async () => {
            try {
                const response = await axios.get('http://localhost:4343/api/searchenroll', {
                    params: {
                        text: search,
                        number: newval
                    }
                });
                if (!response.data.value || response.data.value.length === 0) {
                    console.log("Wrong number or text")
                    //console.log(response.data.value.length)
                    setOff("1")
                    setNodata("Not found")
                }
                else {
                    //console.log(response.data)
                    setDate(response.data.value)
                    setOff("0")
                }
            }

            catch (err) {
                console.log(err)
            }
        }
        fetchdata()
        setSearch('')
    }

    const tabledata = async (rollno) => {
        setShowModal(true)
        try {
            const response = await axios.get('http://localhost:4343/api/tabledata', {
                params: {
                    number: rollno
                }
            });
            if (!response.data.value || response.data.value.length === 0) {
                console.log("not found")
            }
            else {
                console.log(response.data.value)
                //setStudentData(response.data.value)
                response.data.value.map((res) => {
                    setStudentData(res)
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <Navbars />

            {/* Hero Section – modern welcome area */}
            <section className="bg-light py-5 py-md-3 text-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            {/* Search bar – more prominent */}
                            <Form className="d-flex justify-content-center mb-3" role="search" onSubmit={handlesubmit}>
                                <InputGroup className="w-100" style={{ maxWidth: '500px' }}>
                                    <FormControl
                                        type="search"
                                        placeholder="Search Enrollno or Studentname...."
                                        aria-label="Search"
                                        className="py-2 fs-6"
                                        value={search}
                                        onChange={handlechange}
                                    />
                                    <Button variant="primary" type="submit" className="px-4">
                                        <FaSearch className="me-2" /> Search
                                    </Button>
                                </InputGroup>
                            </Form>

                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey={off}>
                                    <Accordion.Body>
                                        {!data || data.length === 0 ? (
                                            <p className="text-center text-danger">{nodata}</p>
                                        ) : (
                                            data.map((val) => (
                                                <div
                                                    key={val.enrollno}
                                                    className="d-flex align-item-center justify-content-between p-2 m-1"
                                                >
                                                    <p>{val.enrollno}</p>
                                                    <p>{val.studentname}</p>
                                                    <p>{val.coursename}</p>
                                                    <button className="bg-success p-1 border border-0 rounded text-white"
                                                        onClick={() => tabledata(val.enrollno)}
                                                    >
                                                        View
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                        <button className="border border-0 rounded p-1 mt-3 bg-outline-secondary" onClick={() => {
                                            setOff("1")
                                            setNodata("")
                                        }}>Clear</button>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <Image
                                src={logo}
                                roundedCircle
                                fluid
                                style={{ maxHeight: '180px', objectFit: 'contain' }}
                                //className="mb-4 shadow-lg"
                                alt="Cyber Soft Solution Logo"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>


            <section className="py-4">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} lg={10}>
                            <Card className="border-0 shadow-lg p-4">
                                <Row className="g-4 text-center">
                                    <Col xs={12} sm={4}>
                                        <Link to="/enquiry" className="text-decoration-none">
                                            <Button
                                                variant="outline-primary"
                                                className="w-100 py-4 fs-5 d-flex flex-column align-items-center gap-2 hover-lift"
                                            >
                                                <FaBookOpen size={32} />
                                                Enquiry
                                            </Button>
                                        </Link>
                                    </Col>

                                    <Col xs={12} sm={4}>
                                        <Link to="/admission" className="text-decoration-none">
                                            <Button
                                                variant="outline-primary"
                                                className="w-100 py-4 fs-5 d-flex flex-column align-items-center gap-2 hover-lift"
                                            >
                                                <FaFileAlt size={32} />
                                                Admission
                                            </Button>
                                        </Link>
                                    </Col>

                                    <Col xs={12} sm={4}>
                                        <Link to="/billing" className="text-decoration-none">
                                            <Button
                                                variant="outline-primary"
                                                className="w-100 py-4 fs-5 d-flex flex-column align-items-center gap-2 hover-lift"
                                            >
                                                <FaCreditCard size={32} />
                                                Billing
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Modal
                show={showModal}
                onHide={handleClose}
                size="xl"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Student Fee Details – Enroll No: <Badge bg="dark">{studentData.enrollno}</Badge>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* Student Information */}
                    <div className="mb-4">
                        <h5 className="mb-3 text-primary">Student Information</h5>
                        <Table bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <th width="35%">Student Name</th>
                                    <td>{studentData.studentname}</td>
                                </tr>
                                <tr>
                                    <th>Father's Name</th>
                                    <td>{studentData.fathername}</td>
                                </tr>
                                <tr>
                                    <th>Date of Birth</th>
                                    <td>{studentData.dob ? new Date(studentData.dob).toLocaleDateString("en-GB") : "—"} (Age: {studentData.age})</td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td>{studentData.gender}</td>
                                </tr>
                                <tr>
                                    <th>Date of Joining</th>
                                    <td>{studentData.doj ? new Date(studentData.doj).toLocaleDateString("en-GB") : "—"}</td>
                                </tr>
                                <tr>
                                    <th>Course</th>
                                    <td>
                                        <strong>{studentData.coursename}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Contact</th>
                                    <td>{studentData.studentphoneno}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{studentData.studentaddress}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    {/* Fee Summary */}
                    <div className="mb-4">
                        <h5 className="mb-3 text-primary">Fee Summary</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr className="table-primary">
                                    <th>Description</th>
                                    <th className="text-end">Amount (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total Fees</td>
                                    <td className="text-end fw-bold">{studentData.totalFees}</td>
                                </tr>
                                <tr>
                                    <td>Registration Fee</td>
                                    <td className="text-end">{studentData.register}</td>
                                </tr>
                                <tr>
                                    <td>Tuition + Lab Fee</td>
                                    <td className="text-end">{studentData.tuitionLab}</td>
                                </tr>
                                <tr>
                                    <td>Exam Fee</td>
                                    <td className="text-end">{studentData.exam}</td>
                                </tr>
                                <tr>
                                    <td>Book Fee</td>
                                    <td className="text-end">{studentData.books}</td>
                                </tr>
                                {/* <tr className="table-success fw-bold">
                                    <td>Paid So Far</td>
                                    <td className="text-end">{paidSoFar}</td>
                                </tr> */}
                                <tr className={`${studentData.balanceFees}` > 0 ? "table-danger" : "table-success"} style={{ fontSize: '1.1rem' }}>
                                    <td>Balance Fees</td>
                                    <td className="text-end fw-bold">
                                        {`${studentData.balanceFees}` > 0 ? `₹${studentData.balanceFees}` : "Fees Cleared"}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    {/* Payment Dates */}
                    <div>
                        <h5 className="mb-3 text-primary">Payment History</h5>
                        {studentData.all_dates ? (
                            <div className="p-3 bg-light border rounded">
                                <strong>Payment Dates:</strong><br />
                                {studentData.all_dates.split(', ').map((date, idx) => (
                                    <Badge key={idx} bg="info" className="me-2 mb-2">
                                        {date}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">No payments recorded yet.</p>
                        )}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Home;