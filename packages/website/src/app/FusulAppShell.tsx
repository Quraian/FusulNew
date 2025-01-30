import { PropsWithChildren, useState } from 'react';
import { useLocation } from 'react-router';
import { AppShell, Button } from '@mantine/core';

import { Header } from './components';

export default function FusulAppShell({ children }: PropsWithChildren) {
  const [opened, setOpened] = useState(false);
  const { pathname } = useLocation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md">
      <AppShell.Header>
        <Header opened={opened} setOpened={setOpened} />
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Button
          component="a"
          href="/privacy"
          variant={pathname === '/privacy' ? 'filled' : 'subtle'}
          fullWidth
          mb="sm">
          Privacy
        </Button>
        <Button variant="filled" fullWidth>
          Download
        </Button>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
