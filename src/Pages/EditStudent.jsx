import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../firebase/Config";
import StudentForm from "./StudentForm";
import { toast } from "react-toastify";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentRef = doc(db, "students", id);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
          setFormData({ id, ...studentSnap.data() });
        } else {
          alert("Student not found.");
          navigate("/");
        }
      } catch (err) {
        console.error("Error loading student:", err);
      }
    };

    fetchStudent();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    const studentRef = doc(db, "students", id);
    await updateDoc(studentRef, formData);
    toast.success("Student updated");
    navigate("/");
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">
          Loading student data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 p-10">
      <StudentForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSave}
        onCancel={() => navigate("/")}
        submitText="Save"
      />
    </div>
  );
};

export default EditStudent;
