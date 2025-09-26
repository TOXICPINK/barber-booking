'use client';

import { useEffect, useMemo, useState } from "react";
import { services } from "@/data/services";
import { barbers } from "@/data/barbers";
import { generateSlots, todayISO } from "@/lib/slots";

type BookingForm = {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  notes?: string;
};

export default function BookPage() {
  const [form, setForm] = useState<BookingForm>({
    serviceId: "",
    barberId: "",
    date: todayISO(),
    time: "",
    name: "",
    phone: "",
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ok: boolean; message?: string} | null>(null);

  const slots = useMemo(() => {
    return form.date ? generateSlots(form.date) : [];
  }, [form.date]);

  function onChange<K extends keyof BookingForm>(key: K, value: BookingForm[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function submit() {
    setSubmitting(true);
    setResult(null);
    // Simple validation
    if (!form.serviceId || !form.barberId || !form.date || !form.time || !form.name || !form.phone) {
      setResult({ ok: false, message: "لطفاً همه فیلدهای الزامی را پر کنید." });
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.ok) {
        setResult({ ok: true, message: "رزرو با موفقیت ثبت شد (نمونه)." });
      } else {
        setResult({ ok: false, message: data.message || "خطا در ثبت رزرو" });
      }
    } catch (e) {
      setResult({ ok: false, message: "ارتباط با سرور برقرار نشد." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">رزرو نوبت</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">خدمت*</label>
          <select
            className="w-full bg-transparent border rounded-lg p-2"
            value={form.serviceId}
            onChange={(e) => onChange("serviceId", e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            {services.map(s => (
              <option key={s.id} value={s.id}>{s.name} — {s.price.toLocaleString("fa-IR")} تومان</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">آرایشگر*</label>
          <select
            className="w-full bg-transparent border rounded-lg p-2"
            value={form.barberId}
            onChange={(e) => onChange("barberId", e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            {barbers.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">تاریخ*</label>
          <input
            type="date"
            className="w-full bg-transparent border rounded-lg p-2"
            value={form.date}
            onChange={(e) => onChange("date", e.target.value)}
            min={todayISO()}
          />
        </div>

        <div>
          <label className="block mb-2">ساعت*</label>
          <select
            className="w-full bg-transparent border rounded-lg p-2"
            value={form.time}
            onChange={(e) => onChange("time", e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            {slots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">نام و نام خانوادگی*</label>
          <input
            type="text"
            className="w-full bg-transparent border rounded-lg p-2"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="مثلاً: محمد رضایی"
          />
        </div>

        <div>
          <label className="block mb-2">شماره تلفن*</label>
          <input
            type="tel"
            className="w-full bg-transparent border rounded-lg p-2"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="0912xxxxxxx"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">توضیحات</label>
        <textarea
          className="w-full bg-transparent border rounded-lg p-2 min-h-[100px]"
          value={form.notes || ""}
          onChange={(e) => onChange("notes", e.target.value)}
          placeholder="توضیحات دلخواه (اختیاری)"
        />
      </div>

      {result && (
        <div className={`border rounded-lg p-3 ${result.ok ? "border-green-500" : "border-red-500"}`}>
          {result.message}
        </div>
      )}

      <div className="text-center">
        <button
          className="button disabled:opacity-50"
          onClick={submit}
          disabled={submitting}
        >
          {submitting ? "در حال ثبت..." : "ثبت رزرو"}
        </button>
      </div>
    </main>
  );
}
