import React, { useState } from "react";
import { Link } from "react-router";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "../firebase/Config";
import { toast, ToastContainer } from "react-toastify";

const STATUS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const Table = ({ students, onStatusChange }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [loadingStatusId, setLoadingStatusId] = useState(null);

  const openConfirmModal = (student) => {
    setStudentToDelete(student);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!studentToDelete) return;
    try {
      await deleteDoc(doc(db, "students", studentToDelete.id));
      toast.success("Student deleted successfully!");
      setShowConfirm(false);
      setStudentToDelete(null);
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    }
  };

  const handleStatusChange = async (studentId, newStatus) => {
    setLoadingStatusId(studentId);
    try {
      const studentRef = doc(db, "students", studentId);
      await updateDoc(studentRef, { status: newStatus });
      toast.success("Status updated successfully!");
      if (onStatusChange) {
        onStatusChange(studentId, newStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
    setLoadingStatusId(null);
  };

  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-full border border-black">
        <thead className="bg-gray-200">
          <tr className="text-left border border-black">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Registration No</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Academic Year</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className="text-left">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{student.first_name}</td>
              <td className="px-4 py-2">{student.last_name}</td>
              <td className="px-4 py-2">{student.age}</td>
              <td className="px-4 py-2">{student.registration_no}</td>
              <td className="px-4 py-2">{student.department}</td>
              <td className="px-4 py-2">{student.academic_year}</td>

              <td className="px-4 py-2">
                <select
                  value={student.status}
                  onChange={(e) =>
                    handleStatusChange(student.id, e.target.value)
                  }
                  disabled={loadingStatusId === student.id}
                  className={`px-3 py-1 rounded border ${
                    student.status === "active"
                      ? "bg-green-200"
                      : "bg-yellow-200"
                  }`}
                >
                  {STATUS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
                  onClick={() => openConfirmModal(student)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

 
      {showConfirm && studentToDelete && (
        <div className="fixed inset-0 bg-gray-200  flex items-center justify-center">
          <div className="bg-amber-200 rounded-lg max-w-md w-full p-6 mx-4">
            <h2 className="text-2xl font-bold mb-4 text-center text-red-700">
              Confirm Deletion
            </h2>
            <p className="mb-6 text-gray-800 text-center">
              Are you sure you want to delete{" "}
              <span className="font-bold">
                {studentToDelete.first_name} {studentToDelete.last_name}
              </span>
              <br />
              (Reg No:{" "}
              <span className="font-semibold text-sm">
                {studentToDelete.registration_no}
              </span>
              )?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-2 rounded-md bg-white text-gray-700  hover:bg-gray-300 "
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-md bg-red-600 text-white  hover:bg-red-400"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Table;
