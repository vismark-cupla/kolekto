"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMockStore } from "@/store/mock";
import { peso } from "@/lib/format";

export default function InvoiceView() {
  const { id } = useParams<{ id: string }>();
  const r = useRouter();
  const { getInvoice, clients } = useMockStore();
  const inv = getInvoice(id);
  if (!inv) return <main className="p-6">Not found</main>;
  const client = clients.find((c) => c.id === inv.clientId);
  return (
    <main className="mx-auto max-w-3xl p-6 grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{inv.number}</h1>
        <div className="flex gap-2">
          <button
            className="px-3 py-2 rounded-md border"
            onClick={() => r.push("/invoices")}
          >
            Back
          </button>
          <button className="px-3 py-2 rounded-md border" disabled>
            Download PDF (soon)
          </button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 text-sm">
        <div>
          Client: <span className="font-medium">{client?.name || "—"}</span>
        </div>
        <div>
          Status: <span className="font-medium">{inv.status}</span>
        </div>
        <div>Issue: {new Date(inv.issueDate).toLocaleDateString()}</div>
        <div>
          Total:{" "}
          <span className="font-semibold">
            {peso.format(inv.totalCents / 100)}
          </span>
        </div>
      </div>
      <div className="border rounded-lg p-4">
        <div className="font-medium mb-2">Items</div>
        <div className="grid gap-1 text-sm">
          {inv.items.map((it) => (
            <div key={it.id} className="flex items-center justify-between">
              <div>
                {it.quantity} × {peso.format(it.unitPriceCents / 100)} —{" "}
                {it.name}
              </div>
              <div className="tabular-nums">
                {peso.format(it.totalCents / 100)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link className="underline text-sm" href="/pricing">
        Set up pricing →
      </Link>
    </main>
  );
}
