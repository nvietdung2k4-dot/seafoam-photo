/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Camera, Globe, Layout, Users, ArrowUpRight, Star, Instagram, Facebook, Mail, Phone, Check, Calendar } from "lucide-react";

type Tab = "home" | "pricing" | "portfolio" | "contact";

const FACEBOOK_BOOKING_URL = "https://www.facebook.com/profile.php?id=61588461668727";

const Navbar = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (tab: Tab) => void }) => (
  <nav className="brutal-border-b py-4 px-6 flex justify-between items-center sticky top-0 bg-brand-bg z-50">
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
      <img src="/uploaded-photo-9.jpg" alt="SeaFoam Photo" className="h-16 w-auto object-contain scale-125 origin-left" />
    </div>
    <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
      <button 
        onClick={() => setActiveTab("home")} 
        className={`transition-all ${activeTab === "home" ? "font-black underline underline-offset-4" : ""}`}
      >
        Trang chủ
      </button>
      <button 
        onClick={() => setActiveTab("pricing")} 
        className={`transition-all ${activeTab === "pricing" ? "font-black underline underline-offset-4" : ""}`}
      >
        Báo giá & Đặt lịch
      </button>
      <button 
        onClick={() => setActiveTab("portfolio")} 
        className={`transition-all ${activeTab === "portfolio" ? "font-black underline underline-offset-4" : ""}`}
      >
        Portfolio (Thư viện ảnh)
      </button>
      <button 
        onClick={() => setActiveTab("contact")} 
        className={`transition-all ${activeTab === "contact" ? "font-black underline underline-offset-4" : ""}`}
      >
        Liên hệ
      </button>
    </div>
    <a
      href={FACEBOOK_BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="brutal-border px-4 py-1 text-xs font-bold uppercase hover:bg-brand-ink hover:text-brand-bg transition-colors"
    >
      Đặt lịch ngay
    </a>
  </nav>
);

const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="divide-y divide-brand-ink"
    >
      <section ref={ref} className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 lg:p-16 flex flex-col justify-center brutal-border-r">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl lg:text-8xl font-black leading-[0.85] uppercase mb-8 tracking-tighter">
                SeaFoam<br />Photo
              </h1>
              <p className="text-xl lg:text-2xl font-serif italic mb-8 max-w-md">
                "Thanh xuân trong trẻo, Khung hình trọn vẹn"
              </p>
              <div className="brutal-border rounded-full px-6 py-2 text-sm font-bold uppercase inline-block">
                www.seafoamphoto.com
              </div>
            </motion.div>
          </div>
          <div className="relative h-[400px] lg:h-auto overflow-hidden p-4 lg:p-8 bg-brand-ink">
            <motion.div style={{ y }} className="relative h-full flex items-center justify-center">
              <img
                src="/uploaded-photo-1.jpg"
                alt="SeaFoam Photo highlight"
                className="w-[90%] h-[82%] object-cover object-center brutal-border border-brand-bg grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            <div className="absolute bottom-6 left-6 bg-brand-bg brutal-border p-4 max-w-[220px] z-10">
              <p className="text-[10px] leading-tight font-bold uppercase">
                Lưu giữ khoảnh khắc thanh xuân qua những khung hình số hóa hiện đại.
              </p>
            </div>
          </div>
        </div>
      </section>

    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="p-8 lg:p-16 brutal-border-r">
        <h2 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
          Giới thiệu chung <Star size={32} />
        </h2>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Dự án SeaFoam Photo lưu giữ khoảnh khắc thanh xuân qua slogan: <span className="italic font-serif">“Thanh xuân trong trẻo, Khung hình trọn vẹn”</span>.
          </p>
          <p>
            SeaFoam Photo cung cấp dịch vụ nhiếp ảnh số hóa, giúp lưu giữ kỷ niệm tiện lợi và hiện đại. Dự án xây dựng trang web đặt lịch tích hợp thanh toán tự động và tận dụng truyền thông xã hội như TikTok, Fanpage để kết nối với khách hàng hiệu quả.
          </p>
        </div>
      </div>
      <div className="p-8 lg:p-16 flex flex-col justify-center bg-brand-ink text-brand-bg">
        <h2 className="text-4xl font-black uppercase mb-8">About Us</h2>
        <p className="text-lg leading-relaxed opacity-80">
          SeaFoam Photo ra đời như một Production House thu nhỏ, kết hợp thương mại điện tử trong dịch vụ của mình. Chúng tôi không chỉ bán ảnh tĩnh mà còn tạo ra một "Trải nghiệm lưu giữ thanh xuân" độc đáo với phong cách hình ảnh trong trẻo, tự nhiên và chân thật.
        </p>
        <div className="mt-8 flex justify-end">
          <ArrowUpRight size={64} className="opacity-20" />
        </div>
      </div>
    </section>
  </motion.div>
  );
};

const Pricing = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0 }}
    className="p-8 lg:p-16"
  >
    <div className="mb-16 text-center">
      <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-4">Báo giá & Đặt lịch</h2>
      <p className="text-xl font-serif italic">Chọn gói chụp phù hợp với cá tính của bạn</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {[
        {
          name: "Cá Nhân",
          price: "200.000 VNĐ",
          desc: "Photo Bọt Biển siêu hướng ngoại, hỗ trợ takecare và hướng dẫn tạo dáng. Chụp quanh Hà Nội.",
          features: ["Thời gian: 2-3 tiếng/buổi", "Makeup cơ bản: +120.000 VNĐ", "Thiết bị: Canon RP + 50mm 1.8STM", "Địa điểm: Hà Nội (Thống Nhất, Bách Thảo...)", "Chưa bao gồm phí di chuyển/vé vào cửa"]
        },
        {
          name: "Couple",
          price: "400.000 VNĐ",
          desc: "Lưu giữ khoảnh khắc đôi lứa. Photo siêu hướng ngoại, nhiệt tình.",
          features: ["Thời gian: 2-3 tiếng/buổi", "Hỗ trợ tạo dáng couple", "Thiết bị: Canon RP + 50mm 1.8STM", "Địa điểm: Hà Nội (Thống Nhất, Bách Thảo...)", "Chưa bao gồm phí di chuyển/vé vào cửa"],
          popular: true
        }
      ].map((pkg, i) => (
        <motion.div 
          key={i} 
          whileHover={{ scale: 0.98 }}
          className="brutal-border p-8 flex flex-col relative grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-500 bg-transparent hover:bg-white"
        >
          {pkg.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-ink text-[10px] font-black uppercase px-4 py-1 brutal-border">
              Phổ biến nhất
            </div>
          )}
          <h3 className="text-4xl font-black uppercase mb-2">{pkg.name}</h3>
          <div className="text-2xl font-bold mb-6 font-mono">{pkg.price}</div>
          <p className="text-sm mb-8 opacity-80 leading-relaxed">{pkg.desc}</p>
          <ul className="space-y-4 mb-12 flex-grow">
            {pkg.features.map((feat, j) => (
              <li key={j} className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-brand-ink" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <a
            href={FACEBOOK_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 font-black uppercase tracking-widest brutal-border transition-all bg-brand-ink text-brand-bg hover:bg-brand-accent hover:text-brand-ink text-center"
          >
            Đặt lịch ngay
          </a>
        </motion.div>
      ))}
    </div>

    <div className="mt-24 brutal-border p-8 lg:p-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-4xl font-black uppercase mb-6">Quy trình đặt lịch</h3>
          <div className="space-y-8">
            {[
              { step: "01", title: "Chọn gói & Thời gian", desc: "Lựa chọn gói chụp và ngày giờ phù hợp trên hệ thống." },
              { step: "02", title: "Xác nhận & Đặt cọc", desc: "Thanh toán đặt cọc tự động để giữ lịch chụp." },
              { step: "03", title: "Trao đổi Concept", desc: "Team SeaFoam sẽ liên hệ để thống nhất ý tưởng và trang phục." },
              { step: "04", title: "Thực hiện bộ ảnh", desc: "Gặp gỡ và cùng nhau tạo nên những khung hình tuyệt vời." }
            ].map((s, i) => (
              <div key={i} className="flex gap-6">
                <span className="text-2xl font-black opacity-30">{s.step}</span>
                <div>
                  <h4 className="font-bold uppercase mb-1">{s.title}</h4>
                  <p className="text-sm opacity-70">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-brand-ink text-brand-bg p-8 brutal-border border-brand-bg">
          <Calendar size={48} className="mb-6 text-brand-accent" />
          <h3 className="text-2xl font-black uppercase mb-4">Lưu ý từ Photo</h3>
          <ul className="space-y-4 text-sm opacity-80">
            <li>• <strong>Địa điểm:</strong> Tuỳ yêu cầu. "Chỗ ruột" là Công viên Thống Nhất (đủ góc), hoặc Bách Thảo (hơi tối do nhiều cây).</li>
            <li>• <strong>Phí phát sinh:</strong> Phí di chuyển, vé vào cửa... sẽ trao đổi lại sau.</li>
            <li>• <strong>Thiết bị:</strong> Canon RP + Lens 50mm 1.8STM.</li>
            <li>• Inbox ngay để chốt lịch nhé ạ!</li>
          </ul>
        </div>
      </div>
    </div>
  </motion.div>
);

const Portfolio = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="py-16"
  >
    <div className="px-8 mb-12">
      <h2 className="text-6xl font-black uppercase tracking-tighter">Portfolio (Thư viện ảnh)</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
      {[
        "/uploaded-photo-10.jpg",
        "/uploaded-photo-2.jpg",
        "/uploaded-photo-3.jpg",
        "/uploaded-photo-4.jpg",
        "/uploaded-photo-5.jpg",
        "/uploaded-photo-6.jpg",
        "/uploaded-photo-7.jpg",
        "/uploaded-photo-8.jpg"
      ].map((url, i) => (
        <motion.div 
          key={i}
          whileHover={{ scale: 0.98 }}
          className="brutal-border aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500"
        >
          <img src={url} alt={`Portfolio ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Contact = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="p-8 lg:p-16 min-h-[60vh] flex flex-col items-center justify-center text-center"
  >
    <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-8">Liên hệ</h2>
    <div className="w-full max-w-2xl brutal-border p-12 bg-brand-ink text-brand-bg flex flex-col items-center gap-8">
      <p className="text-2xl font-serif italic opacity-80">
        Hãy kết nối với chúng tôi qua Facebook để được tư vấn và đặt lịch chụp ảnh kỷ yếu!
      </p>
      <a 
        href={FACEBOOK_BOOKING_URL}
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-brand-bg text-brand-ink px-8 py-4 text-xl font-bold brutal-border hover:bg-opacity-90 transition-all hover:-translate-y-1"
      >
        <Facebook size={24} />
        Nhắn tin qua Facebook
      </a>
    </div>
  </motion.div>
);

const Footer = () => (
  <footer className="p-8 lg:p-16 bg-brand-ink text-brand-bg">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
      <div>
        <h2 className="text-6xl font-black uppercase mb-8">Thank You.</h2>
        <p className="text-xl opacity-60 mb-8 max-w-md">
          Chúng tôi luôn sẵn sàng đồng hành cùng bạn để lưu giữ những khoảnh khắc đẹp nhất của tuổi trẻ.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-12 h-12 brutal-border border-brand-bg flex items-center justify-center hover:bg-brand-bg hover:text-brand-ink transition-colors">
            <Instagram size={20} />
          </a>
          <a href={FACEBOOK_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 brutal-border border-brand-bg flex items-center justify-center hover:bg-brand-bg hover:text-brand-ink transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="w-12 h-12 brutal-border border-brand-bg flex items-center justify-center hover:bg-brand-bg hover:text-brand-ink transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-end gap-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Phone size={16} />
          <span className="text-lg font-bold">+84 123 456 789</span>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Mail size={16} />
          <span className="text-lg font-bold">hello@seafoamphoto.com</span>
        </div>
        <div className="mt-8 text-[10px] uppercase tracking-[0.5em] opacity-30">
          © 2024 SeaFoam Photo. All Rights Reserved.
        </div>
      </div>
    </div>
    <div className="brutal-border border-brand-bg p-4 flex justify-between items-center overflow-hidden whitespace-nowrap">
      <div className="flex gap-8 animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-xs font-bold uppercase tracking-widest">
            SeaFoam Photo • Thanh xuân trong trẻo • Khung hình trọn vẹn • 
          </span>
        ))}
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <div className="min-h-screen selection:bg-brand-ink selection:text-brand-bg">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        <AnimatePresence mode="wait">
          {activeTab === "home" && <Home key="home" />}
          {activeTab === "pricing" && <Pricing key="pricing" />}
          {activeTab === "portfolio" && <Portfolio key="portfolio" />}
          {activeTab === "contact" && <Contact key="contact" />}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
