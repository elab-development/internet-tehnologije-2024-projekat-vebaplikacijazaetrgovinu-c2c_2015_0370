import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Select, MenuItem } from '@mui/material';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [sorting, setSorting] = useState([]);
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

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/users/${userId}/role`,
        { tip_korisnika: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedUser = response.data.user;
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      alert('Uloga korisnika uspešno promenjena.');
    } catch (err) {
      alert('Došlo je do greške prilikom promene uloge.');
    }
  };

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
        const rating = parseFloat(getValue());
        return !isNaN(rating) ? rating.toFixed(2) : 'N/A';
      },
    },
    {
      accessorKey: 'tip_korisnika',
      header: 'Tip korisnika',
      cell: ({ row }) => (
        <Select
          value={row.original.tip_korisnika}
          onChange={(e) => handleRoleChange(row.original.id, e.target.value)}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: { pagination: { pageIndex, pageSize }, sorting },
    onPaginationChange: (updater) => {
      const newState = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
                <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()} style={{ cursor: 'pointer' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'asc' && ' 🔼'}
                  {header.column.getIsSorted() === 'desc' && ' 🔽'}
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
        <Button variant="contained" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Prethodna
        </Button>
        <span>
          Stranica {pageIndex + 1} od {table.getPageCount()}
        </span>
        <Button variant="contained" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Sledeća
        </Button>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'right' }}>
        <label>
          Broj redova:
          <select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
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
