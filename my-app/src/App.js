import React, { useState, useEffect } from "react";
import {
    Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper
} from "@mui/material";

const Add = () => {
    const [employees, setEmployees] = useState(() => JSON.parse(sessionStorage.getItem("employees")) || []);
    const [selectedCommand, setSelectedCommand] = useState("");
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [openDisplayModal, setOpenDisplayModal] = useState(false);
    const [openExitModal, setOpenExitModal] = useState(false);
    const [formData, setFormData] = useState({ id: "", name: "", doj: "", department: "", designation: "", payroll: "", attendance: "" });
    const [searchResult, setSearchResult] = useState(null);
    const [showCommandPrompt, setShowCommandPrompt] = useState(true);
    const [searchField, setSearchField] = useState(true);

    useEffect(() => {
        sessionStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitCommand = () => {
        if (selectedCommand === "Add Details") setOpenAddModal(true);
        else if (selectedCommand === "Search Details") setOpenSearchModal(true);
        else if (selectedCommand === "Display") setOpenDisplayModal(true);
        else if (selectedCommand === "Exit") setOpenExitModal(true);
    };

    const handleAddSubmit = () => {
        setEmployees([...employees, formData]);
        setOpenAddModal(false);
    };

    const handleSearchSubmit = () => {
        setSearchField(false)
        const employee = employees.find(emp => emp.id === formData.id);
        setSearchResult(employee || "Employee not found");
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#00bcd4" }}>
            <Stack>
                {showCommandPrompt ? (
                    <>
                        <p>Hello! I'm your employee record assistant. How can I help you?</p>
                        <FormControl>
                            <FormLabel>Select your command</FormLabel>
                            <RadioGroup value={selectedCommand} onChange={(e) => setSelectedCommand(e.target.value)}>
                                <FormControlLabel value="Add Details" control={<Radio />} label="Add Details" />
                                <FormControlLabel value="Search Details" control={<Radio />} label="Search Details" />
                                <FormControlLabel value="Display" control={<Radio />} label="Display" />
                                <FormControlLabel value="Exit" control={<Radio />} label="Exit" />
                            </RadioGroup>
                            <Button variant="contained" onClick={handleSubmitCommand}>Submit</Button>
                        </FormControl>
                    </>
                ) : (
                    <h2>Thank you for using our service!</h2>
                )}

                {/* Add Details Modal */}
                <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
                    <DialogTitle>Add Employee Details</DialogTitle>
                    <DialogContent>
                        <TextField label="Employee ID" name="id" fullWidth margin="dense" onChange={handleInputChange} />
                        <TextField label="Name" name="name" fullWidth margin="dense" onChange={handleInputChange} />
                        <TextField label="Date of Joining" name="doj" fullWidth margin="dense" onChange={handleInputChange} />
                        <TextField label="Department" name="department" fullWidth margin="dense" onChange={handleInputChange} />
                        <TextField label="Designation" name="designation" fullWidth margin="dense" onChange={handleInputChange} />
                        <TextField label="Payroll" name="payroll" fullWidth margin="dense" onChange={handleInputChange} />
                        <TextField label="Attendance" name="attendance" fullWidth margin="dense" onChange={handleInputChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddSubmit}>Submit</Button>
                        <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>

                {/* Search Modal */}
                <Dialog open={openSearchModal} onClose={() => setOpenSearchModal(false)}>
                    <DialogTitle>Search Employee</DialogTitle>
                    <DialogContent>
                        {
                            searchField && <TextField label="Employee ID" name="id" fullWidth margin="dense" onChange={handleInputChange} />
                        }

                        {searchResult && (
                            <div>
                                {typeof searchResult === "string" ? <p>{searchResult}</p> : (
                                    <div>
                                        <p><strong>Name:</strong> {searchResult.name}</p>
                                        <p><strong>Date of Joining:</strong> {searchResult.doj}</p>
                                        <p><strong>Department:</strong> {searchResult.department}</p>
                                        <p><strong>Designation:</strong> {searchResult.designation}</p>
                                        <p><strong>Payroll:</strong> {searchResult.payroll}</p>
                                        <p><strong>Attendance:</strong> {searchResult.attendance}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {!searchResult && <Button onClick={handleSearchSubmit}>Submit</Button>}
                        <Button onClick={() => {
                            setOpenSearchModal(false)
                            setSearchResult(undefined)
                            setSearchField(true)
                        }}>Close</Button>
                    </DialogActions>
                </Dialog>

                {/* Display Modal */}
                <Dialog open={openDisplayModal} onClose={() => setOpenDisplayModal(false)}>
                    <DialogTitle>Employee Records</DialogTitle>
                    <DialogContent>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>DOJ</TableCell>
                                        <TableCell>Department</TableCell>
                                        <TableCell>Designation</TableCell>
                                        <TableCell>Payroll</TableCell>
                                        <TableCell>Attendance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employees.map((emp, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{emp.id}</TableCell>
                                            <TableCell>{emp.name}</TableCell>
                                            <TableCell>{emp.doj}</TableCell>
                                            <TableCell>{emp.department}</TableCell>
                                            <TableCell>{emp.designation}</TableCell>
                                            <TableCell>{emp.payroll}</TableCell>
                                            <TableCell>{emp.attendance}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDisplayModal(false)}>Close</Button>
                    </DialogActions>
                </Dialog>

                {/* Exit Modal */}
                <Dialog open={openExitModal} onClose={() => { setOpenExitModal(false); setShowCommandPrompt(false); }}>
                    <DialogTitle>Goodbye!</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => { setOpenExitModal(false); setShowCommandPrompt(false); }}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </div>
    );
};

export default Add;
