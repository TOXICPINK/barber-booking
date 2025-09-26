export function generateSlots(dateStr: string) {
  // 09:00 - 20:00 every 30 minutes
  const slots: string[] = [];
  const d = new Date(dateStr + "T00:00:00");
  for (let hour = 9; hour <= 20; hour++) {
    for (let min of [0, 30]) {
      const slot = new Date(d);
      slot.setHours(hour, min, 0, 0);
      const hh = String(slot.getHours()).padStart(2, "0");
      const mm = String(slot.getMinutes()).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
}

export function todayISO() {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, "0");
  const d = String(t.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
