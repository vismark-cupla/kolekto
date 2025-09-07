import AppShell from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-8 md:grid-cols-2 items-center">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Kolekto</h1>
        <p className="mt-3 text-muted-foreground">
          Simple invoicing for freelancers & SMEs in the Philippines. Start
          free; buy credits or go Premium anytime.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild>
            <Link href="/auth/sign-up">Get started</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/pricing">Pricing</Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>What you get</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm">
          <div>• Create & email PDF invoices</div>
          <div>• Track paid/unpaid/overdue</div>
          <div>• Custom branding & templates</div>
          <div>• GCash & card payments</div>
        </CardContent>
      </Card>
    </section>
  );
}
