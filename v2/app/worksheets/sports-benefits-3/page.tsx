"use client";

import { useState } from "react";

// Câu hỏi hiển thị cho học sinh — CHỈ CÓ CÂU HỎI, KHÔNG CÓ ĐÁP ÁN.
// So với bản HTML cũ (data-answer="..." nằm ngay trong thẻ input),
// đây là khác biệt cốt lõi: học sinh F12 xem source cũng không
// thấy đáp án ở đâu cả, vì đáp án chưa từng được gửi tới browser.
const QUESTIONS = [
  { id: 1, text: "Many people love to _____ and cheer for their favorite teams." },
  { id: 2, text: "Exercising when we're young can _____." },
  { id: 3, text: "Physical activity helps _____." },
  { id: 4, text: "Regular exercise can _____, high blood pressure, and diabetes." },
  { id: 5, text: "Endorphins released during exercise can _____ and improve your mood and memory." },
  { id: 6, text: "Being part of a team makes it easier to _____." },
  { id: 7, text: "School sport participation has been shown to _____ for up to four years." },
  { id: 8, text: "Training with a good coach helps you _____." },
  { id: 9, text: "Coming to terms with defeat helps you _____." },
  { id: 10, text: "Being on a team means you become part of a _____." },
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

export default function SportsBenefitsWorksheet() {
  const [studentName, setStudentName] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<GradeResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!studentName.trim()) {
      alert("Vui lòng nhập tên học sinh");
      return;
    }
    setSubmitting(true);

    // Gửi câu trả lời lên SERVER để chấm — server tự so đáp án,
    // không phải browser tự so như bản HTML cũ.
    const res = await fetch("/api/worksheets/sports-benefits-3/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentName, answers }),
    });

    const data: GradeResult = await res.json();
    setResult(data);
    setSubmitting(false);
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-400 p-8 text-white shadow-lg">
        <span className="mb-2 inline-block rounded-full bg-white/25 px-4 py-1 text-sm">
          CHỦ ĐỀ: THỂ THAO
        </span>
        <h1 className="text-2xl font-bold">Sports &amp; Health Benefits</h1>
      </div>

      <input
        type="text"
        placeholder="Nhập tên của bạn"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="mb-6 w-full rounded-xl border-2 border-pink-100 px-4 py-3 outline-none focus:border-pink-400"
      />

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

      {!result ? (
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-pink-500 py-3 font-bold text-white shadow-md disabled:opacity-50"
        >
          {submitting ? "Đang chấm..." : "Nộp bài"}
        </button>
      ) : (
        <div className="mt-6 rounded-xl bg-white p-4 text-center shadow-sm">
          <p className="text-lg font-bold text-pink-500">
            Điểm: {result.correctCount}/{result.total}
          </p>
        </div>
      )}
    </main>
  );
}
