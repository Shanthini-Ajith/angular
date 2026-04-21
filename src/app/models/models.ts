export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  date_joined: string;
}

export interface StaffProfile {
  id: number;
  user: User;
  employee_id: string;
  phone: string;
  department: Department;
  designation: string;
  date_of_joining: string;
  salary: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
}

export interface LeaveRequest {
  id: number;
  staff: StaffProfile;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
  approved_by?: User;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: number;
  staff: StaffProfile;
  date: string;
  check_in_time?: string;
  check_out_time?: string;
  is_present: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_staff: number;
  active_staff: number;
  pending_leaves: number;
  today_present: number;
  today_absent: number;
  total_departments: number;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
