import React, { useState, useEffect } from "react";
import {
    Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Typography, Card, CardContent
} from "@mui/material";
import { motion } from "framer-motion";

const App = () => {
    const [employees, setEmployees] = useState(() => JSON.parse(sessionStorage.getItem("employees")) || []);
    const [selectedCommand, setSelectedCommand] = useState("");
    const [openModal, setOpenModal] = useState(null);
    const [ formData, setFormData] = useState({ id: "", name: "", doj: "", department: "", designation: "", payroll: "", attendance: "" });
    const [searchResult, setSearchResult] = useState(null);
    const [searchField, setSearchField] = useState(true);
    const [showCommandPrompt, setShowCommandPrompt] = useState(true);

    useEffect(() => {
        sessionStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitCommand = () => {
        setOpenModal(selectedCommand);
    };

    const handleAddSubmit = () => {
        setEmployees([...employees, formData]);
        setOpenModal(null);
    };

    const handleSearchSubmit = () => {
        setSearchField(false);
        const employee = employees.find(emp => emp.id === formData.id);
        setSearchResult(employee || "Employee not found");
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100vw",
            background: "linear-gradient(135deg, #00bcd4, #0078D7)",
            position: "fixed", // Ensures it covers full screen
            top: 0,
            left: 0,
            overflow: "hidden" // Prevents any extra scrolling
        }}>
            <motion.div
                initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5, ease: "easeOut"}}
            >
                <Card sx={{width: 400, padding: 3, borderRadius: 4, boxShadow: 6, backgroundColor: "#ffffff"}}>
                    <CardContent>
                        {showCommandPrompt ? (
                            <>
                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    textAlign="center"
                                    gutterBottom
                                    sx={{
                                        color: "#1976d2", // Primary blue color
                                        textTransform: "uppercase",
                                        letterSpacing: 2,
                                        padding: "10px",
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: "8px",
                                        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)"
                                    }}
                                >
                                    HRBot
                                </Typography>

                                <Typography variant="h6" fontWeight="bold" color="primary" textAlign="center"
                                            gutterBottom>
                                    How can I help you?
                                </Typography>
                                <FormControl component="fieldset" sx={{width: "100%"}}>
                                    <FormLabel>Select your command</FormLabel>
                                    <RadioGroup value={selectedCommand}
                                                onChange={(e) => setSelectedCommand(e.target.value)}>
                                        <FormControlLabel value="Add Details" control={<Radio/>} label="Add Details"/>
                                        <FormControlLabel value="Search Details" control={<Radio/>}
                                                          label="Search Details"/>
                                        <FormControlLabel value="Display" control={<Radio/>} label="Display"/>
                                        <FormControlLabel value="Exit" control={<Radio/>} label="Exit"/>
                                    </RadioGroup>
                                    <Stack direction="row" justifyContent="center" marginTop={2}>
                                        <Button variant="contained" size="large" onClick={handleSubmitCommand}
                                                sx={{borderRadius: 10}}>Submit</Button>
                                    </Stack>
                                </FormControl>
                            </>
                        ) : (
                            <Typography variant="h5" textAlign="center">Thank you for using our service!</Typography>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
                {/* Add Details Modal */}
                <Dialog open={openModal === "Add Details"} onClose={() => setOpenModal(null)}>
                    <DialogTitle>Add Employee Details</DialogTitle>
                    <DialogContent>
                        {Object.keys(formData).map((key) => (
                            <TextField key={key} label={key.toUpperCase()} name={key} fullWidth margin="dense"
                                       onChange={handleInputChange}/>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddSubmit}>Submit</Button>
                        <Button onClick={() => setOpenModal(null)}>Cancel</Button>
                    </DialogActions>
                </Dialog>

                {/* Search Modal */}
                <Dialog open={openModal === "Search Details"} onClose={() => setOpenModal(null)}>
                    <DialogTitle>Search Employee</DialogTitle>
                    <DialogContent>
                        {searchField && <TextField label="Employee ID" name="id" fullWidth margin="dense"
                                                   onChange={handleInputChange}/>}
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
                            setOpenModal(null);
                            setSearchResult(undefined);
                            setSearchField(true);
                        }}>Close</Button>
                    </DialogActions>
                </Dialog>

                {/* Display Modal */}
                <Dialog open={openModal === "Display"} onClose={() => setOpenModal(null)} fullWidth maxWidth="md">
                    <DialogTitle>Employee Records</DialogTitle>
                    <DialogContent>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {Object.keys(formData).map((key) => (
                                            <TableCell key={key}>{key.toUpperCase()}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employees.map((emp, index) => (
                                        <TableRow key={index}>
                                            {Object.values(emp).map((value, idx) => (
                                                <TableCell key={idx}>{value}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenModal(null)}>Close</Button>
                    </DialogActions>
                </Dialog>

                {/* Exit Modal */}
                <Dialog open={openModal === "Exit"} onClose={() => {
                    setOpenModal(null);
                    setShowCommandPrompt(false);
                }}>
                    <DialogTitle>Goodbye!</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => {
                            setOpenModal(null);
                            setShowCommandPrompt(false);
                        }}>Close</Button>
                    </DialogActions>
                </Dialog>
        </div>
);
};

export default App;
