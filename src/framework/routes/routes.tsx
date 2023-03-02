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
  // Supplier
  Suppliers = '/suppliers',
  Supplier = '/suppliers/:id',
  CreateSupplier = '/create/supplier',
  EditSupplier = '/edit/supplier/',
  // Product
  Products = '/products',
  Product = '/products/:id ',
  CreateProduct = '/create/product',
  EditProduct = '/edit/product/',
  // Category
  Categories = '/categories',
  Category = '/categories/:id ',
  CreateCategory = '/create/category',
  EditCategory = '/edit/category/',
}
