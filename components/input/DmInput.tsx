import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import {Send} from 'lucide-react';
import {useState} from 'react';
import useSocket from '@/hooks/useSocket';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {dmInfoType} from '@/types/dm';
const DMInput = ({setDMData, dmInfo}: {setDMData: any; dmInfo: dmInfoType}) => {
  const [content, setContent] = useState('');
  const inputLength = content.trim().length;
  const [socket] = useSocket('alarm');
  const {toast} = useToast();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (content === '') return;
        socket.emit(
          'DmNewMessage',
          {
            dmId: dmInfo.dmId,
            participantId: dmInfo.myId,
            content: content
          },
          (ret: any) => {
            console.log('dm 보냄', ret);
            if (ret === 'DmNewMessage Success!') {
              setDMData((prev: any) => {
                return [
                  ...prev,
                  {
                    content: content,
                    name: dmInfo.myName,
                    id: dmInfo.myId,
                    profileImage: dmInfo.myProfileImage
                  }
                ];
              });
              setContent('');
            } else {
              toast({
                title: 'DM 전송 실패!',
                variant: 'destructive',
                description: 'DM 전송에 실패했습니다.'
              });
            }
          }
        );
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
export default DMInput;
