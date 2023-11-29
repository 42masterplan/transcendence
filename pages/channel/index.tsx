import {ChannelBody} from '@/components/channel/body/ChannelBody';
import ChannelList from '@/components/channel/list/ChannelList';
import {useCallback, useState} from 'react';
import ChannelHeader from '@/components/channel/header/ChannelHeader';
import Image from 'next/image';
import WaitImage from '@/public/postcss.config.png';
import {useEffect} from 'react';
import useChatSocket from '@/hooks/useChatSocket';
import {ChannelHistoryType} from '@/types/channel';
import ChannelInput from '@/components/channel/body/ChannelInput';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import {toast} from '@/components/shadcn/ui/use-toast';
// const socket = io('http://localhost:4001');

export default function ChannelPage() {
  const [currentChannel, setCurChannel] = useState('');
  const [nowChannelId, setNowChannelId] = useState('');
  const [role, setRole] = useState('');

  //여기서는 채널 페이지를 들어올 때 처음 소켓 연결을 수립하지만, 실제로는 모든 페이지에서 socket을 연결한 채로 유지해야만 한다.
  const [socket] = useChatSocket('channel');

  const [messages, setMessages] = useState([] as ChannelHistoryType[]);
  const newMessageHandler = useCallback(
    ({channelId, userId, userName, profileImage, content}: any) => {
      console.log('newMessage');
      console.log(channelId, userId, userName, profileImage, content);
      console.log('myChannelId', nowChannelId);
      if (nowChannelId === channelId) {
        console.log('메세지가 도착했습니다.');
        setMessages([
          {
            id: userId,
            name: userName,
            profileImage: profileImage,
            content: content
          },
          ...messages
        ]);
      }
    },
    []
  );

  useEffect(() => {
    socket.emit('myChannels');
    socket.on('connect', () => {
      console.log('---------connected----------');
    });
    socket.on('disconnect', () => {
      console.log('---------disconnected----------');
    });
    socket.on('myRole', (data) => {
      console.log('권한 설정', data);
      if (data === null) alert('채널에 참가중..');
      else setRole(data.role);
    });
    socket.on('error_exist', (error) => {
      console.log('error', error);
    });
    socket.on('channelHistory', (data) => {
      console.log(data);
      setMessages(data);
    });
    socket.on('newMessage', newMessageHandler);
  }, []);

  return (
    <div className='flex h-full'>
      <ChannelList
        currentChannel={currentChannel}
        setCurChannel={setCurChannel}
        setMessages={setMessages}
        setChannelId={setNowChannelId}
      />
      {currentChannel === '' ? (
        <div className='flex flex-col items-center h-full'>
          <ChannelHeader
            channelId={nowChannelId}
            role={role}
            channel_name={currentChannel}
          />
          <Image
            src={WaitImage}
            alt='채널에 참여해주세요'
            className='bg-custom4 h-full w-full'
          ></Image>
        </div>
      ) : (
        <div className='flex flex-col w-full h-full'>
          <ChannelHeader
            channel_name={currentChannel}
            role={role}
            channelId={nowChannelId}
          />
          <ScrollableContainer className=' bg-custom2 rounded-none'>
            <ChannelBody
              channel_name={currentChannel}
              messages={messages}
              setMessages={setMessages}
              nowChannelId={nowChannelId}
              role={role}
            />
          </ScrollableContainer>
          <ChannelInput
            messages={messages}
            setMessages={setMessages}
            channelId={nowChannelId}
          />
        </div>
      )}
    </div>
  );
}
