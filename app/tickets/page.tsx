import { TicketsHeader } from "@/components/tickets/TicketsHeader";
import { TicketsBoard } from "@/components/tickets/TicketsBoard";

export const metadata = { title: "Tickets" };

export default function TicketsPage() {
  return (
    <div className="pb-28">
      <TicketsHeader />
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <TicketsBoard />
      </section>
    </div>
  );
}
