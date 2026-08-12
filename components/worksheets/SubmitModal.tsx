"use client";

type Step = "confirm" | "loading" | "success" | "error";

type SubmitModalProps = {
  open: boolean;
  step: Step;
  studentName: string;
  scorePreview: string;
  successText: string;
  errorText: string;
  onConfirm: () => void;
  onClose: () => void;
  onRetry: () => void;
};

export default function SubmitModal({
  open,
  step,
  studentName,
  scorePreview,
  successText,
  errorText,
  onConfirm,
  onClose,
  onRetry,
}: SubmitModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#2b2b3a]/55 p-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        {step === "confirm" && (
          <>
            <h3 className="mb-3 text-lg font-bold">📤 Xác nhận nộp bài</h3>
            <p className="mb-2 text-sm text-gray-500">
              Học sinh: <b className="text-gray-800">{studentName}</b>
            </p>
            <div className="mb-4 rounded-xl bg-pink-100 p-3 text-sm font-bold text-pink-500">
              {scorePreview}
            </div>
            <p className="mb-5 text-xs text-gray-400">
              Mỗi lần bấm &quot;Xác nhận nộp&quot; sẽ tạo một bản ghi mới. Nếu
              làm thêm rồi nộp lại, giáo viên sẽ thấy cả các lần nộp trước đó.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="rounded-full bg-gray-100 px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                onClick={onConfirm}
                className="rounded-full bg-pink-500 px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-pink-600"
              >
                ✓ Xác nhận nộp
              </button>
            </div>
          </>
        )}

        {step === "loading" && (
          <>
            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-pink-100 border-t-pink-500" />
            <p className="text-sm text-gray-600">
              Đang gửi bài làm, vui lòng đợi chút...
            </p>
          </>
        )}

        {step === "success" && (
          <>
            <div className="mb-2 text-4xl">🎉</div>
            <h3 className="mb-2 text-lg font-bold">Nộp bài thành công!</h3>
            <p className="mb-5 text-sm text-gray-600">{successText}</p>
            <button
              onClick={onClose}
              className="rounded-full bg-pink-500 px-8 py-2.5 text-sm font-bold text-white shadow hover:bg-pink-600"
            >
              Đóng
            </button>
          </>
        )}

        {step === "error" && (
          <>
            <div className="mb-2 text-4xl">⚠️</div>
            <h3 className="mb-2 text-lg font-bold">Không gửi được bài làm</h3>
            <p className="mb-5 text-sm text-gray-600">{errorText}</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="rounded-full bg-gray-100 px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-200"
              >
                Đóng
              </button>
              <button
                onClick={onRetry}
                className="rounded-full bg-pink-500 px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-pink-600"
              >
                ↺ Thử lại
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
