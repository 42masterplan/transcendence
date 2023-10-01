import Header from '@/components/components/custom/Header';
import {InputForm} from '@/components/components/custom/InputForm';
import AvatarContainer from './AvatarContainer';
import {InputWithLabel} from '@/components/components/custom/InputWithLabel';
import {Button} from '@/components/components/shadcn/button';
import LinkBtn from '@/components/components/custom/LinkBtn';
import { InputFile } from './InputFile';

export default function register() {
  return (
    <>
      <Header />
      <div className='flex justify-center'>
        <div className='flex flex-col items-center w-[466px] h-auto rounded-lg overflow-y-auto p-6 bg-info_bg gap-3'>
          <h1
            className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-center m-3'
          >
            회원 정보 설정
          </h1>
          <InputForm
            label='닉네임'
            placeholder='당신의 창의성을 믿어봐요'
            buttonLabel='중복확인'
          />
          <h1
            className='font-roboto-mono text-1xl
            font-semibold leading-10 tracking-normal text-center'
          >
            아바타 선택
          </h1>
          <AvatarContainer />
          <InputFile />
          <InputWithLabel
            header='상태메시지'
            placeholder='type what you want'
          />
          <LinkBtn
            link='/welcome/register/2step-auth'
            name='계속하기'
          />
        </div>
      </div>
    </>
  );
}
