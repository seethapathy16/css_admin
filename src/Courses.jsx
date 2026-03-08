import React, { useState } from 'react';
import {
    Container, Row, Col, Card, Button, Modal, ListGroup, Badge,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Courses() {
    const [showModal, setShowModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);

    // Data structure: category → array of programs → each program has title + courses list
    const categories = [
        {
            title: 'Coding',
            color: 'primary',
            programs: [
                {
                    name: 'PGDCA',
                    courses: ['MS-Office', 'C', 'C++', 'HTML', 'Java', 'Python'],
                },
                {
                    name: 'HDCP',
                    courses: ['C', 'C++', 'HTML', 'Java', 'Python', 'Project'],
                },
                {
                    name: 'Full Stack Development',
                    courses: ['HTML/CSS', 'Bootstrap', 'JavaScript', 'React', 'Node.js', 'MySQL', 'REST APIs'],
                },
                {
                    name: 'Web Development',
                    courses: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Bootstrap', 'React', 'REST APIs'],
                },
            ],
        },
        {
            title: 'Non-Coding',
            color: 'success',
            programs: [
                {
                    name: 'DOAC',
                    courses: ['MS-Office', 'Tally', 'Basic Accounting', 'GST Filing'],
                },
                {
                    name: 'Tally Prime Expert',
                    courses: ['Tally ERP9/Prime', 'Voucher Entry', 'Inventory', 'Payroll', 'GST Compliance', 'Reports & Analysis'],
                },
                {
                    name: 'Digital Office Skills',
                    courses: ['MS Word', 'MS Excel', 'MS PowerPoint', 'Google Workspace', 'Email & Internet Etiquette'],
                },
                {
                    name: 'Computerized Accounting',
                    courses: ['Tally with GST', 'QuickBooks Basics', 'Financial Statements', 'Bank Reconciliation', 'Taxation Basics'],
                },
                {
                    name: 'Office Automation',
                    courses: ['MS-Office Suite', 'Typing Speed', 'Document Formatting', 'Presentation Skills', 'Basic Data Management'],
                },
            ],
        },
        {
            title: 'Multimedia',
            color: 'danger', // or 'warning', 'info', etc.
            programs: [
                {
                    name: 'DTP',
                    courses: ['MS-Office', 'CorelDRAW', 'Adobe Photoshop', 'Page Layout', 'Logo & Banner Design', 'Print Ready Files'],
                },
                {
                    name: 'Graphic Design Pro',
                    courses: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Logo Design', 'Poster/Brochure', 'Color Theory'],
                },
                {
                    name: 'Video Editing Basics',
                    courses: ['Premiere Pro', 'DaVinci Resolve', 'Video Cutting', 'Transitions & Effects', 'Color Grading', 'Sound Editing'],
                },
                {
                    name: 'UI/UX Foundation',
                    courses: ['Figma Basics', 'Wireframing', 'Prototyping', 'User Research', 'Responsive Design', 'Adobe XD'],
                },
                {
                    name: '2D Animation Intro',
                    courses: ['Adobe Animate', 'Character Design', 'Frame-by-Frame', 'Tweening', 'Storyboarding', 'Exporting Animation'],
                },
            ],
        },
    ];

    const handleShow = (program) => {
        setSelectedProgram(program);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <Container className="py-5">
            <h1 className="text-center mb-5 fw-bold display-4 text-primary">Courses</h1>

            <Row className="g-4 justify-content-center">
                {categories.map((category, catIndex) => (
                    <Col md={6} lg={4} key={catIndex}>
                        <Card className="h-100 shadow-lg border-0 hover-shadow">
                            <Card.Header
                                className={`bg-${category.color} text-white text-center py-4 fs-3 fw-bold`}
                            >
                                {category.title}
                                <Badge bg="light" text="dark" className="ms-3 px-3 py-2 fs-6">
                                    {category.title === 'Coding' ? 'Programming' : category.title === 'Non-Coding' ? 'Office & Accounts' : 'Design & Media'}
                                </Badge>
                            </Card.Header>

                            <Card.Body className="p-4 d-flex flex-column">
                                <Card.Title className="text-center mb-4 fw-semibold fs-4 text-dark">
                                    Explore Our {category.title} Programs
                                </Card.Title>

                                <div className="d-grid gap-3 flex-grow-1">
                                    {category.programs.map((program, progIndex) => (
                                        <Button
                                            key={progIndex}
                                            variant={`outline-${category.color}`}
                                            size="lg"
                                            className="py-3 fw-medium"
                                            onClick={() => handleShow(program)}
                                        >
                                            {program.name}
                                        </Button>
                                    ))}
                                </div>
                            </Card.Body>

                            <Card.Footer className="text-center bg-light py-3">
                                <small className="text-muted">
                                    Click any program to see included modules
                                </small>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal */}
            <Modal
                show={showModal}
                onHide={handleClose}
                size="lg"
                centered
                animation={true}
            >
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title className="fw-bold text-dark">
                        {selectedProgram?.name} Courses
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedProgram && (
                        <ListGroup variant="flush">
                            {selectedProgram.courses.map((course, idx) => (
                                <ListGroup.Item
                                    key={idx}
                                    className="py-3 d-flex align-items-center border-bottom"
                                >
                                    <span className="me-3 fs-4 text-primary">→</span>
                                    <span className="fs-5">{course}</span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Modal.Body>

                <Modal.Footer className="bg-light">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="mt-5">
                <Col className="text-center">
                    <p className="text-muted fst-italic fs-5">
                        Choose your path and build skills for tomorrow's opportunities!
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Courses;