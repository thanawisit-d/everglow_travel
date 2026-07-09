import "../globals.css";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export async function generateStaticParams() {
  return [{ locale: "th" }, { locale: "en" }];
}

export const metadata = {
  title: {
    template: "%s | Everglow Travel",
    default: "Everglow Travel",
  },
  description: "Quality tours at accessible prices",
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans antialiased">
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
