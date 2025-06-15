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
      return result;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getByEmail = async (email: string): Promise<T | null> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${endpoint}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      });
      const result = await response.json();
      console.log(result);
      return result;
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

  const update = async (id: string, receita: Partial<T>) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${endpoint}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receita),
      });
      await getAll();
    } catch (error) {
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${endpoint}/${id}`, {
        method: "DELETE",
      });
      await getAll();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getAll, create, remove, getByEmail, update };
}
