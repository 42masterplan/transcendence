import SettingBtn from './button/SettingBtn';

export default function Header() {
  return (
    <div>
      <h1
        className='bg-gradient-to-r from-purple-700 via-blue-500
  to-cyan-300 text-transparent bg-clip-text p-5
  text-center font-roboto-mono text-5xl leading-tight font-semibold'
      >
        Amazing Pong
      </h1>
      <SettingBtn />
    </div>
  );
}
