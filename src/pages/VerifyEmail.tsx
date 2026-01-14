import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import { InputText } from "../components/inputs/CommonInputs";
import { OTPInput } from "../components/inputs/CodeInput";

export function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/verify-email", { email, code });
      alert("Email verified! Please login.");
      navigate("/login");
    } catch (err: any) {
      setMsg(err.response?.data?.error || "Verification failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 bg-[url(/folhas.jpg)] bg-center bg-cover p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Verify Email
        </h2>
        <p className="text-center text-sm text-gray-600">
          Check your email for the activation code.
        </p>

        {msg && <div className="text-red-500 text-sm text-center">{msg}</div>}

        <form onSubmit={handleVerify} className="space-y-4">
          <InputText value={email} onChange={setEmail} label="Email" />
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
            Activate Account
          </button>
        </form>
      </div>
    </div>
  );
}
