import Header from './header/Header';
import Footer from './footer/Footer';
import {Toaster} from '@/components/shadcn/ui/toaster';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header
        className={`flex flex-row w-full items-center justify-between px-3 sm:px-4 h-[5vh] sm:h-[7vh]`}
      />
      <main
        className={`flex flex-col h-[95vh] sm:h-[86vh] w-full sm:max-w-5xl bg-slate-500`}
      >
        {children}
      </main>
      <Footer
        className={`hidden sm:flex flex-row w-full items-center justify-between gap-4 px-3 h-[7vh]`}
      />
      <Toaster />
    </>
  );
}
