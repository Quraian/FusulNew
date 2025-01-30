import { Container, Title, Text } from '@mantine/core';

export function PrivacyPage() {
  return (
    <Container size="md" py="xl">
      <Title order={1}>Privacy Policy</Title>
      <Text>
        This privacy policy applies to the Fusul app (hereby referred to as
        "Application") for mobile devices that was created by Fusul Team (hereby
        referred to as "Service Provider") as a Free service. This service is
        intended for use "AS IS".
      </Text>
      <Title order={2} mt="xl">
        What information does the Application obtain and how is it used?
      </Title>
      <Text>
        The Application does not obtain any information when you download and
        use it. Registration is not required to use the Application.
      </Text>
      <Title order={2} mt="xl">
        Does the Application collect precise real time location information of
        the device?
      </Title>
      <Text>
        This Application does not collect precise information about the location
        of your mobile device.
      </Text>
      <Title order={2} mt="xl">
        Do third parties see and/or have access to information obtained by the
        Application?
      </Title>
      <Text>
        Since the Application does not collect any information, no data is
        shared with third parties.
      </Text>
      <Title order={2} mt="xl">
        What are my opt-out rights?
      </Title>
      <Text>
        You can stop all collection of information by the Application easily by
        uninstalling it. You may use the standard uninstall processes as may be
        available as part of your mobile device or via the mobile application
        marketplace or network.
      </Text>
      <Title order={2} mt="xl">
        Children
      </Title>
      <Text>
        The Application is not used to knowingly solicit data from or market to
        children under the age of 13.
      </Text>
      <Text>
        The Service Provider does not knowingly collect personally identifiable
        information from children. The Service Provider encourages all children
        to never submit any personally identifiable information through the
        Application and/or Services. The Service Provider encourage parents and
        legal guardians to monitor their children's Internet usage and to help
        enforce this Policy by instructing their children never to provide
        personally identifiable information through the Application and/or
        Services without their permission. If you have reason to believe that a
        child has provided personally identifiable information to the Service
        Provider through the Application and/or Services, please contact the
        Service Provider (contact-us@fusul.com) so that they will be able to
        take the necessary actions. You must also be at least 16 years of age to
        consent to the processing of your personally identifiable information in
        your country (in some countries we may allow your parent or guardian to
        do so on your behalf).
      </Text>
      <Title order={2} mt="xl">
        Security
      </Title>
      <Text>
        The Service Provider is concerned about safeguarding the confidentiality
        of your information. However, since the Application does not collect any
        information, there is no risk of your data being accessed by
        unauthorized individuals.
      </Text>
      <Title order={2} mt="xl">
        Changes
      </Title>
      <Text>
        This Privacy Policy may be updated from time to time for any reason. The
        Service Provider will notify you of any changes to their Privacy Policy
        by updating this page with the new Privacy Policy. You are advised to
        consult this Privacy Policy regularly for any changes, as continued use
        is deemed approval of all changes.
      </Text>
      <Text>This privacy policy is effective as of 2024-12-01</Text>
      <Title order={2} mt="xl">
        Your Consent
      </Title>
      <Text>
        By using the Application, you are consenting to the processing of your
        information as set forth in this Privacy Policy now and as amended by
        the Service Provider.
      </Text>
      <Title order={2} mt="xl">
        Contact Us
      </Title>
      <Text>
        If you have any questions regarding privacy while using the Application,
        or have questions about the practices, please contact the Service
        Provider via email at contact-us@fusul.com.
      </Text>
    </Container>
  );
}
