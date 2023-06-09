import { getSession, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Loader from "../loaders/loader";
import Button from "../buttons/Button";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Header = () => {

    const session = useSession()

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>

                            <Link href={{
                                pathname: '/',
                            }}
                                className="block py-2 pl-3 pr-4 text-white
                             bg-blue-700 rounded md:bg-transparent
                             md:text-blue-700 md:p-0 dark:text-white
                              md:dark:text-blue-500"

                            > Home </Link>
                        </li>

                        {session.status === "loading" && <Loader />}

                        {session.status === "authenticated" && <AuthenticatedButtons />}
                        {session.status === "unauthenticated" && <UnauthenticatedButtons />}


                    </ul>
                </div>
            </div>
        </nav>


    )
}


const UnauthenticatedButtons = () => (
    <>

        <li>
            <Link href={{
                pathname: '/login',
            }}
                className="block py-2 pl-3 pr-4
                text-gray-900 rounded hover:bg-gray-100 
                md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
                dark:text-white md:dark:hover:text-blue-500
                dark:hover:bg-gray-700
                dark:hover:text-white md:dark:hover:bg-transparent"

            > Login </Link>
        </li>
        <li>
            <Link href={{
                pathname: '/signup',
            }}
                className="block py-2 pl-3 pr-4
            text-gray-900 rounded hover:bg-gray-100 
            md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
            dark:text-white md:dark:hover:text-blue-500
            dark:hover:bg-gray-700
            dark:hover:text-white md:dark:hover:bg-transparent"

            > Signup </Link>
        </li>
    </>
)

const AuthenticatedButtons = () => {


    const { replace } = useRouter()



    const handleLogout = async () => {

        await signOut({
            redirect: false,
        })
        console.log("Logged out");

        toast.success('Bye bye !',{
            theme: "colored",
          })

        replace("/login")




    }

    return (

        <>

            <li>
                <p
                    onClick={handleLogout}
                    role="button"
                    className="block py-2 pl-3 pr-4
                        text-gray-900 rounded hover:bg-gray-100 
                        md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
                        dark:text-white md:dark:hover:text-blue-500
                        dark:hover:bg-gray-700
                        dark:hover:text-white md:dark:hover:bg-transparent"

                > Logout </p>
            </li>
        </>
    )

}
export default Header