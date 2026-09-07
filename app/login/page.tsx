'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (isSignUp) {
      if (username.length < 2 || username.length > 16) {
        setErrorMsg('Username must be between 2 and 16 characters.')
        return
      }

      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.')
        return
      }

      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      })

      if (authError) {
        setErrorMsg(authError.message)
        return
      }

      alert('Account created! Check your email to confirm your account.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setErrorMsg(error.message)
      } else {
        router.push('/')
      }
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12">
      
      {/* BIGGER GLOWING LOGO ONLY (NO TEXT ABOVE BOX) */}
      <Link href="/" className="group mb-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 via-emerald-400 via-sky-400 to-purple-500 p-[3px] shadow-2xl shadow-purple-500/30 group-hover:scale-105 transition duration-300">
          <div className="w-full h-full bg-black rounded-[21px] flex items-center justify-center">
            <svg className="w-10 h-10 text-amber-300 fill-current" viewBox="0 0 24 24">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H9l2 4H8L6 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
            </svg>
          </div>
        </div>
      </Link>

      <div className="w-full max-w-md bg-zinc-950/80 border border-zinc-800/85 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-black/60">
        
        {/* INLINE TITLE WITH COLORED MEDIA HQ */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            {isSignUp ? (
              <>Create your <span className="text-amber-300">Media</span><span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-300 via-emerald-400 via-sky-400 to-purple-400">HQ</span> account</>
            ) : (
              <>Welcome back to <span className="text-amber-300">Media</span><span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-300 via-emerald-400 via-sky-400 to-purple-400">HQ</span></>
            )}
          </h1>
          <p className="text-xs text-zinc-400">
            {isSignUp ? 'Set up your credentials to get started.' : 'Enter your details to sign in.'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="text-xs font-medium text-zinc-300 mb-1.5 block">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                minLength={2}
                maxLength={16}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 text-white border border-zinc-800 focus:border-amber-300 focus:ring-1 focus:ring-amber-300/40 outline-none transition text-sm placeholder:text-zinc-600"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">2-16 characters</span>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-zinc-300 mb-1.5 block">Email</label>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 text-white border border-zinc-800 focus:border-amber-300 focus:ring-1 focus:ring-amber-300/40 outline-none transition text-sm placeholder:text-zinc-600"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 mb-1.5 block">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 text-white border border-zinc-800 focus:border-amber-300 focus:ring-1 focus:ring-amber-300/40 outline-none transition text-sm placeholder:text-zinc-600"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="text-xs font-medium text-zinc-300 mb-1.5 block">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 text-white border border-zinc-800 focus:border-amber-300 focus:ring-1 focus:ring-amber-300/40 outline-none transition text-sm placeholder:text-zinc-600"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 active:scale-[0.99] transition shadow-lg shadow-white/5 text-sm"
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-800/80 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setErrorMsg('')
            }}
            className="text-xs text-zinc-400 hover:text-white transition"
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </div>

      </div>
    </main>
  )
}