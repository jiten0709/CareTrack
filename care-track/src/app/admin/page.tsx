import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { getAppointmentCount } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getAppointmentCount();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            height={32}
            width={162}
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main>
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section>
          <StatCard
            type="scheduled"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon="assests/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon="assests/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon="assests/icons/cancelled.svg"
          />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
