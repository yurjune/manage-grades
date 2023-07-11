import {
  PresentationChartBarIcon,
  UsersIcon,
  UserCircleIcon,
  PencilIcon,
} from '@heroicons/react/24/solid';
import { Card, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';

const lists = [
  {
    title: '학생 관리',
    path: '/',
    icon: <UsersIcon className='h-5 w-5' />,
  },
  {
    title: '성적 관리',
    path: '/scores',
    icon: <PencilIcon className='h-5 w-5' />,
  },
  {
    title: '성적 통계',
    path: '/stastics',
    icon: <PresentationChartBarIcon className='h-5 w-5' />,
  },
];

export const Sidebar = () => {
  const router = useRouter();

  const handleItemClick = (path: string) => () => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  return (
    <Card className='sticky top-0 h-screen w-full max-w-[17rem] p-4 rounded-none'>
      <div className='mb-2 p-4 flex items-center cursor-pointer'>
        <UserCircleIcon className='h-8 w-8 mr-3' />
        <Typography variant='h5' color='blue-gray'>
          최승제 선생님
        </Typography>
      </div>
      <List>
        {lists.map(({ title, path, icon }) => (
          <ListItem key={path} onClick={handleItemClick(path)}>
            <ListItemPrefix>{icon}</ListItemPrefix>
            {title}
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
