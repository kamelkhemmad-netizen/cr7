import React from 'react';
import { Image, FileText, QrCode, Zap, Shield, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <header className="py-20 px-6 text-center bg-white border-b">
        <h1 className="text-5xl font-extrabold tracking-tight text-blue-600 mb-4">
          NextGen File Tools
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          الجيل القادم من أدوات الملفات الرقمية: سريعة، آمنة، ومجانية تماماً.
        </p>
      </header>

      {/* Tools Grid */}
      <main className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        <ToolCard 
          icon={<Image className="w-8 h-8 text-blue-500" />}
          title="ضغط الصور"
          desc="تقليل الحجم مع الحفاظ على الجودة العالية لـ JPG و PNG."
        />
        <ToolCard 
          icon={<FileText className="w-8 h-8 text-green-500" />}
          title="أدوات PDF"
          desc="دمج، فصل، وتقليل حجم ملفات PDF بضغطة واحدة."
        />
        <ToolCard 
          icon={<QrCode className="w-8 h-8 text-purple-500" />}
          title="مولد QR"
          desc="إنشاء أكواد QR ديناميكية واحترافية لروابطك."
        />
      </main>

      {/* Features Section */}
      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <FeatureItem icon={<Zap />} title="سرعة فائقة" desc="معالجة في أقل من ثانيتين." />
          <FeatureItem icon={<Shield />} title="خصوصية تامة" desc="ملفاتك لا تغادر جهازك أبداً." />
          <FeatureItem icon={<Globe />} title="بدون تسجيل" desc="استخدم جميع الأدوات فوراً مجاناً." />
        </div>
      </section>
    </div>
  );
}

function ToolCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-all cursor-pointer group">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="flex flex-col items-center">
      <div className="p-3 bg-blue-600 rounded-full mb-4">{icon}</div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}

