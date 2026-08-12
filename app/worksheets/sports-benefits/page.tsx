"use client";

import { useMemo, useState } from "react";
import {
  FIB_SENTENCES,
  WORD_BANK,
  TRANSCRIPT_PARAGRAPHS,
  TRANSLATION_PROMPTS,
  GRAMMAR_ROWS,
  SPEAKING_QUESTIONS,
  GLOSSARY,
  MINDMAP_SVG,
} from "@/lib/worksheets/sports-benefits-data";
import WorksheetShell, {
  QuestionStatus,
} from "@/components/worksheets/WorksheetShell";
import FibSentence from "@/components/worksheets/FibSentence";
import GlossaryTable from "@/components/worksheets/GlossaryTable";
import SubmitModal from "@/components/worksheets/SubmitModal";

export default function SportsBenefitsWorksheet() {
  const [studentName, setStudentName] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);
  const [fibValues, setFibValues] = useState<string[]>(
    Array(FIB_SENTENCES.length).fill("")
  );
  const [fibResults, setFibResults] = useState<(boolean | null)[]>(
    Array(FIB_SENTENCES.length).fill(null)
  );
  const [translations, setTranslations] = useState<string[]>(
    Array(TRANSLATION_PROMPTS.length).fill("")
  );
  const [speaking, setSpeaking] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<
    "confirm" | "loading" | "success" | "error"
  >("confirm");
  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [scorePreview, setScorePreview] = useState("");
  const [nameWarning, setNameWarning] = useState(false);

  const questionStatuses: QuestionStatus[] = useMemo(
    () =>
      fibValues.map((v) => (v && v.trim() ? "answered" : "unanswered")),
    [fibValues]
  );

  function setBlank(index: number, value: string) {
    setFibValues((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
    setFibResults((prev) => {
      const arr = [...prev];
      arr[index] = null;
      return arr;
    });
  }

  function checkFIB() {
    const filled = fibValues.filter((v) => v && v.trim()).length;
    alert(
      `Bạn đã điền ${filled}/${FIB_SENTENCES.length} chỗ trống. Đáp án chính xác sẽ hiện ra sau khi nộp bài.`
    );
  }

  function resetFIB() {
    setFibValues(Array(FIB_SENTENCES.length).fill(""));
    setFibResults(Array(FIB_SENTENCES.length).fill(null));
  }

  function wordCount(text: string): number {
    const t = text.trim();
    return t ? t.split(/\s+/).length : 0;
  }

  function openSubmitModal() {
    if (!studentName.trim()) {
      setNameWarning(true);
      const el = document.getElementById("student-name-input");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as HTMLInputElement | null)?.focus();
      return;
    }
    setNameWarning(false);
    const filled = fibValues.filter((v) => v && v.trim()).length;
    setScorePreview(`Đã điền ${filled} / ${FIB_SENTENCES.length} chỗ trống`);
    setModalStep("confirm");
    setModalOpen(true);
  }

  async function doSubmit() {
    setModalStep("loading");
    try {
      const translationPayload = TRANSLATION_PROMPTS.map((prompt, i) => ({
        prompt,
        answer: translations[i] || "",
      }));

      const res = await fetch("/api/worksheets/sports-benefits/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          answers: fibValues,
          translations: translationPayload,
          speaking,
        }),
      });

      if (!res.ok) throw new Error("request-failed");
      const data = await res.json();

      setSuccessText(
        `Đã lưu bài làm của ${studentName} — ${data.correctCount}/${data.total} câu điền từ đúng. Giáo viên sẽ xem được bài này trong trang kết quả.`
      );
      setSubmitted(true);
      setModalStep("success");
    } catch {
      setErrorText(
        "Không gửi được bài làm. Vui lòng kiểm tra kết nối mạng và thử lại."
      );
      setModalStep("error");
    }
  }

  return (
    <WorksheetShell
      title="🏆 Playing Sports: Benefits for Body & Brain"
      subtitle="Xem video, học từ vựng, và luyện tập nói về lợi ích của thể thao"
      totalQuestions={FIB_SENTENCES.length}
      questionStatuses={questionStatuses}
      onJumpToQuestion={(i) => {
        document
          .getElementById(`fib-row-${i}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      onSubmit={openSubmitModal}
      submitting={modalStep === "loading"}
      submitted={submitted}
    >
      {/* VIDEO / TRANSCRIPT CARD */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex aspect-video items-center justify-center rounded-xl bg-gray-900 text-center text-sm text-gray-300">
          🎬 Why playing sports benefits your body — and your brain
          <br />
          (Leah Lagos &amp; Jaspal Ricky Singh)
        </div>
        <p className="mt-2 text-center text-xs text-gray-500">
          🎬 Why playing sports benefits your body — and your brain (Leah
          Lagos &amp; Jaspal Ricky Singh)
        </p>
        <div className="mt-3 text-center">
          <button
            onClick={() => setShowTranscript((s) => !s)}
            className="rounded-full bg-pink-100 px-5 py-2 text-sm font-bold text-pink-500 hover:bg-pink-200"
          >
            {showTranscript ? "🙈 Ẩn Script" : "📄 Hiện Script"}
          </button>
        </div>
        {showTranscript && (
          <div className="mt-3 max-h-80 overflow-y-auto rounded-xl border border-pink-100 bg-pink-50/60 p-4 text-left text-sm leading-7">
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-pink-500">
              Video Script (English Transcript)
            </h4>
            {TRANSCRIPT_PARAGRAPHS.map((p, i) => (
              <p key={i} className="mb-3">
                {p}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* STUDENT NAME */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <label
          htmlFor="student-name-input"
          className="mb-2 block text-sm font-bold text-pink-500"
        >
          👤 Họ và tên HV
        </label>
        <input
          id="student-name-input"
          type="text"
          placeholder="Nhập họ và tên của bạn..."
          value={studentName}
          onChange={(e) => {
            setStudentName(e.target.value);
            if (e.target.value.trim()) setNameWarning(false);
          }}
          className="w-full max-w-md rounded-xl border border-pink-100 px-4 py-2.5 text-sm outline-none focus:border-pink-400"
        />
        {nameWarning && (
          <p className="mt-2 text-sm font-semibold text-red-500">
            ⚠️ Vui lòng nhập họ và tên trước khi nộp bài nhé!
          </p>
        )}
      </div>

      {/* STEP 1: FIB */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          BƯỚC 01 • ĐIỀN TỪ
        </span>
        <h2 className="mb-1 text-lg font-bold">Fill in the Blank</h2>
        <p className="mb-4 text-sm text-gray-500">
          Xem video rồi điền cụm từ đúng vào chỗ trống. Dùng đúng dạng từ như
          trong video.
        </p>

        <ol className="space-y-3">
          {FIB_SENTENCES.map((sentence, i) => (
            <li
              key={i}
              id={`fib-row-${i}`}
              className="rounded-xl bg-pink-50/70 p-4 text-sm leading-8"
            >
              <b className="mr-1 text-pink-500">{i + 1}.</b>
              <FibSentence
                text={sentence}
                values={[fibValues[i]]}
                results={[fibResults[i]]}
                disabled={submitted}
                onChange={(_, v) => setBlank(i, v)}
              />
            </li>
          ))}
        </ol>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={checkFIB}
            className="rounded-full bg-pink-500 px-5 py-2 text-sm font-bold text-white hover:bg-pink-600"
          >
            ✔ Kiểm tra
          </button>
          <button
            onClick={resetFIB}
            className="rounded-full bg-gray-100 px-5 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200"
          >
            ↺ Làm lại
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-pink-300 bg-white p-4">
          <p className="mb-2 text-xs font-bold text-gray-600">
            💡 Word Bank
          </p>
          <div className="flex flex-wrap gap-2">
            {WORD_BANK.map((w, i) => (
              <span
                key={i}
                className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 2: TRANSLATION */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          BƯỚC 02 • DỊCH CÂU
        </span>
        <h2 className="mb-1 text-lg font-bold">Việt → Anh</h2>
        <p className="mb-4 text-sm text-gray-500">
          Dịch các câu sau sang tiếng Anh, cố gắng dùng đúng cụm từ mục tiêu.
        </p>
        <div className="space-y-4">
          {TRANSLATION_PROMPTS.map((prompt, i) => (
            <div key={i}>
              <p className="mb-1.5 text-sm">{prompt}</p>
              <textarea
                disabled={submitted}
                value={translations[i] || ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setTranslations((prev) => {
                    const arr = [...prev];
                    arr[i] = v;
                    return arr;
                  });
                }}
                placeholder="Type your answer here..."
                className="min-h-[44px] w-full resize-y rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-pink-400"
              />
            </div>
          ))}
        </div>
      </section>

      {/* STEP 3: GRAMMAR */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          BƯỚC 03 • NGỮ PHÁP
        </span>
        <h2 className="mb-1 text-lg font-bold">Grammar Focus</h2>
        <p className="mb-4 text-sm text-gray-500">
          Hai cấu trúc thường gặp khi nói về lợi ích (benefits).
        </p>
        <div className="overflow-hidden rounded-xl border border-pink-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-pink-50 text-left text-xs font-bold uppercase text-pink-500">
                <th className="p-3">Cấu trúc</th>
                <th className="p-3">Ví dụ trong video</th>
              </tr>
            </thead>
            <tbody>
              {GRAMMAR_ROWS.map((row, i) => (
                <tr key={i} className="border-t border-pink-100">
                  <td className="p-3 align-top">
                    <b>{row.structure}</b>
                    {row.note && (
                      <div className="mt-1 text-xs text-gray-400">
                        {row.note}
                      </div>
                    )}
                  </td>
                  <td className="p-3 align-top italic text-gray-600">
                    {row.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* STEP 4: SPEAKING */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          BƯỚC 04 • NÓI
        </span>
        <h2 className="mb-1 text-lg font-bold">Speaking Practice</h2>
        <p className="mb-4 text-sm text-gray-500">
          Trả lời các câu hỏi sau, cố gắng dùng ít nhất 4 target words.
        </p>
        <div className="rounded-xl bg-pink-50 p-4">
          <ul className="mb-3 list-disc space-y-1.5 pl-5 text-sm">
            {SPEAKING_QUESTIONS.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
          <textarea
            disabled={submitted}
            value={speaking}
            onChange={(e) => setSpeaking(e.target.value)}
            placeholder="Write or practice your answer here..."
            className="min-h-[110px] w-full resize-y rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-pink-400"
          />
          <p className="mt-1 text-right text-xs text-gray-400">
            {wordCount(speaking)} words
          </p>
        </div>
      </section>

      {/* GLOSSARY */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          TỪ VỰNG
        </span>
        <h2 className="mb-4 text-lg font-bold">Glossary</h2>
        <GlossaryTable rows={GLOSSARY} />
      </section>

      {/* MINDMAP */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          SƠ ĐỒ TƯ DUY
        </span>
        <h2 className="mb-4 text-lg font-bold">
          Mindmap: Benefits of Sports
        </h2>
        <div
          className="mx-auto max-w-xl overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: MINDMAP_SVG }}
        />
      </section>

      <SubmitModal
        open={modalOpen}
        step={modalStep}
        studentName={studentName}
        scorePreview={scorePreview}
        successText={successText}
        errorText={errorText}
        onConfirm={doSubmit}
        onClose={() => setModalOpen(false)}
        onRetry={doSubmit}
      />
    </WorksheetShell>
  );
}
