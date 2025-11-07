const csAndIt = [
  "B.C.A.",
  "B.C.A. Hons.",
  "B.C.A. Hons. With Research",
  "BCA MCA Integrated",
  "M.C.A.",
  "B.Sc. CS",
  "B.Sc. CS Hons.",
  "B.Sc. CS Hons. With Research",
  "M.Sc. CS",
  "B.Sc. IT",
  "B.Sc. IT Hons.",
  "B.Sc. IT Hons. With Research",
  "M.Sc. IT",
];

const courses = {
  "Computer Science & IT": [
    "B.C.A.",
    "B.C.A. Hons.",
    "B.C.A. Hons. With Research",
    "BCA MCA Integrated",
    "M.C.A.",
    "B.Sc. CS",
    "B.Sc. CS Hons.",
    "B.Sc. CS Hons. With Research",
    "M.Sc. CS",
    "B.Sc. IT",
    "B.Sc. IT Hons.",
    "B.Sc. IT Hons. With Research",
    "M.Sc. IT",
  ],
  Agriculture: [
    "DIPLOMA IN AGRICULTURE",
    "B.Sc.(Ag.) Hons.",
    "M.Sc.(Ag.) Agronomy",
  ],
};

const departmentCourses = [
  {
    department: "Computer Science & IT",
    courses: [
      { name: "B.Sc (Computer Science)", semesters: 6 },
      { name: "B.Sc. CS Hons.", semesters: 6 },
      { name: "B.Sc. CS Hons. With Research", semesters: 6 },
      { name: "BCA (Bachelor of Computer Applications)", semesters: 6 },
      { name: "B.C.A. Hons.", semesters: 6 },
      { name: "B.C.A.  Hons. with reserch.", semesters: 6 },
      { name: "BCA+MCA Integrated", semesters: 6 },
      { name: "MCA (Master of Computer Applications)", semesters: 4 },
      { name: "M.Sc Computer Science", semesters: 6 },
      { name: "M.Sc (Information Technology)", semesters: 4 },
      { name: "B.Sc (Information Technology)", semesters: 4 },
      { name: "B.Sc. IT Hons.", semesters: 4 },
      { name: "B.Sc. IT Hons. With Research", semesters: 4 },
    ]
  },
  {
    department: "Paramedical & Allied Health Sciences",
    courses: [
      { name: "B.Sc Medical Laboratory Technology", semesters: 6 },
      { name: "B.Sc Radiology & Imaging Technology", semesters: 6 },
      { name: "B.Sc Operation Theatre Technology", semesters: 6 },
      { name: "B.Sc Optometry", semesters: 8 },
      { name: "B.Sc Physiotherapy", semesters: 8 },
      { name: "Diploma in Medical Lab Technology", semesters: 4 }
    ]
  },
  {
    department: "Pharmaceutical Sciences",
    courses: [
      { name: "B.Pharm (Bachelor of Pharmacy)", semesters: 8 },
      { name: "D.Pharm (Diploma in Pharmacy)", semesters: 4 },
      { name: "M.Pharm (Master of Pharmacy)", semesters: 4 },
      { name: "Pharm.D (Doctor of Pharmacy)", semesters: 10 } // 5 years = 10 sem
    ]
  },
  {
    department: "Arts & Humanities",
    courses: [
      { name: "B.A English", semesters: 6 },
      { name: "B.A History", semesters: 6 },
      { name: "B.A Sociology", semesters: 6 },
      { name: "B.A Psychology", semesters: 6 },
      { name: "M.A English", semesters: 4 },
      { name: "M.A History", semesters: 4 }
    ]
  },
  {
    department: "Legal Studies",
    courses: [
      { name: "LL.B (Bachelor of Laws)", semesters: 6 },
      { name: "B.A LL.B (Integrated)", semesters: 10 },
      { name: "BBA LL.B (Integrated)", semesters: 10 },
      { name: "LL.M (Master of Laws)", semesters: 4 }
    ]
  },
  {
    department: "Agriculture",
    courses: [
      { name: "B.Sc Agriculture", semesters: 8 },
      { name: "M.Sc Agriculture", semesters: 4 },
      { name: "Diploma in Agriculture", semesters: 4 },
      { name: "B.Tech Agricultural Engineering", semesters: 8 }
    ]
  },
  {
    department: "Commerce & Business Studies",
    courses: [
      { name: "B.Com (Bachelor of Commerce)", semesters: 6 },
      { name: "BBA (Bachelor of Business Administration)", semesters: 6 },
      { name: "M.Com (Master of Commerce)", semesters: 4 },
      { name: "MBA (Master of Business Administration)", semesters: 4 }
    ]
  },
  {
    department: "Nursing",
    courses: [
      { name: "B.Sc Nursing", semesters: 8 },
      { name: "Post Basic B.Sc Nursing", semesters: 4 },
      { name: "M.Sc Nursing", semesters: 4 },
      { name: "GNM (General Nursing & Midwifery)", semesters: 6 } // 3 years
    ]
  },
  {
    department: "Education",
    courses: [
      { name: "B.Ed (Bachelor of Education)", semesters: 4 },
      { name: "M.Ed (Master of Education)", semesters: 4 },
      { name: "D.El.Ed (Diploma in Elementary Education)", semesters: 4 },
      { name: "B.A B.Ed (Integrated)", semesters: 8 }
    ]
  },
  {
    department: "Engineering & Technology",
    courses: [
      { name: "B.Tech Civil Engineering", semesters: 8 },
      { name: "B.Tech Mechanical Engineering", semesters: 8 },
      { name: "B.Tech Computer Science", semesters: 8 },
      { name: "B.Tech Electrical Engineering", semesters: 8 },
      { name: "M.Tech Computer Science", semesters: 4 },
      { name: "M.Tech Mechanical Engineering", semesters: 4 }
    ]
  },
  {
    department: "Science",
    courses: [
      { name: "B.Sc Physics", semesters: 6 },
      { name: "B.Sc Chemistry", semesters: 6 },
      { name: "B.Sc Mathematics", semesters: 6 },
      { name: "M.Sc Physics", semesters: 4 },
      { name: "M.Sc Chemistry", semesters: 4 },
      { name: "M.Sc Zoology", semesters: 4 }
    ]
  }
];

export { courses, departmentCourses };










//* Array of department and other
//   const departments = [
//     "Computer Science & IT",
//     "Paramedical & Allied Health Sciences",
//     "Pharmaceutical Sciences",
//     "Arts & Humanities",
//     "Legal Studies",
//     "Agriculture",
//     "Commerce & Business Studies",
//     "Nursing",
//     "Education",
//     "Engineering & Technology",
//     "Science",
//   ];

