import Head from "next/head";

export default function UpcomingVisitsPage() {
  return (
    <>
      <Head>
        <title>Ближайшие визиты — кабинет</title>
      </Head>
      <main className="container-custom py-8">
        <h1 className="text-2xl font-semibold mb-4">
          Ближайшие визиты
        </h1>
        <p className="text-sm text-gray-400">
          Раздел в разработке. Скоро здесь появится список ваших ближайших визитов.
        </p>
      </main>
    </>
  );
}
