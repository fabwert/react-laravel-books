import { Card, CardBody } from "@nextui-org/react";
import { FC } from "react";

interface SimpleCardProps {
  message: string;
}

const SimpleCard: FC<SimpleCardProps> = ({ message }) => {
  return (
    <Card isBlurred>
      <CardBody className="text-small justify-between">
        <p>{message}</p>
      </CardBody>
    </Card>
  );
};

export default SimpleCard;
