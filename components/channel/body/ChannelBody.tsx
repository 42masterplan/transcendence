import {cn} from '@/lib/utils';

import {useRef, useEffect, Dispatch, SetStateAction} from 'react';

import {ChannelHistoryType} from '@/types/channel';
import useChatSocket from '@/hooks/useChatSocket';
import ChatMessage from '@/components/card/userInfoCard/ChatCard';
import ScrollableContainer from '../../container/ScrollableContainer';

export function ChannelBody({
  messages,
  setMessages,
  channelId,
  role
}: {
  messages: ChannelHistoryType[];
  setMessages: Dispatch<SetStateAction<ChannelHistoryType[]>>;
  channelId: string;
  role: string;
}) {
  const messageEndRef = useRef<HTMLDivElement>();
  const [socket] = useChatSocket('channel');
  const ShowHistory = () => {
    return (
      <>
        {messages.map((message, idx) => (
          <div
            key={idx}
            // 이 부분도 추후 리코일로 관리 하는 유저 정보로 확인 예정
            className={cn(
              'flex w-max max-w-[90%] rounded-lg px-3 text-sm',
              message.id === 'joushin' ? 'ml-auto' : 'p-2'
            )}
          >
            {message.id === 'joushin' ? (
              <ChatMessage
                size='md'
                message={message.content}
                side='left'
                className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom4'
                ref={messageEndRef as any}
                profileImage={message.profileImage}
                user_name={message.name}
                channelId={channelId}
                role={role}
              />
            ) : (
              <ChatMessage
                size='md'
                message={message.content}
                side='left'
                className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom4'
                ref={messageEndRef as any}
                profileImage={message.profileImage}
                user_name={message.name}
                channelId={channelId}
                role={role}
              />
            )}
          </div>
        ))}
      </>
    );
  };

  socket.on('newMessage', (roomid, {id, name, profileImage, content}) => {
    if (roomid !== channelId) return;
    console.log('새로운 메시지', id, name, profileImage, content);
    setMessages([
      ...messages,
      {id: id, name: name, profileImage: profileImage, content: content}
    ]);
  });
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);
  return (
    <div className='rounded-none bg-red-300 h-full'>
      <ScrollableContainer className=''>
        <div>{ShowHistory()}</div>
      </ScrollableContainer>
    </div>
  );
}
