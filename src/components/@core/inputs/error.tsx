import type { FC } from "react";

interface ErrorProps {
  msg: string;
}

const Error: FC<ErrorProps> = ({ msg }) => {
  return <>{msg && <p className="text-sm text-red-500">{msg}</p>}</>;
};

export default Error;
