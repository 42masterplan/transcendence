import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import {Send} from 'lucide-react';
import {Dispatch, SetStateAction, useState} from 'react';
import {ChannelHistoryType} from '@/types/channel';
import useChatSocket from '@/hooks/useChatSocket';
const ChannelInput = ({channelId}: {channelId: string}) => {
  const [socket] = useChatSocket('channel');
  const [content, setContent] = useState('');
  const inputLength = content.trim().length;
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (inputLength === 0) return;
        console.log('내!!channelId', channelId);
        socket.emit('newMessage', {content, channelId}, (msg: string) => {
          if (msg === 'success') setContent('');
        });
      }}
      className='flex w-full items-center space-x-2'
    >
      <Input
        id='message'
        placeholder='Type your message...'
        className='flex-1'
        autoComplete='off'
        value={content}
        onChange={(event) => {
          if (content.length > 500) return;
          setContent(event.target.value);
        }}
      />
      <Button type='submit' size='icon' disabled={inputLength === 0}>
        <Send className='h-4 w-4' />
        <span className='sr-only'>Send</span>
      </Button>
    </form>
  );
};
export default ChannelInput;
