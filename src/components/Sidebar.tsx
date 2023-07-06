import { AuthContext } from '@/context';
import { PowerIcon, PresentationChartBarIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { Card, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import { useContext } from 'react';

export const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Card className='h-screen w-full max-w-[18rem] p-4  rounded-none'>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className='h-5 w-5' />
          </ListItemPrefix>
          성적 관리
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className='h-5 w-5' />
          </ListItemPrefix>
          학생 통계
        </ListItem>
        <ListItem onClick={logout}>
          <ListItemPrefix>
            <PowerIcon className='h-5 w-5' />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};
