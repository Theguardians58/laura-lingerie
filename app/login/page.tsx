import { login } from '../auth/actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <main className="pt-20 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary rounded-lg shadow-lg animate-fade-in-up">
        <h1 className="text-3xl font-bold text-center text-foreground">
          Welcome Back
        </h1>
        
        <form action={login} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-md focus:ring-primary focus:border-primary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-md focus:ring-primary focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-semibold text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40"
          >
            Sign In
          </button>
        </form>
        
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-md">
            {searchParams.message}
          </p>
        )}

        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  )
        }
            
