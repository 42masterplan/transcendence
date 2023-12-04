import {Button} from '@/components/shadcn/ui/button';
import {useToast} from '../shadcn/ui/use-toast';
import {ToastAction} from '../shadcn/ui/toast';
import {useRouter} from 'next/router';
import {useCookies} from 'react-cookie';

export default function LogOutBtn({children}: {children: React.ReactNode}) {
  const {toast} = useToast();
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies();

  return (
    <Button
      className='w-full h-12 bg-custom2/70 text-custom4 rounded-lg'
      onClick={() => {
        toast({
          title: 'Are you sure you want to log out?',
          description: 'This action cannot be undone.',
          variant: 'destructive',

          action: (
            <ToastAction
              altText='Log Out'
              onClick={() => {
                removeCookie('accessToken');
                removeCookie('isTwoFactorDone');
                removeCookie('hasAccount');
                removeCookie('intraId');
                router.push('/welcome');
              }}
            >
              Log Out
            </ToastAction>
          )
        });
      }}
    >
      {children}
    </Button>
  );
}