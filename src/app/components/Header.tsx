'use client'
import React, { FC } from 'react';

import { useRouter } from 'next/navigation';

import { Amplify } from 'aws-amplify';

import { signOut } from 'aws-amplify/auth';

import { Flex, Grid, Heading, Menu, MenuItem } from '@aws-amplify/ui-react';

import config from './../../amplifyconfiguration.json';

interface HeaderProps {}

Amplify.configure(config);

const Header: FC<HeaderProps> = () => {
  const { push } = useRouter();

  async function handleSignOut(): Promise<void> {
    try {
      await signOut();
      
      localStorage.removeItem("username");
      localStorage.removeItem("isSignedIn");

      push('/login');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <Grid templateColumns={"10fr 1.5fr 0.5fr"} gap={10} padding={"1rem"}>
      <Heading level={4}>Todos</Heading>
      <Heading level={6} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        Hello User
      </Heading>
      <Flex justifyContent={"flex-end"}>
        <Menu menuAlign="start">
          <MenuItem onClick={() => handleSignOut()}>Log out</MenuItem>
        </Menu>
      </Flex>
    </Grid>
  );
};

export default Header;