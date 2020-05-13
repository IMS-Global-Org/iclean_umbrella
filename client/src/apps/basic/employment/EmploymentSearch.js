import React, {useState, useEffect} from 'react'
import { Form, Button } from 'semantic-ui-react'

const per_options = [
  { key: 'hour', text: '$USD/Hour', value: 'hour' },
  { key: 'week', text: '$USD/Week', value: 'week' },
  { key: 'month', text: '$USD/Month', value: 'month' },
  { key: 'year', text: '$USD/Year', value: 'year' },
]

const employer_types = [
  { key: 'full_time', text: 'Full-time', value: 'full_time' },
  { key: 'contract', text: 'Contract', value: 'contract' },
  { key: 'part_time', text: 'Part-time', value: 'part_time' },
  { key: 'remote', text: 'Remote', value: 'remote' },
]

const defaults = {
  type: '',
  wage: '',
  per: '',
  employer: '',
}

const EmploymentSearch = ({...rest}) => {
  const [state, setState] = useState({...defaults})

  const onChange = ({target: {name, value}}) =>
    setState(state => ({
      ...state,
      [name]: value,
    }))

  const onSelect = ({target: {name, selected}}) => 
    setState(state => ({
      ...state,
      [name]: selected,
    }))

  const onSubmit = (e) => {
    e.preventDefault()
    debugger
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group widths='equal'>
        <Form.Select
          fluid
          name='type'
          label='Type'
          placeholder='Full-time...'
          options={employer_types}
          selected={state.type}
          onChange={onSelect}
        />
        <Form.Input
          fluid
          type='number'
          min={1}
          step={0.01}
          name='wage'
          label='Wage'
          placeholder='Wage'
          value={state.wage}
          onChange={onChange}
        />
        <Form.Select
          fluid
          name='per'
          label='Per'
          placeholder='Per'
          options={per_options}
          selected={state.per}
          onChange={onSelect}
        />
      </Form.Group>
      <Form.Field>
        <label>Employer</label>
        <Form.Input 
          fluid 
          name='employer'
          placeholder='Employer...'
          maxLength={40}
          value={state.employer}
          onChange={onChange}
        />
      </Form.Field>
      <Button.Group floated='right'>
        <Button type='submit'>Search</Button>
      </Button.Group>
    </Form>
  )
}

export default EmploymentSearch
