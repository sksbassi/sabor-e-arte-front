// // Exemplo básico do useCRUD.ts
import { useState } from "react";

export function useCRUD<T>(endpoint: string) {
  const [data, setData] = useState<T[] | T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const API_URL = `http://localhost:3000`;

  const getAll = async (rota:string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${rota}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const create = async (item: Partial<T>, rota: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${rota}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      await getAll('/rotausuario');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getAll, create, remove };
}
