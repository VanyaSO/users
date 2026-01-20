import {useEffect, useState} from "react";
import {PostList} from "@/components/Posts/PostList.tsx";
import type {Post} from "@/models/Post.ts";
import {UserIdFilter} from "@/components/UserIdFilter/UserIdFilter.tsx";
import {Search} from "@/components/Search/Search.tsx";

const fetchUrl = 'https://jsonplaceholder.typicode.com/posts';

export function App() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [usersId, setUsersId] = useState<number[]>([])

  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const visiblePosts = data.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchValue.toLowerCase()) || post.body.toLowerCase().includes(searchValue.toLowerCase());
        const matchesUser = selectedUserId === '' || post.userId.toString() === selectedUserId;

        return matchesUser && matchesSearch;
      }
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(fetchUrl);

        if (!res.ok) throw Error('Something went wrong');

        const data: Post[] = await res.json();

        setData(data);

        const uniqueSortedIds: number[] = Array.from(
            new Set(data.map((post: Post) => post.userId))
        ).sort((a, b) => a - b);

        setUsersId(uniqueSortedIds);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    setSearchValue(inputValue);
  }, [inputValue])

  if (loading) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="alert alert-danger text-center m-5" role="alert">
          {error}
        </div>
    );
  }

  return (
      <div className="pt-5">
        <div className='container'>
          <div className="mb-4 d-flex gap-4 flex-wrap">
            <UserIdFilter value={selectedUserId} onChange={setSelectedUserId} usersId={usersId}/>
            <Search
                value={inputValue}
                onChange={setInputValue}
            />
          </div>

          <PostList posts={visiblePosts}/>
        </div>
      </div>
  );
}