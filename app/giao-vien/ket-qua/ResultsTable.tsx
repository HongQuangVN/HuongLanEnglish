"use client";

import { useMemo, useState } from "react";

// ============================================================
// Metadata hiển thị (icon, tên) cho từng topic — dùng chung để
// vẽ chip điểm trong bảng và tab trong modal chi tiết.
// ============================================================
const TOPIC_META: Record<string, { label: string; icon: string }> = {
  houses: { label: "Dream House", icon: "🏡" },
  food: { label: "Favorite Food", icon: "🍜" },
  firstjob: { label: "First Job", icon: "💼" },
  travel: { label: "Travel", icon: "✈️" },
  shopping: { label: "Shopping", icon: "🛍️" },
  "sports-benefits": { label: "Sports Benefits", icon: "🏅" },
};

const ALL_TOPICS = Object.keys(TOPIC_META);

type FibItem = {
  answer_key?: string;
  student_answer: string;
  is_correct: boolean;
};

type FibData = { items: FibItem[]; correct: number; total: number };
type TranslationItem = { prompt: string; answer: string };

// Dữ liệu submission có 2 dạng tùy loại phiếu:
// - "5-topics": fib/translations/speaking LỒNG theo từng topic (Record<topic, ...>)
// - "sports-benefits": fib/translations/speaking PHẲNG (không lồng theo topic)
type Submission = {
  id: string | number;
  student_name: string;
  created_at: string;
  total_score: number;
  max_score: number;
  data?: {
    worksheet?: string;
    fib?: Record<string, FibData> | FibData;
    translations?: Record<string, TranslationItem[]> | TranslationItem[];
    speaking?: Record<string, string> | string;
  };
};

// Chuẩn hóa data.fib/translations/speaking về dạng Record<topic, ...>
// dù submission gốc là dạng lồng (5-topics) hay phẳng (sports-benefits).
function normalizeTopics(sub: Submission): {
  fib: Record<string, FibData>;
  translations: Record<string, TranslationItem[]>;
  speaking: Record<string, string>;
} {
  const d = sub.data;
  if (!d) return { fib: {}, translations: {}, speaking: {} };

  const isFlatFib = d.fib && "items" in (d.fib as FibData);
  if (isFlatFib) {
    const key = "sports-benefits";
    return {
      fib: { [key]: d.fib as FibData },
      translations: { [key]: (d.translations as TranslationItem[]) || [] },
      speaking: { [key]: (d.speaking as string) || "" },
    };
  }

  return {
    fib: (d.fib as Record<string, FibData>) || {},
    translations: (d.translations as Record<string, TranslationItem[]>) || {},
    speaking: (d.speaking as Record<string, string>) || {},
  };
}

function scoreColor(pct: number): string {
  if (pct >= 80) return "#2ec27e";
  if (pct >= 50) return "#c98a00";
  return "#e8483c";
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString("vi-VN");
}

export default function ResultsTable({ submissions }: { submissions: Submission[] }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"time" | "score-desc" | "score-asc" | "name">("time");
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const [detailTopic, setDetailTopic] = useState<string>(ALL_TOPICS[0]);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = submissions.filter((s) =>
      (s.student_name || "").toLowerCase().includes(q)
    );
    filtered.sort((a, b) => {
      const pa = a.max_score ? a.total_score / a.max_score : 0;
      const pb = b.max_score ? b.total_score / b.max_score : 0;
      if (sortBy === "score-desc") return pb - pa;
      if (sortBy === "score-asc") return pa - pb;
      if (sortBy === "name")
        return (a.student_name || "").localeCompare(b.student_name || "", "vi");
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    return filtered;
  }, [submissions, search, sortBy]);

  const detailSubmission = detailIndex !== null ? submissions[detailIndex] : null;

  function openDetail(index: number) {
    setDetailIndex(index);
    const { fib } = normalizeTopics(submissions[index]);
    const firstAvailable = ALL_TOPICS.find((t) => fib[t]) || ALL_TOPICS[0];
    setDetailTopic(firstAvailable);
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên học sinh..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] rounded-xl border-2 border-pink-100 px-4 py-2 text-sm outline-none focus:border-pink-400"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="rounded-xl border-2 border-pink-100 px-3 py-2 text-sm outline-none"
        >
          <option value="time">Mới nhất</option>
          <option value="score-desc">Điểm cao → thấp</option>
          <option value="score-asc">Điểm thấp → cao</option>
          <option value="name">Theo tên (A-Z)</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white p-2 shadow-sm">
        {rows.length === 0 ? (
          <p className="p-8 text-center text-gray-400">
            {submissions.length ? "Không tìm thấy học sinh nào khớp." : "Chưa có bài nộp nào."}
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-gray-400">
                <th className="p-3">Học sinh</th>
                <th className="p-3">Thời gian</th>
                <th className="p-3">Theo chủ đề</th>
                <th className="p-3">Tổng điểm</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => {
                const pct = s.max_score ? Math.round((s.total_score / s.max_score) * 100) : 0;
                const { fib } = normalizeTopics(s);
                const realIndex = submissions.indexOf(s);
                return (
                  <tr key={s.id} className="border-t border-dotted border-pink-100">
                    <td className="p-3 font-bold">{s.student_name}</td>
                    <td className="p-3 text-gray-500">{formatTime(s.created_at)}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {ALL_TOPICS.filter((t) => fib[t]).map((t) => {
                          const d = fib[t] || { correct: 0, total: 0 };
                          const meta = TOPIC_META[t];
                          return (
                            <span
                              key={t}
                              title={meta.label}
                              className="rounded-full bg-pink-50 px-2 py-0.5 text-xs font-semibold text-pink-500"
                            >
                              {meta.icon} {d.correct}/{d.total}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-3 font-bold" style={{ color: scoreColor(pct) }}>
                      {s.total_score}/{s.max_score} <span className="text-xs">({pct}%)</span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => openDetail(realIndex)}
                        className="rounded-full bg-pink-100 px-4 py-1.5 text-xs font-bold text-pink-500 hover:bg-pink-200"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {detailSubmission && (
        <DetailModal
          submission={detailSubmission}
          topic={detailTopic}
          onTopicChange={setDetailTopic}
          onClose={() => setDetailIndex(null)}
        />
      )}
    </>
  );
}

function DetailModal({
  submission,
  topic,
  onTopicChange,
  onClose,
}: {
  submission: Submission;
  topic: string;
  onTopicChange: (t: string) => void;
  onClose: () => void;
}) {
  const pct = submission.max_score
    ? Math.round((submission.total_score / submission.max_score) * 100)
    : 0;

  const {
    fib: fibByTopic,
    translations: translationsByTopic,
    speaking: speakingByTopic,
  } = normalizeTopics(submission);
  const availableTopics = ALL_TOPICS.filter((t) => fibByTopic[t]);
  const fib = fibByTopic[topic] || { items: [], correct: 0, total: 0 };
  const translations = translationsByTopic[topic] || [];
  const speaking = speakingByTopic[topic] || "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">{submission.student_name}</h3>
            <p className="text-xs text-gray-400">Nộp lúc {formatTime(submission.created_at)}</p>
            <p className="mt-1 text-sm font-bold" style={{ color: scoreColor(pct) }}>
              Tổng điền từ: {submission.total_score}/{submission.max_score} ({pct}%)
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500 hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        {availableTopics.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {availableTopics.map((t) => {
              const meta = TOPIC_META[t];
              return (
                <button
                  key={t}
                  onClick={() => onTopicChange(t)}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    t === topic
                      ? "bg-pink-500 text-white"
                      : "bg-pink-50 text-pink-500 hover:bg-pink-100"
                  }`}
                >
                  {meta.icon} {meta.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Điền từ */}
        <div className="mb-5">
          <h4 className="mb-2 text-sm font-bold">
            ✏️ Điền từ — {fib.correct}/{fib.total} đúng
          </h4>
          {fib.items.length ? (
            <div className="space-y-2">
              {fib.items.map((it, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 rounded-lg p-2 text-sm ${
                    it.is_correct ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <span className="mt-0.5 text-xs font-bold text-gray-400">{i + 1}</span>
                  <div className="flex-1">
                    <div>
                      {it.student_answer ? (
                        it.student_answer
                      ) : (
                        <i className="text-gray-400">(bỏ trống)</i>
                      )}
                    </div>
                    {!it.is_correct && it.answer_key && (
                      <div className="text-xs text-gray-500">
                        Đáp án đúng: {it.answer_key}
                      </div>
                    )}
                  </div>
                  <span>{it.is_correct ? "✓" : "✗"}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Không có dữ liệu.</p>
          )}
        </div>

        {/* Dịch câu */}
        <div className="mb-5">
          <h4 className="mb-2 text-sm font-bold">🔤 Dịch câu (Bước 02)</h4>
          {translations.length ? (
            <div className="space-y-2">
              {translations.map((tr, i) => (
                <div key={i} className="rounded-lg bg-gray-50 p-2 text-sm">
                  <div className="mb-1 text-gray-500">{tr.prompt}</div>
                  <div className="font-medium">
                    {tr.answer ? tr.answer : <i className="text-gray-400">(bỏ trống)</i>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Không có dữ liệu.</p>
          )}
        </div>

        {/* Nói */}
        <div>
          <h4 className="mb-2 text-sm font-bold">🗣️ Bài nói / dàn ý (Bước 04)</h4>
          <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm">
            {speaking ? speaking : <i className="text-gray-400">(bỏ trống)</i>}
          </div>
        </div>
      </div>
    </div>
  );
}
