import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/Config";
import Table from "./Table";
import { useNavigate } from "react-router";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    navigate(`/edit/${student.id}`);
  };

  return (
    <div className="w-screen h-screen bg-amber-100 p-10">
      <h2 className="bg-amber-300 rounded-xl text-center text-3xl p-5 mb-4">
        Admin Panel
      </h2>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/create_student")}
          className="flex items-center gap-2 bg-green-500 hover:bg-gray-400 text-white px-5 py-3 rounded-xl text-lg font-semibold "
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Student
        </button>
      </div>

      {students.length > 0 && (
        <div className="max-h-[400px] overflow-y-auto bg-white shadow-md p-4 rounded-lg">
          <Table students={students} onEdit={handleEdit} />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
