import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Greška pri učitavanju korisnika.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Ime' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'products_count', header: 'Broj proizvoda' },
    { accessorKey: 'orders_count', header: 'Broj porudžbina' },
    {
      accessorKey: 'average_rating',
      header: 'Prosečna ocena',
      cell: ({ getValue }) => {
        const rating = parseFloat(getValue()); // Konvertovanje u broj
        return !isNaN(rating) ? rating.toFixed(2) : 'N/A'; // Provera validnosti
      },
    },
    { accessorKey: 'tip_korisnika', header: 'Tip korisnika' },
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: { pagination: { pageIndex, pageSize } },
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
      <h1>Administratorska tabla - Korisnici</h1>
      <Table style={{ border: '1px solid #ddd', marginBottom: '20px' }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="contained" onClick={() => setPageIndex((old) => Math.max(old - 1, 0))} disabled={pageIndex === 0}>
          Prethodna
        </Button>
        <span>
          Stranica {pageIndex + 1} od {Math.ceil(users.length / pageSize)}
        </span>
        <Button
          variant="contained"
          onClick={() => setPageIndex((old) => Math.min(old + 1, Math.ceil(users.length / pageSize) - 1))}
          disabled={pageIndex === Math.ceil(users.length / pageSize) - 1}
        >
          Sledeća
        </Button>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'right' }}>
        <label>
          Broj redova:
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            style={{ marginLeft: '5px' }}
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default AdminDashboard;
