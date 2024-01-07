import * as React from "react";
const DOMAIN = process.env.DOMAIN || 'localhost:3000'
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'
interface EmailTemplateProps {
  name: string;
  token: string;
}
export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  token,
}) => {
  const submit = async () => {
    return {
      mess: true,
    };
  };
  return (
    <div className=" w-[50vh] h-auto border-dashed rounded-md border-black border-2 p-5">
      <h1 className="font-semibold underline text-violet-500 text-[25px]">
        Hi {name}
      </h1>
      <div className="flex w-auto flex-col item-center justify-center">
        <h1 className="font-mono">
          Click this link and redirect to password reset page
        </h1>
        Click Me! : 
        <p>{PROTOCOL}://{DOMAIN}/reset-password/{token}</p>
      </div>
      <p className="font-mono font-semibold text-violet-500">@Team MMD</p>
    </div>
  );
};
