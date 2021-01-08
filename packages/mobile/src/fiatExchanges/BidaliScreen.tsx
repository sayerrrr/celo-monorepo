import colors from '@celo/react-components/styles/colors'
import { StackScreenProps } from '@react-navigation/stack'
import BigNumber from 'bignumber.js'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { useSelector } from 'react-redux'
import { e164NumberSelector } from 'src/account/selectors'
import { TokenTransactionType } from 'src/apollo/types'
import networkConfig from 'src/geth/networkConfig'
import i18n from 'src/i18n'
import { emptyHeader } from 'src/navigator/Headers'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import { TopBarTextButton } from 'src/navigator/TopBarButton'
import { StackParamList } from 'src/navigator/types'
import { RecipientKind, RecipientWithAddress } from 'src/recipients/recipient'
import { TransactionDataInput } from 'src/send/SendAmount'
import { stableTokenBalanceSelector } from 'src/stableToken/reducer'

function useInitialJavaScript(cusdBalance: string | null, e164PhoneNumber: string | null) {
  const [initialJavaScript, setInitialJavaScript] = useState<string | null>()
  useEffect(() => {
    if (initialJavaScript) {
      return
    }

    if (cusdBalance && e164PhoneNumber) {
      setInitialJavaScript(`
        window.valora = {
          phoneNumber: "${e164PhoneNumber}",
          balances: {
            "CUSD": ${cusdBalance}
          },
          onPaymentRequest: function (paymentRequest) {
            var payload = { method: 'onPaymentRequest', data: paymentRequest };
            window.ReactNativeWebView.postMessage(JSON.stringify(payload));
          },
          openUrl: function (url) {
            var payload = { method: 'openUrl', data: { url } };
            window.ReactNativeWebView.postMessage(JSON.stringify(payload));
          }
        };
        true; // note: this is required, or you'll sometimes get silent failures
      `)
    }
  }, [cusdBalance, e164PhoneNumber, initialJavaScript])

  return initialJavaScript
}

type RouteProps = StackScreenProps<StackParamList, Screens.Bidali>
type Props = RouteProps

function BidaliScreen(props: Props) {
  const onMessage = (event: WebViewMessageEvent) => {
    const { method, data } = JSON.parse(event.nativeEvent.data)
    switch (method) {
      case 'onPaymentRequest':
        const { amount, address, currency, description, chargeId } = data
        console.log(`Send ${amount} ${currency} to ${address} for ${description} (${chargeId})`)
        // Show a native send confirmation modal here
        break
      case 'openUrl':
        const { url } = data
        console.log(`Open ${url}`)
      // Open the URL in a modal webview or in the native OS browser

      default:
        break
    }
  }

  const webViewRef = useRef<WebView>(null)
  const cusdBalance = useSelector(stableTokenBalanceSelector)
  const e164PhoneNumber = useSelector(e164NumberSelector)
  const initialJavaScript = useInitialJavaScript(cusdBalance, e164PhoneNumber)

  useEffect(() => {
    if (!cusdBalance) {
      return
    }
    webViewRef.current?.injectJavaScript(`
      window.valora.balances.CUSD = ${cusdBalance}
    `)
  }, [cusdBalance])

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {initialJavaScript ? (
        <WebView
          ref={webViewRef}
          source={{ uri: networkConfig.bidaliUrl }}
          onMessage={onMessage}
          injectedJavaScriptBeforeContentLoaded={initialJavaScript}
        />
      ) : (
        <ActivityIndicator size="large" color={colors.greenBrand} />
      )}
    </SafeAreaView>
  )
}

BidaliScreen.navigationOptions = () => {
  const navigateToFiatExchange = () => navigate(Screens.FiatExchange)
  return {
    ...emptyHeader,
    headerLeft: () => (
      <TopBarTextButton title={i18n.t('global:done')} onPress={navigateToFiatExchange} />
    ),
    // Temporary until we can test this e2e
    headerRight: () => {
      const onPress = () => {
        const recipient: RecipientWithAddress = {
          kind: RecipientKind.Address,
          address: '0xa6d1e0bdb6960c3f1bda8ef8f1e91480cfc40dbb',
          displayId: 'MyTestID',
          displayName: 'Bidali',
          // displayName: data.displayName || cachedRecipient?.displayName || 'anonymous',
          // e164PhoneNumber: data.e164PhoneNumber,
          // phoneNumberLabel: cachedRecipient?.phoneNumberLabel,
          // thumbnailPath: cachedRecipient?.thumbnailPath,
          // contactId: cachedRecipient?.contactId,
        }
        const transactionData: TransactionDataInput = {
          recipient,
          amount: new BigNumber(20),
          reason: 'Bidali',
          type: TokenTransactionType.PayPrefill,
        }
        navigate(Screens.SendConfirmation, {
          transactionData,
          isFromScan: true,
          // currencyInfo: { localCurrencyCode: currency, localExchangeRate: exchangeRate },
        })
      }
      return <TopBarTextButton title="Simulate Pay" onPress={onPress} />
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default BidaliScreen