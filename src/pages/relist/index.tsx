import Layout from '@/layouts/layout';
import { ReactElement, useContext } from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { PlayingContext } from '@/contexts/PlayingContext';

const Relist: NextPageWithLayout = () => {
  const { setDeviceId } = useContext(PlayingContext);
  console.log('here', setDeviceId);
  return <div>Relist</div>;
};

Relist.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Relist;
