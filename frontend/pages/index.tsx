import { GetServerSideProps } from "next";
import {parse } from "cookie";

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
    <div>
      <h1>
        {currentUser ? `Welcome, ${currentUser.name}` : "Users" }
      </h1>
      {currentUser ? (
        <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name}
          </li>
        ))}
      </ul>

      ): ( 
        <p>Please <a href="/login">log in</a> to see the users.</p>
      )
      
    }
      
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
    if(token){
      const resUser = await fetch("http://127.0.0.1:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}`}

      });
      if(resUser.ok){
        currentUser = await resUser.json();
      }
    }

    let users: User[] = [];
    if(currentUser){
      const resUsers = await fetch("http://127.0.0.1:5000/api/users");
      if(resUsers.ok){
        users = await resUsers.json(); 
      }
    }

    console.log("Cookies:", context.req.headers.cookie)

    return { props: {users, currentUser}};

  }catch(err){
    console.error("Failed to fetch users or auth: ", err);
    return {props: {users: [], currentUser: null}};
  }
};
