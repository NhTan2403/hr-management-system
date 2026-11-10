import axios from 'axios'

// Địa chỉ backend: đặt VITE_API_URL trên Vercel, mặc định là backend chạy trên máy.
const http = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/api/employees',
})

// Lấy thông báo lỗi dạng {"message": "..."} mà backend trả về
export function errorMessage(error) {
  return error.response?.data?.message || 'Không kết nối được máy chủ. Vui lòng thử lại.'
}

export const listEmployees = () => http.get('').then((r) => r.data)
export const createEmployee = (data) => http.post('', data).then((r) => r.data)
export const updateEmployee = (id, data) => http.put(`/${id}`, data).then((r) => r.data)
export const deleteEmployee = (id) => http.delete(`/${id}`)
