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
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tambah Karyawan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border px-3 py-2 w-full"
          placeholder="Nama"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border px-3 py-2 w-full"
          placeholder="Jabatan"
          onChange={e => setForm({ ...form, position: e.target.value })}
        />
        <input
          className="border px-3 py-2 w-full"
          placeholder="Gaji"
          type="number"
          onChange={e => setForm({ ...form, salary: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Simpan
        </button>
      </form>
    </main>
  );
}
