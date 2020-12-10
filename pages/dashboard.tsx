import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Chart } from '@src/components/Chart'
import TagsForm from '@src/components/forms/TagsForm'
import { wrapper } from '@src/redux/store'
import { getDashboardData } from '@src/redux/actions/dashboard'
import { Widget, WidgetBillingContent, WidgetSettingsContent, WidgetStatisticsContent } from '@src/components/Widgets'
import Loader from "@src/components/Loader";
import ChartContainer from "@src/Containers/ChartContainer";

const Dashboard = () => {
  const user = useSelector(({ auth: { user } }) => user)
  const dashboard = useSelector(({ dashboard: { statistics } }) => statistics)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDashboardData())
  }, [dispatch])

  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__col">
          <div className="dashboard__row">
            <div className="dashboard__widget-col dashboard_block">
              <Widget typeBilling title="Billing" data={user}>
                <WidgetBillingContent data={dashboard.stat} />
              </Widget>
              <Widget typeSettings  data={dashboard}>
                <WidgetSettingsContent />
              </Widget>
            </div>
            <Widget typeStatistics >
              <WidgetStatisticsContent />
            </Widget>
          </div>
          <Widget title="Incomming talkens dinamics">
            {dashboard.chart && <ChartContainer chartData={dashboard.chart} />}
          </Widget>
        </div>
        <TagsForm />
      </div>
    </div>
  )
}

// export const getServerSideProps = wrapper.getStaticProps(async ({ store }) => {
//   await store.dispatch(getDashboardData())
// })

export default Dashboard
