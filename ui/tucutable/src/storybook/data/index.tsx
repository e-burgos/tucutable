import React from 'react';
import { ColumnDef } from '@tanstack/table-core';
import { TData } from '../../common/types';
import { cn } from '../../common/helpers/cn';
import {
  sortingCompareNumberFn,
  sortingCompareStringFn,
} from '../../common/functions';

export const columns: ColumnDef<TData>[] = [
  {
    id: 'name',
    header: 'Name',
    footer: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.name}
      </span>
    ),
  },
  {
    id: 'age',
    header: 'Age',
    footer: 'Age',
    accessorKey: 'age',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.age}
      </span>
    ),
  },
  {
    id: 'email',
    header: 'Email',
    footer: 'Email',
    accessorKey: 'email',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.email}
      </span>
    ),
  },
  {
    id: 'phone',
    header: 'Phone',
    footer: 'Phone',
    accessorKey: 'phone',
    cell: ({ row }) => (
      <span className="font-bold text-table-primary line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.phone}
      </span>
    ),
  },
  {
    id: 'address',
    header: 'Address',
    footer: 'Address',
    accessorKey: 'address',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.address}
      </span>
    ),
  },
  {
    id: 'city',
    header: 'City',
    footer: 'City',
    accessorKey: 'city',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.city}
      </span>
    ),
  },
  {
    id: 'state',
    header: 'State',
    footer: 'State',
    accessorKey: 'state',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.state}
      </span>
    ),
  },
  {
    id: 'zip',
    header: 'Zip',
    footer: 'Zip',
    accessorKey: 'zip',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.zip}
      </span>
    ),
  },
  {
    id: 'country',
    header: 'Country',
    footer: 'Country',
    accessorKey: 'country',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.country}
      </span>
    ),
  },
  {
    id: 'isActive',
    header: 'Is Active',
    footer: 'Is Active',
    accessorKey: 'isActive',
    cell: ({ row }) => (
      <span
        className={cn(
          'flex items-center justify-center border border-table-divider rounded-md px-2 py-1 w-[60px] text-sm line-clamp-2 text-ellipsis overflow-hidden',
          row.original.isActive
            ? 'text-green-500 bg-green-50'
            : 'text-red-500 bg-red-50'
        )}
      >
        {row.original.isActive ? 'Yes' : 'No'}
      </span>
    ),
  },

  {
    id: 'createdAt',
    header: 'Created At',
    footer: 'Created At',
    accessorKey: 'createdAt',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.createdAt}
      </span>
    ),
  },
  {
    id: 'updatedAt',
    header: 'Updated At',
    footer: 'Updated At',
    accessorKey: 'updatedAt',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.updatedAt}
      </span>
    ),
  },
];

export const smallColumns: ColumnDef<TData>[] = [
  {
    id: 'name',
    header: 'Name',
    footer: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.name}
      </span>
    ),
  },
  {
    id: 'age',
    header: 'Age',
    footer: 'Age',
    accessorKey: 'age',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.age}
      </span>
    ),
  },
  {
    id: 'email',
    header: 'Email',
    footer: 'Email',
    accessorKey: 'email',
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.email}
      </span>
    ),
  },
  {
    id: 'phone',
    header: 'Phone',
    footer: 'Phone',
    accessorKey: 'phone',
    cell: ({ row }) => (
      <span className="font-bold text-table-primary line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.phone}
      </span>
    ),
  },
];

export const headerOptionsColumns: ColumnDef<TData>[] = [
  {
    id: 'name',
    header: 'Name',
    footer: 'Name',
    accessorKey: 'name',
    enablePinning: true,
    enableSorting: true,
    enableResizing: true,
    enableDraggable: true,
    enableVisible: true,
    enableHiding: true,
    enableColumnFilter: true,
    sortingFn: (rowA, rowB) =>
      sortingCompareStringFn(rowA.original?.name, rowB.original?.name),
    accessorFn: (row) => row.original?.name,
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.name}
      </span>
    ),
  },
  {
    id: 'age',
    header: 'Age',
    footer: 'Age',
    accessorKey: 'age',
    enablePinning: true,
    enableSorting: true,
    enableResizing: true,
    enableDraggable: true,
    enableVisible: true,
    enableHiding: true,
    enableColumnFilter: true,
    sortingFn: (rowA, rowB) =>
      sortingCompareNumberFn(rowA.original?.age, rowB.original?.age),
    accessorFn: (row) => row.original?.age,
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.age}
      </span>
    ),
  },
  {
    id: 'email',
    header: 'Email',
    footer: 'Email',
    accessorKey: 'email',
    enablePinning: true,
    enableSorting: true,
    enableResizing: true,
    enableDraggable: true,
    enableVisible: true,
    enableHiding: true,
    enableColumnFilter: true,
    sortingFn: (rowA, rowB) =>
      sortingCompareStringFn(rowA.original?.email, rowB.original?.email),
    accessorFn: (row) => row.original?.email,
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.email}
      </span>
    ),
  },
  {
    id: 'phone',
    header: 'Phone',
    footer: 'Phone',
    accessorKey: 'phone',
    enablePinning: true,
    enableSorting: true,
    enableResizing: true,
    enableDraggable: true,
    enableVisible: true,
    enableHiding: true,
    enableColumnFilter: true,
    sortingFn: (rowA, rowB) =>
      sortingCompareNumberFn(rowA.original?.phone, rowB.original?.phone),
    accessorFn: (row) => row.original?.phone,
    cell: ({ row }) => (
      <span className="font-bold text-table-primary line-clamp-2 text-ellipsis overflow-hidden">
        {row.original.phone}
      </span>
    ),
  },
];

export const TABLE_DATA: TData[] = [
  {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    phone: '1234567890',
    address: '123 Main St, Anytown, USA',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
    isActive: true,
    createdAt: new Date(2021, 0, 1).toLocaleDateString(),
    updatedAt: new Date(2021, 0, 1).toLocaleDateString(),
  },
  {
    name: 'Jane Doe',
    age: 25,
    email: 'jane.doe@example.com',
    phone: '0987654321',
    address: '123 Main St, Anytown, USA',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
    isActive: false,
    createdAt: new Date(2021, 0, 1).toLocaleDateString(),
    updatedAt: new Date(2021, 0, 1).toLocaleDateString(),
  },
  {
    name: 'Jim Beam',
    age: 40,
    email: 'jim.beam@example.com',
    phone: '1122334455',
    address: '123 Main St, Anytown, USA',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
    isActive: true,
    createdAt: new Date(2021, 0, 1).toLocaleDateString(),
    updatedAt: new Date(2021, 0, 1).toLocaleDateString(),
  },
  {
    name: 'Jill Smith',
    age: 35,
    email: 'jill.smith@example.com',
    phone: '5544332211',
    address: '123 Main St, Anytown, USA',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
    isActive: false,
    createdAt: new Date(2021, 0, 1).toLocaleDateString(),
    updatedAt: new Date(2021, 0, 1).toLocaleDateString(),
  },
  {
    name: 'Jack Johnson',
    age: 45,
    email: 'jack.johnson@example.com',
    phone: '1122334455',
    address: '123 Main St, Anytown, USA',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
    isActive: true,
    createdAt: new Date(2021, 0, 1).toLocaleDateString(),
    updatedAt: new Date(2021, 0, 1).toLocaleDateString(),
  },
  {
    name: 'Jill Smith',
    age: 35,
    email: 'jill.smith@example.com',
    phone: '5544332211',
    address: '123 Main St, Anytown, USA',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
    isActive: false,
    createdAt: new Date(2021, 0, 1).toLocaleDateString(),
    updatedAt: new Date(2021, 0, 1).toLocaleDateString(),
  },
  {
    name: 'Bill Johnson',
    age: 28,
    email: 'bill.johnson@example.com',
    phone: '1122334455',
    address: '456 Main St, Anytown, USA',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
    isActive: false,
    createdAt: new Date(2021, 0, 1).toLocaleDateString(),
    updatedAt: new Date(2021, 0, 1).toLocaleDateString(),
  },
  {
    name: 'Jim Beam',
    age: 40,
    email: 'jim.beam@example.com',
    phone: '1122334455',
    address: '123 Main St, Anytown, USA',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
    isActive: true,
    createdAt: new Date(2021, 0, 1).toLocaleDateString(),
    updatedAt: new Date(2021, 0, 1).toLocaleDateString(),
  },
  {
    name: 'Jill Smith',
    age: 35,
    email: 'jill.smith@example.com',
    phone: '5544332211',
    address: '123 Main St, Anytown, USA',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
    isActive: true,
    createdAt: new Date(2021, 0, 1).toLocaleDateString(),
    updatedAt: new Date(2021, 0, 1).toLocaleDateString(),
  },
];
