import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { ANSWER_KEYS } from "../answer-keys";

// So khớp câu trả lời "nới tay": bỏ khoảng trắng dư, không phân biệt hoa/thường.
function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

const ALL_TOPICS = Object.keys(ANSWER_KEYS);

type FibItem = {
  answer_key: string;
  student_answer: string;
  is_correct: boolean;
};

type TranslationItem = { prompt: string; answer: string };

type SubmitPayload = {
  studentName: string;
  answers: Record<string, string[]>; // { houses: ["ans1","ans2",...], ... }
  translations?: Record<string, TranslationItem[]>;
  speaking?: Record<string, string>;
};

export async function POST(request: NextRequest) {
  const body: SubmitPayload = await request.json();
  const { studentName, answers, translations, speaking } = body;

  if (!studentName?.trim()) {
    return NextResponse.json({ error: "Thiếu tên học sinh" }, { status: 400 });
  }

  let totalCorrect = 0;
  let totalBlanks = 0;
  const perTopic: Record<
    string,
    { correct: number; total: number; items: FibItem[] }
  > = {};

  for (const topic of ALL_TOPICS) {
    const key = ANSWER_KEYS[topic];
    const studentAnswers = answers?.[topic] || [];
    let correct = 0;
    const items: FibItem[] = key.map((correctAnswer, i) => {
      const studentAnswer = studentAnswers[i] || "";
      const isCorrect =
        studentAnswer.trim().length > 0 &&
        normalize(studentAnswer) === normalize(correctAnswer);
      if (isCorrect) correct++;
      return {
        answer_key: correctAnswer,
        student_answer: studentAnswer,
        is_correct: isCorrect,
      };
    });
    perTopic[topic] = { correct, total: key.length, items };
    totalCorrect += correct;
    totalBlanks += key.length;
  }

  const supabase = await createClient();
  const { error: insertError } = await supabase.from("submissions").insert({
    student_name: studentName.trim(),
    total_score: totalCorrect,
    max_score: totalBlanks,
    data: {
      worksheet: "5-topics",
      fib: perTopic,
      translations: translations || {},
      speaking: speaking || {},
    },
  });

  if (insertError) {
    console.error("Lỗi lưu submission:", insertError);
  }

  return NextResponse.json({
    totalCorrect,
    totalBlanks,
    perTopic,
  });
}
