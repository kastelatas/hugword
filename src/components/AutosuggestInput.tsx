import { useState } from 'react'
import Autosuggest from 'react-autosuggest'

const languages = [
  {
    name: 'C',
    year: 1972,
  },
  {
    name: 'C#',
    year: 2000,
  },
  {
    name: 'C++',
    year: 1983,
  },
  {
    name: 'Clojure',
    year: 2007,
  },
  {
    name: 'Elm',
    year: 2012,
  },
  {
    name: 'Go',
    year: 2009,
  },
  {
    name: 'Haskell',
    year: 1990,
  },
  {
    name: 'Java',
    year: 1995,
  },
  {
    name: 'Javascript',
    year: 1995,
  },
  {
    name: 'Perl',
    year: 1987,
  },
  {
    name: 'PHP',
    year: 1995,
  },
  {
    name: 'Python',
    year: 1991,
  },
  {
    name: 'Ruby',
    year: 1995,
  },
  {
    name: 'Scala',
    year: 2003,
  },
]

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim())

  if (escapedValue === '') {
    return []
  }

  const regex = new RegExp(`^${escapedValue}`, 'i')

  return languages.filter((language) => regex.test(language.name))
}

function getSuggestionValue(suggestion) {
  return suggestion.name
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.name}</span>
}

const AutosuggestInput = () => {
  const [value, setState] = useState(    '')
  const [ suggestions, setSugestion] = useState([])

  const onChange = (event, { newValue, method }) => {
    setState(newValue)
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setSugestion( getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSugestion( getSuggestions([]))
  }



  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: "Type 'c'",
        value,
        onChange,
      }}
    />
  )
}

export default AutosuggestInput
