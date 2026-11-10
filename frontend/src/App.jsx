import { useEffect, useState } from 'react'
import { createIntern, deleteIntern, errorMessage, listInterns, updateIntern } from './api'

const EMPTY = { studentCode: '', fullName: '', companyName: '', position: '', startDate: '' }

const FIELDS = [
  { name: 'studentCode', label: 'Mã sinh viên', required: true, maxLength: 20 },
  { name: 'fullName', label: 'Họ tên', required: true, maxLength: 100 },
  { name: 'companyName', label: 'Công ty thực tập', required: true, maxLength: 150 },
  { name: 'position', label: 'Vị trí', maxLength: 100 },
  { name: 'startDate', label: 'Ngày bắt đầu', type: 'date' },
]

function formatDate(value) {
  if (!value) return '—'
  const [y, m, d] = value.split('-')
  return `${d}/${m}/${y}`
}

export default function App() {
  const [interns, setInterns] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  async function load() {
    setLoading(true)
    setLoadError('')
    try {
      setInterns(await listInterns())
    } catch (e) {
      setLoadError(errorMessage(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  function resetForm() {
    setForm(EMPTY)
    setEditingId(null)
    setFormError('')
  }

  function startEdit(intern) {
    setEditingId(intern.id)
    setFormError('')
    setForm({
      studentCode: intern.studentCode,
      fullName: intern.fullName,
      companyName: intern.companyName,
      position: intern.position || '',
      startDate: intern.startDate || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setFormError('')
    const payload = { ...form, startDate: form.startDate || null }
    try {
      if (editingId) await updateIntern(editingId, payload)
      else await createIntern(payload)
      resetForm()
      await load()
    } catch (e) {
      setFormError(errorMessage(e))
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(intern) {
    if (!window.confirm(`Xóa sinh viên ${intern.fullName}?`)) return
    try {
      await deleteIntern(intern.id)
      if (editingId === intern.id) resetForm()
      await load()
    } catch (e) {
      setLoadError(errorMessage(e))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <h1 className="text-xl font-semibold">Danh sách thực tập chuyên ngành</h1>
          <p className="text-sm text-slate-500">Quản lý sinh viên và nơi thực tập</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6">
        <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-medium">{editingId ? 'Sửa thông tin' : 'Thêm sinh viên thực tập'}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FIELDS.map((f) => (
              <label key={f.name} className="block text-sm">
                <span className="mb-1 block text-slate-600">
                  {f.label}
                  {f.required && <span className="text-red-600"> *</span>}
                </span>
                <input
                  type={f.type || 'text'}
                  required={f.required}
                  maxLength={f.maxLength}
                  value={form[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </label>
            ))}
          </div>
          {formError && (
            <p role="alert" className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {formError}
            </p>
          )}
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? 'Đang lưu…' : editingId ? 'Lưu thay đổi' : 'Thêm'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
              >
                Hủy
              </button>
            )}
          </div>
        </form>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          {loadError && (
            <div role="alert" className="flex items-center justify-between gap-3 bg-red-50 px-4 py-3 text-sm text-red-700">
              <span>{loadError}</span>
              <button onClick={load} className="font-medium underline">
                Thử lại
              </button>
            </div>
          )}
          {loading ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">Đang tải…</p>
          ) : interns.length === 0 && !loadError ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">
              Chưa có sinh viên nào. Hãy thêm bằng biểu mẫu phía trên.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Mã SV</th>
                    <th className="px-4 py-3 font-medium">Họ tên</th>
                    <th className="px-4 py-3 font-medium">Công ty</th>
                    <th className="px-4 py-3 font-medium">Vị trí</th>
                    <th className="px-4 py-3 font-medium">Ngày bắt đầu</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {interns.map((intern) => (
                    <tr key={intern.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono">{intern.studentCode}</td>
                      <td className="px-4 py-3">{intern.fullName}</td>
                      <td className="px-4 py-3">{intern.companyName}</td>
                      <td className="px-4 py-3">{intern.position || '—'}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{formatDate(intern.startDate)}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => startEdit(intern)} className="mr-3 text-blue-600 hover:underline">
                          Sửa
                        </button>
                        <button onClick={() => handleDelete(intern)} className="text-red-600 hover:underline">
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
