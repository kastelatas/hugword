import React from 'react'
import { NextPage } from 'next'
import { wrapper, State } from '@src/redux/store'
import { getFaqsQuestions } from '@src/redux/actions/faq'
import { useSelector } from 'react-redux'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

const FaqPage: NextPage<State> = () => {
  const faqList = useSelector(({ faq: { faqList } }) => faqList)

  return (
    <div className="faq-page">
      <h1 className="faq-page__title">FAQ</h1>

      <Accordion allowZeroExpanded>
        {faqList.map((i) => (
          <AccordionItem key={i.id}>
            <AccordionItemHeading>
              <AccordionItemButton>{i.title}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel dangerouslySetInnerHTML={{ __html: i.content }} />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  await store.dispatch(getFaqsQuestions())
})

export default FaqPage
