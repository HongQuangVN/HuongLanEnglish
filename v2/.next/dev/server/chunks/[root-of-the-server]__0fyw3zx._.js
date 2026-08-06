module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/huonglan-app/app/api/worksheets/sports-benefits-3/grade/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/huonglan-app/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$lib$2f$supabase$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/huonglan-app/lib/supabase-server.ts [app-route] (ecmascript)");
;
;
// ============================================================
// ĐÁP ÁN ĐÚNG — chỉ tồn tại ở đây, trên server.
// File này KHÔNG BAO GIỜ được gửi xuống browser của học sinh.
// So với bản HTML cũ, đáp án nằm trong data-answer của <input>
// (ai F12 cũng xem được) — đây là khác biệt cốt lõi.
// ============================================================
const ANSWER_KEY = {
    1: "glorify victory on the playing field",
    2: "strengthen our bones",
    3: "clear out bad cholesterol from our arteries",
    4: "decrease the risk of stroke",
    5: "sharpen your focus",
    6: "establish a regular habit of exercise",
    7: "reduce the risk of depression",
    8: "reinforce a growth mindset",
    9: "build resilience and self-awareness",
    10: "supportive community"
};
// So khớp câu trả lời "nới tay" giống bản cũ: bỏ khoảng trắng dư,
// không phân biệt hoa/thường — giữ đúng hành vi UX cũ.
function normalize(text) {
    return text.trim().toLowerCase().replace(/\s+/g, " ");
}
async function POST(request) {
    const body = await request.json();
    const { studentName, answers } = body;
    if (!studentName?.trim()) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Thiếu tên học sinh"
        }, {
            status: 400
        });
    }
    // Chấm điểm — SO SÁNH DIỄN RA TRÊN SERVER, không phải trên browser học sinh.
    let correctCount = 0;
    const detail = Object.entries(ANSWER_KEY).map(([qNum, correctAnswer])=>{
        const questionNumber = Number(qNum);
        const studentAnswer = answers[questionNumber] || "";
        const isCorrect = normalize(studentAnswer) === normalize(correctAnswer);
        if (isCorrect) correctCount++;
        return {
            question: questionNumber,
            studentAnswer,
            isCorrect,
            // Chỉ trả đáp án đúng cho CÂU HỌC SINH ĐÃ TRẢ LỜI SAI,
            // sau khi đã nộp bài — giữ đúng trải nghiệm "xem đáp án" cũ,
            // nhưng chỉ tiết lộ SAU KHI học sinh đã thử, không phải trước.
            correctAnswer: isCorrect ? undefined : correctAnswer
        };
    });
    const total = Object.keys(ANSWER_KEY).length;
    // Lưu kết quả vào Supabase — RLS sẽ quyết định ai đọc lại được sau này.
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$lib$2f$supabase$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { error: insertError } = await supabase.from("submissions").insert({
        student_name: studentName.trim(),
        total_score: correctCount,
        max_score: total,
        data: {
            fib: {
                "sports-benefits": {
                    items: detail,
                    correct: correctCount,
                    total
                }
            }
        }
    });
    if (insertError) {
        console.error("Lỗi lưu submission:", insertError);
    // Vẫn trả điểm cho học sinh dù lưu DB lỗi — không chặn trải nghiệm học tập
    // vì 1 lỗi hạ tầng tạm thời.
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        correctCount,
        total,
        detail
    });
}
}),
"[project]/huonglan-app/lib/supabase-server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/huonglan-app/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/huonglan-app/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://youyvaplxylaejhvoiya.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXl2YXBseHlsYWVqaHZvaXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MDAxMDcsImV4cCI6MjEwMTQ3NjEwN30.C4lH3SlvA77Gvui3szSTociMgK_rBiq-322Cbtmh7f0"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // setAll được gọi từ Server Component - có thể bỏ qua nếu có
                // middleware refresh session riêng.
                }
            }
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0fyw3zx._.js.map