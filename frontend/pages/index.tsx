import { GetServerSideProps } from "next";
import cookie from "cookie"; 
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
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl font-bold mb-4">
        {currentUser ? `Welcome, ${currentUser.name}` : "Users" }
      </h1>
      {currentUser ? (
        <ul className="list-disc pl-6">
        {users.map((u) => (
          <li key={u.id} className="text-lg">
            {u.name}
          </li>
        ))}
      </ul>

      ): ( 
        <p>Please <a href="/login" className="text-blue-500 underline">log in</a> to see the users.</p>
      )
      
    }
      
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  try {
    const cookies = context.req.headers.cookie
    ? cookie.parse(context.req.headers.cookie)
    : {};
    const token = cookies.token; 

    let currentUser: User | null = null; 
    if(token){
      const resUser = await fetch("http://127.0.0.1:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}`}

      });
      if(resUser.ok){
        currentUser = await resUser.json();
      }
      
    }

    return { props: {users:[], currentUser}};

  }catch(err){
    console.error("Failed to fetch users or auth: ", err);
    return {props: {users: [], currentUser: null}};
  }
};
