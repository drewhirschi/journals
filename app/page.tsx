import Link from "next/link";


export default async function Index() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <p className="text-center text-lg text-muted-foreground">
          There's nothing here yet.{" "}
          <Link href="/sign-in" className="text-primary underline">
            Login
          </Link>{" "}
          to see more.
        </p>

      </main>
    </>
  );
}
