import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Template} from "../components";

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
      <Template title={'Web-base-nextjs'}>
        {children}
      </Template>
      </body>
      </html>
  )
}

