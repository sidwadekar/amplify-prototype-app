import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import { Amplify } from 'aws-amplify';
import './globals.css';
import '@aws-amplify/ui-react/styles.css';
import config from './../amplifyconfiguration.json';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amplify Prototype App',
  description: 'This is prototype app for AWS Amplify',
}

Amplify.configure(config);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
