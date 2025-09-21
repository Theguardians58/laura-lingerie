'use server'

import { createServerClient } from '../../lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = createServerClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Login Error:', error.message)
    return redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  return redirect('/')
}

export async function signup(formData: FormData) {
  const origin = headers().get('origin')
  const supabase = createServerClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('Signup Error:', error.message)
    return redirect('/login?message=Could not create user')
  }
  
  // Re-direct to a page that tells the user to check their email.
  return redirect('/login?message=Check email to continue sign in process')
}

export async function signOut() {
  const supabase = createServerClient()
  await supabase.auth.signOut()
  return redirect('/login')
}
