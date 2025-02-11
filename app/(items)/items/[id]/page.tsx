export default function ItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <h1>item page: {decodeURIComponent(id)}</h1>;
}
