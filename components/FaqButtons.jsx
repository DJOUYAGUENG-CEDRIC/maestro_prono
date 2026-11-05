'use client';

const FAQ_QUESTIONS = [
  'Comment avoir la faille Apple of Fortune ?',
  'Comment avoir les grosses cotes gratuites ?',
];

export default function FaqButtons({ onSelect, disabled }) {
  return (
    <div className="flex flex-wrap gap-2 px-1">
      {FAQ_QUESTIONS.map((question) => (
        <button
          key={question}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(question)}
          className="text-xs font-semibold rounded-full px-3 py-1.5 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: '#ffffff', color: '#0ea5e9', border: '1px solid #bae6fd' }}
        >
          {question}
        </button>
      ))}
    </div>
  );
}
