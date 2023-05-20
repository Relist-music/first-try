export function pickRandomEntries<T>(array: T[], numEntries: number): T[] {
  if (numEntries >= array.length) {
    return array; // Return the entire array if the number of entries requested is greater than or equal to the array length
  }

  const result: T[] = [];
  const indices = new Set<number>();

  while (indices.size < numEntries) {
    const randomIndex = Math.floor(Math.random() * array.length);

    if (!indices.has(randomIndex)) {
      indices.add(randomIndex);
      result.push(array[randomIndex]);
    }
  }

  return result;
}
