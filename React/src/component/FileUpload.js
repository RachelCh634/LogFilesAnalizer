import React, { useState } from 'react';
import axios from 'axios';
import LogDisplay from './Show'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
function FileUpload() {
  const [file, setFile] = useState(null);
  const [flag, setFlag] = useState(false);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFlag(true);
    }
    catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <div style={{paddingRight:"3%",marginTop:"2.5%",marginLeft:"3%"}}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <h1 id="H1">Analizer Log Files </h1>
        <Grid item>
          <Input
            type="file"
            onChange={handleFileChange}
            sx={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button
              variant="outlined"
              component="span"
              color="inherit"
              sx={{ mr: 2 }}
              endIcon={<CloudUploadIcon />}
            >
              Upload File
            </Button>
          </label>

          <Button
            variant="outlined"
            onClick={handleUpload}
            color="inherit"
            endIcon={<ArrowForwardIosIcon />}
          >
            Analyze File
          </Button>
        </Grid>
      </Grid>
      {flag && <LogDisplay />}
    </div>
  );
}
export default FileUpload;
