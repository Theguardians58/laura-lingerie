// This is a protected route.
// The middleware.ts file will prevent access unless the user is an admin.

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-serif mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards for admin actions */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
          <p className="text-muted-foreground">Add, edit, or delete products and manage inventory.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">View Orders</h2>
          <p className="text-muted-foreground">Review customer orders and update their status.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Customer Management</h2>
          <p className="text-muted-foreground">View and manage customer information.</p>
        </div>
      </div>
    </div>
  );
}

          
