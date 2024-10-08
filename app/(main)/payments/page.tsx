"use client";

import { useRouter } from "next/navigation";
import { useTutors } from "@/lib/context/collection/tutorContext";
import { DataTable } from "@/app/components/ui/data-table";
import { useMergePayments } from "@/lib/context/collection/mergePaymentContext";
import { Badge } from "@/app/components/ui/badge";
import { Checkbox } from "@/app/components/ui/checkbox";
import { DataTableColumnHeader } from "@/app/components/ui/data-table/column-header";
import Currency from "@/lib/models/currency";
import type { MergePayment } from "@/lib/models/mergePayment";
import type { ColumnDef } from "@tanstack/react-table";
import { useUser } from "@/lib/context/collection/userContext";
import { UserRole } from "@/lib/models/user";

export default function PaymentList() {
  const { mergePayments } = useMergePayments();
  const router = useRouter();
  const { tutors } = useTutors();
  const { user } = useUser();

  const columns: ColumnDef<MergePayment>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          onClick={(e) => e.stopPropagation()} // Prevent row click
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id" />
      ),
    },
    ...(user && user.role === UserRole.ADMIN
      ? [
          {
            accessorKey: "tutorId",
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Tutor" />
            ),
            cell: ({ row }) => {
              const tutor = (id: string) => tutors.find((t) => t.id === id);
              const tutorId: string = row.getValue("tutorId");
              return <span>{tutor(tutorId)?.name}</span>;
            },
          },
        ]
      : []),
    {
      accessorKey: "month",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Month" />
      ),
    },
    {
      accessorKey: "currency",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Currency" />
      ),
      cell: ({ row }) => {
        const currency: Currency = row.getValue("currency");
        return <span>{currency}</span>;
      },
    },
    {
      accessorKey: "rate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rate" />
      ),
      cell: ({ row }) => {
        // const currency: string = row.getValue("currency");
        const rate: number = row.getValue("rate");
        return (
          <span>
            {rate.toFixed(2)}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status: string = row.getValue("status");
        function getStatusVariant(
          status: string | undefined
        ): "default" | "secondary" | "destructive" | "outline" | undefined {
          if (!status) {
            return "destructive";
          }

          switch (status.toLowerCase()) {
            case "paid":
              return "outline";
            case "pending":
              return "default";
            default:
              return "destructive";
          }
        }

        return (
          <Badge variant={getStatusVariant(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex flex-1 flex-row justify-between items-center pb-4">
        <h1 className="text-xl font-bold">Payment List</h1>
      </div>
      <DataTable
        data={mergePayments}
        columns={columns}
        getRowHref={(payment) => {
          router.push(`/payments/${payment.id}`);
        }}
      />
    </div>
  );
}