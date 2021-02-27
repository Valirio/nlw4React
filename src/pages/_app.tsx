import '../styles/global.css';

import { ChallengesProvaider} from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvaider>
      <Component {...pageProps} />
    </ChallengesProvaider>
  )
}

export default MyApp
