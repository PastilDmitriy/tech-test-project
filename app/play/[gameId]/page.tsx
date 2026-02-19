export default async function PlayPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  await params;

  return (
    <div>
      <p className="text-lg">Game functionality will be soon.</p>
    </div>
  );
}
