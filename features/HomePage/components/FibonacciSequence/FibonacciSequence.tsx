"use client";

import { useState, useMemo } from "react";

const getFibonacciSequence = (n: number): number[] => {
  if (n <= 0 || !Number.isInteger(n)) return [];
  if (n === 1) return [0];

  const sequence = [0, 1];

  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }

  return sequence;
};

const FIBONACCI_SOLUTION = `const getFibonacciSequence = (n: number): number[] => {
  if (n <= 0 || !Number.isInteger(n)) return [];
  if (n === 1) return [0];

  const sequence = [0, 1];

  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }

  return sequence;
}`;

export const FibonacciSequence = () => {
  const [inputValue, setInputValue] = useState("");
  const [showSolution, setShowSolution] = useState(false);

  const num = parseInt(inputValue, 10);
  const isValid = !Number.isNaN(num) && num >= 0 && num <= 100;

  const sequence = useMemo(
    () => (isValid ? getFibonacciSequence(num) : []),
    [num, isValid]
  );

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xl font-bold md:text-2xl">
        Developer test, Part 2: Fibonacci sequence
      </h2>
      <div className="flex flex-col gap-3">
        <label
          htmlFor="fibonacci-input"
          className="text-sm text-base-content/80"
        >
          Enter a number (0–100) to see the Fibonacci sequence:
        </label>
        <input
          id="fibonacci-input"
          type="number"
          min={0}
          max={100}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g. 10"
          className="input input-bordered w-full max-w-xs"
        />
        {inputValue !== "" && (
          <div className="flex flex-col gap-2">
            <div className="text-base-content/90">
              <span className="font-medium">Sequence: </span>
              {isValid ? (
                <span>
                  {sequence.length > 0 ? sequence.join(", ") : "(empty)"}
                </span>
              ) : (
                <span className="text-error">
                  Please enter a valid number (0–100)
                </span>
              )}
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm w-fit"
              onClick={() => setShowSolution((prev) => !prev)}
            >
              Show solution
            </button>
            {showSolution && (
              <pre className="overflow-x-auto rounded-lg bg-base-300 p-4 text-sm">
                <code>{FIBONACCI_SOLUTION}</code>
              </pre>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
