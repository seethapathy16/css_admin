const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

const app = express()

const corsorigin = "http://localhost:5173";
app.use(cors(corsorigin))
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'csstbm',
    database: 'cssadmin'
})

db.connect(() => {
    console.log("Database connected successfully")
})

app.get("/", (req, res) => {
    res.send("success")
})

app.post("/api/enquiry", (req, res) => {
    const formData = req.body;
    //console.log(formData)
    db.query("insert into enquiry (enqrollno,studentname,studentphoneno,coursename,quotefee,enquirydate,visitingmode) values (null,?,?,?,?,?,?)", [formData.studentName, formData.phone, formData.course, formData.quotefee, formData.date, formData.visitingMode], (err, results) => {
        res.json({ message: "Success" })
    })
})


app.post("/api/admission", (req, res) => {
    const formData = req.body;
    //console.log(formData)
    const values = [
        formData.studentName?.trim() || null,
        formData.courseName?.trim() || null,
        formData.fatherName?.trim() || null,
        formData.fatherOccupation?.trim() || null,
        formData.dob || null,   // expect 'YYYY-MM-DD'
        Number(formData.age) || null,
        formData.gender?.trim() || null,
        formData.educationQualification?.trim() || null,   // or formData.eduquali
        formData.occupation?.trim() || null,
        formData.studentAddress?.trim() || null,
        formData.studentPhone?.trim() || null,   // or studentPhoneNo
        formData.email?.trim() || null,   // or emailId
        Number(formData.totalFees) || null,
        formData.joiningDate || null,   // expect 'YYYY-MM-DD'
    ];


    db.query(`
            INSERT INTO admission (
                studentname, coursename, fathername, fatheroccupation,
                dob, age, gender, eduquali, occupation,
                studentaddress, studentphoneno, emailid,
                totalfees, doj
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, values)
    res.json({ message: "Success" })

});

app.put("/api/updateadmission", (req, res) => {
    const formData = req.body;
    //console.log(formData)
    const values = [
        formData.studentname?.trim() || null,
        formData.coursename?.trim() || null,
        formData.fathername?.trim() || null,
        formData.fatheroccupation?.trim() || null,
        formData.dob ? String(formData.dob).split('T')[0] || null : null,
        Number(formData.age) || null,
        formData.gender?.trim() || null,
        formData.eduquali?.trim() || null,   // or formData.eduquali
        formData.occupation?.trim() || null,
        formData.studentaddress?.trim() || null,
        formData.studentphoneno?.trim() || null,   // or studentPhoneNo
        formData.emailid?.trim() || null,   // or emailId
        Number(formData.totalfees) || null,
        formData.doj ? String(formData.doj).split('T')[0] || null : null,
        formData.iscomplete || 0,
        formData.enrollno || null
    ];
    //console.log(values)
    db.query(`
            update admission set
                studentname=?, coursename=?, fathername=?, fatheroccupation=?,
                dob=?, age=?, gender=?, eduquali=?, occupation=?,
                studentaddress=?, studentphoneno=?, emailid=?,
                totalfees=?, doj=?, iscomplete=? where enrollno=?
            
        `, values), (err, results) => {
            if (err) {
                console.log(err)
            }
        }
    res.json({ message: "Success" })

});

app.post("/api/billing", (req, res) => {
    const details = req.body;
    db.query("insert into billing (paydate,enrollno,coursename,studentname,registerfee,tuitionfee,examfee,bookfee,totalpaided) values (?,?,?,?,?,?,?,?,?)",
        [details.date, details.enrollNo, details.courseName, details.studentName, details.fees[0].amount, details.fees[1].amount, details.fees[2].amount, details.fees[3].amount, details.totalAmount], (err, results) => {
            if (err) {
                throw err
            }

            res.json({ result: "success" })
        })
})

app.post("/api/projectbilling", (req, res) => {
    const details = req.body;
    db.query("insert into projectbilling (paydate,enrollno,studentname,projectamount) values (?,null,?,?)",
        [details.paydate, details.studentname, details.projectamount], (err, results) => {
            if (err) {
                throw err
            }

            res.json({ result: "success" })
        })
})

app.get("/api/searchenroll", (req, res) => {

    const text = req.query.text || null;
    const number = parseInt(req.query.number) || null;
    //console.log(typeof (text))
    //console.log(typeof (number))

    //res.json({ results: "success" })

    db.query("select * from admission where enrollno=? or studentname=? order by enrollno desc", [number, text], (err, results) => {
        //console.log(results)
        if (err) {
            console.log(err)
        }
        res.json({ value: results })
    })
});

app.get("/api/maxrollno", (req, res) => {
    db.query(
        "SELECT MAX(enrollno) AS max_enroll FROM admission",
        (err, rows) => {
            if (err) {
                console.error("DB error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch enrollment number"
                });
            }

            const max = rows[0]?.max_enroll ?? null;
            const next = max ? max + 1 : 2001;   // matches your AUTO_INCREMENT start

            res.json({
                success: true,
                currentMax: max,
                nextAvailable: next
            });
        }
    );
});

app.get("/api/maxprojectrollno", (req, res) => {
    db.query(
        "SELECT MAX(enrollno) AS max_enroll FROM projectbilling",
        (err, rows) => {
            if (err) {
                console.error("DB error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch enrollment number"
                });
            }

            const max = rows[0]?.max_enroll ?? null;
            const next = max ? max + 1 : 1;   // matches your AUTO_INCREMENT start

            res.json({
                success: true,
                currentMax: max,
                nextAvailable: next
            });
        }
    );
});

app.get("/api/rollno", (req, res) => {
    const rollno = parseInt(req.query.rollno)
    //console.log(typeof (rollno))
    db.query("select * from admission where enrollno=?", [rollno], (err, results) => {
        res.json({ value: results })
    })
})

app.get("/api/tabledata", (req, res) => {
    const rollno = parseInt(req.query.number)
    //console.log(typeof (rollno))
    db.query(`SELECT s.enrollno,
s.doj,
s.studentname,
s.fathername,
s.dob,
s.age,
s.gender,
s.studentaddress,
s.studentphoneno,
s.coursename,
s.totalFees,
sum(f.registerfee) as register,
sum(f.tuitionfee) as tuitionLab,
sum(f.examfee) as exam,
sum(f.bookfee) as books,

    s.totalFees - (SUM(f.tuitionfee) + SUM(f.registerfee)) AS balanceFees,
    GROUP_CONCAT(f.paydate ORDER BY f.paydate ASC SEPARATOR ', ') AS all_dates
FROM admission s JOIN billing f ON s.enrollno = f.enrollno where s.enrollNo=?`, [rollno], (err, results) => {
        res.json({ value: results })
    })
})

app.get("/api/projects", (req, res) => {
    db.query("select * from projectbilling order by paydate desc", (err, results) => {
        res.json({ value: results })
    })
})

app.get("/api/students", (req, res) => {
    db.query("select * from admission order by enrollno desc", (err, results) => {
        res.json({ value: results })
    })
})

app.get("/api/enquirydata", (req, res) => {
    db.query("select * from enquiry where isinterest=1 and isjoined=0 order by enqrollno desc", (err, results) => {
        res.json({ value: results })
    })
})

app.get("/api/dequirydata", (req, res) => {
    db.query("select * from enquiry where isinterest=0 and isjoined=0 order by enqrollno desc", (err, results) => {
        res.json({ value: results })
    })
})

app.put("/api/enquiryinterest/:id", (req, res) => {
    const val = req.params.id;
    db.query("update enquiry set isinterest=0 where enqrollno=?", val, (err, results) => {
        res.json({ data: "success" })
    })
})

app.put("/api/dequiryinterest/:id", (req, res) => {
    const val = req.params.id;
    db.query("update enquiry set isinterest=1 where enqrollno=?", val, (err, results) => {
        res.json({ data: "success" })
    })
})

app.put("/api/isJoined/:id", (req, res) => {
    const val = req.params.id;
    db.query("update enquiry set isjoined=1 where enqrollno=?", val, (err, results) => {
        res.json({ data: "success" })
    })
})

app.get("/api/yearcountenquiry/:id", (req, res) => {
    const year = req.params.id;
    //console.log(year)
    db.query("select count(enqrollno) as enqcount from enquiry where year(enquirydate)=?", [year], (err, results) => {
        //console.log(results)
        res.json({ value: results })
    })
})

app.get("/api/yearcountadmission/:id", (req, res) => {
    const year = req.params.id;
    //console.log(year)
    db.query("select count(enrollno) as admcount from admission where year(doj)=?", [year], (err, results) => {
        //console.log(results)
        res.json({ value: results })
    })
})

app.get("/api/yearcountproject/:id", (req, res) => {
    const year = req.params.id;
    //console.log(year)
    db.query("select count(enrollno) as procount from projectbilling where year(paydate)=?", [year], (err, results) => {
        //console.log(results)
        res.json({ value: results })
    })
})

app.get("/api/monthcountenquiry/:id", (req, res) => {
    const month = req.params.id;
    //console.log(month)
    db.query("select count(enqrollno) as enqcount from enquiry where month(enquirydate)=?", [month], (err, results) => {
        //console.log(results)
        res.json({ value: results })
    })
})

app.get("/api/monthcountadmission/:id", (req, res) => {
    const month = req.params.id;
    //console.log(year)
    db.query("select count(enrollno) as admcount from admission where month(doj)=?", [month], (err, results) => {
        //console.log(results)
        res.json({ value: results })
    })
})

app.get("/api/monthcountproject/:id", (req, res) => {
    const month = req.params.id;
    //console.log(year)
    db.query("select count(enrollno) as procount from projectbilling where month(paydate)=?", [month], (err, results) => {
        //console.log(results)
        res.json({ value: results })
    })
})

const port = 4343
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})