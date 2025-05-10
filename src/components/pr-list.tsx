import { Card, Collapse, Tag } from "antd"
import { LockOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { ContributionsQuery } from "@/__generated__/types";
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Divider } from 'antd';


type PRListProps = {
  isFetching: boolean
  contributions: ContributionsQuery['viewer']['contributionsCollection']['pullRequestContributionsByRepository'] | undefined
}

export function PRList({ isFetching, contributions }: PRListProps) {
  if (isFetching) return <div className="h-40 p-4 grid place-items-center text-gray-500 text-xs"><span>Loading...</span></div>
  if (!contributions || contributions.length === 0) return <div className="h-40 p-4 grid place-items-center text-gray-500 text-xs"><span>No data.</span></div>
  return (
    <div className="mt-4">
      {contributions.map(contributionByRepo => (<PRCard key={contributionByRepo.repository.name} contributionByRepo={contributionByRepo} />))}
    </div>
  )
}

function CardExtra({ isPrivate, owner }: { isPrivate: boolean, owner: string }) {
  return (
    <div>
      <span className="mr-2 text-gray-500">{owner}</span>
      {isPrivate && <LockOutlined />}
    </div>
  )
}

const tagColorMap = {
  OPEN: 'green',
  CLOSED: 'red',
  MERGED: 'purple'
}

function PRCard({ contributionByRepo }: { contributionByRepo: ContributionsQuery['viewer']['contributionsCollection']['pullRequestContributionsByRepository'][number] }) {
  const items = contributionByRepo.contributions.nodes ? contributionByRepo.contributions.nodes.map((node) => {
    if (!node) return {}
    const Info = () => {
      return <>
      <div className="flex justify-end items-center">
        <div className="text-gray-400"><a target="_blank" href={node.pullRequest.url}>Link</a></div>
        <Divider type="vertical" />
        <div className="text-gray-400">{dayjs(node.pullRequest.updatedAt).format('YYYY-MM-DD')}</div>
      </div>
        <ReactMarkDown remarkPlugins={[remarkGfm]} className='markdown'>
          {node.pullRequest.body}
        </ReactMarkDown>
      </>
    }
    return {
      key: node.pullRequest.id,
      label: node.pullRequest.title,
      children: <Info />,
      extra: <Tag color={tagColorMap[node.pullRequest.state]}>{node.pullRequest.state}</Tag>,
    }
  }) : []
  return (
    <Card
      className="mb-4"
      title={contributionByRepo.repository.name}
      extra={
        <CardExtra
          owner={contributionByRepo.repository.owner.login}
          isPrivate={contributionByRepo.repository.isPrivate} />
      }>
      <Collapse items={items} defaultActiveKey={['1']} />
    </Card>
  )
}

