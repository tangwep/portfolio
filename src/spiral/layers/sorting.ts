export type SortStep = {
  values: number[];
  compare: [number, number] | null;
};

export function randomBars(length: number, min = 12, max = 96): number[] {
  return Array.from({ length }, () =>
    Math.floor(min + Math.random() * (max - min)),
  );
}

export function bubbleSortSteps(start: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...start];
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({ values: [...arr], compare: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ values: [...arr], compare: [j, j + 1] });
      }
    }
  }
  steps.push({ values: [...arr], compare: null });
  return steps;
}

export function insertionSortSteps(start: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...start];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    steps.push({ values: [...arr], compare: [Math.max(0, j), i] });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      steps.push({ values: [...arr], compare: [Math.max(0, j), j + 1] });
    }
    arr[j + 1] = key;
    steps.push({ values: [...arr], compare: null });
  }
  steps.push({ values: [...arr], compare: null });
  return steps;
}
