import React, { useState, useEffect } from "react";

const Add = () => {
    const [messages, setMessages] = useState([
        "Hello! I'm your employee record assistant. How can I help you?",
        "Enter your command (Add Details, Search Details, Display, Exit):"
    ]);
    const [showCommandPrompt, setShowCommandPrompt] = useState(true);
    const [input, setInput] = useState("");
    const [employees, setEmployees] = useState(() => {
        return JSON.parse(sessionStorage.getItem("employees")) || [];
    });
    const [displayContent, setDisplayContent] = useState(null);

    useEffect(() => {
        sessionStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    const handleCommand = () => {
        const command = input;
        setDisplayContent(null); // Reset previous JSX display
        let newMessages = [
            "Hello! I'm your employee record assistant. How can I help you?",
            "Enter your command (Add Details, Search Details, Display, Exit):"
        ];

        if (command === "Add Details") {
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
            setMessages(newMessages);

            setTimeout(() => {
                setMessages([
                    "Hello! I'm your employee record assistant. How can I help you?",
                    "Enter your command (Add Details, Search Details, Display, Exit):"
                ]);
            }, 2000);
            return;
        } else if (command === "Search Details") {
            const searchId = prompt("Enter Employee ID to search:");
            const employee = employees.find(emp => emp.id === searchId);
            if (employee) {
                setDisplayContent(
                    <div className="p-2 bg-green-100 border border-green-400 rounded-md mt-2">
                        <p><strong>Employee Found:</strong></p>
                        <p><strong>ID:</strong> {employee.id}</p>
                        <p><strong>Name:</strong> {employee.name}</p>
                        <p><strong>Date of Joining:</strong> {employee.doj}</p>
                        <p><strong>Department:</strong> {employee.department}</p>
                        <p><strong>Designation:</strong> {employee.designation}</p>
                        <p><strong>Payroll:</strong> {employee.payroll}</p>
                        <p><strong>Attendance:</strong> {employee.attendance}</p>
                    </div>
                );
            } else {
                newMessages.push("Employee not found");
            }
        } else if (command === "Display") {
            if (employees.length) {
                setDisplayContent(
                    <table className="table-auto w-full border-collapse border border-gray-400 mt-4">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-4 py-2">ID</th>
                            <th className="border border-gray-400 px-4 py-2">Name</th>
                            <th className="border border-gray-400 px-4 py-2">DOJ</th>
                            <th className="border border-gray-400 px-4 py-2">Department</th>
                            <th className="border border-gray-400 px-4 py-2">Designation</th>
                            <th className="border border-gray-400 px-4 py-2">Payroll</th>
                            <th className="border border-gray-400 px-4 py-2">Attendance</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map((emp, index) => (
                            <tr key={index} className="text-center">
                                <td className="border border-gray-400 px-4 py-2">{emp.id}</td>
                                <td className="border border-gray-400 px-4 py-2">{emp.name}</td>
                                <td className="border border-gray-400 px-4 py-2">{emp.doj}</td>
                                <td className="border border-gray-400 px-4 py-2">{emp.department}</td>
                                <td className="border border-gray-400 px-4 py-2">{emp.designation}</td>
                                <td className="border border-gray-400 px-4 py-2">{emp.payroll}</td>
                                <td className="border border-gray-400 px-4 py-2">{emp.attendance}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );
            } else {
                newMessages.push("No employee records available.");
            }
        } else if (command === "Exit") {
            newMessages = ["Goodbye!"];
            setShowCommandPrompt(false);
        } else {
            newMessages.push("Invalid command. Please try again.");
        }
        setMessages(newMessages);
        setInput("");
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "wheat" }}>
            <div className="p-4 max-w-lg mx-auto bg-gray-100 shadow-md rounded-lg text-center">
                <div className="h-80 overflow-y-auto bg-white p-4 rounded-lg shadow-inner">
                    {messages.map((msg, index) => (
                        <p key={index} className="mb-2">{msg}</p>
                    ))}
                    {displayContent && <div className="mt-4">{displayContent}</div>}
                </div>
                {showCommandPrompt && (
                    <div>
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