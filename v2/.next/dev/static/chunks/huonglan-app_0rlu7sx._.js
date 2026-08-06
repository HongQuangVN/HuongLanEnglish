(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/huonglan-app/app/giao-vien/dang-nhap/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeacherLoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/huonglan-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/huonglan-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/huonglan-app/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/huonglan-app/lib/supabase-browser.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function TeacherLoginPage() {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    async function handleLogin() {
        setLoading(true);
        setError("");
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        setLoading(false);
        if (signInError) {
            setError("Email hoặc mật khẩu không đúng.");
            return;
        }
        router.push("/giao-vien/ket-qua");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full rounded-3xl bg-white p-10 text-center shadow-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "mb-2 text-xl font-bold",
                    children: "Khu vực giáo viên"
                }, void 0, false, {
                    fileName: "[project]/huonglan-app/app/giao-vien/dang-nhap/page.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-6 text-sm text-gray-500",
                    children: "Đăng nhập để xem kết quả bài làm của học sinh."
                }, void 0, false, {
                    fileName: "[project]/huonglan-app/app/giao-vien/dang-nhap/page.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "email",
                    placeholder: "Email giáo viên",
                    value: email,
                    onChange: (e)=>setEmail(e.target.value),
                    className: "mb-3 w-full rounded-xl border-2 border-pink-100 px-4 py-3 text-center outline-none focus:border-pink-400"
                }, void 0, false, {
                    fileName: "[project]/huonglan-app/app/giao-vien/dang-nhap/page.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "password",
                    placeholder: "Mật khẩu",
                    value: password,
                    onChange: (e)=>setPassword(e.target.value),
                    onKeyDown: (e)=>e.key === "Enter" && handleLogin(),
                    className: "mb-4 w-full rounded-xl border-2 border-pink-100 px-4 py-3 text-center outline-none focus:border-pink-400"
                }, void 0, false, {
                    fileName: "[project]/huonglan-app/app/giao-vien/dang-nhap/page.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleLogin,
                    disabled: loading,
                    className: "w-full rounded-full bg-pink-500 py-3 font-bold text-white shadow-md disabled:opacity-50",
                    children: loading ? "Đang kiểm tra..." : "Vào xem"
                }, void 0, false, {
                    fileName: "[project]/huonglan-app/app/giao-vien/dang-nhap/page.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-500",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/huonglan-app/app/giao-vien/dang-nhap/page.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/huonglan-app/app/giao-vien/dang-nhap/page.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/huonglan-app/app/giao-vien/dang-nhap/page.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(TeacherLoginPage, "KBB7npU3rF2XQdnzmaSwp6j38TI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TeacherLoginPage;
var _c;
__turbopack_context__.k.register(_c, "TeacherLoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/huonglan-app/lib/supabase-browser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/huonglan-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/huonglan-app/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$huonglan$2d$app$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://youyvaplxylaejhvoiya.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXl2YXBseHlsYWVqaHZvaXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MDAxMDcsImV4cCI6MjEwMTQ3NjEwN30.C4lH3SlvA77Gvui3szSTociMgK_rBiq-322Cbtmh7f0"));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=huonglan-app_0rlu7sx._.js.map