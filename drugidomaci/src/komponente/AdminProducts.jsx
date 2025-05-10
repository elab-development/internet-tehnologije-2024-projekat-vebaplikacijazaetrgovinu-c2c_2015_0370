import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Greška pri učitavanju proizvoda.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        alert('Proizvod uspešno obrisan.');
      } catch (err) {
        alert('Došlo je do greške prilikom brisanja proizvoda.');
      }
    }
  };

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Naziv' },
    { accessorKey: 'price', header: 'Cena (RSD)' },
    { accessorKey: 'stock', header: 'Stanje' },
    { accessorKey: 'category', header: 'Kategorija' },
    { accessorKey: 'status', header: 'Status' },
    {
      id: 'actions',
      header: 'Akcije',
      cell: ({ row }) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteProduct(row.original.id)}
        >
          Obriši
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <div>Učitavanje podataka...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Administratorska tabla - Proizvodi</h1>
      <Table style={{ border: '1px solid #ddd', marginBottom: '20px' }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProducts;
