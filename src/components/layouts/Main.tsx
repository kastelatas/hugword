import React from 'react'

export const MainBody = ({ children }) => {
  return <section className="main">{children}</section>
}

export const MainSection = ({ children }) => {
  return <section className="main__section">{children}</section>
}

export const MainContent = ({ children }) => {
  return <section className="main__content">{children}</section>
}
