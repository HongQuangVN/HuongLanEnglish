"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export type QuestionStatus = "unanswered" | "answered" | "flagged";

type WorksheetShellProps = {
  title: string;
  subtitle?: string;
  totalQuestions: number;
  questionStatuses: QuestionStatus[]; // length === totalQuestions
  onJumpToQuestion?: (index: number) => void;
  onSubmit: () => void;
  submitting?: boolean;
  submitted?: boolean;
  timerMinutes?: number; // đếm ngược, undefined = không hiện đồng hồ
  children: ReactNode;
};

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function WorksheetShell({
  title,
  subtitle,
  totalQuestions,
  questionStatuses,
  onJumpToQuestion,
  onSubmit,
  submitting,
  submitted,
  timerMinutes,
  children,
}: WorksheetShellProps) {
  const [secondsLeft, setSecondsLeft] = useState(
    timerMinutes ? timerMinutes * 60 : 0
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!timerMinutes || submitted) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerMinutes, submitted]);

  const answeredCount = questionStatuses.filter(
    (s) => s === "answered"
  ).length;
  const flaggedCount = questionStatuses.filter((s) => s === "flagged").length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/60 via-white to-white">
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
        <header className="mb-8 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-600 px-6 py-8 text-white shadow-lg sm:px-10">
          <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm text-teal-50/90">
              {subtitle}
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <main className="min-w-0 space-y-6">{children}</main>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
              {timerMinutes ? (
                <>
                  <p className="mb-2 text-sm font-semibold text-gray-700">
                    Thời gian còn lại
                  </p>
                  <div className="mb-5 rounded-xl border border-orange-100 bg-orange-50 px-4 py-2 text-center text-2xl font-bold text-orange-500">
                    {formatTime(secondsLeft)}
                  </div>
                </>
              ) : null}

              <p className="mb-3 text-sm font-semibold text-gray-700">
                Danh sách câu hỏi
              </p>
              <div className="mb-3 flex flex-wrap gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-full border border-gray-300" />
                  Chưa trả lời ({unansweredCount})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-full bg-teal-600" />
                  Đã trả lời ({answeredCount})
                </span>
                {flaggedCount > 0 && (
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 rounded-full border-2 border-orange-400" />
                    Đánh dấu ({flaggedCount})
                  </span>
                )}
              </div>

              <p className="mb-2 text-xs text-gray-400">
                Bấm vào ô để đến câu hỏi
              </p>
              <div className="grid grid-cols-5 gap-2">
                {questionStatuses.map((status, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onJumpToQuestion?.(i)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition ${
                      status === "answered"
                        ? "bg-teal-600 text-white"
                        : status === "flagged"
                          ? "border-2 border-orange-400 text-orange-500"
                          : "border border-gray-300 text-gray-500 hover:border-teal-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={onSubmit}
                disabled={submitting || submitted}
                className="mt-6 w-full rounded-full bg-gray-300 py-3 font-bold text-gray-700 transition enabled:bg-gradient-to-r enabled:from-pink-500 enabled:to-pink-400 enabled:text-white enabled:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitted
                  ? "✓ Đã nộp bài"
                  : submitting
                    ? "Đang nộp..."
                    : "📤 Nộp bài"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
