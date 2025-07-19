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
    fetch('/api/employee') 
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/employee/${id}`, { method: 'DELETE' });
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <main className="max-w-3xl mx-auto p-6 mt-20">
      <div className='flex justify-between items-center mb-4'>
        <Link href="/employee/create" className="bg-blue-500 text-white px-4 py-2 rounded ml-auto">+ Add Employee</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4 bg bg-gray-900 p-2 text-white">
        List Employee Management
      </h1>

      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-900 text-white text-left text-sm uppercase">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Salary</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className='border-t'>
              <td className='px-4 py-2 font-semibold'>{emp.name}</td>
              <td className='px-4 py-2'>{emp.position}</td>
              <td className='px-4 py-2 text-gray-600'>Rp {emp.salary.toLocaleString()}</td>
              <td className='px-4 py-2 text-center space-x-2'>
                <Link href={`/employee/update/${emp.id}`} className="bg-green-600 p-3 text-white hover:underline rounded font-bold">Update</Link>
                <button onClick={() => handleDelete(emp.id)} className="bg-red-500 p-2 rounded text-white hover:underline font-bold">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
