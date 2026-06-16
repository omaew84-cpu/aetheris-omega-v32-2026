export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Aetheris Omega v32
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          เครื่องมือวิเคราะห์ผลกระทบทางเศรษฐกิจแบบเรียลไทม์ ปี 2026
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 p-8 rounded-xl backdrop-blur">
            <h3 className="text-2xl font-bold mb-4">📊 Dashboard</h3>
            <p>วิเคราะห์ข้อมูลเศรษฐกิจแบบ Real-time</p>
          </div>
          <div className="bg-white/10 p-8 rounded-xl backdrop-blur">
            <h3 className="text-2xl font-bold mb-4">🤖 AI Control</h3>
            <p>ควบคุมด้วย Omega Control AI เวอร์ชัน 6</p>
          </div>
          <div className="bg-white/10 p-8 rounded-xl backdrop-blur">
            <h3 className="text-2xl font-bold mb-4">🔒 SOC Privacy</h3>
            <p>มาตรฐานความปลอดภัยระดับ SOC</p>
          </div>
        </div>
        <button className="mt-12 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-bold">
          เริ่มใช้งาน
        </button>
      </div>
    </div>
  )
}
