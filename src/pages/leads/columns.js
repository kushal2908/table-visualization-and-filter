import { Avatar, Text, Tooltip } from "@chakra-ui/react";
import { BASE_URL } from "../../utils/routes/URLs";

export const COLUMNS = [
  {
    name: "Lead Name",
    selector: (row) => row?.name,
    minWidth: "180px",
  },
  {
    name: "Phone",
    selector: (row) => row?.phone,
  },
  {
    name: "Followup Date",
    selector: (row) => row?.followup_date,
  },
  {
    name: "Assigned",
    selector: (row) => row?.lead_assignees?.map((d) => d?.name),
    format: (row) => (
      <>
        {row?.lead_assignees?.map((d) => (
          <>
            <Tooltip label={d?.name}>
              <Avatar size="sm" src={BASE_URL + "/" + d?.image} />
            </Tooltip>
          </>
        ))}
      </>
    ),
  },
  {
    name: "Prefered Countries",
    selector: (row) => row?.lead_preferred_countries?.map((d) => d?.name),
    format: (row) => (
      <>
        {row?.lead_preferred_countries?.map((d) => (
          <Text fontSize="sm">{d?.name}</Text>
        ))}
      </>
    ),
    wrap: true,
    minWidth: "180px",
  },
  {
    name: "Status",
    selector: (row) => row?.lead_status?.name,
    format: (row) => (
      <>
        <p style={{ color: `${row?.lead_status?.color}` }}>{row?.lead_status?.name}</p>
      </>
    ),
  },
  {
    name: "Source",
    selector: (row) => row?.source?.name,
    format: (row) => (
      <>
        <p>{row?.source?.name}</p>
      </>
    ),
  },
];
