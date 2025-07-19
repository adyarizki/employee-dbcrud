'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', position: '', salary: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        position: form.position,
        salary: Number(form.salary),
      }),
    });

    router.push('/employee'); // bukan ke '/'
  };

  return (
    <main className="max-w-2xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4 bg bg-gray-900 p-2 text-white">Add Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          className="w-full p-2 border rounded"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Position"
          onChange={e => setForm({ ...form, position: e.target.value })}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Salary"
          type="number"
          onChange={e => setForm({ ...form, salary: e.target.value })}
          required
        />
        <div className='flex justify-end'>
           <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
              Add
            </button>
        </div>
       
      </form>
    </main>
  );
}
