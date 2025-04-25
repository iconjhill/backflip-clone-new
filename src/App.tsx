import { useEffect, useState } from "react";
import { client } from "./contentful";

function App() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    client
      .getEntries({ content_type: "homepage" })
      .then((res) => {
        console.log("✅ Contentful loaded:", res.items[0]?.fields);
        setContent(res.items[0]?.fields);
      })
      .catch((err) => {
        console.error("❌ Contentful fetch error:", err);
      });
  }, []);

  if (!content) return <div>Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-[#162340] text-white">
      <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 py-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {content.heroHeading1}
          </h1>
          <p className="text-xl text-[#76e7c0] font-semibold mb-6">
            {content.heroSubtitle}
          </p>
          <button className="px-6 py-2 rounded-full bg-[#32c3dc] text-[#162340] font-semibold">
            {content.heroButton}
          </button>
        </div>
        <img
          src={content.heroImage.fields.file.url}
          alt="Hero Visual"
          className="rounded-lg w-72 h-72 object-cover"
        />
      </section>
    </div>
  );
}

export default App;
