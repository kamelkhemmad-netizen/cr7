"use client";
import React, { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { 
  UploadCloud, ShieldCheck, Zap, Download, 
  FileImage, FileBarChart, QrCode, ArrowRight, 
  Loader2, CheckCircle2, Info, Share2, Gauge
} from 'lucide-react';

export default function UltimateProcessingPlatform() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [compressedFile, setCompressedFile] = useState<File | Blob | null>(null);
  const [stats, setStats] = useState({ original: 0, compressed: 0, ratio: 0 });

  // دالة ضغط الصور الحقيقية
  const handleImageCompression = async (imageFile: File) => {
    setStatus('processing');
    const options = {
      maxSizeMB: 1,            // أقصى حجم 1 ميجا
      maxWidthOrHeight: 1920,  // أقصى أبعاد
      useWebWorker: true,      // استخدام المعالج الخلفي للسرعة
    };

    try {
      const compressed = await imageCompression(imageFile, options);
      const ratio = Math.round(((imageFile.size - compressed.size) / imageFile.size) * 100);
      
      setCompressedFile(compressed);
      setStats({
        original: (imageFile.size / 1024 / 1024),
        compressed: (compressed.size / 1024 / 1024),
        ratio: ratio
      });
      setStatus('success');
    } catch (error) {
      console.error("Compression error:", error);
      setStatus('idle');
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      handleImageCompression(droppedFile);
    }
  };

  const downloadFile = () => {
    if (compressedFile) {
      const url = URL.createObjectURL(compressedFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nextgen-compressed-${file?.name}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* --- Advanced Navigation --- */}
      <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-2xl border-b border-slate-100 px-6">
        <div className="max-w-[1400px] mx-auto h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-blue-600 rounded-[14px] flex items-center justify-center text-white shadow-xl shadow-blue-200 rotate-3">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-[1000] tracking-tight uppercase">NextGen<span className="text-blue-600">.io</span></span>
          </div>
          <div className="hidden lg:flex gap-10 text-[15px] font-bold text-slate-500">
            <a href="#" className="hover:text-blue-600 transition">الأدوات الذكية</a>
            <a href="#" className="hover:text-blue-600 transition">المطورين (API)</a>
            <a href="#" className="hover:text-blue-600 transition">التسعير</a>
          </div>
          <button className="bg-slate-950 text-white px-7 py-3 rounded-2xl font-bold hover:shadow-2xl transition-all flex items-center gap-2">
            نسخة الـ Pro <ArrowRight size={18} />
          </button>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 pt-40">
        
        {/* --- Hero Branding --- */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-[1000] tracking-tighter leading-[0.9] mb-6">
            أدوات ملفات <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">بدون قيود.</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            أول منصة تستخدم خوارزميات AI في متصفحك مباشرة لضمان أقصى جودة وأمان.
          </p>
        </div>

        {/* --- Main Dashboard Area --- */}
        <section className="grid lg:grid-cols-[1fr,400px] gap-8 mb-20">
          
          {/* Work Zone */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className={`relative rounded-[48px] border-2 border-dashed transition-all duration-700 p-12 flex flex-col items-center justify-center min-h-[550px] bg-white shadow-2xl shadow-slate-200/40 ${
              status === 'processing' ? 'border-blue-400 bg-blue-50/20' : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            {status === 'idle' && (
              <div className="animate-in fade-in zoom-in duration-500 text-center">
                <div className="w-28 h-28 bg-blue-50 text-blue-600 rounded-[35%] flex items-center justify-center mx-auto mb-10 rotate-12 group-hover:rotate-0 transition-transform">
                  <UploadCloud size={56} strokeWidth={1.5} />
                </div>
                <h2 className="text-4xl font-black mb-4">ألقِ بملفاتك هنا</h2>
                <p className="text-slate-400 text-lg mb-10">يدعم الصور (JPG, PNG, WebP) بحد أقصى 20 ميجا.</p>
                <input type="file" id="fileInput" hidden onChange={(e) => e.target.files && handleImageCompression(e.target.files[0])} />
                <label htmlFor="fileInput" className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-[900] text-lg shadow-2xl shadow-blue-300 hover:bg-blue-700 cursor-pointer block">
                  اختر صورة من جهازك
                </label>
              </div>
            )}

            {status === 'processing' && (
              <div className="flex flex-col items-center animate-pulse">
                <Loader2 size={80} className="text-blue-600 animate-spin mb-8" />
                <h3 className="text-3xl font-black italic">جاري الضغط الذكي...</h3>
              </div>
            )}

            {status === 'success' && (
              <div className="w-full animate-in slide-in-from-bottom-10 duration-500">
                <div className="flex flex-col items-center">
                   <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
                      <CheckCircle2 size={56} />
                   </div>
                   <h2 className="text-4xl font-black mb-10 text-slate-900">جاهز للتحميل!</h2>
                   
                   {/* Stats Visualization */}
                   <div className="grid grid-cols-3 gap-6 w-full max-w-xl mb-12">
                      <StatCard label="الحجم الأصلي" value={`${stats.original.toFixed(2)} MB`} />
                      <StatCard label="الحجم الجديد" value={`${stats.compressed.toFixed(2)} MB`} />
                      <StatCard label="نسبة التوفير" value={`${stats.ratio}%`} highlight />
                   </div>

                   <div className="flex gap-5">
                      <button onClick={() => setStatus('idle')} className="px-8 py-4 rounded-2xl font-bold border-2 border-slate-100 hover:bg-slate-50 transition">إلغاء</button>
                      <button onClick={downloadFile} className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-xl shadow-xl shadow-blue-200 flex items-center gap-3">
                        تحميل الآن <Download size={24} />
                      </button>
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* Side Info & Tools */}
          <aside className="space-y-6">
            <div className="bg-slate-950 rounded-[40px] p-8 text-white relative overflow-hidden">
               <Gauge size={100} className="absolute -right-5 -top-5 opacity-10 rotate-12" />
               <h3 className="text-2xl font-bold mb-4 relative z-10">لماذا تختارنا؟</h3>
               <ul className="space-y-4 relative z-10">
                 <li className="flex gap-3 text-slate-400 text-sm italic items-start">
                    <Info size={20} className="text-blue-400 shrink-0" /> لا نقوم برفع ملفاتك إلى السيرفر أبداً.
                 </li>
                 <li className="flex gap-3 text-slate-400 text-sm italic items-start">
                    <Gauge size={20} className="text-emerald-400 shrink-0" /> أسرع محرك معالجة متوفر على الويب.
                 </li>
               </ul>
            </div>

            <div className="bg-white border border-slate-100 rounded-[40px] p-8">
               <h4 className="font-bold text-lg mb-6">أدوات إضافية</h4>
               <div className="space-y-3">
                  <SmallTool icon={FileBarChart} label="دمج PDF احترافي" color="bg-orange-50 text-orange-600" />
                  <SmallTool icon={QrCode} label="QR Code ديناميكي" color="bg-purple-50 text-purple-600" />
                  <SmallTool icon={Share2} label="مشاركة الملفات سحابياً" color="bg-blue-50 text-blue-600" />
               </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, highlight }: any) {
  return (
    <div className={`p-6 rounded-3xl text-center border ${highlight ? 'bg-blue-600 border-blue-600' : 'bg-slate-50 border-slate-100'}`}>
      <div className={`text-xs font-bold uppercase mb-2 ${highlight ? 'text-blue-100' : 'text-slate-400'}`}>{label}</div>
      <div className={`text-xl font-black ${highlight ? 'text-white' : 'text-slate-900'}`}>{value}</div>
    </div>
  );
}

function SmallTool({ icon: Icon, label, color }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
          <Icon size={20} />
        </div>
        <span className="font-bold text-slate-700">{label}</span>
      </div>
      <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
    </div>
  );
                        }
