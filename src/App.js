import React, { useState } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '' });
  const [editingEmployeeIndex, setEditingEmployeeIndex] = useState(null);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Add a new employee
  const addEmployee = () => {
    if (newEmployee.name && newEmployee.position) {
      setEmployees([...employees, newEmployee]);
      setNewEmployee({ name: '', position: '' });
    }
  };

  // Edit an employee
  const editEmployee = (index) => {
    setNewEmployee(employees[index]);
    setEditingEmployeeIndex(index);
  };

  // Save the edited employee
  const saveEmployee = () => {
    let updatedEmployees = [...employees];
    updatedEmployees[editingEmployeeIndex] = newEmployee;
    setEmployees(updatedEmployees);
    setNewEmployee({ name: '', position: '' });
    setEditingEmployeeIndex(null);
  };

  // Delete an employee
  const deleteEmployee = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1>Employee Management System</h1>

      <div className="form-container">
        <input
          type="text"
          name="name"
          value={newEmployee.name}
          onChange={handleInputChange}
          placeholder="Employee Name"
        />
        <input
          type="text"
          name="position"
          value={newEmployee.position}
          onChange={handleInputChange}
          placeholder="Position"
        />
        <button onClick={editingEmployeeIndex === null ? addEmployee : saveEmployee}>
          {editingEmployeeIndex === null ? 'Add Employee' : 'Save Employee'}
        </button>
      </div>

      <div className="employee-list">
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <div className="employee-card" key={index}>
              <div>
                <strong>Name:</strong> {employee.name}
              </div>
              <div>
                <strong>Position:</strong> {employee.position}
              </div>
              <div className="actions">
                <button onClick={() => editEmployee(index)}>Edit</button>
                <button onClick={() => deleteEmployee(index)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
