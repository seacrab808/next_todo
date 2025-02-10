export default function itemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <h1>item page: {id}</h1>;
}
