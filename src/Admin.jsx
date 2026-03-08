import React, { useState, useEffect } from 'react';
import {
    Container, Row, Col, Card,
    Form, Button, Table,
    Nav, Tab, Badge, InputGroup, FormControl, Modal, Accordion
} from 'react-bootstrap';
import {
    Calendar,
    Users,
    ClipboardCheck,
    Search
} from 'lucide-react';
import axios from 'axios';
import Navbars from "./Navbars";

function Admin() {
    // ── Filter State ───────────────────────────────────────

    const [selectedDate, setSelectedDate] = useState('');
    const [enqcount, setEnqcount] = useState()
    const [admcount, setAdmcount] = useState()
    const [procount, setProcount] = useState()
    const [showbadge, setShowbadge] = useState("")


    const monthfilter = async () => {
        const month = selectedDate.substring(6, 7)
        //console.log("monthfilter:", month)
        setShowbadge(`${month} Month`)
        const enqmonth = async () => {
            try {
                const response = await axios.get(`http://localhost:4343/api/monthcountenquiry/${month}`)
                //console.log(response.data.value[0].enqcount)
                setEnqcount(response.data.value[0].enqcount)
            }
            catch (err) {
                console.log(err)
            }
        }
        enqmonth();

        const admmonth = async () => {
            try {
                const response = await axios.get(`http://localhost:4343/api/monthcountadmission/${month}`)
                //console.log(response.data.value[0].admcount)
                setAdmcount(response.data.value[0].admcount)
            }
            catch (err) {
                console.log(err)
            }
        }
        admmonth();

        const promonth = async () => {
            try {
                const response = await axios.get(`http://localhost:4343/api/monthcountproject/${month}`)
                //console.log(response.data.value[0].procount)
                setProcount(response.data.value[0].procount)
            }
            catch (err) {
                console.log(err)
            }
        }
        promonth();
    }

    const yearfilter = async () => {
        const currentYear = new Date().getFullYear();
        setShowbadge(`${currentYear} Year`)
        //console.log(currentYear);
        const enqyear = async () => {
            try {
                const response = await axios.get(`http://localhost:4343/api/yearcountenquiry/${currentYear}`)
                //console.log(response.data.value[0].enqcount)
                setEnqcount(response.data.value[0].enqcount)
            }
            catch (err) {
                console.log(err)
            }
        }
        enqyear();

        const admyear = async () => {
            try {
                const response = await axios.get(`http://localhost:4343/api/yearcountadmission/${currentYear}`)
                //console.log(response.data.value[0].admcount)
                setAdmcount(response.data.value[0].admcount)
            }
            catch (err) {
                console.log(err)
            }
        }
        admyear();

        const proyear = async () => {
            try {
                const response = await axios.get(`http://localhost:4343/api/yearcountproject/${currentYear}`)
                //console.log(response.data.value[0].procount)
                setProcount(response.data.value[0].procount)
            }
            catch (err) {
                console.log(err)
            }
        }
        proyear();
    }

    useEffect(() => {
        yearfilter()
    }, [])

    const [enquires, setEnquires] = useState([])
    const [dequires, setDequires] = useState([])

    useEffect(() => {
        const enquirydata = async () => {

            try {
                const response = await axios.get('http://localhost:4343/api/enquirydata');
                //console.log(response.data.value)
                setEnquires(response.data.value)
            }
            catch (err) {
                console.log(err)
            }
        }
        enquirydata()

        const dequirydata = async () => {
            try {
                const response = await axios.get('http://localhost:4343/api/dequirydata');
                //console.log(response.data.value)
                setDequires(response.data.value)
            }
            catch (err) {
                console.log(err)
            }
        }
        dequirydata()
    }, [enquires, dequires])

    const getenqrollno = async (data) => {
        //console.log(typeof (data))
        try {
            const response = await axios.put(`http://localhost:4343/api/enquiryinterest/${data}`);

        }
        catch (err) {
            console.log(err)
        }
    }

    const getdeqrollno = async (data) => {
        //console.log(typeof (data))
        try {
            const response = await axios.put(`http://localhost:4343/api/dequiryinterest/${data}`);

        }
        catch (err) {
            console.log(err)
        }
    }

    const isJoined = async (data) => {
        try {
            const response = await axios.put(`http://localhost:4343/api/isJoined/${data}`);

        }
        catch (err) {
            console.log(err)
        }
    }


    const [students, setStudents] = useState([])
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState([])
    const [submit, setSubmit] = useState("")

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
                }
                else {
                    //console.log(response.data)
                    setStudents(response.data.value)
                }
            }

            catch (err) {
                console.log(err)
            }
        }
        fetchdata()
        setSearch('')
    }

    const editdata = async (data) => {
        console.log(data)
        setShow(true)
        setFormData(data)
    }

    const editChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' || type === 'radio' ? checked : value,
        }));
    };

    const editsubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.put("http://localhost:4343/api/updateadmission", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            //console.log("Success:", response.data);
            if (response.data) {
                setShow(true)
            }
            setSubmit("Updated successfully!");

            setFormData([])
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
            setShow(false)
        }, 2000)
    }, [submit])

    const [projects, setProjects] = useState([])

    useEffect(() => {
        const projectdata = async () => {

            try {
                const response = await axios.get('http://localhost:4343/api/projects');
                //console.log(response.data.value)
                setProjects(response.data.value)
            }
            catch (err) {
                console.log(err)
            }
        }
        projectdata()
    }, [])
    return (
        <>
            <Navbars />
            <Container fluid className="py-4">
                <h2 className="mb-4 fw-bold text-primary">Admin Dashboard</h2>

                {/* ── TABS for different sections ──────────────────────── */}
                <Tab.Container defaultActiveKey="dashboard">
                    <Nav variant="pills" className="mb-4 flex-nowrap" style={{ overflowX: 'auto' }}>
                        <Nav.Item>
                            <Nav.Link eventKey="dashboard">Dashboard & Stats</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="enquiries">Enquiries</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="students">Student Profiles</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="projects">Projects</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        {/* ==================== SECTION 1 – DASHBOARD ==================== */}
                        <Tab.Pane eventKey="dashboard">
                            <Card className="border-0 shadow-sm mb-4">
                                <Card.Body>
                                    <Row className="mb-4 align-items-center g-3">
                                        <Col xs={12} md={5}>
                                            <Form.Group>
                                                <Form.Label>
                                                    Select the month to filter:
                                                </Form.Label>
                                                <Form.Control
                                                    type="month"
                                                    placeholder="Select Month & Year"
                                                    value={selectedDate}
                                                    onChange={(e) => setSelectedDate(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} md={3} className="d-flex align-items-end justify-content-center">
                                            <Button
                                                variant="primary"
                                                className="w-100"
                                                onClick={monthfilter}
                                            >
                                                <Search size={18} className="me-2" /> Apply Filter
                                            </Button>
                                        </Col>
                                        <Col xs={12} md={3} className="d-flex align-items-end">
                                            <Button
                                                variant="secondary"
                                                className="w-100"
                                                onClick={yearfilter}
                                            >
                                                Clear
                                            </Button>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <h2>Overall View: <span className='text-danger'>{showbadge}</span></h2>
                                        <Col md={4} sm={6} className="mb-4">
                                            <Card className="text-center border-primary h-100 shadow-sm">
                                                <Card.Body>
                                                    <Calendar size={36} className="text-primary mb-2" />
                                                    <Card.Title>Admissions</Card.Title>
                                                    <h3 className="fw-bold text-primary">{admcount}</h3>
                                                    <Badge bg="primary">{showbadge}</Badge>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col md={4} sm={6} className="mb-4">
                                            <Card className="text-center border-success h-100 shadow-sm">
                                                <Card.Body>
                                                    <Users size={36} className="text-success mb-2" />
                                                    <Card.Title>Enquiries</Card.Title>
                                                    <h3 className="fw-bold text-success">{enqcount}</h3>
                                                    <Badge bg="success">{showbadge}</Badge>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col md={4} sm={6} className="mb-4">
                                            <Card className="text-center border-info h-100 shadow-sm">
                                                <Card.Body>
                                                    <ClipboardCheck size={36} className="text-info mb-2" />
                                                    <Card.Title>Projects</Card.Title>
                                                    <h3 className="fw-bold text-info">{procount}</h3>
                                                    <Badge bg="info">{showbadge}</Badge>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Tab.Pane>

                        {/* ==================== SECTION 2 – ENQUIRIES ==================== */}
                        <Tab.Pane eventKey="enquiries">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Enquiry Section</Accordion.Header>
                                    <Accordion.Body>
                                        <Card className="border-0 shadow-sm">
                                            <Card.Body className="p-0">
                                                <Table responsive hover className="mb-0">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>Student Name</th>
                                                            <th>Course Name</th>
                                                            <th>Phone No</th>
                                                            <th>Enquiry Date</th>
                                                            <th>Visiting Mode</th>
                                                            <th>Interest/Not</th>
                                                            <th>Joined</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {enquires.map(enq => (
                                                            <tr key={enq.enqrollno}>
                                                                <td>{enq.studentname}</td>
                                                                <td>{enq.coursename}</td>
                                                                <td>{enq.studentphoneno}</td>
                                                                <td>{enq.enquirydate ? new Date(enq.enquirydate).toLocaleDateString("en-GB") : "—"}</td>
                                                                <td>{enq.visitingmode}</td>
                                                                <td><button className="btn btn-outline-danger" onClick={() => { getenqrollno(enq.enqrollno) }}>{enq.isinterest == 0 ? "Interested" : "Not Interested"}</button></td>
                                                                <td><button className="btn btn-outline-info" onClick={() => { isJoined(enq.enqrollno) }}>{enq.isjoined == 1 ? "Not Join" : "Joined"}</button></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Not Interested Section</Accordion.Header>
                                    <Accordion.Body>
                                        <Card className="border-0 shadow-sm">
                                            <Card.Body className="p-0">
                                                <Table responsive hover className="mb-0">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>Student Name</th>
                                                            <th>Course Name</th>
                                                            <th>Phone No</th>
                                                            <th>Enquiry Date</th>
                                                            <th>Visiting Mode</th>
                                                            <th>Interest/Not</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dequires.map(deq => (
                                                            <tr key={deq.enqrollno}>
                                                                <td>{deq.studentname}</td>
                                                                <td>{deq.coursename}</td>
                                                                <td>{deq.studentphoneno}</td>
                                                                <td>{deq.enquirydate ? new Date(deq.enquirydate).toLocaleDateString("en-GB") : "—"}</td>
                                                                <td>{deq.visitingmode}</td>
                                                                <td><button className="btn btn-outline-success" onClick={() => { getdeqrollno(deq.enqrollno) }}>{deq.isinterest == 0 ? "Interested" : "Not Interested"}</button></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Tab.Pane>

                        {/* ==================== SECTION 3 – EDIT STUDENTS ==================== */}
                        <Tab.Pane eventKey="students">
                            <Card className="border-0 shadow-sm">
                                <div className='d-flex flex-column justify-content-center align-items-center mb-3'>
                                    <div className='d-flex align-items-center justify-content-center mb-2 w-100'>
                                        <InputGroup style={{ maxWidth: '500px' }}>
                                            <FormControl
                                                type="search"
                                                placeholder="Search..."
                                                aria-label="Search"
                                                className="py-2 fs-6"
                                                value={search}
                                                onChange={handlechange}
                                            />
                                            <Button variant="primary" onClick={handlesubmit} className="px-4">
                                                Search
                                            </Button>
                                        </InputGroup>
                                    </div>
                                    <div>
                                        <Button variant="secondary" onClick={() => {
                                            setSearch("")
                                            setStudents([])
                                        }} className="px-4">
                                            Clear
                                        </Button>
                                    </div>
                                </div>
                                <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Student Records</h5>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <Table responsive hover className="mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Student Name</th>
                                                <th>Mobile No</th>
                                                <th>Course</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.map(stu => (
                                                <tr key={stu.enrollno}>
                                                    <td>{stu.enrollno}</td>
                                                    <td>{stu.studentname}</td>
                                                    <td>{stu.studentphoneno}</td>
                                                    <td>{stu.coursename}</td>
                                                    <td>{stu.iscomplete == 0 ? "No Going" : "Completed"}</td>
                                                    <td>
                                                        <Button variant="outline-primary" onClick={() => { editdata(stu) }} size="sm" className="me-2">
                                                            Edit
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Tab.Pane>


                        <Modal
                            show={show}
                            size="lg"
                            aria-labelledby="student-modal-title"
                            centered
                        >
                            <Modal.Header>
                                <Modal.Title id="student-modal-title">
                                    {formData.enrollno ? `${formData.studentname} details` : 'New Student'}
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Enrollment No</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="enrollno"
                                                    value={formData.enrollno ? formData.enrollno : ""}
                                                    onChange={editChange}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Student Name *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="studentname"
                                                    value={formData.studentname ? formData.studentname : ""}
                                                    onChange={editChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Course Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="coursename"
                                                    value={formData.coursename ? formData.coursename : ""}
                                                    onChange={editChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Father's Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fathername"
                                                    value={formData.fathername ? formData.fathername : ""}
                                                    onChange={editChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Father's Occupation</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fatheroccupation"
                                                    value={formData.fatheroccupation ? formData.fatheroccupation : ""}
                                                    onChange={editChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Date of Birth</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="dob"
                                                    value={formData.dob ? formData.dob.substring(0, 10) : ""}
                                                    onChange={editChange}
                                                    placeholder='yyyy-mm-dd'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="age"
                                                    value={formData.age ? formData.age : ""}
                                                    onChange={editChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="dob"
                                                    value={formData.gender ? formData.gender : ""}
                                                    onChange={editChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Education Qualification</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="eduquali"
                                                    value={formData.eduquali ? formData.eduquali : ""}
                                                    onChange={editChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Student Occupation</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="occupation"
                                                    value={formData.occupation ? formData.occupation : ""}
                                                    onChange={editChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    name="studentphoneno"
                                                    value={formData.studentphoneno ? formData.studentphoneno : ""}
                                                    onChange={editChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            name="studentaddress"
                                            value={formData.studentaddress ? formData.studentaddress : ""}
                                            onChange={editChange}
                                        />
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email ID</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="emailid"
                                                    value={formData.emailid ? formData.emailid : ""}
                                                    onChange={editChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Total Fees</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="totalfees"
                                                    value={formData.totalfees ? formData.totalfees : ""}
                                                    onChange={editChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Date of Joining</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="doj"
                                                    value={formData.doj ? formData.doj.substring(0, 10) : ""}
                                                    onChange={editChange}
                                                    placeholder='yyyy-mm-dd'
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Course Status</Form.Label>
                                                <div className="d-flex gap-4 mt-2">
                                                    <Form.Check
                                                        type="radio"
                                                        id="complete-yes"
                                                        label="Completed"
                                                        name="iscomplete"
                                                        checked={formData.iscomplete === true}
                                                        onChange={() => setFormData((prev) => ({ ...prev, iscomplete: true }))}
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        id="complete-no"
                                                        label="Not Completed"
                                                        name="iscomplete"
                                                        checked={formData.iscomplete === false}
                                                        onChange={() => setFormData((prev) => ({ ...prev, iscomplete: false }))}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setShow(false) }}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={editsubmit}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                    <p className='fw-bolder text-center text-success small py-3'>{submit}</p>
                                </Form>
                            </Modal.Body>
                        </Modal>

                        {/* ==================== SECTION 4 – PROJECTS ==================== */}
                        <Tab.Pane eventKey="projects">
                            <Card className="border-0 shadow-sm">
                                <Card.Header className="bg-light">
                                    <h5 className="mb-0">Project Records</h5>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <Table responsive hover className="mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Student</th>
                                                <th>Project Amount</th>
                                                <th>Payment Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {!projects || projects.length === 0 ? (
                                                <tr>
                                                    <td>No Projects</td>
                                                </tr>
                                            ) : (
                                                projects.map((val) => (
                                                    <tr key={val.enrollno}>
                                                        <td>{val.enrollno}</td>
                                                        <td>{val.studentname}</td>
                                                        <td>{val.projectamount}</td>
                                                        <td>{val.paydate ? new Date(val.paydate).toLocaleDateString("en-GB") : "—"}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </>
    );
}

export default Admin;