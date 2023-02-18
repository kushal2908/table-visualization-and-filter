import { Card, CardBody } from "@chakra-ui/react";
import React from "react";

export default function Wrapper({ children }) {
  return (
    <Card>
      <CardBody>{children}</CardBody>
    </Card>
  );
}
