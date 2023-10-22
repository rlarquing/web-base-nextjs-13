import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Template} from "../components";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aplicación-base',
  description: 'Web base para proyectos',
}

export default function RootLayout ({
                                      children
                                    }: {
  children: React.ReactNode
}) {
  return (
      <html lang='en'>
      <body className={inter.className}>
      <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div>
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
      />
      <Template title={'Web-base-nextjs'}>
        {children}
      </Template>
      </body>
      </html>
  )
}

