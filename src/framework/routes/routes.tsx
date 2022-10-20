export enum UrlRoutes {
  Home = '/',
  Login = '/login',
  SetPassword = '/reset/:token',
  ForgotPassword = '/forgot',
  Dashboard = '/dashboard',
  // User
  Users = '/users',
  User = '/users/:id',
  CreateUser = '/create/user',
  EditUser = '/edit/user/',
  // Customer
  Customers = '/customers',
  Customer = '/customers/:id',
  CreateCustomer = '/create/customer',
  EditCustomer = '/edit/customer/',
}
