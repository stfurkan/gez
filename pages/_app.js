import Footer from '../components/Footer';
import Header from '../components/Header';
import SEO from '../components/SEO';

import '../styles/main.css';

function App({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('visits') === null) {
      localStorage.setItem('visits', JSON.stringify([]));
    }
  }

  return (
    <div className='flex flex-col h-screen justify-between'>
      <SEO />
      <Header />
      <div className='container mx-auto my-5 flex-1'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
