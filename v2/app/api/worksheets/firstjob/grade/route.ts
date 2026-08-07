import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// ============================================================
// ĐÁP ÁN ĐÚNG (Bước 01 - Điền từ) — chỉ tồn tại ở đây, trên server.
// File này KHÔNG BAO GIỜ được gửi xuống browser của học sinh.
// ============================================================
const ANSWER_KEY: Record<number, string> = {
  1: "part-time job",
  2: "glamorous",
  3: "the value of money",
  4: "stand on my feet",
  5: "flipping burgers",
};

// So khớp câu trả lời "nới tay": bỏ khoảng trắng dư, không phân biệt hoa/thường.
function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

type TranslationAnswer = { prompt: string; answer: string };

type SubmitPayload = {
  studentName: string;
  answers: Record<number, string>;
  translations?: TranslationAnswer[];
  speaking?: string;
};

export async function POST(request: NextRequest) {
  const body: SubmitPayload = await request.json();
  const { studentName, answers, translations, speaking } = body;

  if (!studentName?.trim()) {
    return NextResponse.json(
      { error: "Thiếu tên học sinh" },
      { status: 400 }
    );
  }

  let correctCount = 0;
  const detail = Object.entries(ANSWER_KEY).map(([qNum, correctAnswer]) => {
    const questionNumber = Number(qNum);
    const studentAnswer = answers[questionNumber] || "";
    const isCorrect = normalize(studentAnswer) === normalize(correctAnswer);
    if (isCorrect) correctCount++;

    return {
      question: questionNumber,
      studentAnswer,
      isCorrect,
      correctAnswer: isCorrect ? undefined : correctAnswer,
    };
  });

  const total = Object.keys(ANSWER_KEY).length;

  const supabase = await createClient();
  const { error: insertError } = await supabase.from("submissions").insert({
    student_name: studentName.trim(),
    total_score: correctCount,
    max_score: total,
    data: {
      fib: { "firstjob": { items: detail, correct: correctCount, total } },
      translations: { "firstjob": translations || [] },
      speaking: { "firstjob": speaking || "" },
    },
  });

  if (insertError) {
    console.error("Lỗi lưu submission:", insertError);
  }

  return NextResponse.json({
    correctCount,
    total,
    detail,
  });
}
