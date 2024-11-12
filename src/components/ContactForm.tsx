"use client";
import { useLocale, useTranslations } from "next-intl";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SanityDocument } from "next-sanity";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const ContactForm = ({
  services,
  selectedService,
}: {
  services: SanityDocument[];
  selectedService?: string;
}) => {
  const text = useTranslations("contact");
  const locale = useLocale();
  const form = useRef<null | HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "field"
  >("idle");
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setStatus("loading");
    emailjs
      .sendForm("service_tiku6x6", "template_xbahfmr", form.current, {
        publicKey: "hQKw5RBXFV6G2cIdN",
      })
      .then(
        () => {
          setStatus("success");
        },
        (error) => {
          console.log("FAILED...", error.text);
          setStatus("field");
        }
      );
  };
  return (
    <div>
      <h2 className="text-2xl md:text-3xl mb-3 md:mb-4 font-semibold  ">
        {text("contactUs")}
      </h2>
      <form ref={form} onSubmit={sendEmail}>
        <div className="md:grid-cols-2 grid gap-3">
          <div className="space-y-1">
            <Label htmlFor="subject">{text("subject")}</Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder={text("subject")}
              className="w-full"
              disabled={status === "loading"}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">{text("name")}</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={text("name")}
              className="w-full"
              disabled={status === "loading"}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="companyName">{text("companyName")}</Label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              placeholder={text("companyName")}
              className="w-full"
              disabled={status === "loading"}
            />
          </div>{" "}
          <div className="space-y-1">
            <Label htmlFor="service">{text("service")}</Label>
            <Select
              defaultValue={selectedService}
              disabled={status === "loading"}
              name="service"
            >
              <SelectTrigger id="service" className="w-full">
                <SelectValue placeholder={text("selectService")} />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service._id} value={service.title_en}>
                    {locale === "en" ? service.title_en : service.title_no}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">{text("email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={text("email")}
              className="w-full"
              disabled={status === "loading"}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="telephone">{text("telephone")}</Label>
            <Input
              id="telephone"
              name="telephone"
              type="text"
              placeholder={text("telephone")}
              className="w-full"
              disabled={status === "loading"}
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label htmlFor="describeWhatYouNeed">
              {text("describeWhatYouNeed")}
            </Label>
            <Textarea
              id="describeWhatYouNeed"
              name="describeWhatYouNeed"
              placeholder={text("describeWhatYouNeed")}
              className="w-full"
              disabled={status === "loading"}
            />
          </div>
        </div>
        {status === "field" && (
          <p className="text-center mt-4 text-red-600">
            {text("messageFailed")}
          </p>
        )}
        {status === "success" && (
          <p className="text-center mt-4 text-primary">{text("messageSent")}</p>
        )}
        <Button
          className="flex items-center justify-center mx-auto mt-4 w-32"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <FaSpinner className="animate-spin" />
          ) : (
            text("send")
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
