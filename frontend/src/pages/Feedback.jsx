import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Paper } from "@mui/material";

const Feedback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const listedCourse = location.state?.course;

  const [formData, setFormData] = useState(
    listedCourse
      ? {
          _id: listedCourse._id,
          cId: listedCourse.cId,
          cName: listedCourse.cName,
          cDuration: listedCourse.cDuration,
          feedback: {
            comments: listedCourse.feedback.comments,
            rating: listedCourse.feedback.rating,
          },
        }
      : {
          cId: "",
          cName: "",
          cDuration: "",
          feedback: {
            comments: "",
            rating: "",
          },
        }
  );
  const inputHandler = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value,});
  };


  const feedbackInputHa = (e) => {
    setFormData({
      ...formData,
      feedback: {
        ...formData.feedback,
        [e.target.name]: e.target.value,
      },
    });
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        let res;
      if (listedCourse) {
        res= await axios.put(
          `http://localhost:3000/course/edit/${formData._id}`,
          formData
        );
      } else {
       res= await axios.post("http://localhost:3000/course/add", formData);
      }

      alert(res.data.message);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  return (
    <Paper
      elevation={4}
      style={{ maxWidth: 500, margin: "40px auto", padding: 20, marginTop:'90px' }}
    >
      <h2 style={{ textAlign: "center" }}>
        {listedCourse ? "Update Course Feedback" : "Add Course Feedback"}
      </h2>

      <form onSubmit={formSubmitHandler}>
        <TextField
          label="Course ID"
          name="cId"
          value={formData.cId}
          onChange={inputHandler}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Course Name"
          name="cName"
          value={formData.cName}
          onChange={inputHandler}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Course Duration"
          name="cDuration"
          value={formData.cDuration}
          onChange={inputHandler}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Feedback Comments"
          name="comments"
          value={formData.feedback.comments}
          onChange={feedbackInputHa}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />

        <TextField
          label="Feedback Rating (1 - 5)"
          name="rating"
          type="number"
          value={formData.feedback.rating}
          onChange={feedbackInputHa}
          fullWidth
          margin="normal"
        />

        <div style={{ display: "flex" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              width: "50%",
              margin: "20px auto 0 auto",
              background: "#008b8b",
              padding: "10px",
            }}
          >
            {listedCourse ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Feedback;
