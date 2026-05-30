import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";

interface IContactData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default async function DashboardPage() {
  let contactData: IContactData[] = [];

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      },
    );

    if (response.ok) {
      const data = await response.json();
      contactData = data.data ?? [];
    }
  } catch (error) {
    console.error("Error while fetching contact data\n", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 my-3">
      <p className="text-muted-foreground text-sm my-3">
        Click the message to access the message
      </p>
      <Table>
        <TableCaption>List of person who tried to contact us.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S. No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {contactData.map((item, i) => (
            <TableRow key={item._id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <span className="max-w-50 truncate block text-left text-sm text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer">
                      {item.message}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <p className="text-sm font-medium mb-1">Message</p>
                    <p className="text-sm text-muted-foreground text-justify">
                      {item.message}
                    </p>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
