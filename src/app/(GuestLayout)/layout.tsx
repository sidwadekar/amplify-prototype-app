'use client'
import React from 'react';

import { Amplify } from 'aws-amplify';

import { getCurrentUser } from 'aws-amplify/auth';

import config from './../../amplifyconfiguration.json';

Amplify.configure(config);

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  async function checkUserAthetication() {
    try {
      const { username, userId } = await getCurrentUser();
      if(username !== "" && userId !== "") {
        window.location.href = '/dashboard'
      }
    } catch (err) {
      window.location.href = '/login'
    }
  }

  React.useEffect(() => {
    checkUserAthetication()
  }, [])

  return (
    <section>{children}</section>
  )
}
