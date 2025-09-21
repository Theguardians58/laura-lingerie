import { signup } from '../auth/actions'

export default function SignupPage() {
  return (
    <main className="pt-20 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary rounded-lg shadow-lg animate-fade-in-up">
        <h1 className="text-3xl font-bold text-center text-foreground">
          Create an Account
        </h1>
        
        <form action={signup} className="space-y-6">
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
              minLength={6}
              className="w-full px-4 py-3 bg-background border border-border rounded-md focus:ring-primary focus:border-primary"
              placeholder="••••••••"
            />
             <p className="text-xs text-muted-foreground mt-2">Password must be at least 6 characters long.</p>
          </div>
          <button
            type="submit"
            className="w-full py-3 font-semibold text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40"
          >
            Sign Up
          </button>
        </form>
        
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </main>
  )
            }
            
