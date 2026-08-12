"use client";

import { useMemo, useState } from "react";
import { TOPICS, TopicData } from "@/lib/worksheets/topics-data";
import WorksheetShell, {
  QuestionStatus,
} from "@/components/worksheets/WorksheetShell";
import FibSentence from "@/components/worksheets/FibSentence";
import GlossaryTable from "@/components/worksheets/GlossaryTable";
import SubmitModal from "@/components/worksheets/SubmitModal";

type FibState = Record<string, string[]>; // topicId -> flat blank values
type FibResults = Record<string, (boolean | null)[]>; // topicId -> per-blank result (null before grading)
type TranslationState = Record<string, string[]>; // topicId -> per-sentence answer
type SpeakingState = Record<string, string>; // topicId -> speaking text

function blanksPerTopic(topic: TopicData): number {
  return topic.fibRows.reduce((sum, r) => sum + r.blanksCount, 0);
}

export default function FiveTopicsWorksheet() {
  const [activeTopic, setActiveTopic] = useState(TOPICS[0].id);
  const [studentName, setStudentName] = useState("");
  const [fib, setFib] = useState<FibState>({});
  const [fibResults, setFibResults] = useState<FibResults>({});
  const [translations, setTranslations] = useState<TranslationState>({});
  const [speaking, setSpeaking] = useState<SpeakingState>({});

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<
    "confirm" | "loading" | "success" | "error"
  >("confirm");
  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [nameWarning, setNameWarning] = useState(false);

  const currentTopic = TOPICS.find((t) => t.id === activeTopic)!;

  // ==== Trạng thái câu hỏi cho sidebar: mỗi topic tính là 1 "câu hỏi" tổng ====
  const questionStatuses: QuestionStatus[] = useMemo(() => {
    return TOPICS.map((t) => {
      const values = fib[t.id] || [];
      const total = blanksPerTopic(t);
      const answeredBlanks = values.filter((v) => v && v.trim()).length;
      if (answeredBlanks === 0) return "unanswered";
      if (answeredBlanks >= total) return "answered";
      return "flagged";
    });
  }, [fib]);

  function setBlank(topicId: string, blankIndex: number, value: string) {
    setFib((prev) => {
      const arr = [...(prev[topicId] || [])];
      arr[blankIndex] = value;
      return { ...prev, [topicId]: arr };
    });
    setFibResults((prev) => {
      if (!prev[topicId]) return prev;
      const arr = [...prev[topicId]];
      arr[blankIndex] = null;
      return { ...prev, [topicId]: arr };
    });
  }

  function checkFIB(topicId: string) {
    // Không có đáp án ở client — chỉ đánh dấu "đã điền" hay chưa.
    // Việc chấm điểm thật sự diễn ra ở server khi nộp bài.
    const topic = TOPICS.find((t) => t.id === topicId)!;
    const total = blanksPerTopic(topic);
    const values = fib[topicId] || [];
    const filled = values.filter((v) => v && v.trim()).length;
    alert(
      `Bạn đã điền ${filled}/${total} chỗ trống. Đáp án chính xác sẽ hiện ra sau khi nộp bài.`
    );
  }

  function resetFIB(topicId: string) {
    setFib((prev) => ({ ...prev, [topicId]: [] }));
    setFibResults((prev) => ({ ...prev, [topicId]: [] }));
  }

  function setTranslation(topicId: string, index: number, value: string) {
    setTranslations((prev) => {
      const arr = [...(prev[topicId] || [])];
      arr[index] = value;
      return { ...prev, [topicId]: arr };
    });
  }

  function setSpeak(topicId: string, value: string) {
    setSpeaking((prev) => ({ ...prev, [topicId]: value }));
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
    const totalBlanks = TOPICS.reduce((s, t) => s + blanksPerTopic(t), 0);
    const filled = TOPICS.reduce(
      (s, t) => s + (fib[t.id] || []).filter((v) => v && v.trim()).length,
      0
    );
    setSuccessText("");
    setModalStep("confirm");
    setModalOpen(true);
    // lưu tạm số đã điền để hiển thị trong modal (dùng chung successText slot trước khi có điểm thật)
    setScorePreviewText(`Đã điền ${filled} / ${totalBlanks} chỗ trống`);
  }

  const [scorePreviewText, setScorePreviewText] = useState("");

  async function doSubmit() {
    setModalStep("loading");
    try {
      const answersPayload: Record<string, string[]> = {};
      const translationsPayload: Record<
        string,
        { prompt: string; answer: string }[]
      > = {};
      TOPICS.forEach((t) => {
        answersPayload[t.id] = fib[t.id] || [];
        translationsPayload[t.id] = t.translations.map((prompt, i) => ({
          prompt,
          answer: (translations[t.id] || [])[i] || "",
        }));
      });

      const res = await fetch("/api/worksheets/five-topics/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          answers: answersPayload,
          translations: translationsPayload,
          speaking,
        }),
      });

      if (!res.ok) throw new Error("request-failed");
      const data = await res.json();

      setSuccessText(
        `Đã lưu bài làm của ${studentName} — ${data.totalCorrect}/${data.totalBlanks} câu điền từ đúng. Giáo viên sẽ xem được bài này trong trang kết quả.`
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
      title="5 Topics - Authentic Listening"
      subtitle="Phiếu bài tập từ vựng & luyện nói từ ngữ liệu thực — chọn chủ đề bên dưới để bắt đầu."
      totalQuestions={TOPICS.length}
      questionStatuses={questionStatuses}
      onJumpToQuestion={(i) => setActiveTopic(TOPICS[i].id)}
      onSubmit={openSubmitModal}
      submitting={modalStep === "loading"}
      submitted={submitted}
    >
      {/* GIỚI THIỆU */}
      <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm">
        <p className="mb-2 text-sm">
          Chào các bạn, mình là <b>Hương Lan</b>, đây là những ngữ liệu thực
          mình sưu tầm được trong quá trình soạn bài và học tiếng Anh.
        </p>
        <p className="mb-2 text-sm">
          Để nói được tốt, hãy <b>&quot;tắm mình&quot;</b> trong podcast,
          authentic materials, ghi chép lại tất cả các <b>CỤM</b>,{" "}
          <b>cấu trúc ngữ pháp</b> mà người bản xứ hay sử dụng. Cuối cùng hãy{" "}
          <b>shadowing</b> và áp dụng chúng vào bài nói hằng ngày — chỉ cần
          làm 1 tháng như vậy, mình đảm bảo bạn sẽ lên trình nói.
        </p>
        <p className="text-sm">
          Nếu bạn muốn được chấm bài speaking, hãy liên lạc Zalo{" "}
          <b>0368 344 648</b>, mình sẽ chấm hoàn toàn miễn phí cho bạn.
        </p>
      </div>

      {/* THÔNG TIN HỌC SINH */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          BẮT ĐẦU
        </span>
        <h2 className="mb-1 text-lg font-bold">Thông tin người làm bài</h2>
        <p className="mb-4 text-sm text-gray-500">
          Nhập tên của em trước khi làm bài. Làm xong, bấm nút{" "}
          <b>&quot;📤 Nộp bài&quot;</b> ở sidebar bên phải để gửi bài cho
          giáo viên.
        </p>
        <input
          id="student-name-input"
          type="text"
          placeholder="Ví dụ: Nguyễn Văn A"
          value={studentName}
          onChange={(e) => {
            setStudentName(e.target.value);
            if (e.target.value.trim()) setNameWarning(false);
          }}
          className="w-full max-w-md rounded-xl border-2 border-pink-100 px-4 py-2.5 text-sm outline-none focus:border-pink-400"
        />
        {nameWarning && (
          <p className="mt-2 text-sm font-semibold text-red-500">
            ⚠️ Vui lòng nhập tên trước khi nộp bài nhé!
          </p>
        )}
      </div>

      {/* TAB NAV */}
      <div className="sticky top-2 z-10 flex flex-wrap gap-2 rounded-2xl bg-white/90 p-2.5 shadow-sm backdrop-blur">
        {TOPICS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTopic(t.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-bold transition ${
              activeTopic === t.id
                ? "border-pink-500 bg-pink-500 text-white shadow"
                : "border-gray-200 text-gray-500 hover:border-pink-300 hover:text-pink-500"
            }`}
          >
            <span>{t.icon}</span>
            <span className="hidden sm:inline">{t.title}</span>
          </button>
        ))}
      </div>

      {/* TOPIC PANEL */}
      <TopicPanel
        topic={currentTopic}
        fibValues={fib[currentTopic.id] || []}
        fibResultValues={fibResults[currentTopic.id] || []}
        translationValues={translations[currentTopic.id] || []}
        speakingValue={speaking[currentTopic.id] || ""}
        onBlankChange={(i, v) => setBlank(currentTopic.id, i, v)}
        onCheck={() => checkFIB(currentTopic.id)}
        onReset={() => resetFIB(currentTopic.id)}
        onTranslationChange={(i, v) =>
          setTranslation(currentTopic.id, i, v)
        }
        onSpeakChange={(v) => setSpeak(currentTopic.id, v)}
        wordCount={wordCount(speaking[currentTopic.id] || "")}
        disabled={submitted}
      />

      <SubmitModal
        open={modalOpen}
        step={modalStep}
        studentName={studentName}
        scorePreview={scorePreviewText}
        successText={successText}
        errorText={errorText}
        onConfirm={doSubmit}
        onClose={() => setModalOpen(false)}
        onRetry={doSubmit}
      />
    </WorksheetShell>
  );
}

function TopicPanel({
  topic,
  fibValues,
  fibResultValues,
  translationValues,
  speakingValue,
  onBlankChange,
  onCheck,
  onReset,
  onTranslationChange,
  onSpeakChange,
  wordCount,
  disabled,
}: {
  topic: TopicData;
  fibValues: string[];
  fibResultValues: (boolean | null)[];
  translationValues: string[];
  speakingValue: string;
  onBlankChange: (blankIndex: number, value: string) => void;
  onCheck: () => void;
  onReset: () => void;
  onTranslationChange: (index: number, value: string) => void;
  onSpeakChange: (value: string) => void;
  wordCount: number;
  disabled?: boolean;
}) {
  // Tính trước vị trí offset của mỗi FIB row trong mảng blank phẳng,
  // tránh mutate biến trong lúc render (không an toàn với React Compiler).
  const rowOffsets: number[] = [];
  {
    let acc = 0;
    for (const row of topic.fibRows) {
      rowOffsets.push(acc);
      acc += row.blanksCount;
    }
  }

  return (
    <div className="space-y-6">
      {/* AUDIO CARD */}
      <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-pink-300 bg-white p-5 shadow-sm">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-xl">
          🎧
        </div>
        <div>
          <p className="text-sm font-bold">{topic.audioTitle}</p>
          <p className="text-xs text-gray-500">{topic.audioDesc}</p>
        </div>
      </div>

      {/* STEP 1: FIB */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-gray-900 px-4 py-1 text-xs font-bold text-white">
          BƯỚC 01
        </span>
        <h2 className="mb-1 text-lg font-bold">Nghe và điền từ còn thiếu</h2>
        <p className="mb-4 text-sm text-gray-500">
          Nghe audio và điền <mark className="rounded bg-yellow-300 px-1.5 font-bold text-gray-900">cụm từ</mark> đúng vào chỗ
          trống để hoàn thành nội dung.
        </p>

        <div className="overflow-hidden rounded-xl border border-pink-100">
          <table className="w-full">
            <tbody>
              {topic.fibRows.map((row, ri) => {
                const startIndex = rowOffsets[ri];
                const rowValues = fibValues.slice(
                  startIndex,
                  startIndex + row.blanksCount
                );
                const rowResults = fibResultValues.slice(
                  startIndex,
                  startIndex + row.blanksCount
                );
                return (
                  <tr
                    key={ri}
                    className={ri % 2 === 1 ? "bg-pink-50/50" : ""}
                  >
                    <td className="w-32 border-b border-dotted border-pink-100 p-3 align-top text-sm font-bold text-pink-500">
                      {row.who}
                      <br />
                      <span className="text-xs font-normal text-gray-400">
                        ({row.country})
                      </span>
                    </td>
                    <td className="border-b border-dotted border-pink-100 p-3 text-sm">
                      <FibSentence
                        text={row.text}
                        values={rowValues}
                        results={rowResults}
                        disabled={disabled}
                        onChange={(bi, v) => onBlankChange(startIndex + bi, v)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={onCheck}
            className="rounded-full bg-pink-500 px-5 py-2 text-sm font-bold text-white hover:bg-pink-600"
          >
            ✓ Kiểm tra đáp án
          </button>
          <button
            onClick={onReset}
            className="rounded-full bg-gray-100 px-5 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200"
          >
            ↺ Làm lại
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-pink-300 bg-white p-4">
          <p className="mb-2 text-xs font-bold text-gray-600">
            💡 Ngân hàng từ (Word Bank): dùng các cụm này để điền vào chỗ
            trống ở trên.
          </p>
          <div className="flex flex-wrap gap-2">
            {topic.wordBank.map((w, i) => (
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
        <span className="mb-3 inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white">
          BƯỚC 02
        </span>
        <h2 className="mb-1 text-lg font-bold">
          Dịch câu chứa từ vựng mục tiêu (Việt → Anh)
        </h2>
        <p className="mb-4 text-sm text-gray-500">
          Dịch các câu sau sang tiếng Anh. Dùng đúng các từ in đậm và cấu
          trúc ở Bước 03.
        </p>
        <div className="space-y-4">
          {topic.translations.map((prompt, i) => (
            <div key={i}>
              <p className="mb-1.5 text-sm">{prompt}</p>
              <textarea
                disabled={disabled}
                value={translationValues[i] || ""}
                onChange={(e) => onTranslationChange(i, e.target.value)}
                rows={1}
                placeholder="Gõ câu tiếng Anh của em vào đây..."
                className="w-full resize-y rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-pink-400"
              />
            </div>
          ))}
        </div>
      </section>

      {/* STEP 3: STRUCTURES */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-green-600 px-4 py-1 text-xs font-bold text-white">
          BƯỚC 03
        </span>
        <h2 className="mb-1 text-lg font-bold">Cấu trúc hay để áp dụng</h2>
        <p className="mb-4 text-sm text-gray-500">
          Các cấu trúc thường gặp trong bài nghe mà học sinh có thể áp dụng
          lại.
        </p>
        <div className="space-y-4">
          {topic.structures.map((rule, i) => (
            <div key={i} className="rounded-xl bg-green-50/60 p-4">
              <h3 className="mb-2 text-sm font-bold text-green-800">
                {rule.title}
              </h3>
              {rule.paragraphs.map((p, pi) => (
                <p key={pi} className="mb-2 text-sm text-gray-700">
                  {p}
                </p>
              ))}
              {rule.examples.map((ex, ei) => (
                <p
                  key={ei}
                  className="rounded-lg bg-white px-3 py-2 text-sm italic text-gray-600"
                >
                  {ex}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* STEP 4: SPEAKING */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-amber-500 px-4 py-1 text-xs font-bold text-white">
          BƯỚC 04
        </span>
        <h2 className="mb-1 text-lg font-bold">
          Luyện nói: 1 phút về &quot;{topic.title}&quot;
        </h2>
        <p className="mb-4 text-sm text-gray-500">
          Dùng từ vựng và cấu trúc đã học ở trên để luyện nói.
        </p>
        <div className="rounded-xl bg-amber-50 p-4">
          <span className="mb-3 inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-amber-600 shadow-sm">
            ⏱ Nói trong 1 phút
          </span>
          <ul className="mb-3 space-y-2 text-sm">
            {topic.speakingPrompts.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <textarea
            disabled={disabled}
            value={speakingValue}
            onChange={(e) => onSpeakChange(e.target.value)}
            placeholder="Viết dàn ý hoặc bài nói của em vào đây trước khi luyện nói..."
            className="min-h-[110px] w-full resize-y rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-pink-400"
          />
          <p className="mt-1 text-right text-xs text-gray-400">
            {wordCount} từ
          </p>
        </div>
      </section>

      {/* GLOSSARY */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          TỪ VỰNG
        </span>
        <h2 className="mb-1 text-lg font-bold">
          Bảng từ vựng mục tiêu (Target Words)
        </h2>
        <p className="mb-4 text-sm text-gray-500">
          Tổng hợp toàn bộ cụm từ mục tiêu của chủ đề này kèm nghĩa tiếng
          Việt.
        </p>
        <GlossaryTable rows={topic.glossary} />
      </section>

      {/* MINDMAP */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-bold text-pink-500">
          TỔNG KẾT
        </span>
        <h2 className="mb-1 text-lg font-bold">
          Mindmap từ vựng &quot;{topic.title}&quot;
        </h2>
        <p className="mb-4 text-sm text-gray-500">
          Nhìn lại toàn bộ từ vựng đã học theo từng nhóm chủ đề.
        </p>
        <div
          className="mx-auto max-w-2xl overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: topic.mindmapSvg }}
        />
      </section>
    </div>
  );
}
