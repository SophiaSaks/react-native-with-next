import { GetServerSideProps } from "next";

type User = {
  id: number;
  name: string;
};

type HomeProps = {
  users: User[];
}

export default function Home( {users}: HomeProps) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Users</h1>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async() => {
  const res = await fetch("http://localhost:5000/api/users");
  const users: User[] = await res.json();
  
  return {props: {users }}; 
}
