import React, { useState } from "react";
import DownloadCsv from "./DownloadCsv";
import axios from "axios";

function AddStudent() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    contact: "",
    age: "",
    gender: "male",
    address: "",
    academic_level: "high_school",
    current_school: "",
    field_of_study: "",
    study_destination: "",
    enrollment_year: "",
    language_proficiency: "",
    questions_concerns: "",
  });
  const [eotp, setEotp] = useState(false);
  const [eotpValue, setEotpValue] = useState("");
  const [eotpVerified, setEotpVerified] = useState("");

  const [otp, setOtp] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpVerified, setOtpVerified] = useState("");

  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleEotpChange = (e) => {
    setEotpValue(e.target.value);
    console.log("e.target.value", e.target.value);
  };
  const handleOtpChange = (e) => {
    setOtpValue(e.target.value);
    console.log("e.target.value", e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const verifyEOTP = () => {
    axios
      .post(
        "https://paytm-sv70.onrender.com/api/v1/student/verify-otp",
        { email: formData.email, otp: eotpValue },
        {
          headers: {
            "Content-Type": "application/json", // Specify content type as JSON
          },
        }
      )
      .then((response) => {
        console.log("Success:", response.data); // Log the response data
        setEotpVerified(response.data.success);
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors
      });
  };
  const verifyOTP = () => {
    axios
      .post(
        "https://paytm-sv70.onrender.com/api/v1/student/verify/mobile",
        { mobileNumber: formData.contact, otp: otpValue },
        {
          headers: {
            "Content-Type": "application/json", // Specify content type as JSON
          },
        }
      )
      .then((response) => {
        console.log("Success:", response.data); // Log the response data
        setOtpVerified(response.data.success);
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors
      });
  };
  const sendEOTP = () => {
    if (!!formData.email) {
      axios
        .post(
          "https://paytm-sv70.onrender.com/api/v1/student/send-otp",
          { email: formData.email },
          {
            headers: {
              "Content-Type": "application/json", // Specify content type as JSON
            },
          }
        )
        .then((response) => {
          console.log("Success:", response.data); // Log the response data
          if (response.data.message === "OTP sent successfully") {
            setEotp(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error); // Log any errors
        });
    }
  };
  const sendOtp = () => {
    axios
      .post(
        "https://paytm-sv70.onrender.com/api/v1/student/sendotp",
        { mobileNumber: formData.contact },
        {
          headers: {
            "Content-Type": "application/json", // Specify content type as JSON
          },
        }
      )
      .then((response) => {
        console.log("Success:", response.data); // Log the response data
        if (response.data.message === "OTP sent successfully") {
          setOtp(response.data.success);
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors
      });
  };
  const onFormSubmit = () => {
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.contact ||
      !formData.age ||
      !formData.gender ||
      !formData.address ||
      !formData.academic_level ||
      !formData.current_school ||
      !formData.field_of_study ||
      !formData.study_destination ||
      !formData.enrollment_year ||
      !formData.language_proficiency ||
      !formData.questions_concerns
    ) {
      setError("please fill the missing fields");
    } else {
      if (!eotpVerified || !otpVerified) {
        setError("please verify phone/email");
      } else {
        axios
          .post(
            "https://paytm-sv70.onrender.com/api/v1//student/create",
            {
              fullName: formData.full_name,
              email: formData.email,
              contact: formData.contact,
              age: formData.age,
              gender: formData.gender,
              address: formData.address,
              currentAcademicLevel: formData.academic_level,
              currentSchool: formData.current_school,
              fieldOfStudy: formData.field_of_study,
              desireStudyDestination: formData.study_destination,
              expectedYear: formData.enrollment_year,
              languageProficiency: formData.language_proficiency,
              anySpecificQuestion: formData.questions_concerns,
            },
            {
              headers: {
                "Content-Type": "application/json", // Specify content type as JSON
              },
            }
          )
          .then((response) => {
            setFormData({
              full_name: "",
              email: "",
              contact: "",
              age: "",
              gender: "male",
              address: "",
              academic_level: "high_school",
              current_school: "",
              field_of_study: "",
              study_destination: "",
              enrollment_year: "",
              language_proficiency: "",
              questions_concerns: "",
            });
            setEotp(false);
            setEotpValue("");
            setEotpVerified("");
            setOtp(false);
            setOtpValue("");
            setOtpVerified("");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error:", error); // Log any errors
          });
      }
    }
  };
  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="full_name">Full Name:</label>
        <br />
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="email">Email Address:</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />{" "}
        {eotpVerified ? (
          "verified"
        ) : eotp ? (
          <>
            <input
              type="eotp"
              id="eotp"
              name="eotp"
              value={eotpValue}
              onChange={handleEotpChange}
            />
            <button onClick={verifyEOTP}>verify</button>
          </>
        ) : (
          <button onClick={sendEOTP}>send otp</button>
        )}
        <br />
        <br />
        <label htmlFor="contact">Contact:</label>
        <br />
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />
        {otpVerified ? (
          "verified"
        ) : otp ? (
          <>
            <input
              type="eotp"
              id="eotp"
              name="eotp"
              value={otpValue}
              onChange={handleOtpChange}
            />
            <button onClick={verifyOTP}>verify</button>
          </>
        ) : (
          <button onClick={sendOtp}>send otp</button>
        )}
        <br />
        <br />
        <label htmlFor="age">Age:</label>
        <br />
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="gender">Gender:</label>
        <br />
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />
        <br />
        <label htmlFor="address">Address:</label>
        <br />
        <textarea
          id="address"
          name="address"
          rows="4"
          value={formData.address}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <label htmlFor="academic_level">Current Academic Level:</label>
        <br />
        <select
          id="academic_level"
          name="academic_level"
          value={formData.academic_level}
          onChange={handleChange}
        >
          <option value="high_school">High School Student</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduate">Graduate</option>
        </select>
        <br />
        <br />
        <label htmlFor="current_school">
          Name of Current School/University:
        </label>
        <br />
        <input
          type="text"
          id="current_school"
          name="current_school"
          value={formData.current_school}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="field_of_study">Intended Field of Study:</label>
        <br />
        <input
          type="text"
          id="field_of_study"
          name="field_of_study"
          value={formData.field_of_study}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="study_destination">Desired Study Destination:</label>
        <br />
        <input
          type="text"
          id="study_destination"
          name="study_destination"
          value={formData.study_destination}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="enrollment_year">Expected Year of Enrollment:</label>
        <br />
        <input
          type="text"
          id="enrollment_year"
          name="enrollment_year"
          value={formData.enrollment_year}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="language_proficiency">Language Proficiency:</label>
        <br />
        <input
          type="text"
          id="language_proficiency"
          name="language_proficiency"
          value={formData.language_proficiency}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="questions_concerns">
          Any Specific Questions or Concerns:
        </label>
        <br />
        <textarea
          id="questions_concerns"
          name="questions_concerns"
          rows="4"
          value={formData.questions_concerns}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        {error ? error : ""}
        <button
          type="submit"
          value="Submit"
          className="button"
          onClick={onFormSubmit}
        >
          Submit
        </button>
      </form>
      <DownloadCsv />
    </div>
  );
}

export default AddStudent;
