import { Prisma, PrismaClient } from '@prisma/client';

import { getCities, generateCalendars } from '@fusul/data';

process.env.TZ = 'Asia/Riyadh';

const prismaClient = new PrismaClient();

async function seeder(
  seedFn: (p: PrismaClient) => Promise<unknown>,
  title = 'rows'
) {
  try {
    const count = await seedFn(prismaClient);

    if (typeof count === 'number') {
      if (count) {
        console.log(JSON.stringify({ [title]: count }));
      } else {
        console.error(`Seeding ${title} is unsuccessful.`);
      }
    } else {
      console.log(JSON.stringify(count));
    }

    await prismaClient.$disconnect();
  } catch (error) {
    console.error(error);

    await prismaClient.$disconnect();

    process.exit(1);
  }
}

export async function seedCities(prisma: PrismaClient) {
  // await prisma.city.deleteMany();
  const { count } = await prisma.city.createMany({ data: getCities() });

  return count;
}

type CalendarsListType =
  | Generator<Prisma.CalendarUncheckedCreateInput, unknown, unknown>
  | Prisma.CalendarUncheckedCreateInput[];

export async function seedCalendars(
  prismaService: PrismaClient,
  calendars: CalendarsListType
) {
  // await prismaService.calendarEvent.deleteMany();
  // await prismaService.calendar.deleteMany();

  for (const calendar of calendars) {
    try {
      await prismaService.calendar.create({
        data: calendar,
      });
    } catch (error) {
      console.error(`Unable to seed ${calendar.titleEn}\n`, error);
    }
  }
}

seeder(seedCities, 'cities').then();

const args = process.argv.slice(2); // Get arguments after node and script name
const pattern = /^\d{4}:\d{4}$/; // Regular expression for YYYY:NNNN

let years: [number, number] = [2025, 1446];

for (const arg of args) {
  if (pattern.test(arg)) {
    const [gregorianYear, hijriYear] = arg.split(':');
    years = [Number.parseInt(gregorianYear), Number.parseInt(hijriYear)];
    break;
  }
}

const [gregorianYear, hijriYear] = years;
const calendars = generateCalendars(gregorianYear, hijriYear);

seeder(() => seedCalendars(prismaClient, calendars), 'calendars').then();
