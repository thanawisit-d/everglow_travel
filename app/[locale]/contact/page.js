import { fallbackText } from "@/lib/utils";
import ContactForm from "./ContactForm";

export default async function ContactPage({ params }) {
  const { locale } = await params;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {fallbackText("ติดต่อเรา", "Contact Us", locale)}
      </h1>
      <p className="text-gray-500 mb-8">
        {fallbackText(
          "ส่งข้อความถึงเรา แล้วทีมงานจะตอบกลับโดยเร็วที่สุด",
          "Send us a message and our team will get back to you as soon as possible",
          locale
        )}
      </p>
      <ContactForm locale={locale} />
    </div>
  );
}
