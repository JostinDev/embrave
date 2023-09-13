export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

        <div className="relative flex place-items-center">
        <a href={"http://localhost:8080/oauth2/authorization/auth0"} className={"text-4xl"}>Login</a>
        </div>
      </div>

    </main>
  )
}
