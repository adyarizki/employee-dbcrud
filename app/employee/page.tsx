'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Employee = {
  id: number;
  name: string;
  position: string;
  salary: number;
};

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch('/api/employee') // Tetap valid
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/employee/${id}`, { method: 'DELETE' });
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Karyawan</h1>
      <Link href="/employee/create" className="bg-blue-500 text-white px-4 py-2 rounded">+ Tambah Karyawan</Link>
      <ul className="mt-4 space-y-2">
        {employees.map(emp => (
          <li key={emp.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{emp.name}</p>
              <p className="text-sm">{emp.position}</p>
              <p className="text-sm text-gray-500">Rp {emp.salary.toLocaleString()}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/employee/edit/${emp.id}`} className="text-blue-600">Edit</Link>
              <button onClick={() => handleDelete(emp.id)} className="text-red-500">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
