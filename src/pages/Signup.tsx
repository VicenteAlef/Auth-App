import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import { InputText } from "../components/inputs/CommonInputs";
import { InputPass } from "../components/inputs/InputPass";

export function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { email, password });
      // Redireciona para verificar o email recém cadastrado
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 bg-[url(/folhas.jpg)] bg-center bg-cover p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Criar conta
        </h2>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <InputText value={email} onChange={setEmail} label="Email" />

          {/* Aqui ativamos o modo signup para validação visual */}
          <InputPass
            value={password}
            onChange={setPassword}
            mode="signup"
            label="Senha"
          />

          <button
            type="submit"
            className="w-full rounded bg-green-600 py-2 font-bold text-white hover:bg-green-700 transition mt-4 cursor-pointer"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Fazer login
          </Link>
        </p>
        <div className="relative w-full flex justify-center">
          <a
            href="https://vicentedeveloper.com"
            className="text-sm text-white font-bold absolute top-20"
          >
            Vicente Developer - 2026
          </a>
        </div>
      </div>
    </div>
  );
}
