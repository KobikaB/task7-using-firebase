import React from "react";

const StudentForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  submitText,
}) => {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-amber-600">
        Student's Form
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col gap-3 mt-4"
      >
        <input
          name="first_name"
          value={formData.first_name}
          onChange={onChange}
          className="p-2 border-2 rounded block w-full"
          placeholder="First Name"
          required
        />
        <input
          name="last_name"
          value={formData.last_name}
          onChange={onChange}
          className="p-2 border-2 rounded block w-full"
          placeholder="Last Name"
          required
        />
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={onChange}
          className="p-2 border-2 rounded block w-full"
          placeholder="Age"
          required
          min={1}
        />
        <input
          name="registration_no"
          value={formData.registration_no}
          onChange={onChange}
          className="p-2 border-2 rounded block w-full"
          placeholder="Registration No"
          required
        />
        <input
          name="department"
          value={formData.department}
          onChange={onChange}
          className="p-2 border-2 rounded block w-full"
          placeholder="Department"
          required
        />
        <input
          name="academic_year"
          value={formData.academic_year}
          onChange={onChange}
          className="p-2 border-2 rounded block w-full"
          placeholder="Academic Year"
          required
        />

        
        <select
          name="status"
          value={formData.status}
          onChange={onChange}
          className="p-2 border-2 rounded block w-full"
          required
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="col-span-1 md:col-span-2 mt-6 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-xl text-md"
          >
            {submitText}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-xl text-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
