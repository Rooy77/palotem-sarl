'use client'

import { useState } from "react"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function AdminAuth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const router = useRouter()

  // Connexion
  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/admin") // redirige vers le dashboard
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
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/admin") // redirige vers le dashboard après inscription
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Une erreur est survenue")
      }
    }
    setLoading(false)
  }

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {isRegister ? "Créer un compte admin" : "Connexion Admin"}
      </h2>
      
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={isRegister ? handleRegister : handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Chargement..." : isRegister ? "S'inscrire" : "Se connecter"}
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
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
