/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Toggle({setShowThirdPerson}) {
  const [enabled, setEnabled] = useState(true)

  function onChangeHandler() {
    if (enabled) {
      setEnabled(false)
      setShowThirdPerson(false)
    } else if (!enabled) {
      setEnabled(true)
      setShowThirdPerson(true)
    }
  }

  return (
    <Switch.Group as="div" className="flex items-center justify-center">
      <Switch
        checked={enabled}
        onChange={onChangeHandler}
        className={classNames(
          enabled ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="font-medium text-gray-900">第三者アセスメントの結果を表示</span>{' '}
      </Switch.Label>
    </Switch.Group>
  )
}
