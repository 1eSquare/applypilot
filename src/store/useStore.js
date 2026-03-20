import { useState, useEffect, useCallback } from 'react'

// Generic localStorage hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore storage errors
    }
  }, [key, value])

  return [value, setValue]
}

// CVs
export function useCVStore() {
  const [cvs, setCVs] = useLocalStorage('applypilot_cvs', [])

  const addCV = useCallback((cv) => {
    const newCV = { ...cv, id: Date.now().toString(), uploadedAt: new Date().toISOString() }
    setCVs(prev => [newCV, ...prev])
    return newCV
  }, [setCVs])

  const deleteCV = useCallback((id) => {
    setCVs(prev => prev.filter(c => c.id !== id))
  }, [setCVs])

  return { cvs, addCV, deleteCV }
}

// Jobs
export function useJobStore() {
  const [jobs, setJobs] = useLocalStorage('applypilot_jobs', [])

  const addJob = useCallback((job) => {
    const newJob = { ...job, id: Date.now().toString(), createdAt: new Date().toISOString() }
    setJobs(prev => [newJob, ...prev])
    return newJob
  }, [setJobs])

  const updateJob = useCallback((id, updates) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, ...updates } : j))
  }, [setJobs])

  const deleteJob = useCallback((id) => {
    setJobs(prev => prev.filter(j => j.id !== id))
  }, [setJobs])

  return { jobs, addJob, updateJob, deleteJob }
}

// Account Vault
export function useVaultStore() {
  const [accounts, setAccounts] = useLocalStorage('applypilot_vault', [])

  const addAccount = useCallback((account) => {
    const newAccount = { ...account, id: Date.now().toString(), createdAt: new Date().toISOString() }
    setAccounts(prev => [newAccount, ...prev])
    return newAccount
  }, [setAccounts])

  const updateAccount = useCallback((id, updates) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
  }, [setAccounts])

  const deleteAccount = useCallback((id) => {
    setAccounts(prev => prev.filter(a => a.id !== id))
  }, [setAccounts])

  return { accounts, addAccount, updateAccount, deleteAccount }
}

// Job status constants
export const JOB_STATUSES = [
  { value: 'wishlist', color: 'bg-slate-500', textColor: 'text-slate-300' },
  { value: 'applied', color: 'bg-blue-600', textColor: 'text-blue-300' },
  { value: 'oa', color: 'bg-purple-600', textColor: 'text-purple-300' },
  { value: 'phoneScreen', color: 'bg-indigo-600', textColor: 'text-indigo-300' },
  { value: 'interview', color: 'bg-yellow-600', textColor: 'text-yellow-300' },
  { value: 'offer', color: 'bg-green-600', textColor: 'text-green-300' },
  { value: 'rejected', color: 'bg-red-700', textColor: 'text-red-300' },
]

// Color palette for custom statuses
export const CUSTOM_STATUS_COLORS = [
  { color: 'bg-teal-600', textColor: 'text-teal-200' },
  { color: 'bg-orange-600', textColor: 'text-orange-200' },
  { color: 'bg-pink-600', textColor: 'text-pink-200' },
  { color: 'bg-cyan-600', textColor: 'text-cyan-200' },
  { color: 'bg-lime-600', textColor: 'text-lime-200' },
  { color: 'bg-amber-500', textColor: 'text-amber-100' },
  { color: 'bg-rose-600', textColor: 'text-rose-200' },
  { color: 'bg-violet-600', textColor: 'text-violet-200' },
]

// Custom statuses
export function useStatusStore() {
  const [customStatuses, setCustomStatuses] = useLocalStorage('applypilot_custom_statuses', [])

  const addStatus = useCallback((label, color, textColor) => {
    const id = 'custom_' + Date.now()
    setCustomStatuses(prev => [...prev, { id, label, color, textColor }])
  }, [setCustomStatuses])

  const deleteStatus = useCallback((id) => {
    setCustomStatuses(prev => prev.filter(s => s.id !== id))
  }, [setCustomStatuses])

  return { customStatuses, addStatus, deleteStatus }
}
