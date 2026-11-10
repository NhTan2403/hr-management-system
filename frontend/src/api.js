import axios from 'axios'

// Địa chỉ backend: đặt VITE_API_URL trên Vercel, mặc định là backend chạy trên máy.
const http = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/api/interns',
})

// Lấy thông báo lỗi dạng {"message": "..."} mà backend trả về
export function errorMessage(error) {
  return error.response?.data?.message || 'Không kết nối được máy chủ. Vui lòng thử lại.'
}

export const listInterns = () => http.get('').then((r) => r.data)
export const createIntern = (data) => http.post('', data).then((r) => r.data)
export const updateIntern = (id, data) => http.put(`/${id}`, data).then((r) => r.data)
export const deleteIntern = (id) => http.delete(`/${id}`)
