import * as React from 'react'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import MoneyIn from 'react-material-icon-svg/dist/ArrowDownIcon'
import MoneyOut from 'react-material-icon-svg/dist/ArrowUpIcon'
import i18nReact from 'i18n-react'
import styledComponents from 'styled-components'

import Mined from '../assets/images/play_for_work'
import CCCacheStore from '../stores/CCCacheStore'

const AccountBarLeftContainer = styledComponents.div`
  text-align: center;
  height: calc(768px - 134px);
  display: grid;
  grid-template-rows: 131px 131px 131px 131px 131px;
  align-items: center;
`

const Title = styledComponents.span`
  color: #232323;
  letter-spacing: 3px;
  font-size: 10px;
  text-transform: uppercase;
`

class AccountBarLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sendOpen: false,
      tooltipSendOpen: false,
      tooltipReceiveOpen: false,
      receiveOpen: false,
    }

    this.toggleSend = this.toggleSend.bind(this)
    this.toggleReceive = this.toggleReceive.bind(this)
    this.toggleSendTooltip = this.toggleSendTooltip.bind(this)
    this.toggleReceiveTooltip = this.toggleReceiveTooltip.bind(this)
  }

  toggleSend() {
    this.setState({ sendOpen: !this.state.sendOpen })
  }

  toggleReceive() {
    this.setState({ receiveOpen: !this.state.receiveOpen })
  }

  toggleSendTooltip() {
    this.setState({
      tooltipSendOpen: !this.state.tooltipSendOpen,
    })
  }

  toggleReceiveTooltip() {
    this.setState({
      tooltipReceiveOpen: !this.state.tooltipReceiveOpen,
    })
  }

  getMonthlyOuputFormatted(XVGSummaryFormatter) {
    return `${XVGSummaryFormatter.format(this.props.TransactionStore.monthlyOutput)}`
  }

  getMonthlyIncomeFormatted(XVGSummaryFormatter) {
    return `${XVGSummaryFormatter.format(
      this.props.TransactionStore.monthlyIncome,
    )}`
  }

  getMonthlyMinedFormatted(XVGSummaryFormatter) {
    return `${XVGSummaryFormatter.format(
      this.props.TransactionStore.monthlyMined,
    )}`
  }

  render() {
    const formatter = new Intl.NumberFormat(
      CCCacheStore.get('locale', 'en-US'),
      {
        style: 'currency',
        currency: CCCacheStore.get('currency', 'USD'),
        minimumFractionDigits: 2,
      },
    )

    const formatterPrice = new Intl.NumberFormat(
      CCCacheStore.get('locale', 'en-US'),
      {
        style: 'currency',
        currency: CCCacheStore.get('currency', 'USD'),
        minimumFractionDigits: 5,
      },
    )

    const XVGformatter = new Intl.NumberFormat(
      CCCacheStore.get('locale', 'en-US'),
      {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      },
    )

    const XVGSummaryFormatter = new Intl.NumberFormat(
      CCCacheStore.get('locale', 'en-US'),
      {
        style: 'decimal',
        minimumFractionDigits: 2,
      },
    )

    return (
      <AccountBarLeftContainer className="container">
        <div>
          <Title>{i18nReact.translate('accountbar.xvgbalance')}</Title>
          <h6 style={{ color: '#232323' }}>
            {XVGformatter.format(
              this.props.AccountInformationStore.getBalance.total,
            )}{' '}
            CRYP
          </h6>
        </div>
        <div>
          <Title>{i18nReact.translate('accountbar.tbalance')}</Title>
          <h6 style={{ color: '#232323' }}>
            {XVGformatter.format(
              this.props.AccountInformationStore.getBalance.transparent,
            )}{' '}
            CRYP
          </h6>
        </div>
        <div>
          <Title>{i18nReact.translate('accountbar.zbalance')}</Title>
          <h6 style={{ color: '#232323' }}>
            {XVGformatter.format(
              this.props.AccountInformationStore.getBalance.private,
            )}{' '}
            CRYP
          </h6>
        </div>
        <div>
          <Title>
            {i18nReact.translate('accountbar.xvgusd', {
              currency: this.props.SettingsStore.getCurrency,
            })}
          </Title>
          <h6 style={{ color: '#232323' }}>
            {/*NOT FOUND*/}
            {formatter.format(
              this.props.AccountInformationStore.getBalance.total *
              this.props.CoinStatsStore.priceWithCurrency,
            )}
          </h6>
        </div>
        <div>
          <Title>
            {moment().format('MMM YYYY')}{' '}
            {i18nReact.translate('transaction.summary')}
          </Title>
          <h6 style={{ color: '#232323' }}>
            <MoneyOut
              width={14}
              height={14}
              style={{ marginRight: '5px' }}
            />
            {this.getMonthlyOuputFormatted(XVGSummaryFormatter)}<br />
            <MoneyIn
              width={14}
              height={14}
              style={{ marginRight: '5px' }}
            />
            {this.getMonthlyIncomeFormatted(XVGSummaryFormatter)}<br />
            <Mined
              width={14}
              height={14}
              style={{ marginRight: '5px' }}
            />
            {this.getMonthlyMinedFormatted(XVGSummaryFormatter)}
          </h6>
        </div>
      </AccountBarLeftContainer>
    )
  }
}

export default inject(
  'SettingsStore',
  'TransactionStore',
  'AccountInformationStore',
  'CoinStatsStore',
)(observer(AccountBarLeft))
