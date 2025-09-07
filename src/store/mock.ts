import { create } from "zustand";
import { nanoid } from "nanoid";


export type Client = { id: string; name: string; email?: string; phone?: string; address?: string };
export type InvoiceItem = { id: string; name: string; quantity: number; unitPriceCents: number; totalCents: number };
export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "VOID";
export type Invoice = {
    id: string;
    number: string;
    status: InvoiceStatus;
    clientId: string;
    issueDate: string;
    dueDate?: string | null;
    notes?: string | null;
    subtotalCents: number;
    taxCents: number;
    totalCents: number;
    items: InvoiceItem[];
};

type Store = {
    clients: Client[];
    invoices: Invoice[];
    addClient: (data: Omit<Client, "id">) => Client;
    addInvoice: (data: { clientId: string; items: Omit<InvoiceItem, "id" | "totalCents">[]; notes?: string }) => Invoice;
    getInvoice: (id: string) => Invoice | undefined;
    seed: () => void;
    reset: () => void;
};


export const useMockStore = create<Store>((set, get) => ({
    clients: [],
    invoices: [],
    addClient: (data) => {
        const c: Client = { id: nanoid(), ...data };
        set((s) => ({ clients: [c, ...s.clients] }));
        
        return c;
    },
    addInvoice: ({ clientId, items, notes }) => {
        const subtotal = items.reduce((sum, it) => sum + it.quantity * it.unitPriceCents, 0);
        const invItems: InvoiceItem[] = items.map((it) => ({ ...it, id: nanoid(), totalCents: it.quantity * it.unitPriceCents }));
        const inv: Invoice = {
        id: nanoid(),
        number: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`,
        status: "DRAFT",
        clientId,
        issueDate: new Date().toISOString(),
        notes: notes ?? null,
        subtotalCents: subtotal,
        taxCents: 0,
        totalCents: subtotal,
        items: invItems,
        };
        set((s) => ({ invoices: [inv, ...s.invoices] }));
        return inv;
    },
    getInvoice: (id) => get().invoices.find((i) => i.id === id),
    seed: () => {
        const acme: Client = { id: nanoid(), name: "ACME Studio", email: "acme@example.com" };
        const bob: Client = { id: nanoid(), name: "Bob Cruz", email: "bob@example.com" };
        const inv1Items: InvoiceItem[] = 
        [
            { id: nanoid(), name: "Design sprint", quantity: 1, unitPriceCents: 250_000, totalCents: 250_000 },
            { id: nanoid(), name: "Logo pack", quantity: 1, unitPriceCents: 80_000, totalCents: 80_000 },
        ];
        const inv1: Invoice = {
            id: nanoid(),
            number: `INV-${new Date().getFullYear()}-0001`,
            status: "SENT",
            clientId: acme.id,
            issueDate: new Date().toISOString(),
            subtotalCents: 330_000,
            taxCents: 0,
            totalCents: 330_000,
            items: inv1Items,
            notes: null,
        };

        set({ clients: [acme, bob], invoices: [inv1] });
    },
    reset: () => set({ clients: [], invoices: [] }),
    })
);