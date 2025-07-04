// pages/index.tsx
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const backendUrl = "https://agentacc1.onrender.com";
      const res = await axios.post(`${backendUrl}/api/generate-voucher`, formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: '上传失败或识别错误' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">📄 发票识别生成记账凭证</h1>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? '上传中...' : '生成凭证'}
      </button>
      {result && (
        <div className="mt-6 w-full max-w-2xl bg-gray-50 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">识别结果</h2>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
