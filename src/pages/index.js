import Layout from '@/components/Layout';
import useStateStore from '@/components/zustand/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { email, password } = useStateStore();

  // useEffect(() => {
  //   if (!email && !password) {
  //     router.push('/login');
  //   }
  // }, [email, password]);
  return (
    <>
      <Layout />
    </>
  );
}
