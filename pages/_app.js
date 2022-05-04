import '../styles/globals.css'
import {useEffect} from "react";
import Head from 'next/head'
import BaiduScript from "../modules/baidu";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);
  return (
      <>
          <Head>
              <BaiduScript/>
          </Head>
          <Component {...pageProps} />
      </>
  )
}

export default MyApp
