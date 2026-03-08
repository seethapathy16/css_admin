create database cssadmin;

use cssadmin;

create table enquiry(
enqrollno int not null primary key auto_increment,
studentname varchar(30),
studentphoneno varchar(12),
coursename varchar(20),
quotefee varchar(10),
enquirydate date,
visitingmode varchar(20),
isinterest boolean default 1,
isjoined boolean default 0
)auto_increment=1;

select * from enquiry;

select count(enqrollno) as enqcount from enquiry where month(enquirydate)=3;

select count(studentname) as countstudent from enquiry;

drop table enquiry;

create table admission(
enrollno int primary key auto_increment not null,
studentname varchar(30),
coursename varchar(30),
fathername varchar(30),
fatheroccupation varchar(20),
dob date,
age int,
gender varchar(10),
eduquali varchar(20),
occupation varchar(20),
studentaddress varchar(50),
studentphoneno varchar(12),
emailid varchar(20),
totalfees int,
doj date,
iscomplete boolean default 0
)AUTO_INCREMENT = 2001;

select * from admission;

Select * from admission where enrollno=2001;

select * from admission where enrollno=2003 or studentname="";

select max(enrollno) from admission;

SELECT s.enrollno,
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
FROM admission s JOIN billing f ON s.enrollno = f.enrollno where s.enrollNo=2001;

drop table admission;

create table billing(
paydate date,
enrollno int,
coursename varchar(20),
studentname varchar(20),
registerfee int,
tuitionfee int,
examfee int,
bookfee int,
totalpaided int
);

select * from billing;

drop table billing;

create table projectbilling(
paydate date,
enrollno int primary key not null auto_increment,
studentname varchar(20),
projectamount int
)AUTO_INCREMENT = 1;

select * from projectbilling;

select * from projectbilling order by paydate desc;

drop table projectbilling;