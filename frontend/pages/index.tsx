import { GetServerSideProps } from "next";
import { parse } from "cookie";
import {useRouter} from "next/router"; 

type User = {
  id: number;
  name: string;
  email?: string;
};

type HomeProps = {
  users: User[];
  currentUser?: User | null;
};

export default function Home({ users, currentUser }: HomeProps) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div
      className="flex flex-col gap-6 justify-center items-center min-h-screen bg-backgroundGreen">
      <h1
        className="font-sans">
        {currentUser ? `Welcome, ${currentUser.name}` : "Users"}
      </h1>

      {currentUser ? (
        <>
        <ul>
          {users.map((u) => (
            <li
              key={u.id}>
              {u.name}
            </li>
          ))}
        </ul>
        <button
        onClick={handleLogout}
        className="bg-primary w-24 h-12 text-white rounded-lg py-2 hover:bg-okGreen disabled:opacity-50"
        >
          Logout
        </button>

        </>

      ) : (
        <p
          className="font-sans">
          Please
          <a className="" href="/login">log in</a>
          to see the users.
        </p>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  try {
    const cookies = context.req.headers.cookie
      ? parse(context.req.headers.cookie)
      : {};
    const token = cookies.token;

    let currentUser: User | null = null;
    if (token) {
      const resUser = await fetch("http://127.0.0.1:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }

      });
      if (resUser.ok) {
        currentUser = await resUser.json();
      }
    }

    let users: User[] = [];
    if (currentUser) {
      const resUsers = await fetch("http://127.0.0.1:5000/api/users");
      if (resUsers.ok) {
        users = await resUsers.json();
      }
    }

    console.log("Cookies:", context.req.headers.cookie)

    return { props: { users, currentUser } };

  } catch (err) {
    console.error("Failed to fetch users or auth: ", err);
    return { props: { users: [], currentUser: null } };
  }
};
