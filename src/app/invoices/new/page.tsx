"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMockStore } from "@/store/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { peso } from "@/lib/format";

export default function NewInvoice() {
  const r = useRouter();
  const { clients, addClient, addInvoice } = useMockStore();
  const [clientName, setClientName] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([
    { name: "", quantity: 1, unitPriceCents: 0 },
  ]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (s, it) => s + (it.quantity || 0) * (it.unitPriceCents || 0),
        0
      ),
    [items]
  );

  function updateItem(
    idx: number,
    patch: Partial<{ name: string; quantity: number; unitPriceCents: number }>
  ) {
    setItems((rows) =>
      rows.map((r, i) => (i === idx ? { ...r, ...patch } : r))
    );
  }
  function addRow() {
    setItems((rows) => [...rows, { name: "", quantity: 1, unitPriceCents: 0 }]);
  }
  function removeRow(idx: number) {
    setItems((rows) => rows.filter((_, i) => i !== idx));
  }

  async function create() {
    const existing = clients.find(
      (c) => c.name.trim().toLowerCase() === clientName.trim().toLowerCase()
    );
    const client =
      existing || addClient({ name: clientName.trim() || "Untitled Client" });
    const inv = addInvoice({ clientId: client.id, items, notes });
    r.replace(`/invoices/${inv.id}`);
  }

  return (
    <div className="grid gap-6 max-w-3xl">
      <h1 className="text-2xl font-bold">New Invoice</h1>
      <Card>
        <CardHeader>
          <CardTitle>Client & Items</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              placeholder="Client name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <Input
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            {items.map((it, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                <Input
                  className="col-span-6"
                  placeholder="Item name"
                  value={it.name}
                  onChange={(e) => updateItem(idx, { name: e.target.value })}
                />
                <Input
                  className="col-span-2"
                  type="number"
                  placeholder="Qty"
                  value={it.quantity}
                  onChange={(e) =>
                    updateItem(idx, {
                      quantity: parseInt(e.target.value || "0"),
                    })
                  }
                />
                <Input
                  className="col-span-3"
                  type="number"
                  placeholder="Unit Price (PHP)"
                  value={it.unitPriceCents / 100}
                  onChange={(e) =>
                    updateItem(idx, {
                      unitPriceCents: Math.round(
                        parseFloat(e.target.value || "0") * 100
                      ),
                    })
                  }
                />
                <button
                  className="col-span-1 text-sm text-muted-foreground"
                  onClick={() => removeRow(idx)}
                >
                  ✕
                </button>
              </div>
            ))}
            <div>
              <button className="text-sm underline" onClick={addRow}>
                + Add item
              </button>
            </div>
          </div>

          <div className="text-right text-lg font-semibold">
            Subtotal: {peso.format(subtotal / 100)}
          </div>

          <div className="flex gap-2 justify-end">
            <button
              className="text-sm"
              onClick={() =>
                setItems([{ name: "", quantity: 1, unitPriceCents: 0 }])
              }
            >
              Clear
            </button>
            <button
              className="px-3 py-2 rounded-md bg-primary text-primary-foreground"
              onClick={create}
            >
              Create draft
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
