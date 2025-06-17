import React from "react";
import { Link } from "react-router";
import { deleteDoc, doc } from "firebase/firestore";
import db from "../firebase/Config";
import { toast, ToastContainer } from "react-toastify";

const Table = ({ students }) => {
  const handleDelete = async (studentId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "students", studentId));
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    }
  };
  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-full border border-black ">
        <thead className="bg-gray-200">
          <tr className=" text-left  border border-black ">
            <th className="px-4 py-2 ">ID</th>
            <th className="px-4 py-2 ">First Name</th>
            <th className="px-4 py-2 ">Last Name</th>
            <th className="px-4 py-2 ">Age</th>
            <th className="px-4 py-2 ">Registration No</th>
            <th className="px-4 py-2 ">Department</th>
            <th className="px-4 py-2 ">Academic Year</th>
            <th className="px-4 py-2 ">Status</th>
            <th className="px-4 py-2 ">Edit</th>
            <th className="px-4 py-2 ">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className=" text-left">
              <td className="px-4 py-2 ">{index + 1}</td>
              <td className="px-4 py-2 ">{student.first_name}</td>
              <td className="px-4 py-2 ">{student.last_name}</td>
              <td className="px-4 py-2 ">{student.age}</td>
              <td className="px-4 py-2 ">{student.registration_no}</td>
              <td className="px-4 py-2 ">{student.department}</td>
              <td className="px-4 py-2 ">{student.academic_year}</td>
              <td>
                <button
                  onClick={() => handleToggleStatus(student)}
                  className={`px-3 py-1 rounded-full ${
                    student.status === "active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {student.status}
                </button>
              </td>

              <td className="px-4 py-2">
                <Link
                  to={`/edit/${student.id}`}
                  className="bg-blue-500 hover:bg-blue-300 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>
              </td>

              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Table;
