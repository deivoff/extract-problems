export type Route = {
  href: string;
  title?: string;
};

export const ROUTES = {
  index: {
    href: '/',
    title: 'index',
    seo: 'index',
  },
  landing: {
    href: '/landing',
    title: 'index',
  }
}