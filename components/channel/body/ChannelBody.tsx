import {cn} from '@/lib/utils';

import React from 'react';
import {useRef, useEffect, useCallback} from 'react';
import {ChannelHistoryType, channelStateType} from '@/types/channel';
import ScrollableContainer from '../../container/ScrollableContainer';
import ChatMessage from '@/components/channel/body/ChatMessage';
import useSocket from '@/hooks/useSocket';
import SystemCard from './SystemCard';
interface MessageHandlerArgs {
  channelId: string;
  userId: string;
  userName: string;
  profileImage: string;
  content: string;
}

export default React.forwardRef(function ChannelBody(
  {
    channelInfoState,
    messageState,
    messageDispatch
  }: {
    channelInfoState: channelStateType;
    messageState: ChannelHistoryType[];
    messageDispatch: any;
  },
  channelInfoRef: any
) {
  const messageEndRef = useRef<HTMLDivElement>();
  const [socket] = useSocket('channel');
  function handleMessageAdd(payload: any) {
    messageDispatch({
      type: 'MESSAGE_ADD',
      payload: payload
    });
  }
  const newMessageHandler = useCallback(
    ({
      channelId,
      userId,
      userName,
      profileImage,
      content
    }: MessageHandlerArgs) => {
      console.log('newMessage');
      if (channelInfoRef?.current.channelId === channelId) {
        console.log('메세지가 도착했습니다.');
        handleMessageAdd({
          id: userId,
          name: userName,
          profileImage: profileImage,
          content: content
        });
      }
      if (content.startsWith('[system]')) {
        console.log('시스템 메세지가 도착했습니다.');
        if (!content.includes('뮤트함.')) socket.emit('myChannels');
      }
    },
    []
  );
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messageState]);
  useEffect(() => {
    socket.on('newMessage', newMessageHandler);
    return () => {
      socket.off('newMessage', newMessageHandler);
    };
  }, []);

  return (
    <div className='h-full'>
      <ScrollableContainer className='rounded-none'>
        <div>
          {messageState?.map((msg: ChannelHistoryType, idx: number) =>
            msg.content.startsWith('[system]') ? (
              <SystemCard ref={messageEndRef} key={idx}>
                {msg.content.substring(8)}
              </SystemCard>
            ) : (
              <div
                key={idx}
                className={cn(
                  'flex w-max max-w-[90%] rounded-lg px-3 text-sm',
                  msg.name === 'hkong' ? 'ml-auto' : 'p-2'
                )}
              >
                {/* TODO 채팅 메시지 내 정보랑 비교하기
                 */}
                <ChatMessage
                  isMe={msg.name === 'hkong'}
                  size='md'
                  message={msg.content}
                  side={msg.name === 'hkong' ? 'right' : 'left'}
                  className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom4'
                  ref={messageEndRef as any}
                  profileImage={msg.profileImage}
                  user_name={msg.name}
                  channelId={channelInfoState.channelId}
                  role={channelInfoState.role}
                  user_id={msg.id}
                />
              </div>
            )
          )}
        </div>
      </ScrollableContainer>
    </div>
  );
});
