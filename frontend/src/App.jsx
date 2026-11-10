import { useEffect, useState } from 'react'
import { createEmployee, deleteEmployee, errorMessage, listEmployees, updateEmployee } from './api'

const EMPTY = { employeeCode: '', fullName: '', email: '', department: '', position: '', hireDate: '' }

const FIELDS = [
  { name: 'employeeCode', label: 'Mã nhân viên', required: true, maxLength: 20 },
  { name: 'fullName', label: 'Họ tên', required: true, maxLength: 100 },
  { name: 'email', label: 'Email', type: 'email', required: true, maxLength: 100 },
  { name: 'department', label: 'Phòng ban', required: true, maxLength: 100 },
  { name: 'position', label: 'Vị trí', maxLength: 100 },
  { name: 'hireDate', label: 'Ngày vào làm', type: 'date' },
]

function formatDate(value) {
  if (!value) return '—'
  const [y, m, d] = value.split('-')
  return `${d}/${m}/${y}`
}

export default function App() {
  const [employees, setEmployees] = useState([])
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
      setEmployees(await listEmployees())
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

  function startEdit(employee) {
    setEditingId(employee.id)
    setFormError('')
    setForm({
      employeeCode: employee.employeeCode,
      fullName: employee.fullName,
      email: employee.email,
      department: employee.department,
      position: employee.position || '',
      hireDate: employee.hireDate || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setFormError('')
    const payload = { ...form, hireDate: form.hireDate || null }
    try {
      if (editingId) await updateEmployee(editingId, payload)
      else await createEmployee(payload)
      resetForm()
      await load()
    } catch (e) {
      setFormError(errorMessage(e))
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(employee) {
    if (!window.confirm(`Xóa nhân viên ${employee.fullName}?`)) return
    try {
      await deleteEmployee(employee.id)
      if (editingId === employee.id) resetForm()
      await load()
    } catch (e) {
      setLoadError(errorMessage(e))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <h1 className="text-xl font-semibold">Hệ Thống Quản Lý Nhân Sự</h1>
          <p className="text-sm text-slate-500">Quản lý danh sách nhân viên</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6">
        <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-medium">{editingId ? 'Sửa thông tin' : 'Thêm nhân viên'}</h2>
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
          ) : employees.length === 0 && !loadError ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">
              Chưa có nhân viên nào. Hãy thêm bằng biểu mẫu phía trên.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Mã NV</th>
                    <th className="px-4 py-3 font-medium">Họ tên</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Phòng ban</th>
                    <th className="px-4 py-3 font-medium">Vị trí</th>
                    <th className="px-4 py-3 font-medium">Ngày vào làm</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono">{employee.employeeCode}</td>
                      <td className="px-4 py-3">{employee.fullName}</td>
                      <td className="px-4 py-3">{employee.email}</td>
                      <td className="px-4 py-3">{employee.department}</td>
                      <td className="px-4 py-3">{employee.position || '—'}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{formatDate(employee.hireDate)}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => startEdit(employee)} className="mr-3 text-blue-600 hover:underline">
                          Sửa
                        </button>
                        <button onClick={() => handleDelete(employee)} className="text-red-600 hover:underline">
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
