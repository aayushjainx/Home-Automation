import Banner from './Banner';
import ControlPanel from './ControlPanel';
import Header from './Header';

function Home() {
  return (
    <div className='home'>
      <Header />
      <Banner />
      <ControlPanel />
    </div>
  );
}

export default Home;
