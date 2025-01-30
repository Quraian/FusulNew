import { Group, Burger, Title, Button } from '@mantine/core';
import { useLocation } from 'react-router';

type HeaderProps = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

export function Header({ opened, setOpened }: HeaderProps) {
  const { pathname } = useLocation();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger
          opened={opened}
          onClick={() => setOpened(!opened)}
          hiddenFrom="sm"
          size="sm"
        />
        <Title order={3}>Fusul</Title>
      </Group>
      <Group visibleFrom="sm">
        <Button
          component="a"
          href="/privacy"
          variant={pathname === '/privacy' ? 'light' : 'subtle'}>
          Privacy
        </Button>

        <Button variant="default">Download</Button>
      </Group>
    </Group>
  );
}
