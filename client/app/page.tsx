import ContactForm from "@/components/app/ContactForm";

export default function Home() {
  return (
    <>
      <section className="bg-linear-to-r from-pink-200 to-orange-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="min-h-60 flex flex-col justify-center items-center gap-2 text-center">
            <h3 className="text-sm font-semibold text-purple-500 ">Contact</h3>
            <p className="text-lg font-semibold sm:text-2xl md:text-4xl">
              Let's build change together
            </p>
            <p className="text-sm md:text-lg text-muted-foreground">
              Whether you want to volunteer, donate, or partner — we'd love to
              hear from you.
            </p>
          </div>
        </div>
      </section>
      <ContactForm />
    </>
  );
}
