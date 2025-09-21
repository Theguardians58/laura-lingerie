import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { signOut } from '@/app/auth/actions';

// This is a protected route.
// It will redirect to the login page if the user is not authenticated.
export default async function ProfilePage() {
  const supabase = createServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch the user's full name from the profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single();

  const userName = profile?.full_name || user.email;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground mb-8">
          Welcome back, <span className="text-primary">{userName}</span>!
        </p>

        <div className="space-y-6">
          {/* Account Details Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">Account Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Joined On:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Placeholder Sections */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">Order History</h2>
            <p className="text-sm text-muted-foreground">You have no previous orders.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">Manage Addresses</h2>
            <p className="text-sm text-muted-foreground">You have no saved addresses.</p>
          </div>

          {/* Sign Out Button */}
          <div className="pt-6 border-t border-border">
            <form action={signOut}>
              <button 
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  }
         
