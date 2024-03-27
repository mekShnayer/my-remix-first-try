import type { ActionFunctionArgs, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet, Route, json, redirect, useFetcher, useLoaderData, useLocation, useSearchParams } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Navbar } from "~/components/Navbar";
import './index.css'
import { Header } from "~/components/Header";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function fetchDataBasedOnSearchValue(searchValue: string) {
  const res = await fetch(`https://openlibrary.org/search.json?q=${searchValue}`);
  const data = await res.json();

  return data;
}
//
export let loader: LoaderFunction = async ({ request }) => {
  //this loader function is called on the backend side
  const params = new URLSearchParams(request.url.split('?')[1]);
  const searchValue = params.get('name');
  console.log(searchValue, 'search')
  if (!searchValue) {
    return json({ error: 'Search value is missing' }, { status: 400 });
  }
  const searchData = await fetchDataBasedOnSearchValue(searchValue);
  console.log(searchData.docs[0],)
  return searchData.docs[0]
};
//

export default function Index() {
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();
  const firstResult = fetcher.data || undefined
  return (
    <div style={{ padding: 0, fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Header />
      <Navbar />
      <div className="page-content">
        <div>wonder who is the author of the book? enter a book name and find out!</div>

        <div className="form-and-results-container">
          <fetcher.Form >
            <input type="text" placeholder="enter book name" name="name"></input>
            <input type="submit" ></input>
          </fetcher.Form>
          {/* <div className="search-result"> */}
          {fetcher.state === "loading" ? <div className="loader"></div> :
            firstResult && (
              <div className="search-result">
                <div className="font-24">search result</div>
                <div>Title:<span className="bold"> {firstResult.title}</span></div>
                <div>Author:<span className="bold"> {firstResult.author_name}</span></div>
              </div>)
          }
          {/* </div> */}
        </div>



      </div>
    </div>

  );
}

// export async function action({ request }) {

//   const formData = new URLSearchParams(await request.text());
//   const name = formData.get('name');
//   return name
// }
