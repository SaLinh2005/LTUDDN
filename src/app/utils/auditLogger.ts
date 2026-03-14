import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase giống bên trang AuditLogPage của em
const supabaseUrl = 'https://bpyysgnckfaobrjbwidv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXlzZ25ja2Zhb2JyamJ3aWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODYxMTQsImV4cCI6MjA4ODU2MjExNH0.1CU73oFPVD63NzLZ4hjAGrkWshk7S4ccTbtS_eVx1MA';
const supabase = createClient(supabaseUrl, supabaseKey);

// Hàm dùng chung để ghi log
export const logAuditEvent = async (data: {
  action_type: string;
  resource_path: string;
  status_result?: string;
  old_values?: any;
  new_values?: any;
}) => {
  // Lấy email user đang đăng nhập từ localStorage (giống cách em đang làm ở LoginPage)
  const userEmail = localStorage.getItem('userEmail') || 'guest@system.com';
  const userName = userEmail.split('@')[0]; // Lấy phần trước @ làm tên tạm

  try {
    await supabase.from('audit_logs').insert([{
      user_name: userName,
      user_email: userEmail,
      user_role: 'Developer', // Em có thể lưu role ở localStorage rồi lấy ra tương tự email
      action_type: data.action_type,
      resource_path: data.resource_path,
      status_result: data.status_result || 'Success',
      ip_address: '127.0.0.1', // Frontend thường khó lấy IP thật, có thể hardcode hoặc dùng API bên thứ 3
      old_values: data.old_values || null,
      new_values: data.new_values || null,
    }]);
  } catch (error) {
    console.error('Lỗi khi ghi Audit Log:', error);
  }
};