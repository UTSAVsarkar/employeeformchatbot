import React, { useState, useEffect } from "react";

const Add = () => {
  const [messages, setMessages] = useState([
    "Hello! I'm your employee record assistant. How can I help you?"
  ]);
  const [showCommandPrompt, setShowCommandPrompt] = useState(false);
  const [input, setInput] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) => [...prev, "Enter your command (add, search, display, exit):"]);
      setShowCommandPrompt(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = () => {
    const command = input.trim().toLowerCase();
    let newMessages = [...messages, `Command: ${command}`];

    if (command === "add") {
      const id = prompt("Enter Employee ID:");
      const name = prompt("Enter Employee Name:");
      const doj = prompt("Enter Date of Joining:");
      const department = prompt("Enter Department:");
      const designation = prompt("Enter Designation:");
      const payroll = prompt("Enter Payroll:");
      const attendance = prompt("Enter Attendance Record:");

      const newEmployee = { id, name, doj, department, designation, payroll, attendance };
      setEmployees([...employees, newEmployee]);
      newMessages.push("Employee added successfully!");
    } else if (command === "search") {
      const searchId = prompt("Enter Employee ID to search:");
      const employee = employees.find(emp => emp.id === searchId);
      newMessages.push(employee ? `Employee Found: ${JSON.stringify(employee)}` : "Employee not found");
    } else if (command === "display") {
      newMessages.push(employees.length ? JSON.stringify(employees, null, 2) : "No employee records available.");
    } else if (command === "exit") {
      newMessages.push("Goodbye!");
      setShowCommandPrompt(false);
    } else {
      newMessages.push("Invalid command. Please try again.");
    }
    setMessages(newMessages);
    setInput("");
  };

  return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: '10%' }}>
        <div className="p-4 max-w-lg mx-auto bg-gray-100 shadow-md rounded-lg text-center">
          <div className="h-80 overflow-y-auto bg-white p-4 rounded-lg shadow-inner">
            {messages.map((msg, index) => (
                <p key={index} className="mb-2">{msg}</p>
            ))}
          </div>
          {showCommandPrompt && (
              <div className="mt-4 flex">
                <input
                    type="text"
                    className="border p-2 flex-grow rounded-l-lg"
                    placeholder="Enter command"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleCommand} className="bg-blue-500 text-white p-2 rounded-r-lg">Submit</button>
              </div>
          )}
        </div>
      </div>
  );
};

export default Add;
