import Banner from './Banner';
import ControlPanel from './ControlPanel';
import Graphs from './Graphs';
import Header from './Header';

function Home() {
  return (
    <div className='home'>
      <Header />
      <Banner />
      <ControlPanel />

      <Graphs />
    </div>
  );
}

export default Home;
