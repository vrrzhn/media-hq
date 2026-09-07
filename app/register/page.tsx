'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

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
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-black">
      
      {/* DRASTICALLY DIFFERENT BLOB POSITIONS */}
      <div className="absolute top-0 right-10 w-[35rem] h-[35rem] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none animate-blob" />
      <div className="absolute bottom-0 left-10 w-[35rem] h-[35rem] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none animate-blob animation-delay-4000" />
      
      {/* TECHNICAL GRID OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none" />

      {/* LOGO */}
      <Link href="/" className="group mb-8 relative z-10">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 via-emerald-400 via-sky-400 to-purple-500 p-[3px] shadow-2xl shadow-purple-500/30 group-hover:scale-105 transition duration-300">
          <div className="w-full h-full bg-black rounded-[21px] flex items-center justify-center">
            <svg className="w-10 h-10 text-amber-300 fill-current" viewBox="0 0 24 24">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H9l2 4H8L6 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
            </svg>
          </div>
        </div>
      </Link>

      <div className="w-full max-w-md bg-zinc-950/80 border border-zinc-800/85 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl shadow-black/80 relative z-10">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            Create your <span className="text-amber-300">Media</span><span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-300 via-emerald-400 via-sky-400 to-purple-400">HQ</span> account
          </h1>
          <p className="text-xs text-zinc-400">Set up your credentials to get started.</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
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

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 active:scale-[0.99] transition shadow-lg shadow-white/5 text-sm"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-800/80 text-center">
          <Link href="/login" className="text-xs text-zinc-400 hover:text-white transition">
            Already have an account? Log In
          </Link>
        </div>

      </div>
    </main>
  )
}