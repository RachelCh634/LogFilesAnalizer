import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const LogDisplay = () => {
    const [logObjects, setLogObjects] = useState([]);
    const [selectedType, setSelectedType] = useState('all');
    const [selectedName, setSelectedName] = useState('all');
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedMessage, setSelectedMessage] = useState("");
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [resetDateFilter, setResetDateFilter] = useState(false);
    const [resetTimeFilter, setResetTimeFilter] = useState(false);

    useEffect(() => {
        const fetchLogData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/', {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setLogObjects(response.data);
            } catch (error) {
                alert('Error fetching log data:', error);
            }
        };
        fetchLogData();
    }, []);
    useEffect(() => {
        const applyFilters = () => {
            let filtered = logObjects;
            if (selectedType !== 'all') {
                filtered = filtered.filter(log => log.logType === selectedType);
            }
            if (selectedName !== 'all') {
                filtered = filtered.filter(log => log.loggerName === selectedName);
            }
            if (selectedDate !== "") {
                filtered = filtered.filter(log => log.timestamp.includes(selectedDate));
            }
            if (selectedMessage !== "") {
                filtered = filtered.filter(log => log.message.includes(selectedMessage));
            }
            if (selectedTime !== "") {
                filtered = filtered.filter(log => log.timestamp.includes(selectedTime));
            }

            setFilteredLogs(filtered);
        };
        applyFilters();
    }, [selectedName, selectedType, selectedDate, selectedTime, selectedMessage, logObjects]);
    const handleNameChange = (e) => {
        setSelectedName(e.target.value);
    };
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleMessageChange = (e) => {
        setSelectedMessage(e.target.value);
    };
    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };
    const handleResetDateFilter = () => {
        setSelectedDate("");
        setResetDateFilter(!resetDateFilter); // toggle the reset flag
    };
    const handleResetTimeFilter = () => {
        setSelectedTime("");
        setResetTimeFilter(!resetTimeFilter); // toggle the reset flag
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "2%", backgroundColor: "#a37a0085", paddingTop: "2%" }}>
                <Box style={{ width: '15%', marginBottom: '2%'}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedType}
                            label="Age"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            {Array.from(new Set(logObjects.map(log => log.logType))).map((type, index) => (
                                <MenuItem key={index} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box style={{ width: '15%', marginBottom: '2%', }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Name</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedName}
                            label="Name"
                            onChange={handleNameChange}
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            {Array.from(new Set(logObjects.map(log => log.loggerName))).map((type, index) => (
                                <MenuItem key={index} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    style={{ width: '15%', marginBottom: '2%'}}
                    type="Date"
                    id="outlined-required"
                    onChange={handleDateChange}
                /><br />
                <Button variant="outlined"  style={{ color: 'black', borderColor: 'black', width: '4%', height: '56px', fontSize: '6px' }} onClick={handleResetTimeFilter}>
                    <IconButton onClick={handleResetDateFilter}>
                        <RefreshIcon />
                    </IconButton>
                </Button>
                <TextField
                    style={{ width: '15%', marginBottom: '2%'  }}
                    type="time"
                    id="outlined-required"
                    onChange={handleTimeChange}
                /><br />
                <Button variant="outlined" style={{ color: 'black', borderColor: 'black', width: '4%', height: '56px', fontSize: '6px' }} onClick={handleResetTimeFilter}>
                    <IconButton onClick={handleResetDateFilter}>
                        <RefreshIcon />
                    </IconButton>
                </Button>
                <TextField
                    style={{ width: '15%', marginBottom: '2%' }}
                    id="outlined-required"
                    label="search in message"
                    onChange={handleMessageChange}
                />
            </div>
            <div style={{}}>
            <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#A77D00' }}>Log Objects:</h2>
                {logObjects
                    .filter(log => selectedType === 'all' || log.logType === selectedType).filter(log => selectedName === 'all' || log.loggerName === selectedName)
                    .filter(log => selectedDate === "" || log.timestamp.includes(selectedDate)).filter(log => selectedMessage === "" || log.message.includes(selectedMessage))
                    .filter(log => selectedTime === "" || log.timestamp.includes(selectedTime))
                    .map((log, index) => (
                        <Accordion key={index} style={{ marginLeft: "30%", marginRight: "30%", marginBottom: '13px', borderRadius: '5px' }}>
                            <AccordionSummary
                              expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography>{log.message}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p>Timestamp: {log.timestamp}</p>
                                    <p>Logger Name: {log.loggerName}</p>
                                    <p>Log Type: {log.logType}</p>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
            </div>
        </div>
    );
};
export default LogDisplay;