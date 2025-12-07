import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeletePopup from "../components/DeletePopup";



const Home = () => {
  const [course, setCourse] = useState([]);
  const navigate=useNavigate()
  const [openPopup, setOpenPopup] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/course").then((res) => {
        setCourse(res.data);
      }).catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(course);

  const editCourseHandler=(course)=>{
    navigate('/feedback',{state:{course}})
  }
const deleteCourseHandler = (currentCourse) => {
  setOpenPopup(true);
  setCurrentCourse(currentCourse);
};
const confirmDeleteHandler = () => {
  axios
    .delete(`http://localhost:3000/course/delete/${currentCourse._id}`)
    .then((res) => {
      setCourse((course) => course.filter((c) => c._id !== currentCourse._id));
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    });
    setOpenPopup(false);


};
const cancelDeleteHandler = () => {
  setOpenPopup(false);
  setCurrentCourse(null);
};
  return <div>
<div className="container">
    
   <div style={{ marginTop:'130px', textAlign:'center'}}>
    <h2 className="mb-5">Course details</h2>
     <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="employees table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>SL No</strong></TableCell>
                  <TableCell><strong>Course ID</strong></TableCell>
                  <TableCell><strong>Course Name</strong></TableCell>
                  <TableCell><strong>Course Duration</strong></TableCell>
                  <TableCell><strong>Overall Feedback</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {course.length > 0 ? (
                  course.map((course, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{course.cId}</TableCell>
                      <TableCell>{course.cName}</TableCell>
                      <TableCell>{course.cDuration}</TableCell>
                      <TableCell>{course.feedback.rating}
                         {"⭐".repeat(course.feedback.rating) + "☆".repeat(5 - course.feedback.rating)}
                      </TableCell>
                      <TableCell>
                          <>
                          <Button
                          onClick={() => editCourseHandler(course)}
                          className="btn-edit m-2"
                          variant="text"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteCourseHandler(course)}
                          className="btn-dlt m-2"
                          variant="text"
                        >
                          Delete
                        </Button>
                          </>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <strong>Oops..! No courses found</strong>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
    </TableContainer>
   </div>
    {openPopup && (
        <DeletePopup
          course={currentCourse}
          ConfirmHandler={confirmDeleteHandler}
          cancelHandler={cancelDeleteHandler}
        />
      )}
</div>
  </div>;
};

export default Home;
