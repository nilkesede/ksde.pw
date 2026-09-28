import type { Metadata } from "next"
import { GoogleAnalytics } from '@next/third-parties/google'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import { theme } from './config'
import "./globals.css";

export const metadata: Metadata = {
  title: "Nil Késede | Software Developer",
  description: "A Software Developer focused on creating and contribute to high availability apps and improve the user experience with modern tech stacks.",
  keywords: "javascript, developer, development, web, mobile, full stack, nil, késede, kesede"
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.backgroundColor};
    color: ${theme.primaryColor};
  }
  a {
    color: ${theme.primaryColor};
    &:hover {
      color: ${theme.secondaryColor};
    }
}`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="UA-42613066-1" />
    </html>
  );
}
