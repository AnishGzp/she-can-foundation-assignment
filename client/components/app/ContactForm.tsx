"use client";

import { Phone, Mail } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface IFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.error) {
          const errorMsg = data.error[0]?.msg;
          toast.error(`${data.message}: ${errorMsg}`);
          return;
        }
        toast.error(data.message || "Internal server error");
        return;
      }

      toast.success(data.message || "Contact details saved successfully");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 my-6 py-6">
      <div className="my-3 grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="px-3 md:px-5 py-5 shadow rounded-lg">
          <p className="text-lg font-semibold">Send us a message</p>
          <p className="text-sm text-muted-foreground">
            We typically respond within two business days.
          </p>

          <form className="my-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <Button
              className="md:max-w-1/2 bg-linear-to-r from-purple-500 to-pink-400"
              disabled={loading}
              onClick={handleSubmit}
            >
              {!loading ? "Send Message" : "Sending..."}
            </Button>
          </form>
        </div>

        <div className="md:row-span-2 items-center overflow-hidden rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.5258694167!2d76.7635779835684!3d28.64368473473721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1780070832091!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="min-h-75 md:min-h-full w-full h-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="px-3 md:px-5 py-5 shadow rounded-lg space-y-3 bg-linear-to-r from-pink-100 to-orange-200">
          <p className="text-xl font-semibold">Reach us directly</p>
          <div className="my-6 space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="text-purple-500 size-5" />
              <p className="text-sm">+91 82838 41830</p>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="text-purple-500 size-5" />
              <p className="text-sm">president@shecanfoundation.org</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="https://www.instagram.com/shecanfoundation.ngo">
              <div className="p-2 bg-white rounded-full">
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                >
                  <path
                    d="M11 3.5H12M4.5 0.5H10.5C12.7091 0.5 14.5 2.29086 14.5 4.5V10.5C14.5 12.7091 12.7091 14.5 10.5 14.5H4.5C2.29086 14.5 0.5 12.7091 0.5 10.5V4.5C0.5 2.29086 2.29086 0.5 4.5 0.5ZM7.5 10.5C5.84315 10.5 4.5 9.15685 4.5 7.5C4.5 5.84315 5.84315 4.5 7.5 4.5C9.15685 4.5 10.5 5.84315 10.5 7.5C10.5 9.15685 9.15685 10.5 7.5 10.5Z"
                    stroke="#000000"
                  />
                </svg>
              </div>
            </Link>
            <Link href="https://www.linkedin.com/company/shecanfoundation/">
              <div className="p-2 bg-white rounded-full">
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                >
                  <path
                    d="M4.5 6V11M10.5 11V8.5C10.5 7.39543 9.60457 6.5 8.5 6.5C7.39543 6.5 6.5 7.39543 6.5 8.5V11V6M4 4.5H5M1.5 0.5H13.5C14.0523 0.5 14.5 0.947715 14.5 1.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H1.5C0.947716 14.5 0.5 14.0523 0.5 13.5V1.5C0.5 0.947716 0.947715 0.5 1.5 0.5Z"
                    stroke="#000000"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
