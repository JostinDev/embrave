export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

        <div className="relative flex place-items-center">
        <a href={"http://localhost:8080/oauth2/authorization/auth0"} className={"text-4xl"}>Login</a>
        </div>
      </div>


        <div className="container">
            <form className="form-signin" method="post" action="http://localhost:8080/logout">
                <h2 className="form-signin-heading">Are you sure you want to log out?</h2>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Log Out</button>
            </form>
        </div>

    </main>
  )
}
