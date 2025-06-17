import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/Config";
import Table from "./Table";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [visibleStudents, setVisibleStudents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleEdit = (student) => {
    navigate(`/edit/${student.id}`);
  };

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(data);
      setVisibleStudents([]);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleNextStudent = () => {
    if (currentIndex < students.length) {
      const nextStudent = students[currentIndex];
      setVisibleStudents((prev) => [...prev, nextStudent]);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-screen h-screen bg-amber-100 p-10">
      <h2 className="bg-amber-300 rounded-xl text-center text-3xl p-5 mb-6">
        Admin Panel
      </h2>

      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={handleNextStudent}
          disabled={currentIndex >= students.length}
          className={
            "px-6 py-3 rounded-xl text-xl font-bold bg-amber-400 hover:bg-gray-300"
          }
        >
          Students
        </button>
        <button
          onClick={() => navigate("/create_student")}
          className="bg-green-400 hover:bg-gray-400 px-6 py-3 rounded-xl text-xl font-bold"
        >
          Create
        </button>
      </div>

      {visibleStudents.length > 0 && (
        <div className="max-h-[400px] overflow-y-auto bg-white  shadow-md p-4">
          <Table students={visibleStudents} onEdit={handleEdit} />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminPanel;
