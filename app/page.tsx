const campaigns = [
  { name: "หลักสูตร Digital Marketing", channel: "Website + Facebook", status: "พร้อมตรวจ", accent: "violet" },
  { name: "AI for SME Weekly", channel: "LinkedIn + Email", status: "กำลังสร้าง", accent: "blue" },
  { name: "Open House 2026", channel: "Facebook", status: "ฉบับร่าง", accent: "amber" },
];

const workflow = [
  ["01", "Campaign brief", "กำหนดเป้าหมาย กลุ่มเป้าหมาย และข้อความหลัก"],
  ["02", "AI content pack", "สร้างบทความ SEO, metadata และ social captions"],
  ["03", "Human review", "ตรวจแก้และอนุมัติก่อนเผยแพร่ทุกครั้ง"],
  ["04", "Publish", "ส่งต่อไปยังเว็บไซต์หรือ webhook ที่เชื่อมไว้"],
];

export default function Home() {
  return (
    <main>
      <aside className="sidebar">
        <div className="brand"><span className="brandMark">A</span><span>AutomateEase<span className="muted">-DM</span></span></div>
        <nav aria-label="เมนูหลัก">
          <a className="navItem active" href="#overview">ภาพรวม</a>
          <a className="navItem" href="#campaigns">แคมเปญ</a>
          <a className="navItem" href="#workflow">เวิร์กโฟลว์</a>
          <a className="navItem" href="#content">คลังคอนเทนต์</a>
        </nav>
        <div className="workspace"><span className="avatar">BA</span><div><strong>BATECH</strong><small>Marketing workspace</small></div></div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><p className="eyebrow">MARKETING COMMAND CENTER</p><h1>สวัสดี, ทีมการตลาด</h1><p className="subtitle">เปลี่ยน campaign brief ให้เป็นคอนเทนต์พร้อมเผยแพร่ โดยมีคุณควบคุมทุกขั้นตอน</p></div>
          <button className="primary">+ สร้างแคมเปญ</button>
        </header>

        <section className="stats" id="overview" aria-label="สรุปภาพรวม">
          <article className="stat"><span>แคมเปญที่กำลังทำ</span><strong>03</strong><small className="positive">+1 สัปดาห์นี้</small></article>
          <article className="stat"><span>รอตรวจอนุมัติ</span><strong>08</strong><small>ต้องการการตรวจจากคุณ</small></article>
          <article className="stat"><span>เผยแพร่แล้ว</span><strong>24</strong><small className="positive">92% สำเร็จ</small></article>
          <article className="stat dark"><span>เวลาที่ประหยัดได้</span><strong>18.5h</strong><small>ใน 30 วันที่ผ่านมา</small></article>
        </section>

        <section className="grid">
          <article className="panel campaignPanel" id="campaigns">
            <div className="panelHead"><div><p className="eyebrow">ACTIVE WORK</p><h2>แคมเปญล่าสุด</h2></div><button className="textButton">ดูทั้งหมด →</button></div>
            <div className="campaignList">
              {campaigns.map((campaign) => (
                <div className="campaign" key={campaign.name}>
                  <span className={`dot ${campaign.accent}`} />
                  <div className="campaignCopy"><strong>{campaign.name}</strong><small>{campaign.channel}</small></div>
                  <span className="pill">{campaign.status}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel quick">
            <p className="eyebrow">QUICK START</p>
            <h2>วันนี้อยากโปรโมตอะไร?</h2>
            <p>ใส่เป้าหมายสั้น ๆ แล้ว AI จะเสนอ content workflow ให้คุณตรวจสอบ</p>
            <label htmlFor="goal">เป้าหมายแคมเปญ</label>
            <textarea id="goal" defaultValue="โปรโมตหลักสูตร Digital Marketing สำหรับนักเรียน ม.6" />
            <button className="primary full">สร้าง Content Pack <span>→</span></button>
          </article>
        </section>

        <section className="panel workflowPanel" id="workflow">
          <div className="panelHead"><div><p className="eyebrow">HOW IT WORKS</p><h2>เวิร์กโฟลว์ที่โปร่งใส</h2></div><span className="safe">● Human approval enabled</span></div>
          <div className="workflow">
            {workflow.map(([number, title, detail], index) => (
              <div className="step" key={number}>
                <span className="stepNumber">{number}</span>
                <div><strong>{title}</strong><p>{detail}</p></div>
                {index < workflow.length - 1 && <span className="connector">→</span>}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
