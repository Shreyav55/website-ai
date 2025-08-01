// 'use client';
// import { useCallback } from "react";
// import { UserInfo } from "./DashboardHeader";

// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell
// } from "@heroui/table";
// import { Chip } from "@heroui/chip";
// import { Tooltip } from "@heroui/tooltip";
// import Image from "next/image";

// const UsersList = ({ user }: { user: UserInfo[] }) => {
//   console.log("UsersList", user);
//   const renderCell = useCallback(
//     (user: UserInfo, columnKey: keyof UserInfo | "actions") => {
//       const cellValue = user[columnKey as keyof UserInfo];

//       switch (columnKey) {
//         case "name":
//           return (
//             <div className="flex items-center gap-2">
//               <Image
//                 src={user.avatar_url || "/default-avatar.png"}
//                 alt={
//                   typeof cellValue === "string"
//                     ? cellValue
//                     : String(cellValue)
//                 }
//                 width={32}
//                 height={32}
//                 className="w-8 h-8 rounded-lg object-cover"
//               />
//               <div className="flex flex-col">
//                 <span className="font-medium">{cellValue}</span>
//                 <span className="text-xs text-default-400">
//                   {user.email}
//                 </span>
//               </div>
//             </div>
//           );
//         case "status":
//           return (
//             <Chip
//               className="capitalize"
//               color={statusColorMap[user.status]}
//               size="sm"
//               variant="flat"
//             >
//               {cellValue}
//             </Chip>
//           );
//         case "actions":
//           return (
//             <div className="relative flex justify-around items-center gap-2 text-white">
//               <Tooltip content="Details">
//                 <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                   <EyeIcon />
//                 </span>
//               </Tooltip>
//               <Tooltip content="Edit user">
//                 <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                   <EditIcon />
//                 </span>
//               </Tooltip>
//               <Tooltip color="danger" content="Delete user">
//                 <span className="text-lg text-danger cursor-pointer active:opacity-50">
//                   <DeleteIcon />
//                 </span>
//               </Tooltip>
//             </div>
//           );
//         default:
//           return cellValue;
//       }
//     },
//     []
//   );

//   return (
//     <Table aria-label="Example table with custom cells" className="text-white">
//       <TableHeader
//         className="capitalize bg-blue-600/20 rounded-2xl"
//         columns={columns}
//       >
//         {(column) => (
//           <TableColumn
//             key={column.uid}
//             align={column.uid === "actions" ? "center" : "start"}
//           >
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody items={user}>
//         {(item) => (
//           <TableRow
//             key={item.id}
//             className="group hover:scale(1.02) duration-100 rounded-2xl hover:bg-blue-600/10"
//           >
//             {(columnKey) => (
//               <TableCell>
//                 {renderCell(item, columnKey as keyof UserInfo | "actions")}
//               </TableCell>
//             )}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// };

// export default UsersList;


'use client';
import { useCallback } from "react";
import Image from "next/image";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { UserInfo } from "./DashboardHeader";
// import { EyeIcon, EditIcon, DeleteIcon } from "./Icons"; // Or inline like you have

// Define columns to match your actual data
const columns: { name: string; uid: keyof UserInfo | "actions" }[] = [
  { name: "Name", uid: "full_name" },
  { name: "Email", uid: "email" },
  { name: "Role", uid: "role" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" }
];

// Optional: status color map for Chip
const statusColorMap: Record<string, "success" | "danger" | "warning" | "primary"> = {
  active: "success",
  inactive: "danger",
  pending: "warning"
};

const UsersList = ({ user }: { user: UserInfo[] }) => {
  const renderCell = useCallback(
    (user: UserInfo, columnKey: keyof UserInfo | "actions") => {
      const cellValue = user[columnKey as keyof UserInfo];

      switch (columnKey) {
        case "full_name":
          return (
            <div className="flex items-center gap-2">
              <Image
                src={user.avatar_url || "/default-avatar.png"}
                alt={user.full_name || "User"}
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium">{user.full_name}</span>
                <span className="text-xs text-default-400">{user.email}</span>
              </div>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status] || "primary"}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-around items-center gap-2 text-white">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table aria-label="User list table" className="text-white">
      <TableHeader
        className="capitalize bg-blue-600/20 rounded-2xl"
        columns={columns}
      >
        {(column) => (
          <TableColumn
            key={column.uid}
            align={(column.uid === "actions") ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={user}>
        {(item) => (
          <TableRow
            key={item.id}
            className="group hover:scale(1.02) duration-100 rounded-2xl hover:bg-blue-600/10"
          >
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof UserInfo | "actions")}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersList;


export const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const EditIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M2.5 18.3333H17.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
}