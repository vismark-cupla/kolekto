"use client";
import { useState } from "react";
import { useMockStore } from "@/store/mock";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Clients() {
  const { clients, addClient } = useMockStore();
  const [name, setName] = useState("");
  return (
    <div className="grid gap-4 max-w-2xl">
      <h1 className="text-2xl font-bold">Clients</h1>
      <div className="flex gap-2">
        <input
          className="border px-3 py-2 rounded-md"
          placeholder="Quick add client"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="px-3 py-2 rounded-md bg-primary text-primary-foreground"
          onClick={() => {
            if (!name.trim()) return;
            addClient({ name: name.trim() });
            setName("");
          }}
        >
          Add
        </button>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-username">Username</Label>
              <Input id="sheet-demo-username" defaultValue="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className="grid gap-2">
        {clients.map((c) => (
          <div key={c.id} className="text-sm">
            {c.name}{" "}
            {c.email ? (
              <span className="text-muted-foreground">— {c.email}</span>
            ) : null}
          </div>
        ))}
        {clients.length === 0 && (
          <div className="text-sm text-muted-foreground">No clients yet.</div>
        )}
      </div>
    </div>
  );
}
