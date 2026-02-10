import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Trans, useTranslation } from 'react-i18next';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { t } = useTranslation();
  const devToolsShortcut =
    Platform.select({
      ios: 'cmd + d',
      android: 'cmd + m',
      web: 'F12',
    }) ?? '';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('home.welcome')}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('home.step1.title')}</ThemedText>
        <Trans
          i18nKey="home.step1.body"
          parent={ThemedText}
          values={{ shortcut: devToolsShortcut }}
          components={{ bold: <ThemedText type="defaultSemiBold" /> }}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">{t('home.step2.title')}</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title={t('home.link.action')}
              icon="cube"
              onPress={() => alert('Action pressed')}
            />
            <Link.MenuAction
              title={t('home.link.share')}
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title={t('home.link.more')} icon="ellipsis">
              <Link.MenuAction
                title={t('home.link.delete')}
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>{t('home.step2.body')}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('home.step3.title')}</ThemedText>
        <Trans
          i18nKey="home.step3.body"
          parent={ThemedText}
          components={{ bold: <ThemedText type="defaultSemiBold" /> }}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
