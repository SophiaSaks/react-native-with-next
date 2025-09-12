import { GetServerSideProps } from "next";

type User = {
  id: number;
  name: string;
};

type HomeProps = {
  users: User[];
};

export default function Home({ users }: HomeProps) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <ul className="list-disc pl-6">
        {users.map((u) => (
          <li key={u.id} className="text-lg">
            {u.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/users"); // Use 127.0.0.1 to avoid IPv6 issues
    const users: User[] = await res.json();

    return { props: { users } };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return { props: { users: [] } }; // fallback to empty array
  }
};
