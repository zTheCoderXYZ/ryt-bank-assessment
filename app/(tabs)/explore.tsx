import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Trans, useTranslation } from 'react-i18next';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const { t } = useTranslation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          {t('explore.title')}
        </ThemedText>
      </ThemedView>
      <ThemedText>{t('explore.lead')}</ThemedText>
      <Collapsible title={t('explore.section.routing')}>
        <Trans
          i18nKey="explore.routing.body1"
          parent={ThemedText}
          components={{ bold: <ThemedText type="defaultSemiBold" /> }}
        />
        <Trans
          i18nKey="explore.routing.body2"
          parent={ThemedText}
          components={{ bold: <ThemedText type="defaultSemiBold" /> }}
        />
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">{t('explore.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.section.support')}>
        <Trans
          i18nKey="explore.support.body"
          parent={ThemedText}
          components={{ bold: <ThemedText type="defaultSemiBold" /> }}
        />
      </Collapsible>
      <Collapsible title={t('explore.section.images')}>
        <Trans
          i18nKey="explore.images.body"
          parent={ThemedText}
          components={{ bold: <ThemedText type="defaultSemiBold" /> }}
        />
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">{t('explore.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.section.theme')}>
        <Trans
          i18nKey="explore.theme.body"
          parent={ThemedText}
          components={{ bold: <ThemedText type="defaultSemiBold" /> }}
        />
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">{t('explore.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.section.animations')}>
        <Trans
          i18nKey="explore.animations.body"
          parent={ThemedText}
          components={{
            bold: <ThemedText type="defaultSemiBold" />,
            code: <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }} />,
          }}
        />
        {Platform.select({
          ios: (
            <Trans
              i18nKey="explore.animations.iosOnly"
              parent={ThemedText}
              components={{ bold: <ThemedText type="defaultSemiBold" /> }}
            />
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
