'use client'

import { useState } from "react"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"

export default function AdminAuth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState<null | { email: string }>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  // Connexion
  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser({ email: userCredential.user.email || "" })
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Une erreur est survenue")
      }
    }
    setLoading(false)
  }

  // Inscription (si besoin)
  const handleRegister = async () => {
    setLoading(true)
    setError(null)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setUser({ email: userCredential.user.email || "" })
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Une erreur est survenue")
      }
    }
    setLoading(false)
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  if (user) {
    return (
      <div>
        <p>Connecté en tant que : {user.email}</p>
        <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded mt-2">
          Déconnexion
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-xl mb-4">{isRegister ? "Inscription" : "Connexion Admin"}</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="w-full p-2 mb-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        onClick={isRegister ? handleRegister : handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Chargement..." : isRegister ? "S'inscrire" : "Se connecter"}
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isRegister ? (
          <>
            Déjà un compte ?{" "}
            <button className="text-blue-600 underline" onClick={() => setIsRegister(false)}>
              Connectez-vous
            </button>
          </>
        ) : (
          <>
            Pas de compte ?{" "}
            <button className="text-blue-600 underline" onClick={() => setIsRegister(true)}>
              Inscrivez-vous
            </button>
          </>
        )}
      </p>
    </div>
  )
}
