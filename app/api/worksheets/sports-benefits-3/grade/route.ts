import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// ============================================================
// ĐÁP ÁN ĐÚNG (Bước 01 - Điền từ) — chỉ tồn tại ở đây, trên server.
// File này KHÔNG BAO GIỜ được gửi xuống browser của học sinh.
// ============================================================
const ANSWER_KEY: Record<number, string> = {
  1: "glorify victory on the playing field",
  2: "strengthen our bones",
  3: "clear out bad cholesterol from our arteries",
  4: "decrease the risk of stroke",
  5: "sharpen your focus",
  6: "establish a regular habit of exercise",
  7: "reduce the risk of depression",
  8: "reinforce a growth mindset",
  9: "build resilience and self-awareness",
  10: "supportive community",
};

// So khớp câu trả lời "nới tay": bỏ khoảng trắng dư, không phân biệt hoa/thường.
function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

type TranslationAnswer = { prompt: string; answer: string };

type SubmitPayload = {
  studentName: string;
  answers: Record<number, string>; // Bước 01: { 1: "câu học sinh trả lời", ... }
  translations?: TranslationAnswer[]; // Bước 02: 5 câu dịch kèm đề bài
  speaking?: string; // Bước 04: dàn ý / bài nói
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

  // Chấm điểm — SO SÁNH DIỄN RA TRÊN SERVER, không phải trên browser học sinh.
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
      // Chỉ trả đáp án đúng cho câu học sinh trả lời sai, sau khi đã nộp bài.
      correctAnswer: isCorrect ? undefined : correctAnswer,
    };
  });

  const total = Object.keys(ANSWER_KEY).length;

  // Lưu kết quả vào Supabase — RLS sẽ quyết định ai đọc lại được sau này.
  const supabase = await createClient();
  const { error: insertError } = await supabase.from("submissions").insert({
    student_name: studentName.trim(),
    total_score: correctCount,
    max_score: total,
    data: {
      fib: { "sports-benefits": { items: detail, correct: correctCount, total } },
      translations: { "sports-benefits": translations || [] },
      speaking: { "sports-benefits": speaking || "" },
    },
  });

  if (insertError) {
    console.error("Lỗi lưu submission:", insertError);
    // Vẫn trả điểm cho học sinh dù lưu DB lỗi — không chặn trải nghiệm học tập
    // vì 1 lỗi hạ tầng tạm thời.
  }

  return NextResponse.json({
    correctCount,
    total,
    detail,
  });
}
