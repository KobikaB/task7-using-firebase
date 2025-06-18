import React, { useState } from "react";
import { useNavigate } from "react-router";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase/Config";
import StudentForm from "./StudentForm";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    registration_no: "",
    department: "",
    academic_year: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async () => {
    await addDoc(collection(db, "students"), formData);
    toast.success("Student created successfully!");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-10">
      <StudentForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleCreate}
        onCancel={() => navigate("/")}
        submitText="Submit"
      />

      <ToastContainer />
    </div>
  );
};

export default CreateStudent;
