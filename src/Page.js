import React from 'react'
import {Container, Provider, Subscribe} from 'unstated'

class PageContainer extends Container {
  state = {
    counter: 0
  }
  increment = () => {
    this.setState((state) => ({
      counter: state.counter + 1
    }))
  }
}

const Page = ({page}) => (
  <div className="page">
    <h1>Page</h1>
    <button onClick={page.increment}>Increment</button>
    <div>{page.state.counter}</div>
  </div>
)

export default (props) => (
  <Subscribe to={[PageContainer]}>
    {(page) => <Page {...props} page={page} />}
  </Subscribe>
)
