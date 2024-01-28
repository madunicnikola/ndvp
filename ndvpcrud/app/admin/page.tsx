"use client";
import { useEffect } from 'react';
import { auth, signOut } from '@/auth';
import { LogOut } from 'lucide-react';

const MainAdmin = () => {
  useEffect(() => {
    const fetchData = async () => {
      const session = await auth;
    };

    fetchData();
  }, []); 
  return (
    <div>
      <form
        onSubmit={async (e) => {
          await signOut();
        }}>
        <button type="submit">
          <LogOut />
        </button>
      </form>
    </div>
  );
};

export default MainAdmin;
