import {Button} from '@/components/shadcn/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/shadcn/ui/tooltip';
import {UserPlus} from 'lucide-react';
import {useToast} from '@/components/shadcn/ui/use-toast';

export default function FollowButton(userId: string) {
  // function to send friend request: TODO: implement this
  const sendFriendRequest = async () => {
    console.log("sendFriendRequest's userId: ", userId);
    // dummy function to test
    const response = await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    ).then(() => false); // change to false to test friend request failed
    if (response) {
      console.log('friend request sent');
      return true;
    } else {
      console.log('friend request failed');
      return false;
    }
  };
  const {toast} = useToast();
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          size='icon'
          className='bg-custom3 hover:bg-custom3/70'
          onClick={async () => {
            const sendFriendRequestResult = await sendFriendRequest();
            if (sendFriendRequestResult) {
              toast({
                title: 'Friend request sent',
                description: 'You can unfriend this user.'
              });
            } else {
              // TODO: Add actions to manage error.
              toast({
                title: 'Friend request failed',
                description: 'Please try again later.',
                variant: 'destructive'
              });
            }
          }}
        >
          <UserPlus />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Send friend request</TooltipContent>
    </Tooltip>
  );
}
