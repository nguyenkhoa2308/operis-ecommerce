"use client";

import { useReducer, useEffect, useCallback } from "react";
import {
  Plus,
  Copy,
  Check,
  Trash2,
  Loader2,
  Key,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { apiKeysApi } from "@/lib/api";
import type { ApiKey, ApiKeyCreateResponse } from "@/lib/api/api-keys";

/* ------------------------------------------------------------------ */
/*  State                                                              */
/* ------------------------------------------------------------------ */

interface State {
  keys: ApiKey[];
  loading: boolean;
  showCreate: boolean;
  newName: string;
  newExpiry: string;
  creating: boolean;
  createError: string;
  createdKey: ApiKeyCreateResponse | null;
  copied: boolean;
  confirmDeleteId: string | null;
  busyId: string | null; // toggle or delete in progress
}

const initial: State = {
  keys: [],
  loading: true,
  showCreate: false,
  newName: "",
  newExpiry: "",
  creating: false,
  createError: "",
  createdKey: null,
  copied: false,
  confirmDeleteId: null,
  busyId: null,
};

type Action =
  | { type: "SET_KEYS"; keys: ApiKey[] }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "PATCH"; patch: Partial<State> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_KEYS":
      return { ...state, keys: action.keys, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "PATCH":
      return { ...state, ...action.patch };
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ApiKeysPage() {
  const [s, dispatch] = useReducer(reducer, initial);
  const patch = (p: Partial<State>) => dispatch({ type: "PATCH", patch: p });

  /* ---------------------------------------------------------------- */
  /*  Fetch keys                                                       */
  /* ---------------------------------------------------------------- */

  const fetchKeys = useCallback(async () => {
    try {
      const keys = await apiKeysApi.listKeys();
      dispatch({ type: "SET_KEYS", keys });
    } catch {
      dispatch({ type: "SET_KEYS", keys: [] });
    }
  }, []);

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  /* ---------------------------------------------------------------- */
  /*  Create key                                                       */
  /* ---------------------------------------------------------------- */

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!s.newName.trim()) {
      patch({ createError: "Vui lòng nhập tên key" });
      return;
    }
    patch({ creating: true, createError: "" });
    try {
      const res = await apiKeysApi.createKey({
        name: s.newName.trim(),
        ...(s.newExpiry ? { expiresAt: new Date(s.newExpiry).toISOString() } : {}),
      });
      patch({ createdKey: res, showCreate: false, newName: "", newExpiry: "", creating: false });
      fetchKeys();
    } catch (err) {
      patch({ createError: err instanceof Error ? err.message : "Tạo key thất bại", creating: false });
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Copy key                                                         */
  /* ---------------------------------------------------------------- */

  const copyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    patch({ copied: true });
    setTimeout(() => patch({ copied: false }), 2000);
  };

  /* ---------------------------------------------------------------- */
  /*  Toggle active                                                    */
  /* ---------------------------------------------------------------- */

  const toggleActive = async (key: ApiKey) => {
    patch({ busyId: key.id });
    try {
      await apiKeysApi.updateKey(key.id, { isActive: !key.isActive });
      fetchKeys();
    } catch {
      // ignore
    } finally {
      patch({ busyId: null });
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Delete key                                                       */
  /* ---------------------------------------------------------------- */

  const handleDelete = async (id: string) => {
    patch({ busyId: id });
    try {
      await apiKeysApi.deleteKey(id);
      patch({ confirmDeleteId: null, busyId: null });
      fetchKeys();
    } catch {
      patch({ busyId: null });
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold tracking-widest uppercase">API Keys</h2>
        <button
          type="button"
          onClick={() => patch({ showCreate: true, createdKey: null })}
          className="flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest bg-foreground text-white hover:bg-foreground/90 transition-colors"
        >
          <Plus size={14} />
          TẠO KEY
        </button>
      </div>

      {/* ---- Newly created key banner ---- */}
      {s.createdKey && (
        <div className="mb-6 border border-amber-300 bg-amber-50 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Lưu API key ngay! Key sẽ không hiển thị lại.
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                Key: <strong>{s.createdKey.name}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs bg-white border border-amber-200 rounded px-3 py-2 font-mono break-all select-all">
              {s.createdKey.key}
            </code>
            <button
              type="button"
              onClick={() => copyKey(s.createdKey!.key)}
              className="flex-shrink-0 p-2 rounded border border-amber-200 bg-white hover:bg-amber-100 transition-colors"
              title="Copy"
            >
              {s.copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      )}

      {/* ---- Create form ---- */}
      {s.showCreate && (
        <form onSubmit={handleCreate} className="mb-6 border border-border rounded-lg p-4 space-y-3">
          <p className="text-sm font-medium">Tạo API Key mới</p>
          {s.createError && (
            <p className="text-xs text-destructive bg-destructive/10 px-3 py-1.5 rounded">
              {s.createError}
            </p>
          )}
          <input
            type="text"
            placeholder="Tên key (VD: Production, Development...)"
            value={s.newName}
            onChange={(e) => patch({ newName: e.target.value })}
            className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-primary transition-colors rounded"
            autoFocus
          />
          <input
            type="datetime-local"
            value={s.newExpiry}
            onChange={(e) => patch({ newExpiry: e.target.value })}
            className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-primary transition-colors rounded text-muted-foreground"
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={s.creating}
              className="px-4 py-2 text-xs tracking-widest bg-foreground text-white hover:bg-foreground/90 transition-colors disabled:opacity-60 flex items-center gap-1.5"
            >
              {s.creating && <Loader2 size={12} className="animate-spin" />}
              TẠO
            </button>
            <button
              type="button"
              onClick={() => patch({ showCreate: false, createError: "" })}
              className="px-4 py-2 text-xs tracking-widest border border-border hover:bg-muted transition-colors"
            >
              HỦY
            </button>
          </div>
        </form>
      )}

      {/* ---- Keys list ---- */}
      {s.loading ? (
        <div className="flex items-center justify-center py-16 text-sm text-muted-foreground gap-2">
          <Loader2 size={16} className="animate-spin" /> Đang tải...
        </div>
      ) : s.keys.length === 0 ? (
        <div className="text-center py-16">
          <Key size={32} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">Chưa có API key nào</p>
          <p className="text-xs text-muted-foreground mt-1">
            Tạo key để sử dụng API từ scripts hoặc ứng dụng
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
          {s.keys.map((k) => {
            const isExpired = k.expiresAt && new Date(k.expiresAt) < new Date();
            return (
              <div key={k.id} className="px-4 py-3">
                {/* Desktop */}
                <div className="hidden md:flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{k.name}</span>
                      {!k.isActive && (
                        <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-red-100 text-red-600 uppercase">
                          Tắt
                        </span>
                      )}
                      {isExpired && (
                        <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 uppercase">
                          Hết hạn
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                      {k.prefix}...{k.lastChars}
                    </p>
                  </div>

                  <div className="text-right text-xs text-muted-foreground flex-shrink-0 w-36">
                    <p>Tạo: {new Date(k.createdAt).toLocaleDateString("vi-VN")}</p>
                    {k.lastUsedAt && (
                      <p>Dùng: {new Date(k.lastUsedAt).toLocaleDateString("vi-VN")}</p>
                    )}
                    {k.expiresAt && (
                      <p className={isExpired ? "text-red-500" : ""}>
                        Hạn: {new Date(k.expiresAt).toLocaleDateString("vi-VN")}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleActive(k)}
                    disabled={s.busyId === k.id}
                    className="p-1.5 rounded hover:bg-muted transition-colors disabled:opacity-50"
                    title={k.isActive ? "Tắt key" : "Bật key"}
                  >
                    {k.isActive ? (
                      <ToggleRight size={20} className="text-green-600" />
                    ) : (
                      <ToggleLeft size={20} className="text-muted-foreground" />
                    )}
                  </button>

                  {s.confirmDeleteId === k.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDelete(k.id)}
                        disabled={s.busyId === k.id}
                        className="px-2 py-1 text-[10px] tracking-wider bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                      >
                        {s.busyId === k.id ? "..." : "XÓA"}
                      </button>
                      <button
                        type="button"
                        onClick={() => patch({ confirmDeleteId: null })}
                        className="px-2 py-1 text-[10px] tracking-wider border border-border rounded hover:bg-muted"
                      >
                        HỦY
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => patch({ confirmDeleteId: k.id })}
                      className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                      title="Xóa key"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                {/* Mobile */}
                <div className="md:hidden space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{k.name}</span>
                      {!k.isActive && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-600">
                          Tắt
                        </span>
                      )}
                      {isExpired && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                          Hết hạn
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => toggleActive(k)}
                        disabled={s.busyId === k.id}
                        className="p-1"
                      >
                        {k.isActive ? (
                          <ToggleRight size={18} className="text-green-600" />
                        ) : (
                          <ToggleLeft size={18} className="text-muted-foreground" />
                        )}
                      </button>
                      {s.confirmDeleteId === k.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleDelete(k.id)}
                            disabled={s.busyId === k.id}
                            className="px-2 py-0.5 text-[10px] bg-red-500 text-white rounded"
                          >
                            XÓA
                          </button>
                          <button
                            type="button"
                            onClick={() => patch({ confirmDeleteId: null })}
                            className="px-2 py-0.5 text-[10px] border border-border rounded"
                          >
                            HỦY
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => patch({ confirmDeleteId: k.id })}
                          className="p-1 text-muted-foreground"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {k.prefix}...{k.lastChars}
                  </p>
                  <div className="flex gap-3 text-[11px] text-muted-foreground">
                    <span>Tạo: {new Date(k.createdAt).toLocaleDateString("vi-VN")}</span>
                    {k.lastUsedAt && (
                      <span>Dùng: {new Date(k.lastUsedAt).toLocaleDateString("vi-VN")}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
