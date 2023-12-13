import SvgColor from "../../components/svg-color/svg-color";


const icon = (name : string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'home',
    path: '/',
    icon: icon('ic_home'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'plans',
    path: '/plans',
    icon: icon('ic_cart'),
  },
  {
    title: 'mailbox',
    path: '/mailbox',
    icon: icon('ic_email'),
  },
  {
    title: 'my courses',
    path: '/courses',
    icon: icon('ic_courses'),
  },
];

export default navConfig;
