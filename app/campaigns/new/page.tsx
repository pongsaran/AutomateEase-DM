"use client";

import { FormEvent, useMemo, useState } from "react";

type ContentPack = {
  seoTitle: string;
  metaDescription: string;
  article: string;
  facebook: string;
  hashtags: string;
};

const emptyPack: ContentPack = {
  seoTitle: "",
  metaDescription: "",
  article: "",
  facebook: "",
  hashtags: "",
};

export default function NewCampaignPage() {
  const [step, setStep] = useState<"brief" | "review" | "approved">("brief");
  const [campaign, setCampaign] = useState({
    name: "โปรโมตหลักสูตร Digital Marketing",
    audience: "นักเรียน ม.6 และผู้ปกครอง",
    objective: "เพิ่มการรับรู้และจำนวนผู้สมัครเรียน",
    keyword: "เรียน Digital Marketing",
    tone: "เป็นมิตร น่าเชื่อถือ และทันสมัย",
    cta: "ดูรายละเอียดหลักสูตรและสมัครเรียน",
  });
  const [pack, setPack] = useState<ContentPack>(emptyPack);

  const progress = useMemo(() => {
    if (step === "brief") return 1;
    if (step === "review") return 2;
    return 3;
  }, [step]);

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPack({
      seoTitle: `${campaign.name}: เตรียมทักษะการตลาดแห่งอนาคต`,
      metaDescription: `ค้นพบเส้นทางสู่สายงาน Digital Marketing สำหรับ ${campaign.audience} พร้อมทักษะที่ตลาดต้องการและการเรียนรู้จากโจทย์จริง`,
      article: `โลกธุรกิจต้องการนักการตลาดที่เข้าใจทั้งความคิดสร้างสรรค์ ข้อมูล และเทคโนโลยี ${campaign.name} จึงออกแบบมาเพื่อช่วยให้ผู้เรียนสร้างพื้นฐานที่แข็งแรง ตั้งแต่การวางกลยุทธ์คอนเทนต์ การสื่อสารแบรนด์ ไปจนถึงการวิเคราะห์ผลลัพธ์\n\nผู้เรียนจะได้ฝึกจากโจทย์จริงและเรียนรู้เครื่องมือที่ใช้ในงานการตลาดยุคใหม่ เหมาะสำหรับ ${campaign.audience} ที่ต้องการต่อยอดสู่สายอาชีพที่เติบโตอย่างต่อเนื่อง\n\n${campaign.cta}`,
      facebook: `พร้อมเปลี่ยนความชอบบนโลกดิจิทัลให้เป็นทักษะอาชีพหรือยัง? 🚀\n\n${campaign.name} ช่วยให้คุณเรียนรู้ทั้ง Content, Data และ Marketing Technology ผ่านการลงมือทำจริง\n\n👉 ${campaign.cta}`,
      hashtags: "#DigitalMarketing #MarketingTechnology #เรียนต่อ #FutureSkills",
    });
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updatePack(field: keyof ContentPack, value: string) {
    setPack((current) => ({ ...current, [field]: value }));
  }

  function approveCampaign() {
    const record = {
      id: crypto.randomUUID(),
      ...campaign,
      status: "Approved" as const,
      channel: "Website + Facebook",
      approvedAt: new Date().toISOString(),
      contentPack: pack,
    };

    try {
      const existing = JSON.parse(localStorage.getItem("automateease-campaigns") || "[]");
      localStorage.setItem("automateease-campaigns", JSON.stringify([record, ...existing]));
    } catch {
      // The approval flow still completes when browser storage is unavailable.
    }

    setStep("approved");
  }

  return (
    <main className="workspacePage">
      <header className="workspaceHeader">
        <a className="brand darkBrand" href="/"><span className="brandMark">A</span><span>AutomateEase<span className="muted">-DM</span></span></a>
        <a className="backLink" href="/">← กลับ Dashboard</a>
      </header>

      <section className="wizardShell">
        <div className="wizardIntro">
          <p className="eyebrow">CAMPAIGN WORKSPACE</p>
          <h1>{step === "brief" ? "สร้างแคมเปญใหม่" : step === "review" ? "ตรวจ Content Pack" : "พร้อมสำหรับขั้นตอนต่อไป"}</h1>
          <p className="subtitle">เวอร์ชันทดลองนี้สร้างข้อมูลจำลอง เพื่อให้คุณทดสอบขั้นตอนทั้งหมดโดยยังไม่ต้องเชื่อม API</p>
        </div>

        <ol className="progress" aria-label="ขั้นตอนสร้างแคมเปญ">
          {["Campaign brief", "Review content", "Approved"].map((label, index) => (
            <li className={progress >= index + 1 ? "done" : ""} key={label}>
              <span>{index + 1}</span>{label}
            </li>
          ))}
        </ol>

        {step === "brief" && (
          <form className="formCard" onSubmit={generate}>
            <div className="sectionTitle"><div><p className="eyebrow">STEP 01</p><h2>Campaign brief</h2></div><span className="requiredNote">* จำเป็น</span></div>
            <div className="formGrid">
              <label className="wide">ชื่อแคมเปญ *
                <input required value={campaign.name} onChange={(e) => setCampaign({ ...campaign, name: e.target.value })} />
              </label>
              <label>กลุ่มเป้าหมาย *
                <input required value={campaign.audience} onChange={(e) => setCampaign({ ...campaign, audience: e.target.value })} />
              </label>
              <label>Primary keyword *
                <input required value={campaign.keyword} onChange={(e) => setCampaign({ ...campaign, keyword: e.target.value })} />
              </label>
              <label className="wide">เป้าหมายแคมเปญ *
                <textarea required value={campaign.objective} onChange={(e) => setCampaign({ ...campaign, objective: e.target.value })} />
              </label>
              <label>Tone of voice
                <input value={campaign.tone} onChange={(e) => setCampaign({ ...campaign, tone: e.target.value })} />
              </label>
              <label>Call to action
                <input value={campaign.cta} onChange={(e) => setCampaign({ ...campaign, cta: e.target.value })} />
              </label>
            </div>
            <div className="formActions"><a className="secondary" href="/">ยกเลิก</a><button className="primary" type="submit">สร้าง Content Pack →</button></div>
          </form>
        )}

        {step === "review" && (
          <section className="reviewLayout">
            <aside className="reviewSummary">
              <p className="eyebrow">BRIEF SUMMARY</p>
              <h2>{campaign.name}</h2>
              <dl>
                <div><dt>Audience</dt><dd>{campaign.audience}</dd></div>
                <div><dt>Keyword</dt><dd>{campaign.keyword}</dd></div>
                <div><dt>Tone</dt><dd>{campaign.tone}</dd></div>
              </dl>
              <button className="secondary fullButton" onClick={() => setStep("brief")}>← แก้ไข Brief</button>
            </aside>
            <div className="reviewCard">
              <div className="sectionTitle"><div><p className="eyebrow">STEP 02</p><h2>ตรวจและแก้ไขก่อนอนุมัติ</h2></div><span className="safe">● Human review required</span></div>
              <label>SEO title
                <input value={pack.seoTitle} onChange={(e) => updatePack("seoTitle", e.target.value)} />
              </label>
              <label>Meta description
                <textarea className="compactArea" value={pack.metaDescription} onChange={(e) => updatePack("metaDescription", e.target.value)} />
              </label>
              <label>บทความ
                <textarea className="articleArea" value={pack.article} onChange={(e) => updatePack("article", e.target.value)} />
              </label>
              <label>Facebook caption
                <textarea value={pack.facebook} onChange={(e) => updatePack("facebook", e.target.value)} />
              </label>
              <label>Hashtags
                <input value={pack.hashtags} onChange={(e) => updatePack("hashtags", e.target.value)} />
              </label>
              <div className="formActions"><button className="secondary" onClick={() => setStep("brief")}>ขอแก้ไข</button><button className="primary" onClick={approveCampaign}>อนุมัติ Content Pack ✓</button></div>
            </div>
          </section>
        )}

        {step === "approved" && (
          <section className="successCard">
            <span className="successIcon">✓</span>
            <p className="eyebrow">STEP 03 · APPROVED</p>
            <h2>Content Pack ได้รับการอนุมัติแล้ว</h2>
            <p>แคมเปญถูกบันทึกในเบราว์เซอร์แล้ว แต่ยังไม่ได้เผยแพร่จริง คุณสามารถเปิดหน้าประวัติเพื่อตรวจรายการที่อนุมัติได้</p>
            <div className="successActions"><a className="secondary" href="/">กลับ Dashboard</a><a className="primary actionLink" href="/campaigns">ดูประวัติแคมเปญ →</a></div>
          </section>
        )}
      </section>
    </main>
  );
}
