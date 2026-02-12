import { useState, useEffect } from "react";

const API_BASE = "https://provinces.open-api.vn/api/v2";

export interface Province {
  code: number;
  name: string;
}

export interface Ward {
  code: number;
  name: string;
  province_code: number;
}

/** Fetch all provinces */
export function useProvinces() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/p/`);
        const data = await r.json();
        setProvinces(data);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { provinces, loading };
}

/** Fetch wards by province code (v2: province → wards directly, no district level) */
export function useWards(provinceCode: number | null) {
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!provinceCode) {
      setWards([]);
      return;
    }
    setLoading(true);
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/p/${provinceCode}?depth=2`);
        const data = await r.json();
        setWards(data.wards || []);
      } catch {
        setWards([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [provinceCode]);

  return { wards, loading };
}
