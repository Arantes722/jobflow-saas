export interface ValidationErrors {
  email?: string
  password?: string
  confirmPassword?: string
}

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) {
    return "Email is required"
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address"
  }

  return undefined
}

export function validatePassword(password: string): string | undefined {
  if (!password) {
    return "Password is required"
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters"
  }

  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  if (!hasUppercase || !hasLowercase || !hasNumber) {
    return "Password must contain uppercase, lowercase, and numbers"
  }

  return undefined
}

export function validateConfirmPassword(password: string, confirmPassword: string): string | undefined {
  if (!confirmPassword) {
    return "Please confirm your password"
  }

  if (password !== confirmPassword) {
    return "Passwords do not match"
  }

  return undefined
}

export function getPasswordStrength(password: string): {
  score: number
  label: string
  color: string
} {
  let score = 0

  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score <= 2) return { score, label: "Weak", color: "text-red-600" }
  if (score <= 4) return { score, label: "Fair", color: "text-yellow-600" }
  return { score, label: "Strong", color: "text-green-600" }
}
