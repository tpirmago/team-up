export default function PickRandom<T>(items: T[], max: number): T[] {
  return [...items]
    .sort(() => 0.5 - Math.random())
    .slice(0, max)
}
