"use client";

import { useState } from "react";

// Câu hỏi hiển thị cho học sinh — CHỈ CÓ CÂU HỎI, KHÔNG CÓ ĐÁP ÁN.
const QUESTIONS = [
  { id: 1, text: "You _____ the ocean and the beach." },
  { id: 2, text: "It should be a big house with maybe _____, three cars, and a cinema." },
  { id: 3, text: "My dream house would be _____." },
  { id: 4, text: "It would have really _____ because I like places that are airy and spacious." },
  { id: 5, text: "I don't want a big house, just as long as it's _____." },
];

const TRANSLATION_PROMPTS = [
  "1. Nhà mơ ước của tôi sẽ nằm ngay cạnh đại dương (next to the ocean).",
  "2. Nó sẽ có trần nhà rất cao (high ceilings) vì tôi thích những nơi thoáng đãng và rộng rãi (airy and spacious).",
  "3. Tôi sẽ không chọn một ngôi nhà quá lớn, miễn là nó được bao quanh bởi thiên nhiên (surrounded by nature).",
  "4. Nhà mơ ước của tôi sẽ cao hai tầng (two stories high), được làm từ sàn gỗ (wooden floor boards) và tường trắng đơn giản (plain white walls).",
  "5. Nó sẽ không ở gần thành phố ồn ào — nó sẽ ở rất xa thành phố (far away from the city).",
];

const SPEAKING_QUESTIONS = [
  "Ngôi nhà mơ ước của em ở đâu? (near the beach / surrounded by nature / next to...)",
  "Nó trông như thế nào? (two stories high / high ceilings / a lot of windows...)",
  "Em muốn có gì trong nhà? (a jacuzzi / an elevator / a cinema...)",
  "Dùng cấu trúc \"would\" hoặc \"as long as\" ít nhất 1 lần.",
];

type GradeResult = {
  correctCount: number;
  total: number;
  detail: {
    question: number;
    studentAnswer: string;
    isCorrect: boolean;
    correctAnswer?: string;
  }[];
};

export default function HousesWorksheet() {
  const [studentName, setStudentName] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [translations, setTranslations] = useState<Record<number, string>>({});
  const [speaking, setSpeaking] = useState("");
  const [result, setResult] = useState<GradeResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!studentName.trim()) {
      alert("Vui lòng nhập tên học sinh");
      return;
    }
    setSubmitting(true);

    const translationPayload = TRANSLATION_PROMPTS.map((prompt, idx) => ({
      prompt,
      answer: translations[idx] || "",
    }));

    const res = await fetch("/api/worksheets/houses/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName,
        answers,
        translations: translationPayload,
        speaking,
      }),
    });

    const data: GradeResult = await res.json();
    setResult(data);
    setSubmitting(false);
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-400 p-8 text-white shadow-lg">
        <span className="mb-2 inline-block rounded-full bg-white/25 px-4 py-1 text-sm">
          CHỦ ĐỀ • MY DREAM HOUSE
        </span>
        <h1 className="text-2xl font-bold">🏡 My Dream House</h1>
      </div>

      <input
        type="text"
        placeholder="Nhập tên của bạn"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="mb-6 w-full rounded-xl border-2 border-pink-100 px-4 py-3 outline-none focus:border-pink-400"
      />

      {/* BƯỚC 01: ĐIỀN TỪ */}
      <section className="mb-8">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          BƯỚC 01 • ĐIỀN TỪ
        </span>
        <h2 className="mb-4 text-lg font-bold">Fill in the Blank</h2>

        <ol className="space-y-4">
          {QUESTIONS.map((q) => {
            const detail = result?.detail.find((d) => d.question === q.id);
            return (
              <li key={q.id} className="rounded-xl bg-white p-4 shadow-sm">
                <p className="mb-2 text-sm">
                  <b>{q.id}.</b> {q.text}
                </p>
                <input
                  type="text"
                  disabled={!!result}
                  value={answers[q.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                  className={`w-full rounded-lg border-2 px-3 py-2 text-sm outline-none ${
                    detail
                      ? detail.isCorrect
                        ? "border-green-400 bg-green-50"
                        : "border-red-400 bg-red-50"
                      : "border-pink-100 focus:border-pink-400"
                  }`}
                />
                {detail && !detail.isCorrect && (
                  <p className="mt-1 text-xs text-red-500">
                    Đáp án đúng: {detail.correctAnswer}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {/* BƯỚC 02: DỊCH CÂU */}
      <section className="mb-8">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          BƯỚC 02 • DỊCH CÂU
        </span>
        <h2 className="mb-1 text-lg font-bold">Việt → Anh</h2>
        <p className="mb-4 text-sm text-gray-500">
          Dịch các câu sau sang tiếng Anh, cố gắng dùng đúng cụm từ mục tiêu.
        </p>

        <div className="space-y-4">
          {TRANSLATION_PROMPTS.map((prompt, idx) => (
            <div key={idx} className="rounded-xl bg-white p-4 shadow-sm">
              <p className="mb-2 text-sm">{prompt}</p>
              <textarea
                disabled={!!result}
                value={translations[idx] || ""}
                onChange={(e) =>
                  setTranslations((prev) => ({ ...prev, [idx]: e.target.value }))
                }
                placeholder="Type your answer here..."
                className="min-h-[44px] w-full resize-y rounded-lg border-2 border-pink-100 px-3 py-2 text-sm outline-none focus:border-pink-400"
              />
            </div>
          ))}
        </div>
      </section>

      {/* BƯỚC 04: NÓI */}
      <section className="mb-8">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          BƯỚC 04 • NÓI
        </span>
        <h2 className="mb-1 text-lg font-bold">Speaking Practice</h2>
        <p className="mb-4 text-sm text-gray-500">
          Trả lời các câu hỏi sau, cố gắng dùng ít nhất 4 target words.
        </p>

        <div className="rounded-xl bg-pink-50 p-4">
          <ul className="mb-3 list-disc space-y-1 pl-5 text-sm">
            {SPEAKING_QUESTIONS.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
          <textarea
            disabled={!!result}
            value={speaking}
            onChange={(e) => setSpeaking(e.target.value)}
            placeholder="Write or practice your answer here..."
            className="min-h-[110px] w-full resize-y rounded-lg border-2 border-pink-100 px-3 py-2 text-sm outline-none focus:border-pink-400"
          />
          <p className="mt-1 text-right text-xs text-gray-400">
            {speaking.trim() ? speaking.trim().split(/\s+/).length : 0} words
          </p>
        </div>
      </section>

      {!result ? (
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full rounded-full bg-pink-500 py-3 font-bold text-white shadow-md disabled:opacity-50"
        >
          {submitting ? "Đang chấm..." : "📤 Nộp bài & Chấm điểm"}
        </button>
      ) : (
        <div className="rounded-xl bg-white p-4 text-center shadow-sm">
          <p className="text-lg font-bold text-pink-500">
            Điểm Điền từ: {result.correctCount}/{result.total}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Bài dịch và bài nói đã được gửi để giáo viên xem, không tự động chấm điểm.
          </p>
        </div>
      )}
    </main>
  );
}
