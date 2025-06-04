// // Exemplo básico do useCRUD.ts
import { useState } from "react";

export function useCRUD<T>(endpoint: string) {
  const [data, setData] = useState<T[] | T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const API_URL = `http://localhost:3000`;

  const getAll = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${endpoint}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getByEmail = async (email: string): Promise<T | null> => {
  setLoading(true); 
  try {
    const response = await fetch(`${API_URL}/${endpoint}?email=${email}`);
    const result = await response.json();

    if (Array.isArray(result) && result.length > 0) {
      return result[0]; // retorna o primeiro usuário com o email
    } else {
      return null; // nenhum usuário encontrado
    }
  } catch (err) {
    setError(err); 
    return null;
  } finally {
    setLoading(false);
  }
};


  const create = async (item: Partial<T>) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
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
      await fetch(`${API_URL}${endpoint}${id}`, {
        method: "DELETE",
      });
      await getAll();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getAll, create, remove, getByEmail };
}
