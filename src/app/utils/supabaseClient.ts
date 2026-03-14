import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bpyysgnckfaobrjbwidv.supabase.co';
// Anh đổi tên biến dưới đây cho khớp với hàm gọi ở dưới nhé
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXlzZ25ja2Zhb2JyamJ3aWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODYxMTQsImV4cCI6MjA4ODU2MjExNH0.1CU73oFPVD63NzLZ4hjAGrkWshk7S4ccTbtS_eVx1MA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);