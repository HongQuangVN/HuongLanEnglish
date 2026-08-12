"use client";

import { useState } from "react";

type GlossaryTableProps = {
  rows: [string, string][]; // [English, Tiếng Việt]
};

export default function GlossaryTable({ rows }: GlossaryTableProps) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  function speak(text: string, index: number) {
    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt của bạn không hỗ trợ phát âm. Vui lòng dùng Chrome hoặc Edge.");
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.85;
    setPlayingIndex(index);
    utter.onend = () => setPlayingIndex(null);
    utter.onerror = () => setPlayingIndex(null);
    window.speechSynthesis.speak(utter);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-bold uppercase tracking-wide text-pink-500">
            <th className="w-11 pb-2"></th>
            <th className="pb-2">English</th>
            <th className="pb-2">Tiếng Việt</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([en, vn], i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-pink-50/60" : ""}>
              <td className="py-2 pr-2">
                <button
                  onClick={() => speak(en, i)}
                  title="Nghe phát âm"
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
                    playingIndex === i
                      ? "scale-110 bg-pink-500 text-white"
                      : "bg-pink-100 text-pink-500 hover:bg-pink-200"
                  }`}
                >
                  🔊
                </button>
              </td>
              <td className="py-2 pr-4 font-medium">{en}</td>
              <td className="py-2 text-gray-600">{vn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
