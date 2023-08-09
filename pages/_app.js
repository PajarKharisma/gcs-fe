import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { store } from "../store";

import PageChange from "@/components/PageChange/PageChange.js";

import "@/assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/scss/nextjs-argon-dashboard.scss";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`

=========================================================
* * NextJS Argon Dashboard v1.1.0 based on Argon Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <RecoilRoot>
            <React.Fragment>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>Krakatau GCS</title>
                {
                  <link
                    rel="shortcut icon"
                    href={require("@/assets/img/brand/favicon.ico")}
                  />
                }
                <link
                  rel="apple-touch-icon"
                  sizes="76x76"
                  href={require("@/assets/img/brand/apple-icon.png")}
                />
                <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
              </Head>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </React.Fragment>
          </RecoilRoot>
        </SessionProvider>
      </Provider>
    );
  }
}
