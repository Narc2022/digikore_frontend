import React, { useState } from "react";
import DownloadCsv from "./DownloadCsv";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
        />
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

        <input type="submit" value="Submit" />
      </form>
      <DownloadCsv />
    </div>
  );
}

export default AddStudent;
