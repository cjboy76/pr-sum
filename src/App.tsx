import { useQuery } from '@apollo/client'
import { UserQuery } from './api/github'
import { PRInspector } from './components/pr-inspector'
import { GithubOutlined } from '@ant-design/icons';


function App() {
  return (
    <div className="max-w-[600px] mx-auto p-4">
      <Header />
      <PRInspector />
    </div>
  )
}

export default App


function Header() {
  const { data } = useQuery(UserQuery)
  const identity = data ? data.viewer.login : ''
  return (
    <div className='flex justify-between'>
      <h1 className="text-2xl font-bold mb-4">pr-sum</h1>
      <div>
        <span className='mr-2'>
          {identity}
        </span>
        <a href="https://github.com/cjboy76/pr-sum" target="_blank" rel="noopener noreferrer"><GithubOutlined /></a>
      </div>
    </div>
  )
}


