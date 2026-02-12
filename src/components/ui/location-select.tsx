"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Loader2 } from "lucide-react";

interface LocationSelectProps {
  label: string;
  placeholder: string;
  options: { code: number; name: string }[];
  value: number | null;
  onChange: (code: number | null, name: string) => void;
  loading?: boolean;
  disabled?: boolean;
  error?: string;
}

export function LocationSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  loading = false,
  disabled = false,
  error,
}: LocationSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.code === value);

  const filtered = search
    ? options.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()))
    : options;

  /* Close on click outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Focus search when opened */
  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <label className="text-sm font-medium text-foreground/80 mb-1.5 block">{label}</label>

      {/* Trigger */}
      <button
        type="button"
        disabled={disabled || loading}
        onClick={() => {
          if (!disabled && !loading) {
            setOpen(!open);
            setSearch("");
          }
        }}
        className={`w-full flex items-center justify-between border px-4 py-2.5 text-sm outline-none transition-colors text-left ${
          error
            ? "border-red-400"
            : open
              ? "border-primary"
              : "border-border hover:border-primary/40"
        } ${disabled ? "bg-muted cursor-not-allowed opacity-60" : "bg-white cursor-pointer"}`}
      >
        <span className={selected ? "text-foreground" : "text-muted-foreground"}>
          {loading ? "Đang tải..." : selected ? selected.name : placeholder}
        </span>
        {loading ? (
          <Loader2 size={14} className="text-muted-foreground animate-spin shrink-0" />
        ) : (
          <ChevronDown
            size={14}
            className={`text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {/* Dropdown */}
      {open && !disabled && !loading && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-border rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border">
            <Search size={14} className="text-muted-foreground shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm..."
              className="flex-1 text-sm outline-none bg-transparent placeholder:text-muted-foreground"
            />
          </div>

          {/* Options list */}
          <div className="max-h-[240px] overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Không tìm thấy</p>
            ) : (
              filtered.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => {
                    onChange(option.code, option.name);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    option.code === value
                      ? "bg-primary/5 text-primary font-medium"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {option.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
