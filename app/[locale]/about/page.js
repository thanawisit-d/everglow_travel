import { fallbackText, buildImageUrl } from "@/lib/utils";

export default async function AboutPage({ params }) {
  const { locale } = await params;

  const content = {
    heading: fallbackText("เกี่ยวกับเรา", "About Us", locale),
    storyTitle: fallbackText("เรื่องราวของเรา", "Our Story", locale),
    story: fallbackText(
      `Everglow Travel เกิดจากความหลงใหลในการเดินทางและความปรารถนาที่จะนำเสนอ \ 
      ประสบการณ์ท่องเที่ยวที่มีคุณภาพให้กับทุกคน เรามุ่งมั่นที่จะสร้างทริปที่ประทับใจ \ 
      และปลอดภัย พร้อมบริการที่ใส่ใจทุกรายละเอียด`,
      `Everglow Travel was born from a passion for travel and a desire to offer quality \
      travel experiences to everyone. We are committed to creating impressive and safe trips \
      with attentive service in every detail.`,
      locale
    ),
    missionTitle: fallbackText("พันธกิจของเรา", "Our Mission", locale),
    mission: fallbackText(
      `เรามุ่งมั่นที่จะเป็นผู้นำด้านการท่องเที่ยวที่ให้บริการทัวร์คุณภาพดี \ 
      ในราคาที่ทุกคนเข้าถึงได้ พร้อมสร้างประสบการณ์ที่มีความหมายให้กับนักเดินทางทุกคน`,
      `We strive to be a leader in tourism, offering quality tours at accessible prices, \
      while creating meaningful experiences for every traveler.`,
      locale
    ),
    valuesTitle: fallbackText("ค่านิยมของทีม", "Our Values", locale),
    values: [
      {
        title: fallbackText("คุณภาพ", "Quality", locale),
        desc: fallbackText(
          "เราคัดสรรทัวร์และบริการที่มีมาตรฐานสูงสุดเพื่อลูกค้าทุกคน",
          "We select tours and services with the highest standards for every customer",
          locale
        ),
      },
      {
        title: fallbackText("ปลอดภัย", "Safety", locale),
        desc: fallbackText(
          "ความปลอดภัยของลูกค้าคือสิ่งที่เราให้ความสำคัญสูงสุดในการเดินทางทุกครั้ง",
          "Customer safety is our top priority in every journey",
          locale
        ),
      },
      {
        title: fallbackText("จริงใจ", "Integrity", locale),
        desc: fallbackText(
          "เราดำเนินธุรกิจด้วยความซื่อสัตย์ โปร่งใส และรับผิดชอบต่อลูกค้า",
          "We operate with honesty, transparency, and responsibility toward our customers",
          locale
        ),
      },
      {
        title: fallbackText("ใส่ใจ", "Care", locale),
        desc: fallbackText(
          "ทีมงานของเราพร้อมดูแลลูกค้าทุกขั้นตอน ตั้งแต่เริ่มต้นจนสิ้นสุดการเดินทาง",
          "Our team is ready to take care of customers every step of the way",
          locale
        ),
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{content.heading}</h1>

      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-10 bg-gray-100">
        <img
          src={buildImageUrl('assets/images/about-hero')}
          alt={content.heading}
          className="w-full h-full object-cover"
        />
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {content.storyTitle}
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{content.story}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {content.missionTitle}
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{content.mission}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {content.valuesTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {content.values.map((value, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
