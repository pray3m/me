"use client";

import Button from "@/common/components/elements/Button";
import React, { FC, ReactNode } from "react";
import { AiOutlineWhatsApp as WhatsAppIcon } from "react-icons/ai";
import { HiOutlineMail as EmailIcon } from "react-icons/hi";

const CONTACTS = [
  {
    title: "prem.gtm9@gmail.com",
    icon: <EmailIcon size={18} />,
    link: "mailto:prem.gtm9@gmail.com",
  },
  {
    title: "(+977) 9869933353",
    icon: <WhatsAppIcon size={18} />,
    link: "https://wa.me/9869933353",
  },
];

interface ContactProps {
  title: string;
  icon: ReactNode;
  link: string;
}

const Contact: FC = () => {
  const handleAction = (link: string) => window.open(link, "_blank");

  return (
    <section className="space-y-5">
      <p>
        You can reach out to me directly by sending an email, texting on
        WhatsApp, or connecting on social media.
      </p>
      <div className="flex gap-3">
        {CONTACTS.map((contact: ContactProps, index: number) => (
          <Button
            key={index}
            icon={contact.icon}
            onClick={() => handleAction(contact?.link)}
          >
            {contact?.title}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Contact;
