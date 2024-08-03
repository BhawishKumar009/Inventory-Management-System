'use client'
import { get, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '@/firebase';
import { collection, Firestore, getDocs, query, onSnapshot, addDoc } from 'firebase/firestore';
import { doc, deleteDoc } from "firebase/firestore";
import { Box, Container, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function Page() {
  const [inventory, setInventory] = useState([]);

  let lastItemId = "";

  const removeUser = async (itemId) => {
    await deleteDoc(doc(database, 'inventory', itemId));
    const unsubscribe = onSnapshot(query(collection(database, 'inventory')), (snapshot) => {
      const inventoryList = [];
      snapshot.forEach((doc) => {
        inventoryList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setInventory(inventoryList);
    });
    return unsubscribe;
  }


  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(database, 'inventory')), (snapshot) => {
      const inventoryList = [];
      snapshot.forEach((doc) => {
        inventoryList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setInventory(inventoryList);
    });


    return unsubscribe;
  }, []);

  return (
<Box sx={{ py: 4 }}>
  <Container maxWidth="lg">
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inventory List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                {console.log(item)}
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => removeUser(item.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </Container>
</Box>
  );
}

export default Page;