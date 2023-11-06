import {useEffect} from 'react';
import {useRouter} from 'next/router';
import Axios from '@/api';

export default function Redirect() {
  const router = useRouter();
  async function login(auth_code: string | string[]) {
    await Axios.get('/user/auth-callback', {params: {auth_code: auth_code}})
      .then((res) => {
        console.log('>>> [LOGIN] ✅ SUCCESS', res.data);
        if (res.status === 200) {
          if (res.data.hasAccount) {
            if (res.data.isTwoFactorEnabled === true) router.replace('/');
            else router.replace('/welcome/register/2step-auth/validation');
          } else {
            router.replace('/welcome/register');
          }
        } else if (res.status === 401) {
          console.warn('It is auth_code Error');
          router.replace('/welcome');
        }
      })
      .catch((err) => {
        console.warn('>>> [LOGIN] 🤬 ERROR', err.message);
        router.replace('/welcome');
      });
  }
  useEffect(() => {
    const auth_code = router.query.code;
    if (auth_code) {
      console.log(auth_code);
      console.log('>>> [LOGIN] 🚀 auth_code:', auth_code);
      login(auth_code);
    }
  }, [router]);

  return <div> this is not for you!</div>;
}