"use client";

import { useEffect, useState } from "react";

type SavedCampaign = {
  id: string;
  name: string;
  audience: string;
  objective: string;
  keyword: string;
  status: "Approved";
  channel: string;
  approvedAt: string;
};

const sampleCampaigns: SavedCampaign[] = [
  {
    id: "sample-1",
    name: "หลักสูตร Digital Marketing",
    audience: "นักเรียน ม.6 และผู้ปกครอง",
    objective: "เพิ่มการรับรู้และจำนวนผู้สมัครเรียน",
    keyword: "เรียน Digital Marketing",
    status: "Approved",
    channel: "Website + Facebook",
    approvedAt: "2026-07-18T09:30:00.000Z",
  },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<SavedCampaign[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("automateease-campaigns") || "[]") as SavedCampaign[];
      setCampaigns([...saved, ...sampleCampaigns]);
    } catch {
      setCampaigns(sampleCampaigns);
    }
    setReady(true);
  }, []);

  function clearDemoData() {
    localStorage.removeItem("automateease-campaigns");
    setCampaigns(sampleCampaigns);
  }

  return (
    <main className="workspacePage">
      <header className="workspaceHeader">
        <a className="brand darkBrand" href="/"><span className="brandMark">A</span><span>AutomateEase<span className="muted">-DM</span></span></a>
        <a className="backLink" href="/">← กลับ Dashboard</a>
      </header>

      <section className="historyShell">
        <header className="historyTop">
          <div>
            <p className="eyebrow">CAMPAIGN LIBRARY</p>
            <h1>ประวัติแคมเปญ</h1>
            <p className="subtitle">ติดตาม Content Pack ที่ตรวจและอนุมัติแล้วบนอุปกรณ์นี้</p>
          </div>
          <a className="primary actionLink" href="/campaigns/new">+ สร้างแคมเปญ</a>
        </header>

        <section className="historyStats">
          <article><span>แคมเปญทั้งหมด</span><strong>{ready ? campaigns.length : "—"}</strong></article>
          <article><span>อนุมัติแล้ว</span><strong>{ready ? campaigns.filter((item) => item.status === "Approved").length : "—"}</strong></article>
          <article><span>ช่องทางหลัก</span><strong className="smallMetric">Website + Facebook</strong></article>
        </section>

        <section className="historyCard">
          <div className="historyCardHead">
            <div><p className="eyebrow">RECENT CAMPAIGNS</p><h2>รายการล่าสุด</h2></div>
            {campaigns.length > 1 && <button className="textButton" onClick={clearDemoData}>ล้างข้อมูลทดลอง</button>}
          </div>

          {!ready ? (
            <p className="emptyState">กำลังโหลดข้อมูล…</p>
          ) : campaigns.length === 0 ? (
            <div className="emptyState"><strong>ยังไม่มีแคมเปญ</strong><p>เริ่มสร้าง Campaign Brief แรกของคุณได้เลย</p></div>
          ) : (
            <div className="historyList">
              {campaigns.map((item) => (
                <article className="historyItem" key={item.id}>
                  <div className="historyIcon">C</div>
                  <div className="historyMain">
                    <strong>{item.name}</strong>
                    <p>{item.audience}</p>
                    <div className="historyMeta"><span>{item.channel}</span><span>Keyword: {item.keyword}</span></div>
                  </div>
                  <div className="historyStatus">
                    <span className="approvedPill">✓ อนุมัติแล้ว</span>
                    <time dateTime={item.approvedAt}>{new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.approvedAt))}</time>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="storageNote">ข้อมูลชุดนี้เก็บในเบราว์เซอร์ของคุณเท่านั้น ขั้นถัดไปจะย้ายไปฐานข้อมูลกลางเพื่อรองรับหลายอุปกรณ์และหลายผู้ใช้</p>
      </section>
    </main>
  );
}
