"use client";

type FibSentenceProps = {
  text: string; // chứa placeholder dạng {{1}}, {{2}}...
  values: string[]; // giá trị hiện tại theo thứ tự blank, index 0-based
  results?: (boolean | null)[]; // null = chưa chấm, true/false = đúng/sai, cùng độ dài values
  disabled?: boolean;
  onChange: (blankIndex: number, value: string) => void;
};

export default function FibSentence({
  text,
  values,
  results,
  disabled,
  onChange,
}: FibSentenceProps) {
  const parts = text.split(/(\{\{\d+\})/g);

  return (
    <span className="leading-8">
      {parts.map((part, i) => {
        const m = part.match(/^\{\{(\d+)\}\}$/);
        if (!m) return <span key={i}>{part}</span>;
        const blankIndex = Number(m[1]) - 1;
        const result = results?.[blankIndex];
        const stateClass =
          result === true
            ? "border-green-500 bg-green-50 text-green-700"
            : result === false
              ? "border-red-400 bg-red-50 text-red-600"
              : "border-dashed border-pink-400 bg-transparent";
        return (
          <input
            key={i}
            type="text"
            disabled={disabled}
            value={values[blankIndex] || ""}
            onChange={(e) => onChange(blankIndex, e.target.value)}
            className={`mx-1 inline-block w-40 rounded-md border-b-2 px-2 py-0.5 text-center text-sm font-semibold outline-none focus:border-pink-500 focus:bg-white ${stateClass}`}
            placeholder="................"
          />
        );
      })}
    </span>
  );
}
