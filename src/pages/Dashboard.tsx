import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export function Dashboard() {
  const { logout } = useAuth();
  const [apiMessage, setApiMessage] = useState("");

  const testConnection = async () => {
    try {
      // Faz requisição para a rota privada
      const response = await api.get("/api/test");
      setApiMessage(`Success: ${response.data.message}`);
    } catch (err) {
      setApiMessage("Error: Failed to fetch protected data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 bg-[url(/folhas.jpg)] bg-center bg-cover  ">
      <div className="w-full min-h-screen backdrop-blur-lg p-8 flex items-center">
        <div className="mx-auto max-w-4xl space-y-6 ">
          <div className="flex items-center justify-between rounded-lg bg-white  backdrop-blur-lg p-6 shadow">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <button
              onClick={logout}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 cursor-pointer"
            >
              Logout
            </button>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Testar rota privada</h2>
            <p className="text-gray-600 mb-4">
              Clique no botão abaixo para testar a conexão com{" "}
              <code>/api/test</code> usando JWT.
            </p>

            <button
              onClick={testConnection}
              className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 cursor-pointer"
            >
              Chamar API
            </button>

            {apiMessage && (
              <div
                className={`mt-4 p-4 rounded ${
                  apiMessage.includes("Success")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {apiMessage}
              </div>
            )}
          </div>
          <div className="w-full flex justify-center">
            <a href="https://vicentedeveloper.com" className="text-white">
              Vicente Developer - 2026
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
