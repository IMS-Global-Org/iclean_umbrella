import React from 'react'
import { connect } from 'react-redux'
import EmploymentSearch from './EmploymentSearch'


const Grouped = ({...rest}) => {
  return (
    <EmploymentSearch />
  )
}

const mapStateToProps = (state, props) => {
  return {
    employments: state.employments,
  }
}

export default connect(mapStateToProps)(Grouped)
