import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const data: Etudiant[] = [
  {
    id: "1",
    nom: "Lefebvre",
    prenom: "Emilie",
    email: "emilie.lefebvre@example.com",
    cin: "EE123456",
    cne: "A123456789",
    filiere: "SID",
  },
  {
    id: "2",
    nom: "Dupont",
    prenom: "Lucas",
    email: "lucas.dupont@example.com",
    cin: "EE234567",
    cne: "A234567890",
    filiere: "BD",
  },
  {
    id: "3",
    nom: "Bernard",
    prenom: "Marie",
    email: "marie.bernard@example.com",
    cin: "EE345678",
    cne: "A345678901",
    filiere: "RES",
  },
  {
    id: "4",
    nom: "Petit",
    prenom: "Thomas",
    email: "thomas.petit@example.com",
    cin: "EE456789",
    cne: "A456789012",
    filiere: "BD",
  },
  {
    id: "5",
    nom: "Garcia",
    prenom: "Laura",
    email: "laura.garcia@example.com",
    cin: "EE567890",
    cne: "A567890123",
    filiere: "RES",
  },
  {
    id: "6",
    nom: "Robert",
    prenom: "Julien",
    email: "julien.robert@example.com",
    cin: "EE678901",
    cne: "A678901234",
    filiere: "SID",
  },
  {
    id: "7",
    nom: "Rousseau",
    prenom: "Sophie",
    email: "sophie.rousseau@example.com",
    cin: "EE789012",
    cne: "A789012345",
    filiere: "BD",
  },
  {
    id: "8",
    nom: "Blanc",
    prenom: "Nicolas",
    email: "nicolas.blanc@example.com",
    cin: "EE890123",
    cne: "A890123456",
    filiere: "RES",
  },
  {
    id: "9",
    nom: "Moreau",
    prenom: "Chloé",
    email: "chloe.moreau@example.com",
    cin: "EE901234",
    cne: "A901234567",
    filiere: "SID",
  },
  {
    id: "10",
    nom: "Leroy",
    prenom: "Alexandre",
    email: "alexandre.leroy@example.com",
    cin: "EE012345",
    cne: "A012345678",
    filiere: "BD",
  },
];

export type Etudiant = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  cin: string;
  cne: string;
  filiere: "SID" | "RES" | "BD";
};

export const columns: ColumnDef<Etudiant>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    id: "Nom et Prenom",
    accessorFn: (row) => `${row.nom} ${row.prenom}`,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("Nom et Prenom")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "cne",
    header: () => <div>CNE</div>,
    cell: ({ row }) => <div className="font-medium">{row.getValue("cne")}</div>,
  },
  {
    accessorKey: "filiere",
    header: () => <div>Filiere</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("filiere")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              className="flex flex-center gap-3"
              href={`/etudiants/${row.id}`}
            >
              <Pencil className="size-5" />
              Modifier
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex flex-center gap-3"
              href={`/etudiants/${row.id}`}
            >
              <Trash className="size-5" />
              Supprimer
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex flex-center gap-3"
              href={`/etudiants/${row.id}`}
            >
              <Eye className="size-5" />
              Voir
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
