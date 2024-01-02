'use client'
import React from 'react';

import { getCurrentUser } from 'aws-amplify/auth';

import Header from './../components/Header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  async function checkUserAthetication() {
    try {
      const { username, userId } = await getCurrentUser();
      if(username === "" && userId === "") {
        window.location.href = '/login'
      }
    } catch (err) {
      window.location.href = '/login'
    }
  }

  React.useEffect(() => {
    checkUserAthetication()
  }, [])
  
  return (
    <section>
      <Header/>
      {children}
    </section>
  )
}
