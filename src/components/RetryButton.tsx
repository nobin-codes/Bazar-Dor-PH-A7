"use client";

export default function RetryButton() {
return (
<button
type="button"
onClick={() => window.location.reload()}
className="primary-btn mt-4"
>
আবার চেষ্টা করুন </button>
);
}
