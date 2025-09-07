"use client";
import Link from "next/link";
import { useMockStore } from "@/store/mock";
import { peso } from "@/lib/format";
import AppShell from "@/components/layout/app-shell";

export default function InvoicesList() {
  const { invoices, clients } = useMockStore();
  const map = new Map(clients.map((c) => [c.id, c.name]));
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link href="/invoices/new" className="underline">
          New invoice →
        </Link>
      </div>
      <div className="grid gap-2">
        {invoices.map((i) => (
          <Link
            key={i.id}
            className="text-sm underline"
            href={`/invoices/${i.id}`}
          >
            {i.number} — {map.get(i.clientId) || "Unknown client"} —{" "}
            {peso.format(i.totalCents / 100)}
          </Link>
        ))}
        {invoices.length === 0 && (
          <div className="text-sm text-muted-foreground">No invoices yet.</div>
        )}
      </div>
    </div>
  );
}
