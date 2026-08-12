import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { ANSWER_KEY } from "../answer-key";

function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.,!?]/g, "");
}

type TranslationAnswer = { prompt: string; answer: string };

type SubmitPayload = {
  studentName: string;
  answers: string[]; // theo thứ tự 1..10
  translations?: TranslationAnswer[];
  speaking?: string;
};

export async function POST(request: NextRequest) {
  const body: SubmitPayload = await request.json();
  const { studentName, answers, translations, speaking } = body;

  if (!studentName?.trim()) {
    return NextResponse.json({ error: "Thiếu tên học sinh" }, { status: 400 });
  }

  let correctCount = 0;
  const items = ANSWER_KEY.map((correctAnswer, i) => {
    const studentAnswer = answers?.[i] || "";
    const isCorrect =
      studentAnswer.trim().length > 0 &&
      normalize(studentAnswer) === normalize(correctAnswer);
    if (isCorrect) correctCount++;
    return {
      answer_key: correctAnswer,
      student_answer: studentAnswer,
      is_correct: isCorrect,
    };
  });

  const total = ANSWER_KEY.length;

  const supabase = await createClient();
  const { error: insertError } = await supabase.from("submissions").insert({
    student_name: studentName.trim(),
    total_score: correctCount,
    max_score: total,
    data: {
      worksheet: "sports-benefits",
      fib: { correct: correctCount, total, items },
      translations: translations || [],
      speaking: speaking || "",
    },
  });

  if (insertError) {
    console.error("Lỗi lưu submission:", insertError);
  }

  return NextResponse.json({ correctCount, total, items });
}
