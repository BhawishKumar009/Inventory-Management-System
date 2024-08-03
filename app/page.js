'use client'

import Image from "next/image";
import { useState,useEffect } from "react";
import {getDoc,collection,addDoc} from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import {database} from '@/firebase';
import { Box, Container, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Slider } from '@mui/material';
export default function Home() {
  const [itemName,setItemName]=useState('');
  const [quantity,setQuantity]=useState('');
  const [category,setCategory]=useState('');
  const [documentId, setDocumentId] = useState('');
  const handleSubmission = async (e) => {
    e.preventDefault();
  
    try {
      const newDocRef = await addDoc(collection(database, "inventory"), {
        itemName:itemName,
        quantity:quantity,
        category:category
      });
      console.log("Document written with ID: ", newDocRef.id);
  
      setCategory('')
      setItemName('')
      setQuantity('')
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return(

    
<Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  }}
>
  <Container maxWidth="sm">
    <Typography variant="h4">Inventory Management</Typography>
    <Box mt={4}>
      <form onSubmit={handleSubmission}>
        <TextField
          label="Item Name"
          variant="outlined"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          fullWidth
          margin="normal"
        />
        <FormControl component="fieldset" fullWidth margin="normal">
          <Typography variant="subtitle1" gutterBottom>
            Category:
          </Typography>
          <RadioGroup
            row
            aria-label="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="electronics" control={<Radio />} label="Electronics" />
            <FormControlLabel value="clothing" control={<Radio />} label="Clothing" />
            <FormControlLabel value="furniture" control={<Radio />} label="Furniture" />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Box>
  </Container>
</Box>
  )
}

