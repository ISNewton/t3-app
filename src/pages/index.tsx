import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import TableList from "~/components/tables/table-list";
import Button from "~/components/buttons/Button";

const Home = () => {

  const { data } = api.posts.home.useQuery()

  const session = useSession()

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-100">

        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6x">Check out my amazing posts </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl ">Feel free to edit the posts as long as you are the author.</p>
        {session.status === 'authenticated' && (
          <Button className="my-8 ">
            <Link href={{
              pathname: '/posts/create',
            }}>Add post</Link>

          </Button>
        )}



        <div className="flex flex-col">

          <TableList posts={data ?? []} />

        </div>
      </div >

    </>
  );
};

export default Home;


