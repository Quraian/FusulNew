import { Title, Text, Container, Grid, Image } from '@mantine/core';

export function HomePage() {
  return (
    <Container size="lg" py="xl">
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={1} size="h1" mb="md">
            Events from different calendars in Hijri/Gregorian, prayer times and
            more.
          </Title>
          <Text size="xl" mb="xl">
            Discover the important events from multiple calendars, prayer times
            and more.
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image
            src="/screenshots/fusul-main-view-2024-11-14.png"
            alt="Mobile App Screenshot"
            height={600}
            fit="contain"
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
