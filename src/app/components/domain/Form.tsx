import { ReactNode } from "react";

type FormProps = {
  children: ReactNode;
};

function Form({ children }: FormProps) {
  return <form className="flex flex-col gap-6">{children}</form>;
}

type SectionProps = {
  children: ReactNode;
};

function Header({ children }: SectionProps) {
  return <header className="pb-4">{children}</header>;
}

function Body({ children }: SectionProps) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function Footer({ children }: SectionProps) {
  return <footer className="flex justify-end gap-2 pt-4">{children}</footer>;
}

//Compound Component 등록
Form.Header = Header;
Form.Body = Body;
Form.Footer = Footer;

export default Form;
