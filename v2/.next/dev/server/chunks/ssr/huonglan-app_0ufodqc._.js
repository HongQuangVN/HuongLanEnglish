module.exports = [
"[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SportsBenefitsWorksheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/huonglan-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/huonglan-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
// Câu hỏi hiển thị cho học sinh — CHỈ CÓ CÂU HỎI, KHÔNG CÓ ĐÁP ÁN.
// So với bản HTML cũ (data-answer="..." nằm ngay trong thẻ input),
// đây là khác biệt cốt lõi: học sinh F12 xem source cũng không
// thấy đáp án ở đâu cả, vì đáp án chưa từng được gửi tới browser.
const QUESTIONS = [
    {
        id: 1,
        text: "Many people love to _____ and cheer for their favorite teams."
    },
    {
        id: 2,
        text: "Exercising when we're young can _____."
    },
    {
        id: 3,
        text: "Physical activity helps _____."
    },
    {
        id: 4,
        text: "Regular exercise can _____, high blood pressure, and diabetes."
    },
    {
        id: 5,
        text: "Endorphins released during exercise can _____ and improve your mood and memory."
    },
    {
        id: 6,
        text: "Being part of a team makes it easier to _____."
    },
    {
        id: 7,
        text: "School sport participation has been shown to _____ for up to four years."
    },
    {
        id: 8,
        text: "Training with a good coach helps you _____."
    },
    {
        id: 9,
        text: "Coming to terms with defeat helps you _____."
    },
    {
        id: 10,
        text: "Being on a team means you become part of a _____."
    }
];
function SportsBenefitsWorksheet() {
    const [studentName, setStudentName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentName,
                answers
            })
        });
        const data = await res.json();
        setResult(data);
        setSubmitting(false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto max-w-2xl px-6 py-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-400 p-8 text-white shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mb-2 inline-block rounded-full bg-white/25 px-4 py-1 text-sm",
                        children: "CHỦ ĐỀ: THỂ THAO"
                    }, void 0, false, {
                        fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Sports & Health Benefits"
                    }, void 0, false, {
                        fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: "Nhập tên của bạn",
                value: studentName,
                onChange: (e)=>setStudentName(e.target.value),
                className: "mb-6 w-full rounded-xl border-2 border-pink-100 px-4 py-3 outline-none focus:border-pink-400"
            }, void 0, false, {
                fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "space-y-4",
                children: QUESTIONS.map((q)=>{
                    const detail = result?.detail.find((d)=>d.question === q.id);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "rounded-xl bg-white p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: [
                                            q.id,
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this),
                                    " ",
                                    q.text
                                ]
                            }, void 0, true, {
                                fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                disabled: !!result,
                                value: answers[q.id] || "",
                                onChange: (e)=>setAnswers((prev)=>({
                                            ...prev,
                                            [q.id]: e.target.value
                                        })),
                                className: `w-full rounded-lg border-2 px-3 py-2 text-sm outline-none ${detail ? detail.isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50" : "border-pink-100 focus:border-pink-400"}`
                            }, void 0, false, {
                                fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this),
                            detail && !detail.isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-red-500",
                                children: [
                                    "Đáp án đúng: ",
                                    detail.correctAnswer
                                ]
                            }, void 0, true, {
                                fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                                lineNumber: 100,
                                columnNumber: 17
                            }, this)
                        ]
                    }, q.id, true, {
                        fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            !result ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleSubmit,
                disabled: submitting,
                className: "mt-6 w-full rounded-full bg-pink-500 py-3 font-bold text-white shadow-md disabled:opacity-50",
                children: submitting ? "Đang chấm..." : "Nộp bài"
            }, void 0, false, {
                fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-xl bg-white p-4 text-center shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg font-bold text-pink-500",
                    children: [
                        "Điểm: ",
                        result.correctCount,
                        "/",
                        result.total
                    ]
                }, void 0, true, {
                    fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                    lineNumber: 119,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
                lineNumber: 118,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/huonglan-app/app/worksheets/sports-benefits-3/page.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
}),
"[project]/huonglan-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/huonglan-app/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=huonglan-app_0ufodqc._.js.map