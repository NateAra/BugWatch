import { Callout } from "@radix-ui/themes";
import { ReactNode } from "react";
import { MdNearbyError } from "react-icons/md";

interface ErrorMessageProps {
  children: ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  if (!children) {
    return null;
  }

  return (
    <Callout.Root color="red" className="mb-5">
      <Callout.Icon>
        <MdNearbyError />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
};

export default ErrorMessage;
