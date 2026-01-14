import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { InputText } from "../components/inputs/CommonInputs"; // Caminho onde você salvou
import { InputPass } from "../components/inputs/InputPass"; // Caminho onde você salvou
import { OTPInput } from "../components/inputs/CodeInput";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Estados
  const [step, setStep] = useState<1 | 2>(1); // 1: Credenciais, 2: Código 2FA
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // Passo 1: Enviar email/senha e solicitar código
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // POST /login (Backend envia email mas NÃO retorna token ainda)
      await api.post("/auth/login", { email, password });
      setStep(2); // Avança para tela de código
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to login");
    }
  };

  // Passo 2: Validar código e obter token
  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // POST /login/verify
      const response = await api.post("/auth/login/verify", { email, code });
      login(response.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid code");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 bg-[url(/folhas.jpg)] bg-center bg-cover p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {step === 1 ? "Bem vindo!" : "Confirme o codigo"}
        </h2>
        {error && (
          <div className="rounded bg-red-100 p-2 text-red-600 text-center text-sm">
            {error}
          </div>
        )}
        {step === 1 ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <InputText
              value={email}
              onChange={setEmail}
              label="Email"
              placeholder="john@example.com"
            />
            <InputPass
              value={password}
              onChange={setPassword}
              mode="login"
              placeholder="digite sua senha"
              label="Senha"
            />
            <button
              type="submit"
              className="w-full rounded bg-green-600 py-2 font-bold text-white hover:bg-green-700 transition cursor-pointer"
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-600">
              Não possui uma conta?{" "}
              <Link to="/signup" className="text-green-600 hover:underline">
                Cadastrar-se
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Código de 6 digitos enviado para: <strong>{email}</strong>.
            </p>
            <OTPInput
              value={code}
              onChange={setCode}
              length={6}
              label="Código de verificação"
            />
            <button
              type="submit"
              className="w-full rounded bg-green-600 py-2 font-bold text-white hover:bg-green-700 transition"
            >
              Verificar e Entrar
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-500 hover:underline"
            >
              Voltar para Login
            </button>
          </form>
        )}
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
