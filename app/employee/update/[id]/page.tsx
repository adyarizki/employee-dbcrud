'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function UpdatePage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', position: '', salary: '' });

  useEffect(() => {
    fetch('/api/employee')
      .then(res => res.json())
      .then(data => {
        const emp = data.find((e: any) => e.id === Number(id));
        setForm({
          name: emp.name,
          position: emp.position,
          salary: emp.salary.toString(),
        });
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/employee/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: form.name,
        position: form.position,
        salary: Number(form.salary),
      }),
    });
    router.push('/employee'); 
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Karyawan</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input className="border px-3 py-2 w-full" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border px-3 py-2 w-full" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
        <input className="border px-3 py-2 w-full" value={form.salary} type="number" onChange={e => setForm({ ...form, salary: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </main>
  );
}
